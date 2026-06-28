import 'dart:async';
import 'dart:js_interop';

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
import '../../terminal/terminal_accessory.dart';
import '../../terminal/terminal_view.dart';
import '../../terminal/web_shell_host.dart';
import '../../terminal/xterm_terminal_view.dart';
import '../dom.dart';
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
  bool _finished = false;
  bool _fullscreen = false;
  void Function()? _detachResize;
  void Function()? _detachOrientation;
  void Function()? _detachViewport;
  web.ResizeObserver? _resizeObserver;
  bool _fitScheduled = false;

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
    final size = term.size;
    final cols = size.cols > 0 ? size.cols : 80;
    final rows = size.rows > 0 ? size.rows : 24;

    try {
      final session = await opener(cols, rows);
      // Load the node descriptor in the background so local `:` commands
      // (`:info`, `:tree`, `:tunnel`, …) have node metadata; best-effort.
      unawaited(_loadNode());
      final client = ctx.service.client;
      final dialect = ShellDialect.forFamily(session.shellFamily);
      final shell = _shell = WebShellHost(
        term: term,
        session: session,
        principal: ctx.service.principal?.id.value ?? 'user',
        nodeId: nodeId,
        commands: LocalCommandRegistry.withDefaults(),
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
        onSessionExit: () => _leaveAfterLocalCommand(detached: false),
        onSessionDetached: () => _leaveAfterLocalCommand(detached: true),
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
      _detachResize = on(web.window, 'resize', (_) => _scheduleFit());
      // The soft keyboard resizes the *visual* viewport (not window), so refit
      // on its changes too. boot.js does the CSS layout binding.
      final vv = web.window.visualViewport;
      if (vv != null) {
        _detachViewport = on(vv, 'resize', (_) => _scheduleFit());
      }
      // The robust trigger: refit whenever the terminal host actually changes
      // size (fullscreen toggle, keyboard, rotation, …). A ResizeObserver fires
      // *after* layout, so xterm measures the settled box — unlike the ad-hoc
      // fits that ran before the new layout applied on fullscreen exit.
      final ro = web.ResizeObserver(
        (
              JSArray<web.ResizeObserverEntry> entries,
              web.ResizeObserver observer,
            ) {
              _scheduleFit();
            }
            .toJS,
      );
      ro.observe(_host);
      _resizeObserver = ro;
      // A rotation in fullscreen leaves the terminal mis-sized and awkward, so
      // drop back to the normal layout when the orientation actually flips.
      final orientation = web.window.matchMedia('(orientation: portrait)');
      _detachOrientation = on(orientation, 'change', (_) {
        if (_fullscreen) _setFullscreen(false);
      });
    } on Object catch (e) {
      term.dispose();
      _term = null;
      _showError(AppError.from(e));
    }
  }

  /// Refits the xterm terminal to its container (after a window resize or a
  /// fullscreen toggle changes the available geometry).
  void _fit() {
    final t = _term;
    if (t is XtermTerminalView) t.fit();
  }

  /// Coalesces refit requests to once per frame and runs the fit in a
  /// `requestAnimationFrame` callback — after style/layout for any pending
  /// change (class toggle, keyboard inset, …) has been computed, so xterm
  /// measures the settled box rather than the previous one.
  void _scheduleFit() {
    if (_fitScheduled) return;
    _fitScheduled = true;
    web.window.requestAnimationFrame(
      (double _) {
        _fitScheduled = false;
        _fit();
      }.toJS,
    );
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
    _settleAfterToggle();
  }

  /// Re-fits the terminal and pins it to the bottom (latest output / prompt)
  /// after a fullscreen toggle.
  ///
  /// On mobile, toggling fullscreen also animates the browser chrome (URL/tool
  /// bars) in or out, and the viewport keeps changing size for a few hundred ms
  /// after the class flips. A single immediate fit would measure the pre-
  /// animation box and leave the terminal/key bar mis-sized, so we force a
  /// recompute now (next frame) and again after the chrome has settled.
  void _settleAfterToggle() {
    void apply() {
      _fit();
      _term?.scrollToBottom();
    }

    // Nudge a layout recompute, then refit on the next frame.
    _scheduleFit();
    web.window.requestAnimationFrame(((double _) => apply()).toJS);
    // Catch the post-animation viewport size (mobile chrome show/hide).
    for (final ms in const [120, 300, 500]) {
      Timer(Duration(milliseconds: ms), apply);
    }
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
    await _shell?.close();
    ctx.toasts.success('Session terminated.');
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
    _detachResize?.call();
    _detachOrientation?.call();
    _detachViewport?.call();
    _resizeObserver?.disconnect();
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
    _term?.dispose();
  }
}
