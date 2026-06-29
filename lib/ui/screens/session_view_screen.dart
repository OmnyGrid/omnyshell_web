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
import '../../terminal/command_history.dart';
import '../../terminal/terminal_accessory.dart';
import '../../terminal/terminal_dimensions.dart';
import '../../terminal/terminal_view.dart';
import '../../terminal/web_shell_host.dart';
import '../../terminal/xterm_terminal_view.dart';
import '../dom.dart';
import '../settings_panel.dart' show deviceMetrics;
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
  bool _fullscreen = false;
  void Function()? _detachResize;
  void Function()? _detachOrientation;
  void Function()? _detachViewport;
  web.ResizeObserver? _resizeObserver;
  bool _fitScheduled = false;
  Timer? _settleTimer;
  StreamSubscription<TerminalTextSize>? _textSizeSub;

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
    // Resolve the chosen dimensions only for a *fresh* shell: a resumed session
    // already has a fixed PTY size on the node that we can't change, so we let
    // the terminal fit normally and never pin it.
    _fixedDims = sessionRef == 'new'
        ? ctx.display.resolveDimensions(deviceMetrics())
        : null;

    final int cols;
    final int rows;
    final fixed = _fixedDims;
    if (fixed != null) {
      // Pin the terminal to the chosen size and scale the font so those columns
      // fit the container; suppress the addon's deferred auto-fit (it would
      // override the pinned cols/rows). `_applyFont` re-pins after the font.
      if (term is XtermTerminalView) {
        term.cancelAutoFit();
        term.resize(fixed.cols, fixed.rows);
        _applyFont();
      }
      cols = fixed.cols;
      rows = fixed.rows;
    } else {
      // Auto-fit: keep the original behavior, honoring a manual text size.
      if (term is XtermTerminalView) _applyFont();
      final size = term.size;
      cols = size.cols > 0 ? size.cols : 80;
      rows = size.rows > 0 ? size.rows : 24;
    }

    try {
      final session = await opener(cols, rows);
      // Remember the session id for a reliable control-plane terminate (see
      // [_terminate]); it's set once the node confirms the session is open.
      _sessionId = session.id?.value;
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
        // Per principal+node command history (Up/Down), persisted to
        // localStorage — the browser analogue of the CLI's history file.
        history: CommandHistory.load(
          kv: ctx.kv,
          key: '${ctx.service.principal?.id.value ?? 'user'}@$nodeId',
        ),
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
        _detachViewport = on(vv, 'resize', (_) => _scheduleSettle());
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
      // Re-apply the font live when the text-size preference changes (the
      // dimension preset only affects the *next* session, so it isn't watched).
      // Skip the immediate replay `listen` fires — the font is already applied.
      _textSizeSub = ctx.display.textSize.stream.listen((_) => _scheduleFit());
      // The flex/dvh layout settles over a few frames after mount; re-fit across
      // them so xterm measures the final container height (rather than a stale
      // box that previously needed a manual reflow to correct).
      _settle();
    } on Object catch (e) {
      term.dispose();
      _term = null;
      _showError(AppError.from(e));
    }
  }

  /// Refits the xterm terminal to its container (after a window resize or a
  /// fullscreen toggle changes the available geometry).
  void _fit() {
    _applyHostHeight();
    final t = _term;
    if (t is! XtermTerminalView) return;
    if (_fixedDims == null) {
      // Auto-fit: cols/rows track the container (the original behavior).
      t.fit();
    } else {
      // Fixed mode: rescale the font only — `_applyFont` re-pins the (unchanged)
      // size, a no-op in xterm, so no resize fires and the PTY stays constant.
      _applyFont();
    }
  }

  /// Applies the resolved terminal font size and scales the key bar to match.
  ///
  /// In fixed mode the baseline font is the largest that makes the whole chosen
  /// grid fit the container in *both* dimensions, so the terminal scales with the
  /// window (a fixed grid never reflows its cols/rows). In auto-fit mode the
  /// baseline is the terminal default (13). The text-size preference then adjusts
  /// that baseline.
  void _applyFont() {
    final t = _term;
    if (t is! XtermTerminalView) return;
    final fixed = _fixedDims;
    final base = fixed == null ? 13 : _fitFontPx(fixed.cols, fixed.rows);
    final px = switch (ctx.display.textSize.value) {
      TerminalTextSize.auto => base,
      TerminalTextSize.smaller => (base * 0.8).floor().clamp(
        kMinFontPx,
        kMaxFontPx,
      ),
      TerminalTextSize.normal => 13,
      TerminalTextSize.larger => (base * 1.25).ceil().clamp(
        kMinFontPx,
        kMaxFontPx,
      ),
    };
    t.setFontSize(px);
    _applyKeyScale(px);
    // Re-derive cols (auto-fit) or re-pin them (fixed) after the font change.
    if (fixed == null) {
      t.fit();
    } else {
      t.resize(fixed.cols, fixed.rows);
    }
  }

  /// The largest font (px) at which a [cols]×[rows] grid still fits the host in
  /// both width and height, clamped to the sane range. Falls back to the default
  /// before the host has a measurable size.
  int _fitFontPx(int cols, int rows) {
    // Width from the host (a block at width:100%, not inflated by content);
    // height from the viewport-available space (NOT the host's own height, which
    // the terminal canvas inflates — see [_availableHeight]).
    final width = _host.getBoundingClientRect().width;
    final height = _availableHeight();
    if (width <= 0 || height <= 0) return 13;
    final fitWidth = width / (cols * kCellWidthRatio);
    final fitHeight = height / (rows * kCellHeightRatio);
    final fit = fitWidth < fitHeight ? fitWidth : fitHeight;
    return fit.floor().clamp(kMinFontPx, kMaxFontPx);
  }

  /// Scales the on-screen key bar with the terminal font via a CSS variable so
  /// smaller text yields smaller keys (more keys visible on a phone).
  void _applyKeyScale(int px) {
    final scale = (px / 13).clamp(0.7, 1.6);
    element.style.setProperty('--term-key-scale', scale.toStringAsFixed(3));
  }

  /// Pins the terminal host to a *definite* pixel height equal to the space
  /// available between the chrome above it and the key bar below it.
  ///
  /// A definite height (not just a `min-height` floor) is essential: the xterm
  /// canvas can be taller than the viewport (e.g. right after exiting fullscreen)
  /// and, when the CSS `height: 100%` resolves to `auto`, that content height
  /// would win and a `min-height` could never pull the host back down — so the
  /// terminal grew with the window but never shrank. An explicit `height` is both
  /// a floor and a ceiling, so the host always tracks the available space.
  ///
  /// Skipped in fullscreen (the fixed container already fills the screen) and
  /// while the keyboard is open (the terminal is sized by the fixed layout); the
  /// inline height is removed so the CSS rules take over.
  void _applyHostHeight() {
    final kbOpen =
        web.document.documentElement?.classList.contains('keyboard-open') ??
        false;
    if (_fullscreen || kbOpen) {
      _host.style.removeProperty('height');
      return;
    }
    // Clear our prior height so the available-space measurement isn't skewed by
    // it, then pin the host to the measured available height.
    _host.style.removeProperty('height');
    final available = _availableHeight();
    if (available > 0) {
      _host.style.height = '${available.round()}px';
    }
  }

  /// The height available to the terminal: the viewport minus the chrome above
  /// the host and the key bar (plus its gap) reserved below it.
  ///
  /// Derived from the host's *top* offset (stable) and the bar's box — never the
  /// host's own height — so it can't feed back on the terminal's current,
  /// content-inflated height. That feedback is what previously let a fixed-grid
  /// terminal grow but never shrink (e.g. after exiting fullscreen).
  double _availableHeight() {
    final viewport =
        web.window.visualViewport?.height ?? web.window.innerHeight.toDouble();
    final hostRect = _host.getBoundingClientRect();
    final barRect = _accessory.getBoundingClientRect();
    final gapBelow = barRect.top - hostRect.bottom;
    final reserveBelow = barRect.height + (gapBelow > 0 ? gapBelow : 0);
    return viewport - hostRect.top - reserveBelow;
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

  /// Refits now (next frame) and once more after the viewport stops changing.
  /// The keyboard open/close animates the visual viewport over many events; the
  /// trailing timer (reset on each call) fires only after it settles, so the
  /// final fit measures the correct height (e.g. restoring it when the keyboard
  /// closes in normal mode).
  void _scheduleSettle() {
    _scheduleFit();
    _settleTimer?.cancel();
    _settleTimer = Timer(const Duration(milliseconds: 200), _fit);
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
    _settle();
  }

  /// Re-fits the terminal across several frames and pins it to the bottom
  /// (latest output / prompt). Used after a fullscreen toggle and once after the
  /// initial mount.
  ///
  /// The flex + `dvh` layout — and, on mobile, the browser chrome animating in
  /// or out of fullscreen — settles over a few hundred ms, so a single immediate
  /// fit measures a stale box and leaves the terminal mis-sized (the height bug
  /// that otherwise only a manual reflow fixed). Forcing a recompute now and
  /// again after the layout settles makes xterm measure the final container.
  void _settle() {
    void apply() {
      _fit();
      // A layout change (fullscreen exit, late flex/dvh settle) can leave the
      // xterm canvas stale, so force a redraw of the visible rows in normal mode.
      if (!_fullscreen) {
        final t = _term;
        if (t is XtermTerminalView) t.refresh();
      }
      _term?.scrollToBottom();
    }

    // Nudge a layout recompute, then refit on the next frame.
    _scheduleFit();
    web.window.requestAnimationFrame(((double _) => apply()).toJS);
    // Catch the post-animation / post-settle box size.
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
    _detachResize?.call();
    _detachOrientation?.call();
    _detachViewport?.call();
    _resizeObserver?.disconnect();
    _settleTimer?.cancel();
    _textSizeSub?.cancel();
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
