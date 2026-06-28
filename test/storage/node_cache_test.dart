import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/node_cache.dart';
import 'package:test/test.dart';

import '../support/sample_data.dart';

void main() {
  late MemoryKeyValueStore kv;
  late NodeCache cache;

  setUp(() {
    kv = MemoryKeyValueStore();
    cache = NodeCache(kv);
  });

  test('read returns null when empty', () {
    expect(cache.read(), isNull);
  });

  test('round-trips a node list', () {
    cache.write([sampleNode('web-01'), sampleNode('db-02', online: false)]);
    final read = cache.read()!;
    expect(read.map((n) => n.id.value), ['web-01', 'db-02']);
    expect(read[0].platform.os, 'linux');
    expect(read[1].online, isFalse);
  });

  test('clear empties the cache', () {
    cache.write([sampleNode('web-01')]);
    cache.clear();
    expect(cache.read(), isNull);
  });

  test('malformed JSON yields null rather than throwing', () {
    kv.write('omnyshell.cache.nodes', '{not json');
    expect(cache.read(), isNull);
  });
}
