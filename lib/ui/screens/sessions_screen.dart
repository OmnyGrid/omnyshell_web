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
  StreamSubscription<String?>? _lastSub;

  /// Builds the sessions screen for [nodeId].
  SessionsScreen(this.ctx, this.nodeId) {
    _controller = SessionsController(ctx.service, nodeId);
    _body = div(classes: 'list');
    _refresh = button(
      'Refresh',
      className: 'btn-sm',
      onClick: _controller.refresh,
    );

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
            el('h1', text: 'Sessions', classes: 'sessions-title'),
            el('div', classes: 'grow'),
            button(
              'New',
              primary: true,
              className: 'btn-sm',
              onClick: () => ctx.router.go(
                '/nodes/${Uri.encodeComponent(nodeId)}/sessions/new',
              ),
            ),
            _refresh,
          ],
        ),
        // The node id, shown big and white like the node-info title.
        el('h1', classes: 'mono node-title', text: nodeId),
        _body,
      ],
    );

    _sub = _controller.state.stream.listen(_render);
    // Re-render when the highlighted (last-interacted) session changes.
    _lastSub = ctx.lastSession.stream.listen(
      (_) => _render(_controller.state.value),
    );
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
    for (final s in _ordered(sessions)) {
      _body.appendChild(_sessionRow(s));
    }
  }

  /// Whether [s] is the last-interacted session. Matches on either the short id
  /// (set from the list/preview) or the full session id (set when a session is
  /// opened in the terminal view, before the list knows its short id).
  bool _isLast(DetachedSessionInfo s) {
    final last = ctx.lastSession.value;
    return last != null && (s.shortId == last || s.sessionId == last);
  }

  /// Orders sessions for display: the highlighted (last-interacted) session
  /// first, then those running a program, then detached before attached, and
  /// newer before older.
  List<DetachedSessionInfo> _ordered(List<DetachedSessionInfo> sessions) {
    bool running(DetachedSessionInfo s) =>
        s.currentCommand != null && s.currentCommand!.isNotEmpty;
    return [...sessions]..sort((a, b) {
      final ah = _isLast(a), bh = _isLast(b);
      if (ah != bh) return ah ? -1 : 1;
      final ar = running(a), br = running(b);
      if (ar != br) return ar ? -1 : 1;
      final ad = a.state == SessionState.detached;
      final bd = b.state == SessionState.detached;
      if (ad != bd) return ad ? -1 : 1;
      return b.createdAt.compareTo(a.createdAt); // newer first
    });
  }

  web.HTMLElement _sessionRow(DetachedSessionInfo s) {
    final now = DateTime.now();
    final command = s.currentCommand;
    final hasCommand = command != null && command.isNotEmpty;

    // The running program is shown as a badge (below); the detail line carries
    // the remaining context.
    final detail = StringBuffer(
      '${s.mode.name} · created ${relativeTime(s.createdAt, now)}',
    );
    if (s.currentCwd != null && s.currentCwd!.isNotEmpty) {
      detail.write(' · ${s.currentCwd}');
    }
    if (s.expiresAt != null) {
      detail.write(' · expires ${untilExpiry(s.expiresAt!, now)}');
    }

    final isDetached = s.state == SessionState.detached;
    final highlighted = _isLast(s);
    return el(
      'div',
      classes: highlighted
          ? 'list-item session-item highlight'
          : 'list-item session-item',
      attrs: {'style': 'cursor:default'},
      children: [
        el(
          'div',
          classes: 'grow',
          children: [
            el(
              'div',
              classes: 'row wrap',
              children: [
                el('span', classes: 'title mono', text: s.shortId),
                el('span', classes: 'badge', text: s.state.name),
                // The running program, beside the attached/detached badge.
                if (hasCommand)
                  el('span', classes: 'badge cmd mono', text: command),
              ],
            ),
            el('div', classes: 'sub', text: detail.toString()),
          ],
        ),
        el(
          'div',
          classes: 'row session-actions',
          children: [
            // Resume attaches to a parked session; only meaningful when detached.
            if (isDetached)
              button('Resume', primary: true, onClick: () => _resume(s)),
            button('Peek', onClick: () => _peek(s)),
            if (!isDetached) button('Detach', onClick: () => _detach(s)),
            button('Kill', className: 'danger', onClick: () => _confirmKill(s)),
          ],
        ),
      ],
    );
  }

  void _resume(DetachedSessionInfo s) {
    ctx.lastSession.value = s.shortId;
    ctx.router.go(
      '/nodes/${Uri.encodeComponent(nodeId)}/sessions/${Uri.encodeComponent(s.shortId)}',
    );
  }

  Future<void> _peek(DetachedSessionInfo s) async {
    ctx.lastSession.value = s.shortId;
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
    ctx.lastSession.value = s.shortId;
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
  void dispose() {
    _sub?.cancel();
    _lastSub?.cancel();
  }
}
