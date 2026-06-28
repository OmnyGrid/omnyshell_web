import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/state/async_state.dart';
import 'package:omnyshell_web/state/nodes_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/node_cache.dart';
import 'package:test/test.dart';

import '../support/fake_hub.dart';
import '../support/sample_data.dart';

void main() {
  late MemoryKeyValueStore kv;
  late NodeCache cache;

  setUp(() {
    kv = MemoryKeyValueStore();
    cache = NodeCache(kv);
  });

  Future<(OmnyShellService, NodesController)> connected(FakeHub hub) async {
    final service = OmnyShellService(connectionFactory: hub.factory);
    await service.connect(hubUri: 'h', principal: 'a', token: 'good');
    return (service, NodesController(service, cache));
  }

  test('load fetches nodes and marks ready', () async {
    final hub = FakeHub(validToken: 'good', nodes: [sampleNode('web-01')]);
    final (_, nodes) = await connected(hub);
    await nodes.load();
    expect(nodes.state.value.status, LoadStatus.ready);
    expect(nodes.state.value.data!.single.id.value, 'web-01');
  });

  test('load writes the cache for instant restore', () async {
    final hub = FakeHub(validToken: 'good', nodes: [sampleNode('web-01')]);
    final (_, nodes) = await connected(hub);
    await nodes.load();
    expect(cache.read()!.single.id.value, 'web-01');
  });

  test('a primed cache paints stale before refresh completes', () async {
    cache.write([sampleNode('cached-01')]);
    final hub = FakeHub(validToken: 'good', nodes: [sampleNode('fresh-01')]);
    final (_, nodes) = await connected(hub);

    final seen = <AsyncState<dynamic>>[];
    nodes.state.stream.listen(seen.add);

    final future = nodes.load();
    // First emission should be the stale cached data under a loading status.
    expect(nodes.state.value.isLoading, isTrue);
    expect(nodes.state.value.data!.single.id.value, 'cached-01');
    expect(nodes.state.value.stale, isTrue);

    await future;
    expect(nodes.state.value.status, LoadStatus.ready);
    expect(nodes.state.value.data!.single.id.value, 'fresh-01');
  });

  test('refresh error retains prior data', () async {
    final hub = FakeHub(validToken: 'good', nodes: [sampleNode('web-01')]);
    final (service, nodes) = await connected(hub);
    await nodes.load();
    expect(nodes.state.value.status, LoadStatus.ready);

    // Disconnect so the next listNodes throws.
    await service.disconnect();
    await nodes.refresh();
    expect(nodes.state.value.status, LoadStatus.error);
    expect(nodes.state.value.data!.single.id.value, 'web-01'); // retained
  });

  test('byId resolves a loaded node', () async {
    final hub = FakeHub(
      validToken: 'good',
      nodes: [sampleNode('web-01'), sampleNode('db-02')],
    );
    final (_, nodes) = await connected(hub);
    await nodes.load();
    expect(nodes.byId('db-02')!.id.value, 'db-02');
    expect(nodes.byId('nope'), isNull);
  });

  test('reset clears cache and returns to idle', () async {
    final hub = FakeHub(validToken: 'good', nodes: [sampleNode('web-01')]);
    final (_, nodes) = await connected(hub);
    await nodes.load();
    nodes.reset();
    expect(nodes.state.value.status, LoadStatus.idle);
    expect(cache.read(), isNull);
  });
}
