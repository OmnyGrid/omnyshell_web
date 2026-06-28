@TestOn('browser')
library;

import 'package:omnyshell_web/state/async_state.dart';
import 'package:omnyshell_web/ui/dom.dart';
import 'package:omnyshell_web/ui/screens/node_detail_screen.dart';
import 'package:omnyshell_web/ui/screens/nodes_screen.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';
import '../support/sample_data.dart';

void main() {
  setUp(() => web.window.location.hash = '');

  Future<void> pump([int ms = 20]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  Future<DomHarness> connectedHarness({FakeHub? hub}) async {
    final h = DomHarness(hub: hub ?? FakeHub(validToken: 'good'));
    await h.ctx.auth.login(
      hub: 'h',
      principal: 'a',
      token: 'good',
      remember: false,
    );
    return h;
  }

  group('NodesScreen', () {
    test('renders a row per node with status', () async {
      final hub = FakeHub(
        validToken: 'good',
        nodes: [sampleNode('web-01'), sampleNode('db-02', online: false)],
      );
      final h = await connectedHarness(hub: hub);
      final screen = NodesScreen(h.ctx);
      mount(h.container, screen.element);
      await pump();

      final rows = h.container.querySelectorAll('.list-item');
      expect(rows.length, 2);
      expect(h.container.textContent, contains('web-01'));
      expect(h.container.querySelector('.badge.offline'), isNotNull);

      screen.dispose();
      h.dispose();
    });

    test('shows the empty state when there are no nodes', () async {
      final h = await connectedHarness();
      final screen = NodesScreen(h.ctx);
      mount(h.container, screen.element);
      await pump();
      expect(h.container.textContent, contains('No nodes'));
      screen.dispose();
      h.dispose();
    });

    test('clicking a node navigates to its detail route', () async {
      final hub = FakeHub(validToken: 'good', nodes: [sampleNode('web-01')]);
      final h = await connectedHarness(hub: hub);
      h.ctx.router.start();
      final screen = NodesScreen(h.ctx);
      mount(h.container, screen.element);
      await pump();

      (query(h.container, '.list-item')).click();
      await pump();
      expect(h.ctx.router.current.value.params['id'], 'web-01');

      h.ctx.router.stop();
      screen.dispose();
      h.dispose();
    });

    test('refresh error with no data shows a banner and retry', () async {
      final h = await connectedHarness();
      // Force the next load to fail.
      await h.ctx.service.disconnect();
      final screen = NodesScreen(h.ctx);
      mount(h.container, screen.element);
      await pump();
      expect(h.ctx.nodes.state.value.status, LoadStatus.error);
      expect(h.container.querySelector('.banner.error'), isNotNull);
      expect(h.container.textContent, contains('Retry'));
      screen.dispose();
      h.dispose();
    });
  });

  group('NodeDetailScreen', () {
    test('renders identity, platform and capabilities', () async {
      final node = sampleNode('web-01', labels: {'env': 'prod'});
      final hub = FakeHub(validToken: 'good', nodes: [node]);
      final h = await connectedHarness(hub: hub);
      await h.ctx.nodes.load();

      final screen = NodeDetailScreen(h.ctx, 'web-01');
      mount(h.container, screen.element);
      await pump();

      expect(h.container.textContent, contains('Overview'));
      expect(h.container.textContent, contains('linux / x64'));
      expect(h.container.textContent, contains('env=prod'));
      expect(h.container.textContent, contains('Capabilities'));
      expect(h.container.querySelector('.badge'), isNotNull);

      screen.dispose();
      h.dispose();
    });

    test('unknown node after load shows a not-found state', () async {
      final h = await connectedHarness();
      await h.ctx.nodes.load();
      final screen = NodeDetailScreen(h.ctx, 'ghost');
      mount(h.container, screen.element);
      await pump();
      expect(h.container.textContent, contains('was not found'));
      screen.dispose();
      h.dispose();
    });
  });
}
