import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../state/async_state.dart';
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

  /// Builds the screen for [nodeId].
  NodeDetailScreen(this.ctx, this.nodeId) {
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
            el('h1', text: nodeId),
          ],
        ),
        _body,
      ],
    );

    _sub = ctx.nodes.state.stream.listen((_) => _render());
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
    _body.appendChild(_capabilitiesCard(node.capabilities));
    _body.appendChild(
      el(
        'div',
        classes: 'row',
        children: [
          button(
            'Sessions',
            primary: true,
            onClick: () =>
                ctx.router.go('/nodes/${Uri.encodeComponent(nodeId)}/sessions'),
          ),
          button(
            'New shell',
            onClick: () => ctx.router.go(
              '/nodes/${Uri.encodeComponent(nodeId)}/sessions/new',
            ),
          ),
        ],
      ),
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
  void dispose() => _sub?.cancel();
}
