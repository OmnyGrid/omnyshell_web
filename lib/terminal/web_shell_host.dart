import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        ClientRuntime,
        InteractiveShellController,
        LineEditor,
        LocalCommandContext,
        LocalCommandRegistry,
        NodeDescriptor,
        Principal,
        RemoteSession,
        SessionCommandResult,
        ShellFamily,
        ShellPromptState,
        ShellSessionPort,
        formatShellPrompt;

import 'command_history.dart';
import 'terminal_view.dart';

/// The browser host for an [InteractiveShellController]: it drives the shared
/// [LineEditor] over an xterm.js [TerminalView], exactly as the CLI's connect
/// loop drives it over a real TTY.
///
/// OmnyShell's remote shell is a pipe (no echo, no prompt); the controller owns
/// the protocol loop (marker priming, command wrapping, completion, passthrough)
/// while the editor owns the terminal specifics — echoing input, editing the
/// line, history, completion, and the prompt formatted from [ShellPromptState].
/// Reusing the package's [LineEditor] means the browser behaves identically to
/// the CLI (including mid-line editing) instead of re-implementing it.
///
/// Implements [TerminalKeys] so the on-screen accessory bar feeds the same input
/// pipeline.
class WebShellHost implements TerminalKeys {
  final TerminalView _term;
  final String _principal;
  final String _nodeId;
  late final InteractiveShellController _controller;
  late final LineEditor _editor;

  /// Feeds keystrokes (real keyboard + accessory bar) into [_editor].
  final StreamController<List<int>> _input = StreamController<List<int>>();

  /// Local `:` commands (help/tree/tunnel/…); `null` disables interception.
  final LocalCommandRegistry? _commands;

  /// The connected client, passed to local `:` commands so they can reach the
  /// node/Hub. `null` (with [_commands]) disables local-command interception.
  final ClientRuntime? _client;

  /// Produces TAB-completion candidates for the word under the cursor, given the
  /// live remote [cwd]. `null` disables completion (TAB is then ignored).
  final Future<List<String>> Function(String word, bool isCommand, String? cwd)?
  _onComplete;

  /// Supplies the node descriptor for local commands (loaded asynchronously);
  /// returns `null` until it is available.
  final NodeDescriptor? Function()? _nodeInfo;

  /// The authenticated principal, for `:whoami`/`:info`.
  final Principal? _principalInfo;

  /// The concrete session for commands that act on it (`:detach`/`:session`).
  final RemoteSession? _remoteSession;

  /// Invoked after a local `:exit`/`:quit` closes the session.
  final void Function()? _onSessionExit;

  /// Invoked after a local `:detach` parks the session.
  final void Function()? _onSessionDetached;

  /// Persistent command history (Up/Down), or an in-memory one when disabled.
  final CommandHistory _history;

  /// True when resuming a session whose program is in the alternate screen, so
  /// the controller starts in passthrough and skips prompt priming.
  final bool _resumedInAltScreen;

  bool _passthrough = false;
  bool _ctrlArmed = false;
  bool _ended = false;

  /// True while a full-screen local command (the `:ide` TUI) owns the screen via
  /// [LineEditor.suspendInput]; every key — including Ctrl-C — must reach it raw.
  bool _fullScreen = false;

  /// Registered by a running local command (the `:ai` agent) so Ctrl-C requests
  /// an abort instead of just clearing the line; `null` when none is active.
  void Function()? _interruptHandler;

  /// Broadcasts terminal resizes to a full-screen command (the `:ide` driver).
  final StreamController<void> _resize = StreamController<void>.broadcast();

  final DateTime _startedAt;
  ShellPromptState _lastPrompt = const ShellPromptState();

  @override
  void Function(bool armed)? onCtrlChange;

  /// Creates the host over [term] and [session], wires the [LineEditor] +
  /// [InteractiveShellController], and starts them.
  //
  // The plain `_field = param` initializers below are intentional: a private
  // named parameter can't be an initializing formal, so `this._x` is illegal.
  // The lint is suppressed per-line (constructor only) rather than file-wide.
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
    bool resumedInAltScreen = false,
    void Function()? onSessionExit,
    void Function()? onSessionDetached,
  }) : _history = history ?? CommandHistory.inMemory(),
       // ignore: prefer_initializing_formals
       _resumedInAltScreen = resumedInAltScreen,
       _startedAt = startedAt ?? DateTime.now(),
       // ignore: prefer_initializing_formals
       _term = term,
       // ignore: prefer_initializing_formals
       _principal = principal,
       // ignore: prefer_initializing_formals
       _nodeId = nodeId,
       // ignore: prefer_initializing_formals
       _commands = commands,
       // ignore: prefer_initializing_formals
       _client = client,
       // ignore: prefer_initializing_formals
       _onComplete = onComplete,
       // ignore: prefer_initializing_formals
       _nodeInfo = nodeInfo,
       // ignore: prefer_initializing_formals
       _principalInfo = principalInfo,
       // ignore: prefer_initializing_formals
       _remoteSession = remoteSession,
       // ignore: prefer_initializing_formals
       _onSessionExit = onSessionExit,
       // ignore: prefer_initializing_formals
       _onSessionDetached = onSessionDetached {
    _editor = LineEditor(
      input: _input.stream,
      output: (s) => _term.write(utf8.encode(s)),
      history: _history,
      // The editor repaints across wrapped rows using the terminal width; keep
      // it current via [setWidth] in [_onResize]. Without it a wrapped prompt
      // (narrow phone terminals) staircases a fresh prompt per keystroke.
      width: _term.size.cols,
      // The browser terminal is always "raw" (xterm delivers keystrokes
      // verbatim); there is no mode to toggle.
      setRawMode: null,
      onInterrupt: _interruptRemote,
      onEof: () => unawaited(close()),
      onRaw: _onRaw,
      onComplete: _onComplete == null ? null : _completeAdapter,
      onLine: _onLine,
    );
    _controller = InteractiveShellController(
      session: session,
      // Resuming a session whose program is in the alternate screen (nano, vim,
      // claude, …): start in passthrough and DON'T prime the prompt — priming
      // would run cwd/marker commands that corrupt the full-screen program. The
      // replayed output repaints it and its queued marker restores the prompt on
      // exit. Mirrors the CLI's `resumedInAltScreen` wiring.
      resumedInAltScreen: _resumedInAltScreen,
      // Remote output repaints around the input line (matching the CLI), so a
      // backgrounded job's bytes appear above the prompt rather than tangled
      // with it. While a program owns the screen (passthrough) it just emits.
      onOutput: (bytes) => _editor.printAbove(() => _term.write(bytes)),
      onPrompt: _onPrompt,
      onPassthrough: (active) {
        _passthrough = active;
        _editor.setPassthrough(active);
      },
      onExit: _onExit,
    );
    _term.onInput((data) => _feed(utf8.encode(data)));
    _term.onResize(_onResize);
    final size = _term.size;
    if (size.cols > 0 && size.rows > 0) {
      _controller.resize(size.cols, size.rows);
    }
    _editor.start();
    _controller.start();
  }

  /// Whether the session has ended.
  bool get ended => _ended;

  /// Fires when the terminal is resized — consumed by a full-screen command
  /// (the `:ide` driver) so it can reflow.
  Stream<void> get resizeEvents => _resize.stream;

  // --- Input routing ---------------------------------------------------------

  /// Resizes the remote PTY and notifies any full-screen command.
  void _onResize(int cols, int rows) {
    _controller.resize(cols, rows);
    // Keep the editor's wrap math in sync so a resized terminal reflows the
    // input line instead of staircasing.
    _editor.setWidth(cols);
    // Re-evaluate the width-fitted prompt at the new size (the CLI does this on
    // SIGWINCH); a no-op when nothing is showing (passthrough / running command).
    _redraw();
    if (!_resize.isClosed) _resize.add(null);
  }

  /// Feeds [raw] keystrokes into the editor, applying a pending accessory-bar
  /// Ctrl. A lone Ctrl-C in line mode is routed like the CLI's SIGINT handler
  /// (the browser delivers Ctrl-C as a byte, not a signal): it lets a running
  /// agent abort instead of falling through to the editor's plain line-clear.
  void _feed(List<int> raw) {
    if (_ended || raw.isEmpty) return;
    final bytes = _applyArmedCtrl(raw);
    // A full-screen takeover (`:ide`) and raw passthrough both want every byte,
    // Ctrl-C included; only intercept Ctrl-C for the line editor itself.
    if (!_fullScreen &&
        !_passthrough &&
        bytes.length == 1 &&
        bytes.first == 0x03) {
      _handleInterrupt();
      return;
    }
    if (!_input.isClosed) _input.add(bytes);
  }

  /// Routes a line-mode Ctrl-C. While a local command (the AI agent) has
  /// registered an interrupt handler and no remote command is running, give it
  /// the Ctrl-C (so it can offer to abort) and unblock any prompt it is waiting
  /// on; otherwise let the editor handle it (clear the line / interrupt remote).
  void _handleInterrupt() {
    if (_interruptHandler != null && !_controller.inFlight) {
      _interruptHandler!.call();
      if (_editor.hasPendingPrompt) _editor.interrupt();
      return;
    }
    _editor.interrupt();
  }

  /// The editor's `onInterrupt` (line-mode Ctrl-C with no agent active):
  /// interrupt the running remote command; the remote shell survives via its
  /// INT trap. At idle the editor already cleared the line, so repaint.
  void _interruptRemote() {
    _controller.interrupt();
    if (!_controller.inFlight) _redraw();
  }

  /// The editor's `onRaw` (raw passthrough): relay keystrokes to the remote
  /// program, but turn a lone Ctrl-C into an interrupt (a pipe shell has no line
  /// discipline to raise one itself).
  void _onRaw(List<int> bytes) {
    if (bytes.length == 1 && bytes.first == 0x03) {
      _controller.interrupt();
      return;
    }
    _controller.sendRaw(bytes);
  }

  Future<List<String>> _completeAdapter(String word, bool isCommand) async {
    if (_controller.inFlight) return const <String>[];
    return _onComplete!(word, isCommand, _lastPrompt.cwd);
  }

  // --- Prompt ----------------------------------------------------------------

  void _onPrompt(ShellPromptState state) {
    _lastPrompt = state;
    _redraw();
  }

  /// Updates the editor's prompt from the latest [ShellPromptState], using the
  /// shared formatter so the browser prompt matches the CLI.
  void _redraw() => _editor.setPrompt(_prompt(_lastPrompt));

  String _prompt(ShellPromptState s) => formatShellPrompt(
    principal: _principal,
    node: _nodeId,
    cwd: s.cwd ?? '~',
    branch: s.branch,
    gitStatus: s.gitStatus,
    privilege: s.privilege,
    // Shrink the prompt to fit narrow (phone) terminals, matching the CLI. The
    // formatter drops the least-important pieces first; 0 renders the full form.
    width: _term.size.cols,
  );

  void _onExit(int code) {
    if (_ended) return;
    _ended = true;
    _term.writeText('\r\n\x1b[90m[session ended — exit $code]\x1b[0m\r\n');
  }

  // --- Line dispatch ---------------------------------------------------------

  Future<void> _onLine(String line) async {
    if (line.isNotEmpty) await _editor.addHistory(line);
    final commands = _commands;
    if (commands != null && _client != null && commands.isLocalCommand(line)) {
      await _runLocalCommand(commands, line);
    } else {
      // The controller wraps + dispatches and repaints the prompt via onPrompt
      // when the command completes; a blank line just repaints.
      _controller.submitLine(line);
    }
  }

  /// Runs a local `:` command (mirroring the CLI's `onLine` local-command
  /// branch), then repaints the prompt — or leaves the session on
  /// `:exit`/`:detach`.
  Future<void> _runLocalCommand(
    LocalCommandRegistry commands,
    String line,
  ) async {
    final node = _nodeInfo?.call();
    if (node == null) {
      _writeLine('Node information is still loading — retry.');
      _redraw();
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
      // Interactive prompts (the `:ai` agent's confirmations) read a line from
      // the editor; Ctrl-C while one is pending completes it (and aborts the
      // agent via the interrupt handler).
      readLine: (prompt) => _editor.prompt(prompt),
      // Background output repaints around the input line.
      printAbove: (l) => _editor.printAbove(() => _writeLine(l)),
      onInterruptRequest: (handler) {
        _interruptHandler = handler;
        // Hide the idle prompt while the agent owns the screen; restore it when
        // the command clears its handler.
        _editor.hideIdlePrompt(handler != null);
        if (handler == null) _redraw();
      },
      horizontalRule: _horizontalRule,
      // Run the agent's commands in the live PTY session so sudo (and other
      // interactive prompts) work; POSIX only — others fall back to exec.
      runInSession: _controller.shellFamily == ShellFamily.posix
          ? _runInSession
          : null,
      // Full-screen takeover for `:ide`: the editor pauses and forwards raw
      // input to the TUI, then restores the prompt when it returns.
      runFullScreen: _runFullScreen,
    );
    try {
      await commands.handle(line, context);
    } on Object catch (e) {
      _writeLine('$e');
    } finally {
      // Defensively drop any prompt/interrupt state the command left behind.
      _interruptHandler = null;
      _editor.hideIdlePrompt(false);
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
    _redraw();
  }

  /// Hands the terminal to a full-screen command (`:ide`) via the editor's
  /// [LineEditor.suspendInput], flagging [_fullScreen] so [_feed] forwards every
  /// key (Ctrl-C included) to it raw.
  Future<void> _runFullScreen(
    Future<void> Function(Stream<List<int>> input) body,
  ) async {
    _fullScreen = true;
    try {
      await _editor.suspendInput(body);
    } finally {
      _fullScreen = false;
    }
  }

  /// A horizontal rule sized to the terminal, for commands that frame output.
  String _horizontalRule() {
    final cols = _term.size.cols;
    return '─' * (cols > 0 ? cols : 80);
  }

  /// Runs [command] in the **live interactive PTY session** (shared cwd/env and
  /// cached sudo credentials) and returns its captured output + exit code, so
  /// the `:ai` agent's commands behave like the user typed them.
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
  /// output — hand us raw multi-line text. The browser terminal is a pipe with
  /// no line discipline, so a bare `\n` would "staircase"; translate it here.
  void _writeLine(String text) => _term.write(
    utf8.encode(
      '${text.replaceAll('\r\n', '\n').replaceAll('\n', '\r\n')}\r\n',
    ),
  );

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
  void sendKey(List<int> bytes) => _feed(bytes);

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
    unawaited(_input.close());
    unawaited(_resize.close());
    unawaited(_editor.close());
    return _controller.dispose();
  }
}
