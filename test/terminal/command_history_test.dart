@TestOn('vm')
library;

import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/terminal/command_history.dart';
import 'package:test/test.dart';

void main() {
  group('CommandHistory persistence', () {
    test('persists and reloads entries for a key', () {
      final kv = MemoryKeyValueStore();
      CommandHistory.load(kv: kv, key: 'alice@web-01')
        ..add('ls')
        ..add('cd /tmp');

      final reloaded = CommandHistory.load(kv: kv, key: 'alice@web-01');
      expect(reloaded.entries, ['ls', 'cd /tmp']);
    });

    test('skips blank lines and consecutive duplicates', () {
      final kv = MemoryKeyValueStore();
      CommandHistory.load(kv: kv, key: 'k')
        ..add('ls')
        ..add('ls') // consecutive duplicate
        ..add('  ') // blank
        ..add('pwd');

      expect(CommandHistory.load(kv: kv, key: 'k').entries, ['ls', 'pwd']);
    });

    test('keys are isolated per principal+node', () {
      final kv = MemoryKeyValueStore();
      CommandHistory.load(kv: kv, key: 'alice@web-01').add('secret');
      expect(CommandHistory.load(kv: kv, key: 'bob@web-01').entries, isEmpty);
    });

    test('trims to the max-entry cap, keeping the newest', () {
      final kv = MemoryKeyValueStore();
      final h = CommandHistory.load(kv: kv, key: 'k', maxEntries: 2);
      h
        ..add('a')
        ..add('b')
        ..add('c');
      expect(h.entries, ['b', 'c']);
      expect(
        CommandHistory.load(kv: kv, key: 'k', maxEntries: 2).entries,
        ['b', 'c'],
      );
    });

    test('namespaces storage keys distinctly from settings', () {
      final kv = MemoryKeyValueStore();
      CommandHistory.load(kv: kv, key: 'alice@web-01').add('ls');
      expect(
        kv.snapshot.keys,
        contains('${CommandHistory.storagePrefix}alice@web-01'),
      );
    });
  });

  group('CommandHistory navigation cursor', () {
    test('Up walks back, Down walks forward and restores the draft', () {
      final h = CommandHistory.inMemory(entries: ['one', 'two', 'three']);
      final cursor = h.cursor();

      expect(cursor.up(line: 'dr', prefix: ''), 'three');
      expect(cursor.up(line: 'dr', prefix: ''), 'two');
      expect(cursor.down(), 'three');
      expect(cursor.down(), 'dr'); // back to the stashed in-progress line
    });

    test('prefix restricts the entries Up visits', () {
      final h = CommandHistory.inMemory(entries: ['git status', 'ls', 'git log']);
      final cursor = h.cursor();
      expect(cursor.up(line: 'git', prefix: 'git'), 'git log');
      expect(cursor.up(line: 'git', prefix: 'git'), 'git status');
    });
  });
}
