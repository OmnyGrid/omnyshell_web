import 'package:web/web.dart' as web;

import 'key_value_store.dart';

/// A [KeyValueStore] backed by the browser's `window.localStorage`.
class LocalStorageStore implements KeyValueStore {
  final web.Storage _storage;

  /// Creates a store over [storage] (defaults to `window.localStorage`).
  LocalStorageStore([web.Storage? storage])
    : _storage = storage ?? web.window.localStorage;

  @override
  String? read(String key) => _storage.getItem(key);

  @override
  void write(String key, String value) => _storage.setItem(key, value);

  @override
  void remove(String key) => _storage.removeItem(key);

  @override
  void removeWhereKeyStartsWith(String prefix) {
    final toRemove = <String>[];
    for (var i = 0; i < _storage.length; i++) {
      final key = _storage.key(i);
      if (key != null && key.startsWith(prefix)) toRemove.add(key);
    }
    for (final key in toRemove) {
      _storage.removeItem(key);
    }
  }
}
