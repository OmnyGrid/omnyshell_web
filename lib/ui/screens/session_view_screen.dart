import 'dart:async';

import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../core/app_error.dart';
import '../../terminal/remote_session_io.dart';
import '../../terminal/session_bridge.dart';
import '../../terminal/terminal_view.dart';
import '../../terminal/xterm_terminal_view.dart';
import '../dom.dart';
import '../widgets.dart';

/// The interactive terminal view: opens (or resumes) a shell session on a node
/// and wires it to an xterm.js terminal via a [SessionBridge].
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

  /// Opens the session and returns its I/O, given the terminal geometry.
  final Future<SessionIo> Function(int cols, int rows) opener;

  @override
  late final web.HTMLElement element;

  late final web.HTMLElement _host;
  late final web.HTMLElement _status;
  TerminalView? _term;
  SessionBridge? _bridge;
  bool _finished = false;
  void Function()? _detachResize;

  /// Builds the screen. Production callers omit [terminalFactory]/[opener].
  SessionViewScreen(
    this.ctx,
    this.nodeId,
    this.sessionRef, {
    TerminalView Function(web.HTMLElement host)? terminalFactory,
    Future<SessionIo> Function(int cols, int rows)? opener,
  }) : terminalFactory = terminalFactory ?? ((host) => XtermTerminalView(host)),
       opener = opener ?? _defaultOpener(ctx, nodeId, sessionRef) {
    _host = el(
      'div',
      classes: 'terminal-host',
      role: 'group',
      ariaLabel: 'Terminal',
    );
    _status = div(classes: 'row');

    element = el(
      'div',
      classes: 'stack',
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
            el(
              'h1',
              text: sessionRef == 'new' ? 'New shell' : 'Session $sessionRef',
            ),
            el('div', classes: 'grow'),
            _status,
            button('Detach', onClick: _detach),
            button('Terminate', className: 'danger', onClick: _terminate),
          ],
        ),
        el('div', classes: 'card terminal-card', children: [_host]),
      ],
    );

    _status.appendChild(loadingRow('Connecting…'));
    // Defer until mounted so the host has layout for the terminal fit.
    scheduleMicrotask(_start);
  }

  static Future<SessionIo> Function(int, int) _defaultOpener(
    AppContext ctx,
    String nodeId,
    String sessionRef,
  ) => (cols, rows) async {
    final session = sessionRef == 'new'
        ? await ctx.service.openShell(nodeId: nodeId, cols: cols, rows: rows)
        : await ctx.service.resumeSession(
            nodeId: nodeId,
            sessionRef: sessionRef,
            cols: cols,
            rows: rows,
          );
    return RemoteSessionIo(session);
  };

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
      final io = await opener(cols, rows);
      _bridge = SessionBridge(term, io);
      clearChildren(_status);
      term.focus();
      _detachResize = on(web.window, 'resize', (_) {
        if (_term is XtermTerminalView) (_term! as XtermTerminalView).fit();
      });
    } on Object catch (e) {
      term.dispose();
      _term = null;
      _showError(AppError.from(e));
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
    await _bridge?.detach();
    ctx.toasts.success('Session detached — resume it from the list.');
    ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
  }

  Future<void> _terminate() async {
    if (_finished) return;
    _finished = true;
    await _bridge?.close();
    ctx.toasts.success('Session terminated.');
    ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
  }

  @override
  void dispose() {
    _detachResize?.call();
    // Navigating away from a live session detaches it so it stays resumable.
    if (!_finished && _bridge != null && !_bridge!.ended) {
      _finished = true;
      unawaited(_bridge!.detach());
    } else {
      unawaited(_bridge?.dispose());
    }
    _term?.dispose();
  }
}
