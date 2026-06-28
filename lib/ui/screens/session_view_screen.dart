import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart' show ShellSessionPort;
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
  TerminalView? _term;
  WebShellHost? _shell;
  bool _finished = false;
  void Function()? _detachResize;

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
        _accessory,
      ],
    );

    _status.appendChild(loadingRow('Connecting…'));
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
      final shell = _shell = WebShellHost(
        term: term,
        session: session,
        principal: ctx.service.principal?.id.value ?? 'user',
        nodeId: nodeId,
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

  @override
  void dispose() {
    _detachResize?.call();
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
