import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../core/time_format.dart';
import '../../state/async_state.dart';
import '../../state/sessions_controller.dart';
import '../dom.dart';
import '../widgets.dart';

/// Shows the details of a single node: identity, platform, labels and advertised
/// capabilities. Resolves the node from the [NodesController]; if it isn't loaded
/// yet (e.g. a deep link / hard refresh) it triggers a load and shows progress.
class NodeDetailScreen implements Screen {
  final AppContext ctx;

  /// The node id from the route.
  final String nodeId;

  @override
  late final web.HTMLElement element;

  late final web.HTMLElement _body;
  StreamSubscription<AsyncState<List<NodeDescriptor>>>? _sub;

  /// Loads the node's sessions for the preview card (full management lives on
  /// the sessions screen).
  late final SessionsController _sessions;
  StreamSubscription<AsyncState<List<DetachedSessionInfo>>>? _sessionsSub;

  /// The current sessions-card body to fill, or `null` while the node is
  /// unresolved (no card rendered yet).
  web.HTMLElement? _sessionsBody;

  /// Builds the screen for [nodeId].
  NodeDetailScreen(this.ctx, this.nodeId) {
    // Created before the first _render(), which builds the sessions card.
    _sessions = SessionsController(ctx.service, nodeId);
    _body = div(classes: 'stack');
    element = el(
      'div',
      classes: 'stack',
      children: [
        el(
          'div',
          classes: 'toolbar',
          children: [
            button(
              '← Nodes',
              className: 'ghost',
              onClick: () => ctx.router.go('/nodes'),
            ),
            el('h1', text: nodeId, classes: 'grow node-title'),
            button(
              'New shell',
              primary: true,
              onClick: () => ctx.router.go(
                '/nodes/${Uri.encodeComponent(nodeId)}/sessions/new',
              ),
            ),
          ],
        ),
        _body,
      ],
    );

    _sub = ctx.nodes.state.stream.listen((_) => _render());
    _sessionsSub = _sessions.state.stream.listen(_renderSessions);
    // Kick off the session load first so the initial render shows its spinner
    // (refresh() sets the loading state synchronously before awaiting).
    unawaited(_sessions.refresh());
    _render();
    if (ctx.nodes.byId(nodeId) == null) {
      unawaited(ctx.nodes.load());
    }
  }

  void _render() {
    clearChildren(_body);
    final node = ctx.nodes.byId(nodeId);
    final state = ctx.nodes.state.value;

    if (node == null) {
      if (state.isLoading) {
        _body.appendChild(loadingRow('Loading node…'));
      } else if (state.status == LoadStatus.error) {
        _body.appendChild(errorBanner(state.error!));
      } else {
        _body.appendChild(
          emptyState('Node "$nodeId" was not found on this Hub.'),
        );
        _body.appendChild(
          button(
            'Back to nodes',
            primary: true,
            onClick: () => ctx.router.go('/nodes'),
          ),
        );
      }
      return;
    }

    _body.appendChild(_overviewCard(node));
    _body.appendChild(_sessionsCard());
    _body.appendChild(_capabilitiesCard(node.capabilities));
  }

  /// A preview card summarizing the node's current sessions, filled by
  /// [_renderSessions] from the [SessionsController] state.
  web.HTMLElement _sessionsCard() {
    final body = div(classes: 'stack');
    _sessionsBody = body;
    _renderSessions(_sessions.state.value);
    return el(
      'div',
      classes: 'card',
      children: [
        el(
          'div',
          classes: 'row',
          children: [
            el('h2', text: 'Sessions', classes: 'grow'),
            button(
              'View all',
              onClick: () => ctx.router.go(
                '/nodes/${Uri.encodeComponent(nodeId)}/sessions',
              ),
            ),
          ],
        ),
        body,
      ],
    );
  }

  void _renderSessions(AsyncState<List<DetachedSessionInfo>> state) {
    final body = _sessionsBody;
    if (body == null) return; // no node resolved yet, so no card to fill
    clearChildren(body);
    final sessions = state.data;

    if (sessions == null || sessions.isEmpty) {
      if (state.isLoading) {
        body.appendChild(loadingRow('Loading sessions…'));
      } else if (state.status == LoadStatus.error) {
        body.appendChild(
          el('p', classes: 'muted', text: 'Couldn’t load sessions.'),
        );
      } else {
        body.appendChild(
          el('p', classes: 'muted', text: 'No active sessions.'),
        );
      }
      return;
    }

    body.appendChild(
      el(
        'p',
        classes: 'muted',
        text:
            '${sessions.length} session${sessions.length == 1 ? '' : 's'}'
            '${state.isLoading ? ' · refreshing…' : ''}',
      ),
    );
    const preview = 5;
    final list = div(classes: 'list');
    for (final s in sessions.take(preview)) {
      list.appendChild(_sessionSummary(s));
    }
    body.appendChild(list);
    if (sessions.length > preview) {
      body.appendChild(
        el('p', classes: 'muted', text: '+${sessions.length - preview} more'),
      );
    }
  }

  /// A compact, read-only one-line summary of a session for the preview card.
  web.HTMLElement _sessionSummary(DetachedSessionInfo s) {
    final now = DateTime.now();
    final detail = StringBuffer(
      '${s.mode.name} · created ${relativeTime(s.createdAt, now)}',
    );
    if (s.currentCommand != null && s.currentCommand!.isNotEmpty) {
      detail.write(' · ${s.currentCommand}');
    }
    return el(
      'div',
      classes: 'list-item clickable',
      role: 'button',
      // Mark this the last-interacted session and open the full sessions list,
      // where it is highlighted.
      onClick: (_) {
        ctx.lastSession.value = s.shortId;
        ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions');
      },
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
      ],
    );
  }

  web.HTMLElement _overviewCard(NodeDescriptor node) {
    final p = node.platform;
    final rows = <web.Node>[
      _kv('Status', null, badge: statusBadge(online: node.online)),
      _kv('Node id', node.id.value),
      if (node.uid != null) _kv('UID', node.uid!.value),
      _kv('Display name', node.displayName.isEmpty ? '—' : node.displayName),
      _kv('Platform', '${p.os} / ${p.arch}'),
      _kv('Hostname', p.hostname),
      _kv('Agent', p.agentVersion),
    ];
    if (node.labels.isNotEmpty) {
      rows.add(
        _kv(
          'Labels',
          node.labels.entries.map((e) => '${e.key}=${e.value}').join(', '),
        ),
      );
    }
    return el(
      'div',
      classes: 'card',
      children: [
        el('h2', text: 'Overview'),
        el('dl', classes: 'kv', children: rows),
      ],
    );
  }

  web.HTMLElement _capabilitiesCard(NodeCapabilities? caps) {
    if (caps == null) {
      return el(
        'div',
        classes: 'card',
        children: [
          el('h2', text: 'Capabilities'),
          el(
            'p',
            classes: 'muted',
            text: 'This node did not advertise capabilities.',
          ),
        ],
      );
    }
    return el(
      'div',
      classes: 'card',
      children: [
        el('h2', text: 'Capabilities'),
        el(
          'dl',
          classes: 'kv',
          children: [
            _kv('Shells', caps.shells.isEmpty ? '—' : caps.shells.join(', ')),
            _kv(
              'Features',
              caps.features.isEmpty ? '—' : caps.features.join(', '),
            ),
            _kv('Max sessions', '${caps.maxSessions}'),
            _kv('Direct endpoint', caps.directEndpoint ?? 'Hub tunnel only'),
          ],
        ),
      ],
    );
  }

  /// A `dt`/`dd` pair as a fragment, so they flatten into the parent `<dl>` grid.
  web.DocumentFragment _kv(
    String key,
    String? value, {
    web.HTMLElement? badge,
  }) {
    final frag = web.DocumentFragment();
    frag.appendChild(el('dt', text: key));
    final dd = el('dd');
    if (badge != null) {
      dd.appendChild(badge);
    } else {
      dd.textContent = value ?? '—';
    }
    frag.appendChild(dd);
    return frag;
  }

  @override
  void dispose() {
    _sub?.cancel();
    _sessionsSub?.cancel();
  }
}
