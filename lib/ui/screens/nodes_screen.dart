import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../state/async_state.dart';
import '../dom.dart';
import '../widgets.dart';

/// Lists the nodes visible to the authenticated principal, with loading, empty,
/// error and stale-cache states and a refresh action. Selecting a node opens
/// its detail screen.
class NodesScreen implements Screen {
  final AppContext ctx;

  @override
  late final web.HTMLElement element;

  late final web.HTMLElement _body;
  late final web.HTMLButtonElement _refresh;
  StreamSubscription<AsyncState<List<NodeDescriptor>>>? _sub;

  /// Builds the screen and kicks off a load.
  NodesScreen(this.ctx) {
    _body = div(classes: 'list');
    _refresh = button('Refresh', onClick: ctx.nodes.refresh);

    element = el(
      'div',
      classes: 'stack',
      children: [
        el(
          'div',
          classes: 'toolbar',
          children: [
            el('h1', text: 'Nodes'),
            el('div', classes: 'grow'),
            _refresh,
          ],
        ),
        _body,
      ],
    );

    _sub = ctx.nodes.state.stream.listen(_render);
    _render(ctx.nodes.state.value);
    unawaited(ctx.nodes.load());
  }

  void _render(AsyncState<List<NodeDescriptor>> state) {
    _refresh.disabled = state.isLoading;
    clearChildren(_body);

    final nodes = state.data;

    if (state.status == LoadStatus.error && (nodes == null || nodes.isEmpty)) {
      _body.appendChild(errorBanner(state.error!));
      _body.appendChild(button('Retry', onClick: ctx.nodes.refresh));
      return;
    }

    if (state.isLoading && (nodes == null || nodes.isEmpty)) {
      _body.appendChild(loadingRow('Loading nodes…'));
      return;
    }

    if (nodes == null || nodes.isEmpty) {
      _body.appendChild(emptyState('No nodes are registered with this Hub.'));
      return;
    }

    // A non-fatal refresh error over existing data: show a soft banner.
    if (state.status == LoadStatus.error) {
      _body.appendChild(
        el(
          'div',
          classes: 'banner warning',
          role: 'status',
          text:
              'Showing last results — refresh failed: ${state.error!.message}',
        ),
      );
    } else if (state.stale && state.isLoading) {
      _body.appendChild(loadingRow('Refreshing…'));
    }

    for (final node in nodes) {
      _body.appendChild(_nodeRow(node));
    }
  }

  web.HTMLElement _nodeRow(NodeDescriptor node) {
    final platform = '${node.platform.os}/${node.platform.arch}';
    return el(
      'button',
      classes: 'list-item',
      ariaLabel: 'Open node ${node.id.value}',
      onClick: (_) =>
          ctx.router.go('/nodes/${Uri.encodeComponent(node.id.value)}'),
      children: [
        el(
          'div',
          classes: 'grow',
          children: [
            el(
              'div',
              classes: 'title',
              text: node.displayName.isEmpty ? node.id.value : node.displayName,
            ),
            el(
              'div',
              classes: 'sub mono',
              text: '${node.id.value} · $platform',
            ),
          ],
        ),
        statusBadge(online: node.online),
      ],
    );
  }

  @override
  void dispose() => _sub?.cancel();
}
