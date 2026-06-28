import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../core/time_format.dart';
import '../../state/async_state.dart';
import '../../state/sessions_controller.dart';
import '../dom.dart';
import '../modal.dart';
import '../widgets.dart';

/// Lists the caller's sessions on a node and exposes per-session actions:
/// resume (opens the terminal), peek (screen snapshot), detach, and kill.
class SessionsScreen implements Screen {
  final AppContext ctx;

  /// The node id from the route.
  final String nodeId;

  late final SessionsController _controller;

  @override
  late final web.HTMLElement element;

  late final web.HTMLElement _body;
  late final web.HTMLButtonElement _refresh;
  StreamSubscription<AsyncState<List<DetachedSessionInfo>>>? _sub;

  /// Builds the sessions screen for [nodeId].
  SessionsScreen(this.ctx, this.nodeId) {
    _controller = SessionsController(ctx.service, nodeId);
    _body = div(classes: 'list');
    _refresh = button('Refresh', onClick: _controller.refresh);

    element = el(
      'div',
      classes: 'stack',
      children: [
        el(
          'div',
          classes: 'toolbar',
          children: [
            button(
              '← Node',
              className: 'ghost',
              onClick: () =>
                  ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}'),
            ),
            el('h1', text: 'Sessions'),
            el('div', classes: 'grow'),
            button(
              'New Session',
              primary: true,
              onClick: () => ctx.router.go(
                '/nodes/${Uri.encodeComponent(nodeId)}/sessions/new',
              ),
            ),
            _refresh,
          ],
        ),
        el('p', classes: 'muted mono', text: nodeId),
        _body,
      ],
    );

    _sub = _controller.state.stream.listen(_render);
    _render(_controller.state.value);
    unawaited(_controller.refresh());
  }

  void _render(AsyncState<List<DetachedSessionInfo>> state) {
    _refresh.disabled = state.isLoading;
    clearChildren(_body);
    final sessions = state.data;

    if (state.status == LoadStatus.error &&
        (sessions == null || sessions.isEmpty)) {
      _body.appendChild(errorBanner(state.error!));
      _body.appendChild(button('Retry', onClick: _controller.refresh));
      return;
    }
    if (state.isLoading && (sessions == null || sessions.isEmpty)) {
      _body.appendChild(loadingRow('Loading sessions…'));
      return;
    }
    if (sessions == null || sessions.isEmpty) {
      _body.appendChild(emptyState('No sessions on this node.'));
      return;
    }
    for (final s in sessions) {
      _body.appendChild(_sessionRow(s));
    }
  }

  web.HTMLElement _sessionRow(DetachedSessionInfo s) {
    final now = DateTime.now();
    final detail = StringBuffer(
      '${s.mode.name} · created ${relativeTime(s.createdAt, now)}',
    );
    if (s.currentCommand != null && s.currentCommand!.isNotEmpty) {
      detail.write(' · ${s.currentCommand}');
    }
    if (s.currentCwd != null && s.currentCwd!.isNotEmpty) {
      detail.write(' · ${s.currentCwd}');
    }
    if (s.expiresAt != null) {
      detail.write(' · expires ${untilExpiry(s.expiresAt!, now)}');
    }

    final isDetached = s.state == SessionState.detached;
    return el(
      'div',
      classes: 'list-item',
      attrs: {'style': 'cursor:default'},
      children: [
        el(
          'div',
          classes: 'grow',
          children: [
            el(
              'div',
              classes: 'row',
              children: [
                el('span', classes: 'title mono', text: s.shortId),
                el('span', classes: 'badge', text: s.state.name),
              ],
            ),
            el('div', classes: 'sub', text: detail.toString()),
          ],
        ),
        el(
          'div',
          classes: 'row wrap',
          children: [
            button('Resume', primary: true, onClick: () => _resume(s)),
            button('Peek', onClick: () => _peek(s)),
            if (!isDetached) button('Detach', onClick: () => _detach(s)),
            button('Kill', className: 'danger', onClick: () => _confirmKill(s)),
          ],
        ),
      ],
    );
  }

  void _resume(DetachedSessionInfo s) => ctx.router.go(
    '/nodes/${Uri.encodeComponent(nodeId)}/sessions/${Uri.encodeComponent(s.shortId)}',
  );

  Future<void> _peek(DetachedSessionInfo s) async {
    final result = await _controller.peek(s.shortId);
    if (!result.ok) {
      ctx.toasts.error('Peek failed: ${result.message}');
      return;
    }
    final pre = el('pre', classes: 'screen-capture')
      ..textContent = result.text.isEmpty ? '(blank screen)' : result.text;
    Modal(
      title: 'Session ${s.shortId}${result.altScreen ? ' (full-screen)' : ''}',
      body: pre,
    ).show();
  }

  Future<void> _detach(DetachedSessionInfo s) async {
    final r = await _controller.detach(s.shortId);
    r.ok ? ctx.toasts.success(r.message) : ctx.toasts.error(r.message);
  }

  void _confirmKill(DetachedSessionInfo s) {
    late final Modal modal;
    modal = Modal(
      title: 'Terminate session ${s.shortId}?',
      body: el(
        'p',
        text:
            'This ends the session and any process it is running. This cannot '
            'be undone.',
      ),
      actions: [
        button('Cancel', onClick: () => modal.close()),
        button(
          'Terminate',
          className: 'danger',
          onClick: () async {
            modal.close();
            final r = await _controller.kill(s.shortId);
            r.ok ? ctx.toasts.success(r.message) : ctx.toasts.error(r.message);
          },
        ),
      ],
    );
    modal.show();
  }

  @override
  void dispose() => _sub?.cancel();
}
