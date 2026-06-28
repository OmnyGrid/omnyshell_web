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
        ShellPromptState,
        ShellSessionPort;

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

  final List<int> _line = [];
  bool _passthrough = false;
  bool _ctrlArmed = false;
  bool _ended = false;
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
    _term.onResize(_controller.resize);
    final size = _term.size;
    if (size.cols > 0 && size.rows > 0) {
      _controller.resize(size.cols, size.rows);
    }
    _controller.start();
  }

  /// Whether the session has ended.
  bool get ended => _ended;

  void _onPrompt(ShellPromptState state) {
    _lastPrompt = state;
    _line.clear();
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
        case 0x1b: // Escape sequence (arrows, fn-keys) — not handled at idle.
          return;
        case 0x09: // Tab: remote completion (when a completer is wired).
          if (_onComplete != null) unawaited(_complete());
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
          }
        case 0x03: // Ctrl-C at idle: discard the line, repaint the prompt.
          _term.write(utf8.encode('^C\r\n'));
          _line.clear();
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
          }
      }
    }
  }

  void _commit() {
    final line = utf8.decode(_line, allowMalformed: true);
    _line.clear();
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
      startedAt: _startedAt,
      writeLine: (text) => _term.write(utf8.encode('$text\r\n')),
      currentRemoteCwd: () => _lastPrompt.cwd,
    );
    try {
      await commands.handle(line, context);
    } on Object catch (e) {
      _term.write(utf8.encode('$e\r\n'));
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
  Future<void> dispose() => _controller.dispose();
}
