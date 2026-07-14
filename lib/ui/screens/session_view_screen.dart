import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        LocalCommandRegistry,
        NodeDescriptor,
        RemoteSession,
        ShellDialect,
        ShellSessionPort;
import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../core/app_error.dart';
import '../../terminal/ai_command_factory.dart';
import '../../terminal/command_history.dart';
import '../../terminal/ide_command_factory.dart';
import '../../terminal/terminal_accessory.dart';
import '../../terminal/terminal_fitter.dart';
import '../../terminal/terminal_view.dart';
import '../../terminal/web_shell_host.dart';
import '../../terminal/xterm_terminal_view.dart';
import '../dom.dart';
import '../settings_panel.dart' show deviceMetrics, showSettingsPanel;
import '../widgets.dart';

/// The interactive terminal view: opens (or resumes) a shell session on a node
/// and drives it with a [WebShellHost] (prompt, echo, line editing over the
/// shared `InteractiveShellController`) wired to an xterm.js terminal.
///
/// A [sessionRef] of `new` opens a fresh shell; any other value resumes that
/// session. The terminal factory and session opener are injectable so the
/// screen can be tested without xterm.js or a real socket.
class SessionViewScreen implements Screen {
  final AppContext ctx;

  /// Node id from the route.
  final String nodeId;

  /// Session ref from the route (`new` for a fresh shell).
  final String sessionRef;

  /// Builds the terminal surface inside the given host element.
  final TerminalView Function(web.HTMLElement host) terminalFactory;

  /// Opens the session and returns it (a `RemoteSession`, which is a
  /// [ShellSessionPort]), given the terminal geometry.
  final Future<ShellSessionPort> Function(int cols, int rows) opener;

  /// Reads the clipboard for the Paste key (injectable in tests).
  final ClipboardReader clipboardRead;

  /// Writes the clipboard for the Copy key (injectable in tests).
  final ClipboardWriter clipboardWrite;

  @override
  late final web.HTMLElement element;

  late final web.HTMLElement _host;
  late final web.HTMLElement _status;
  late final web.HTMLElement _accessory;
  late final web.HTMLButtonElement _fsToggle;
  TerminalView? _term;
  WebShellHost? _shell;
  NodeDescriptor? _node;

  /// The opened session's id, for the control-plane terminate (kill).
  String? _sessionId;
  bool _finished = false;
  bool _disposed = false;
  bool _fullscreen = false;
  void Function()? _detachOrientation;

  /// Keeps the terminal sized to the page (see [TerminalFitter]).
  TerminalFitter? _fitter;

  /// The fixed PTY dimensions chosen for this session, or `null` in auto-fit
  /// mode. When set, the terminal keeps these cols/rows for its lifetime and only
  /// the font is rescaled on resize — the backend PTY can't be resized.
  ({int cols, int rows})? _fixedDims;

  /// Builds the screen. Production callers omit the injected hooks.
  SessionViewScreen(
    this.ctx,
    this.nodeId,
    this.sessionRef, {
    TerminalView Function(web.HTMLElement host)? terminalFactory,
    Future<ShellSessionPort> Function(int cols, int rows)? opener,
    ClipboardReader? clipboardRead,
    ClipboardWriter? clipboardWrite,
  }) : terminalFactory = terminalFactory ?? ((host) => XtermTerminalView(host)),
       opener = opener ?? _defaultOpener(ctx, nodeId, sessionRef),
       clipboardRead = clipboardRead ?? defaultClipboardRead,
       clipboardWrite = clipboardWrite ?? defaultClipboardWrite {
    _host = el(
      'div',
      classes: 'terminal-host',
      role: 'group',
      ariaLabel: 'Terminal',
    );
    _status = div(classes: 'row');
    _accessory = div();
    _fsToggle = button(
      '⤢ Fullscreen',
      className: 'ghost',
      ariaLabel: 'Enter fullscreen',
      onClick: _toggleFullscreen,
    );

    element = el(
      'div',
      classes: 'stack terminal-screen',
      children: [
        el(
          'div',
          classes: 'toolbar',
          children: [
            button(
              '← Sessions',
              className: 'ghost',
              onClick: () => ctx.router.go(
                '/nodes/${Uri.encodeComponent(nodeId)}/sessions',
              ),
            ),
            el('div', classes: 'grow'),
            _status,
            _fsToggle,
            button('Detach', onClick: _detach),
            button('Terminate', className: 'danger', onClick: _terminate),
          ],
        ),
        el('div', classes: 'card terminal-card', children: [_host]),
        _accessory,
        // Floating exit button, hidden by CSS unless fullscreen is active.
        button(
          '⤡',
          className: 'icon ghost term-exit-fullscreen',
          ariaLabel: 'Exit fullscreen',
          onClick: _toggleFullscreen,
        ),
      ],
    );

    _status.appendChild(loadingRow('Connecting…'));
    // Lock the page to the viewport so only the terminal content scrolls (no
    // body/rubber-band scroll); removed again on dispose.
    web.document.documentElement?.classList.add('terminal-active');
    // Defer until mounted so the host has layout for the terminal fit.
    scheduleMicrotask(_start);
  }

  static Future<ShellSessionPort> Function(int, int) _defaultOpener(
    AppContext ctx,
    String nodeId,
    String sessionRef,
  ) =>
      (cols, rows) async => sessionRef == 'new'
      ? await ctx.service.openShell(nodeId: nodeId, cols: cols, rows: rows)
      : await ctx.service.resumeSession(
          nodeId: nodeId,
          sessionRef: sessionRef,
          cols: cols,
          rows: rows,
        );

  Future<void> _start() async {
    final TerminalView term;
    try {
      term = terminalFactory(_host);
    } on Object catch (e) {
      _showError(AppError(AppErrorKind.unknown, 'Terminal failed to load: $e'));
      return;
    }
    _term = term;
    // Resolve the chosen dimensions only for a *fresh* shell. A resumed session
    // fits to this device and is never pinned to a stored preset; the node
    // resizes the resumed PTY to the size we open with (so a full-screen program
    // reflows to this device).
    _fixedDims = sessionRef == 'new'
        ? ctx.display.resolveDimensions(deviceMetrics())
        : null;

    final fitter = TerminalFitter(
      term: term,
      host: _host,
      accessory: _accessory,
      scaleTarget: element,
      fixedDims: _fixedDims,
      textSize: () => ctx.display.textSize.value,
      isFullscreen: () => _fullscreen,
    );
    _fitter = fitter;

    final int cols;
    final int rows;
    final fixed = _fixedDims;
    if (fixed != null) {
      // Pin the terminal to the chosen size and scale the font so those columns
      // fit the container; suppress the addon's deferred auto-fit (it would
      // override the pinned cols/rows). `applyFont` re-pins after the font.
      if (term is XtermTerminalView) {
        term.cancelAutoFit();
        term.resize(fixed.cols, fixed.rows);
        fitter.applyFont();
      }
      cols = fixed.cols;
      rows = fixed.rows;
    } else {
      // Auto-fit (resume): fit to the container *before* reading the size, so we
      // open at the real device geometry instead of xterm's 80×24 default. The
      // xterm view defers its first fit to later frames (the container isn't
      // laid out in the tick it's attached), so settle a frame and re-fit here.
      if (term is XtermTerminalView) {
        fitter.applyFont();
        await Future<void>.delayed(const Duration(milliseconds: 100));
        term.fit();
      }
      final size = term.size;
      cols = size.cols > 0 ? size.cols : 80;
      rows = size.rows > 0 ? size.rows : 24;
    }

    try {
      final session = await opener(cols, rows);
      // The screen can be disposed (navigated away) while the open is in flight;
      // don't wire a dead screen. Detach the just-opened session so it stays
      // resumable rather than leaking as an orphaned, still-listed session.
      if (_disposed) {
        unawaited(session.detach());
        return;
      }
      // Remember the session id for a reliable control-plane terminate (see
      // [_terminate]); it's set once the node confirms the session is open.
      _sessionId = session.id?.value;
      // Mark this the last-interacted session so it's highlighted and sorted to
      // the top when you return to the sessions list (covers a freshly created
      // session, whose short id the list only learns on its next refresh).
      if (_sessionId != null) ctx.lastSession.value = _sessionId;
      // Load the node descriptor in the background so local `:` commands
      // (`:info`, `:tree`, `:tunnel`, …) have node metadata; best-effort.
      unawaited(_loadNode());
      final client = ctx.service.client;
      final dialect = ShellDialect.forFamily(session.shellFamily);
      // Build the local-command set and register `:ai` (routes provider calls
      // through the Hub). Best-effort — failures register a setup stub instead.
      final commands = LocalCommandRegistry.withDefaults();
      await registerAiCommand(
        registry: commands,
        settings: ctx.settings,
        service: ctx.service,
        openSettings: () => showSettingsPanel(ctx),
      );
      if (_disposed) {
        unawaited(session.detach());
        return;
      }
      final shell = _shell = WebShellHost(
        term: term,
        session: session,
        principal: ctx.service.principal?.id.value ?? 'user',
        nodeId: nodeId,
        commands: commands,
        client: client,
        // TAB completion: run the shell's completion command on the node in the
        // session's cwd, mirroring the CLI's connect loop.
        onComplete: (word, isCommand, cwd) async {
          try {
            final res = await client
                .execute(
                  nodeId: nodeId,
                  command: dialect.completionCommand(
                    word,
                    isCommand: isCommand,
                  ),
                  cwd: cwd,
                  shellFamily: session.shellFamily,
                )
                .timeout(const Duration(seconds: 4));
            final candidates = res.stdoutText
                .split('\n')
                .map((s) => s.trimRight())
                .where((s) => s.isNotEmpty)
                .toList();
            return candidates.length > 200
                ? candidates.sublist(0, 200)
                : candidates;
          } on Object {
            return const <String>[]; // completion is best-effort
          }
        },
        nodeInfo: () => _node,
        principalInfo: ctx.service.principal,
        remoteSession: session is RemoteSession ? session : null,
        // Resuming into a full-screen program (nano, vim, claude, …): tell the
        // host to start in passthrough and skip prompt priming, so it doesn't
        // run cwd/marker commands that would corrupt the program's screen.
        resumedInAltScreen: session is RemoteSession
            ? session.resumedInAltScreen
            : false,
        // Per principal+node command history (Up/Down), persisted to
        // localStorage — the browser analogue of the CLI's history file.
        history: CommandHistory.load(
          kv: ctx.kv,
          key: '${ctx.service.principal?.id.value ?? 'user'}@$nodeId',
        ),
        onSessionExit: () => _leaveAfterLocalCommand(detached: false),
        onSessionDetached: () => _leaveAfterLocalCommand(detached: true),
      );
      // Register `:ide` once the host exists (it supplies the full-screen seam
      // and resize stream the IDE driver needs). The remote node is the IDE's
      // workspace, rendered into this terminal.
      registerIdeCommand(
        registry: commands,
        term: term,
        resizeEvents: shell.resizeEvents,
        service: ctx.service,
        settings: ctx.settings,
      );
      clearChildren(_status);
      // Mount the on-screen accessory key bar (Esc/Tab/Ctrl/arrows/…, copy/paste).
      mount(
        _accessory,
        TerminalAccessoryBar(
          keys: shell,
          term: term,
          clipboardRead: clipboardRead,
          clipboardWrite: clipboardWrite,
          onToast: ctx.toasts.show,
        ).element,
      );
      term.focus();
      // Watch everything that can change the terminal's geometry: window and
      // visual-viewport resizes (the soft keyboard moves the latter, not the
      // former), the host's own box, and the text-size preference. Subscribing to
      // `.stream` rather than `Observable.listen` avoids an immediate replay —
      // the font is already applied above.
      fitter.attach(textSizeChanges: ctx.display.textSize.stream);
      // A rotation in fullscreen leaves the terminal mis-sized and awkward, so
      // drop back to the normal layout when the orientation actually flips.
      final orientation = web.window.matchMedia('(orientation: portrait)');
      _detachOrientation = on(orientation, 'change', (_) {
        if (_fullscreen) _setFullscreen(false);
      });
      // The flex/dvh layout settles over a few frames after mount; re-fit across
      // them so xterm measures the final container height (rather than a stale
      // box that previously needed a manual reflow to correct).
      fitter.settle();
    } on Object catch (e) {
      term.dispose();
      _term = null;
      _showError(AppError.from(e));
    }
  }

  void _toggleFullscreen() => _setFullscreen(!_fullscreen);

  /// Expands the terminal to fill the whole window (hiding the app header and
  /// toolbar), or restores the normal layout. Driven by the `term-fullscreen`
  /// class on the root element so CSS can reach chrome outside this screen.
  void _setFullscreen(bool on) {
    _fullscreen = on;
    web.document.documentElement?.classList.toggle('term-fullscreen', on);
    _fsToggle.textContent = on ? '⤡ Exit' : '⤢ Fullscreen';
    _fsToggle.setAttribute(
      'aria-label',
      on ? 'Exit fullscreen' : 'Enter fullscreen',
    );
    _fitter?.settle();
  }

  void _showError(AppError error) {
    clearChildren(_status);
    clearChildren(_host);
    _host.appendChild(errorBanner(error));
  }

  Future<void> _detach() async {
    if (_finished) return;
    _finished = true;
    await _shell?.detach();
    ctx.toasts.success('Session detached — resume it from the list.');
    ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
  }

  Future<void> _terminate() async {
    if (_finished) return;
    _finished = true;
    // Terminate over the control plane (the same path the sessions list uses),
    // not the in-channel `close()`: a browser WebSocket can drop the ChannelClose
    // frame if the socket tears down before it flushes, so the node treats it as
    // a disconnect and *parks* (detaches) the session instead of killing it —
    // leaving it listed. A kill-by-id reliably terminates the running session.
    final id = _sessionId;
    var ok = true;
    var message = 'Session terminated.';
    try {
      if (id != null) {
        final r = await ctx.service.killSession(nodeId, id);
        ok = r.ok;
        if (r.message.isNotEmpty) message = r.message;
      } else {
        // No id (e.g. the session never finished opening): fall back to close().
        await _shell?.close();
      }
    } on Object catch (e) {
      ok = false;
      message = AppError.from(e).message;
    }
    // Stop driving the session locally; the node has (or is) terminating it.
    await _shell?.dispose();
    ok ? ctx.toasts.success(message) : ctx.toasts.error(message);
    ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
  }

  /// Fetches the node descriptor (best-effort) so local commands have metadata.
  Future<void> _loadNode() async {
    try {
      final nodes = await ctx.service.listNodes();
      for (final n in nodes) {
        if (n.id.value == nodeId) {
          _node = n;
          break;
        }
      }
    } on Object {
      // Local commands needing node metadata will report it as unavailable.
    }
  }

  /// Navigates back to the sessions list after a local `:exit`/`:detach` command
  /// already closed or parked the session (so we don't act on it again).
  void _leaveAfterLocalCommand({required bool detached}) {
    if (_finished) return;
    _finished = true;
    ctx.toasts.success(
      detached
          ? 'Session detached — resume it from the list.'
          : 'Session terminated.',
    );
    ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
  }

  @override
  void dispose() {
    _disposed = true;
    _fitter?.dispose();
    _fitter = null;
    _detachOrientation?.call();
    // Release the page scroll lock and any fullscreen state on the way out.
    web.document.documentElement?.classList.remove('terminal-active');
    if (_fullscreen) {
      web.document.documentElement?.classList.remove('term-fullscreen');
    }
    // Navigating away from a live session detaches it so it stays resumable.
    if (!_finished && _shell != null && !_shell!.ended) {
      _finished = true;
      unawaited(_shell!.detach());
    } else {
      unawaited(_shell?.dispose());
    }
    // Null the terminal so any late `_settle` timer/rAF callback that slips
    // through becomes a no-op rather than touching a disposed terminal.
    final term = _term;
    _term = null;
    term?.dispose();
  }
}
