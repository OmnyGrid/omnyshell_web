// (Named constructor params map to private fields; an initializing formal can't
// be a private named parameter, so the assignment is intentional.)
// ignore_for_file: prefer_initializing_formals
import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        ClientRuntime,
        InteractiveShellController,
        LocalCommandContext,
        LocalCommandRegistry,
        NodeDescriptor,
        Principal,
        RemoteSession,
        SessionCommandResult,
        ShellFamily,
        HistoryCursor,
        ShellPromptState,
        ShellSessionPort;

import 'command_history.dart';
import 'terminal_view.dart';

/// The browser host for an [InteractiveShellController]: local line editing and
/// prompt rendering over an xterm.js [TerminalView].
///
/// OmnyShell's remote shell is a pipe (no echo, no prompt); the controller owns
/// the protocol loop (marker priming, command wrapping, completion, passthrough)
/// and this host owns the terminal specifics — echoing input, editing the line,
/// formatting the prompt from [ShellPromptState], and relaying raw bytes while a
/// program owns the terminal. Implements [TerminalKeys] so the on-screen
/// accessory bar drives the same input pipeline.
class WebShellHost implements TerminalKeys {
  final TerminalView _term;
  final String _principal;
  final String _nodeId;
  late final InteractiveShellController _controller;

  /// Local `:` commands (help/tree/tunnel/…); `null` disables interception.
  final LocalCommandRegistry? _commands;

  /// The connected client, passed to local `:` commands so they can reach the
  /// node/Hub. `null` (with [_commands]) disables local-command interception.
  final ClientRuntime? _client;

  /// Produces TAB-completion candidates for the word under the cursor, given the
  /// live remote [cwd] — the browser counterpart to the CLI's
  /// `LineEditor.onComplete`. `null` disables completion (TAB is then ignored).
  final Future<List<String>> Function(String word, bool isCommand, String? cwd)?
  _onComplete;

  /// Supplies the node descriptor for local commands (loaded asynchronously);
  /// returns `null` until it is available.
  final NodeDescriptor? Function()? _nodeInfo;

  /// The authenticated principal, for `:whoami`/`:info`.
  final Principal? _principalInfo;

  /// The concrete session for commands that act on it (`:detach`/`:session`),
  /// or `null` when unavailable (e.g. tests with a fake port).
  final RemoteSession? _remoteSession;

  /// Invoked after a local `:exit`/`:quit` closes the session.
  final void Function()? _onSessionExit;

  /// Invoked after a local `:detach` parks the session.
  final void Function()? _onSessionDetached;

  /// Persistent command history, or `null` to disable Up/Down navigation.
  final CommandHistory? _history;

  /// Up/Down navigation cursor over [_history] (shared with the CLI), or `null`
  /// when history is disabled.
  final HistoryCursor? _histCursor;

  final List<int> _line = [];
  bool _passthrough = false;
  bool _ctrlArmed = false;
  bool _ended = false;

  /// When set, the next committed line is delivered here (e.g. an `:ai` confirm
  /// prompt) instead of being dispatched as a command. See [_readLine].
  Completer<String>? _lineSink;

  /// Registered by a running local command (the `:ai` agent) so Ctrl-C requests
  /// an abort instead of just clearing the line; `null` when none is active.
  void Function()? _interruptHandler;

  /// While true, the persistent *idle* prompt is not painted — a local command
  /// (the `:ai` agent) owns the screen, mirroring the CLI's `hideIdlePrompt`.
  /// The agent's own confirmation questions go through [_readLine], not
  /// [_onPrompt], so they still render while this is set.
  bool _idlePromptHidden = false;

  /// While a full-screen local command (the `:ide` TUI) owns the screen, every
  /// keystroke is diverted into this sink instead of the line editor /
  /// passthrough, and the persistent prompt is not painted. `null` at idle.
  /// See [_runFullScreen], wired into [LocalCommandContext.runFullScreen].
  StreamController<List<int>>? _fullScreen;

  /// Broadcasts terminal resizes to a full-screen command (the IDE) so it can
  /// reflow. The shell controller also receives every resize for the remote PTY.
  final StreamController<void> _resize = StreamController<void>.broadcast();

  final DateTime _startedAt;
  ShellPromptState _lastPrompt = const ShellPromptState();

  @override
  void Function(bool armed)? onCtrlChange;

  /// Creates the host over [term] and [session], and starts the controller.
  ///
  /// When [commands] and [client] are supplied the host mirrors the CLI: TAB
  /// runs remote completion and `:` lines are dispatched to [commands] instead
  /// of the remote shell.
  WebShellHost({
    required TerminalView term,
    required ShellSessionPort session,
    required String principal,
    required String nodeId,
    DateTime? startedAt,
    LocalCommandRegistry? commands,
    ClientRuntime? client,
    Future<List<String>> Function(String word, bool isCommand, String? cwd)?
    onComplete,
    NodeDescriptor? Function()? nodeInfo,
    Principal? principalInfo,
    RemoteSession? remoteSession,
    CommandHistory? history,
    void Function()? onSessionExit,
    void Function()? onSessionDetached,
  }) : _term = term,
       _principal = principal,
       _nodeId = nodeId,
       _commands = commands,
       _client = client,
       _onComplete = onComplete,
       _nodeInfo = nodeInfo,
       _principalInfo = principalInfo,
       _remoteSession = remoteSession,
       _history = history,
       _histCursor = history?.cursor(),
       _onSessionExit = onSessionExit,
       _onSessionDetached = onSessionDetached,
       _startedAt = startedAt ?? DateTime.now() {
    _controller = InteractiveShellController(
      session: session,
      onOutput: _term.write,
      onPrompt: _onPrompt,
      onPassthrough: (active) => _passthrough = active,
      onExit: _onExit,
    );
    _term.onInput((data) => _handleBytes(utf8.encode(data)));
    _term.onResize(_onResize);
    final size = _term.size;
    if (size.cols > 0 && size.rows > 0) {
      _controller.resize(size.cols, size.rows);
    }
    _controller.start();
  }

  /// Whether the session has ended.
  bool get ended => _ended;

  /// Fires when the terminal is resized — consumed by a full-screen command
  /// (the `:ide` driver) so it can reflow.
  Stream<void> get resizeEvents => _resize.stream;

  /// Resizes the remote PTY and notifies any full-screen command.
  void _onResize(int cols, int rows) {
    _controller.resize(cols, rows);
    if (!_resize.isClosed) _resize.add(null);
  }

  void _onPrompt(ShellPromptState state) {
    _lastPrompt = state;
    _line.clear();
    if (_idlePromptHidden) return; // the agent owns the screen
    _term.write(utf8.encode(_prompt(state)));
  }

  String _prompt(ShellPromptState s) {
    final cwd = s.cwd ?? '~';
    final symbol = s.isRoot ? '#' : r'$';
    final git = (s.branch != null && s.branch!.isNotEmpty)
        ? ' \x1b[33m(${s.branch}${s.gitStatus != null ? ' ${s.gitStatus}' : ''})\x1b[0m'
        : '';
    return '\x1b[1;32m$_principal@$_nodeId\x1b[0m:'
        '\x1b[1;34m$cwd\x1b[0m$git $symbol ';
  }

  void _onExit(int code) {
    if (_ended) return;
    _ended = true;
    _term.writeText('\r\n\x1b[90m[session ended — exit $code]\x1b[0m\r\n');
  }

  void _handleBytes(List<int> raw) {
    if (_ended || raw.isEmpty) return;
    final bytes = _applyArmedCtrl(raw);

    // A full-screen command (the `:ide` TUI) owns the screen: forward every key
    // to it (including Ctrl-C and arrows — the IDE decodes them itself) and skip
    // the line editor / passthrough entirely.
    final fullScreen = _fullScreen;
    if (fullScreen != null) {
      if (!fullScreen.isClosed) fullScreen.add(bytes);
      return;
    }

    if (_passthrough) {
      // A program owns the terminal: relay raw, but turn Ctrl-C into an
      // interrupt (a pipe shell has no line discipline to do it).
      if (bytes.length == 1 && bytes[0] == 0x03) {
        _controller.interrupt();
        return;
      }
      _controller.sendRaw(bytes);
      return;
    }

    for (var i = 0; i < bytes.length; i++) {
      final c = bytes[i];
      switch (c) {
        case 0x1b: // Escape sequence (arrows walk history; others ignored).
          final consumed = _handleEscape(bytes, i);
          if (consumed == 0) return; // unknown/incomplete: drop the rest
          i += consumed - 1; // the for-loop's i++ advances past the last byte
          continue;
        case 0x09: // Tab: remote completion (suppressed while reading a line).
          if (_onComplete != null && _lineSink == null) unawaited(_complete());
          return;
        case 0x0d: // Enter (CR)
        case 0x0a: // Enter (LF)
          _commit();
          return;
        case 0x7f: // Backspace (DEL)
        case 0x08: // Backspace (BS)
          if (_line.isNotEmpty) {
            _line.removeLast();
            _term.write(const [0x08, 0x20, 0x08]);
            _histCursor?.reset();
          }
        case 0x03: // Ctrl-C
          // While reading a line for the agent, abort that prompt by answering
          // `q` (its handlers treat it as an abort); the agent unwinds cleanly.
          final sink = _lineSink;
          if (sink != null) {
            _lineSink = null;
            _line.clear();
            _term.write(utf8.encode('^C\r\n'));
            if (!sink.isCompleted) sink.complete('q');
            return;
          }
          // While a local command (the agent) runs, request an abort.
          if (_interruptHandler != null) {
            _line.clear();
            _term.write(utf8.encode('^C\r\n'));
            _interruptHandler!.call();
            return;
          }
          // At idle: discard the line, repaint the prompt.
          _term.write(utf8.encode('^C\r\n'));
          _line.clear();
          _histCursor?.reset();
          _term.write(utf8.encode(_prompt(_lastPrompt)));
          return;
        case 0x04: // Ctrl-D on an empty line: end the session.
          if (_line.isEmpty) {
            unawaited(close());
            return;
          }
        case 0x0c: // Ctrl-L: clear screen, keep the line.
          _term.write(utf8.encode('\x1b[2J\x1b[H'));
          _term.write(utf8.encode(_prompt(_lastPrompt)));
          _term.write(List<int>.from(_line));
        default:
          if (c >= 0x20) {
            _line.add(c);
            _term.write([c]);
            _histCursor?.reset();
          }
      }
    }
  }

  /// Handles a CSI escape sequence starting at [i] (where `bytes[i]` is ESC).
  ///
  /// Up/Down walk the command history; the remaining cursor/navigation keys are
  /// consumed and ignored (this host keeps the cursor at the end of the line).
  /// Returns the number of bytes consumed, or 0 when the sequence is unknown or
  /// truncated in this chunk — the caller then drops the rest, as before.
  int _handleEscape(List<int> bytes, int i) {
    // CSI: ESC '[' <final> (PgUp/PgDn add a '~' terminator).
    if (i + 2 >= bytes.length || bytes[i + 1] != 0x5b) return 0;
    switch (bytes[i + 2]) {
      case 0x41: // Up
        _historyPrev();
        return 3;
      case 0x42: // Down
        _historyNext();
        return 3;
      case 0x43: // Right
      case 0x44: // Left
      case 0x48: // Home
      case 0x46: // End
        return 3;
      case 0x35: // PgUp: ESC [ 5 ~
      case 0x36: // PgDn: ESC [ 6 ~
        return (i + 3 < bytes.length && bytes[i + 3] == 0x7e) ? 4 : 0;
    }
    return 0;
  }

  /// Replaces the current line with the previous (older) matching history entry.
  void _historyPrev() {
    final cursor = _histCursor;
    if (cursor == null) return;
    // No mid-line cursor at idle, so the search prefix is the whole line.
    final line = utf8.decode(_line, allowMalformed: true);
    final text = cursor.up(line: line, prefix: line);
    if (text != null) _replaceLine(text);
  }

  /// Replaces the current line with the next (newer) matching history entry, or
  /// the stashed in-progress line once past the most recent match.
  void _historyNext() {
    final text = _histCursor?.down();
    if (text != null) _replaceLine(text);
  }

  /// Swaps the line buffer for [text] and repaints it on the current row.
  void _replaceLine(String text) {
    _line
      ..clear()
      ..addAll(utf8.encode(text));
    _redrawLine(text);
  }

  void _commit() {
    final line = utf8.decode(_line, allowMalformed: true);
    _line.clear();
    // A local command (the `:ai` agent) is awaiting a line via [_readLine]:
    // deliver it there instead of dispatching, and don't record it in history
    // (answers/keys don't belong there).
    final sink = _lineSink;
    if (sink != null) {
      _lineSink = null;
      _histCursor?.reset();
      _term.write(utf8.encode('\r\n'));
      if (!sink.isCompleted) sink.complete(line);
      return;
    }
    // Record the command and reset history browsing, mirroring the CLI's
    // connect loop (blank lines and consecutive duplicates are skipped by add).
    _history?.add(line);
    _histCursor?.reset();
    _term.write(utf8.encode('\r\n'));
    // Local `:` commands (help/tree/tunnel/…) are handled client-side and never
    // forwarded to the remote shell — exactly as the CLI's connect loop does.
    final commands = _commands;
    if (commands != null && _client != null && commands.isLocalCommand(line)) {
      unawaited(_runLocalCommand(commands, line));
      return;
    }
    // The controller wraps + dispatches (and repaints the prompt via onPrompt
    // when the command completes); a blank line just repaints.
    _controller.submitLine(line);
  }

  /// Repaints the prompt for the current (cleared) line.
  void _repaintPrompt() {
    _line.clear();
    _term.write(utf8.encode(_prompt(_lastPrompt)));
  }

  /// Writes [prompt] and resolves with the next line the user enters — the
  /// browser counterpart to the CLI's readLine, used by the `:ai` agent for
  /// confirmations. The next [_commit] (Enter) or Ctrl-C completes the future.
  Future<String> _readLine(String prompt) {
    // A prior reader should always have completed before another starts; guard
    // anyway so a stray pending future never strands the agent.
    final pending = _lineSink;
    if (pending != null && !pending.isCompleted) pending.complete('');
    _line.clear();
    _histCursor?.reset();
    _term.write(utf8.encode(prompt));
    final completer = Completer<String>();
    _lineSink = completer;
    return completer.future;
  }

  /// Grants a local command exclusive ownership of the terminal for a
  /// full-screen takeover (the `:ide` TUI): every keystroke is diverted to
  /// [body] via the stream it receives (the line editor goes dormant), [body]
  /// paints the whole screen, and the idle prompt is restored by the caller
  /// ([_runLocalCommand]) once it returns. The browser counterpart to the CLI's
  /// `LineEditor.suspendInput`, wired into [LocalCommandContext.runFullScreen].
  Future<void> _runFullScreen(
    Future<void> Function(Stream<List<int>> input) body,
  ) async {
    // A prior takeover should always have torn down first; guard anyway.
    await _fullScreen?.close();
    final controller = StreamController<List<int>>();
    _fullScreen = controller;
    try {
      await body(controller.stream);
    } finally {
      if (identical(_fullScreen, controller)) _fullScreen = null;
      await controller.close();
    }
  }

  /// A horizontal rule sized to the terminal, for commands that frame output.
  String _horizontalRule() {
    final cols = _term.size.cols;
    return '─' * (cols > 0 ? cols : 80);
  }

  /// Runs [command] in the **live interactive PTY session** (shared cwd/env and
  /// cached sudo credentials) and returns its captured output + exit code, so the
  /// `:ai` agent's commands behave like the user typed them — output streams to
  /// the terminal and the user can answer interactive prompts (e.g. a sudo
  /// password) in passthrough. Wired only for POSIX shells (the marker carries
  /// the exit code there); other families fall back to a one-off client `exec`.
  Future<SessionCommandResult> _runInSession(String command) async {
    final r = await _controller.runAgentCommand(command);
    return SessionCommandResult(
      exitCode: r.exitCode,
      output: utf8.decode(r.output, allowMalformed: true),
    );
  }

  /// Writes [text] as a line, normalizing bare LFs to CRLF and appending one.
  ///
  /// The remote shell's own output is already CRLF (the node's PTY applies
  /// `onlcr`), but local `:` commands — notably the `:ai` agent echoing captured
  /// `exec` output — hand us raw multi-line text. The browser terminal is a pipe
  /// with no line discipline, so a bare `\n` moves down without returning to
  /// column 0 ("staircase"); translate it here.
  void _writeLine(String text) => _term.write(
    utf8.encode(
      '${text.replaceAll('\r\n', '\n').replaceAll('\n', '\r\n')}\r\n',
    ),
  );

  /// Runs a local `:` command and repaints the prompt (or leaves the session on
  /// `:exit`/`:detach`), mirroring the CLI's `onLine` local-command branch.
  Future<void> _runLocalCommand(
    LocalCommandRegistry commands,
    String line,
  ) async {
    final node = _nodeInfo?.call();
    if (node == null) {
      _term.write(
        utf8.encode('Node information is still loading — retry.\r\n'),
      );
      _repaintPrompt();
      return;
    }
    final context = LocalCommandContext(
      client: _client!,
      registry: commands,
      node: node,
      principal: _principalInfo,
      session: _remoteSession,
      shellFamily: _controller.shellFamily,
      startedAt: _startedAt,
      writeLine: _writeLine,
      currentRemoteCwd: () => _lastPrompt.cwd,
      // Full-screen takeover for the `:ide` TUI (raw input + alternate screen).
      runFullScreen: _runFullScreen,
      // Interactive prompts + Ctrl-C abort for the `:ai` agent.
      readLine: _readLine,
      onInterruptRequest: (handler) {
        _interruptHandler = handler;
        // Suppress the idle prompt while the agent owns the screen, and restore
        // it (via _repaintPrompt below) once the command clears its handler.
        _idlePromptHidden = handler != null;
      },
      horizontalRule: _horizontalRule,
      // Run the agent's commands in the live PTY session so sudo (and other
      // interactive prompts) work; POSIX only — others fall back to exec.
      runInSession: _controller.shellFamily == ShellFamily.posix
          ? _runInSession
          : null,
    );
    try {
      await commands.handle(line, context);
    } on Object catch (e) {
      _writeLine('$e');
    } finally {
      // Defensively drop any prompt/interrupt state the command left behind.
      _interruptHandler = null;
      _idlePromptHidden = false;
      final sink = _lineSink;
      if (sink != null) {
        _lineSink = null;
        if (!sink.isCompleted) sink.complete('');
      }
    }
    if (context.exitRequested) {
      _ended = true;
      if (context.detachRequested) {
        // `:detach` already parked the session server-side; just leave.
        _onSessionDetached?.call();
      } else {
        await _controller.close();
        _onSessionExit?.call();
      }
      return;
    }
    _repaintPrompt();
  }

  // --- TAB completion --------------------------------------------------------

  /// Completes the word at the end of the line by running the shell's
  /// completion command on the node (via [ClientRuntime.execute]) and applying
  /// the candidates — the browser counterpart to the CLI's `LineEditor`.
  ///
  /// This host has no mid-line cursor (input only ever appends, and arrow keys
  /// are ignored at idle), so the word under completion is always the run of
  /// characters after the last space.
  Future<void> _complete() async {
    final onComplete = _onComplete;
    if (onComplete == null || _ended || _passthrough || _controller.inFlight) {
      return;
    }
    final lineStr = utf8.decode(_line, allowMalformed: true);
    var start = lineStr.length;
    while (start > 0 && lineStr[start - 1] != ' ') {
      start--;
    }
    final word = lineStr.substring(start);
    final isCommand = lineStr.substring(0, start).trim().isEmpty;

    final List<String> candidates;
    try {
      candidates = await onComplete(word, isCommand, _lastPrompt.cwd);
    } on Object {
      return; // completion is best-effort
    }
    // The line may have changed while the round-trip was in flight; only apply
    // when the user hasn't typed past the word we completed.
    if (_ended) return;
    final current = utf8.decode(_line, allowMalformed: true);
    if (current != lineStr) return;
    _applyCompletion(lineStr, start, word, candidates);
  }

  void _applyCompletion(
    String lineStr,
    int start,
    String word,
    List<String> candidates,
  ) {
    if (candidates.isEmpty) {
      _term.write(utf8.encode('\x07')); // bell: nothing to complete
      return;
    }
    if (candidates.length == 1) {
      final only = candidates.first;
      _replaceWord(lineStr, start, only, addSpace: !only.endsWith('/'));
      return;
    }
    final prefix = _longestCommonPrefix(candidates);
    if (prefix.length > word.length) {
      _replaceWord(lineStr, start, prefix, addSpace: false);
    } else {
      // Several candidates and no further prefix: list them, then repaint.
      _term.write(utf8.encode('\r\n${candidates.join('  ')}\r\n'));
      _redrawLine(lineStr);
    }
  }

  void _replaceWord(
    String lineStr,
    int start,
    String replacement, {
    required bool addSpace,
  }) {
    final newLine =
        lineStr.substring(0, start) + replacement + (addSpace ? ' ' : '');
    _line
      ..clear()
      ..addAll(utf8.encode(newLine));
    _histCursor?.reset();
    _redrawLine(newLine);
  }

  /// Repaints the prompt and [lineStr] on the current row (cursor stays at end).
  void _redrawLine(String lineStr) =>
      _term.write(utf8.encode('\r\x1b[K${_prompt(_lastPrompt)}$lineStr'));

  /// The longest common prefix (by character) shared by every candidate.
  static String _longestCommonPrefix(List<String> items) {
    if (items.isEmpty) return '';
    var prefix = items.first.runes.map(String.fromCharCode).toList();
    for (final item in items.skip(1)) {
      final chars = item.runes.map(String.fromCharCode).toList();
      var i = 0;
      final max = prefix.length < chars.length ? prefix.length : chars.length;
      while (i < max && prefix[i] == chars[i]) {
        i++;
      }
      prefix = prefix.sublist(0, i);
      if (prefix.isEmpty) break;
    }
    return prefix.join();
  }

  List<int> _applyArmedCtrl(List<int> bytes) {
    if (!_ctrlArmed) return bytes;
    _disarmCtrl();
    if (bytes.isEmpty) return bytes;
    final c = bytes.first;
    if ((c >= 0x40 && c <= 0x5f) || (c >= 0x61 && c <= 0x7a)) {
      return [c & 0x1f, ...bytes.skip(1)];
    }
    return bytes;
  }

  // --- TerminalKeys (accessory bar) ------------------------------------------

  @override
  void sendKey(List<int> bytes) => _handleBytes(bytes);

  @override
  void armCtrl() {
    _ctrlArmed = !_ctrlArmed;
    onCtrlChange?.call(_ctrlArmed);
  }

  @override
  bool get ctrlArmed => _ctrlArmed;

  void _disarmCtrl() {
    if (!_ctrlArmed) return;
    _ctrlArmed = false;
    onCtrlChange?.call(false);
  }

  // --- Lifecycle -------------------------------------------------------------

  /// Detaches the session (keeps it alive on the node).
  Future<void> detach() => _controller.detach();

  /// Terminates the session.
  Future<void> close() => _controller.close();

  /// Stops driving the session without detaching/closing it (on unmount).
  Future<void> dispose() {
    unawaited(_fullScreen?.close());
    unawaited(_resize.close());
    return _controller.dispose();
  }
}
