/// A minimal synchronous string key/value store. Abstracts `localStorage` so
/// that storage-backed logic can be unit-tested with [MemoryKeyValueStore]
/// without a browser.
abstract class KeyValueStore {
  /// Returns the value for [key], or `null` if absent.
  String? read(String key);

  /// Stores [value] under [key].
  void write(String key, String value);

  /// Removes [key] if present.
  void remove(String key);

  /// Removes every key beginning with [prefix].
  void removeWhereKeyStartsWith(String prefix);
}

/// An in-memory [KeyValueStore] for tests and non-browser contexts.
class MemoryKeyValueStore implements KeyValueStore {
  final Map<String, String> _data;

  /// Creates a store, optionally seeded with [seed].
  MemoryKeyValueStore([Map<String, String>? seed]) : _data = {...?seed};

  /// A read-only view of the backing map (for assertions in tests).
  Map<String, String> get snapshot => Map.unmodifiable(_data);

  @override
  String? read(String key) => _data[key];

  @override
  void write(String key, String value) => _data[key] = value;

  @override
  void remove(String key) => _data.remove(key);

  @override
  void removeWhereKeyStartsWith(String prefix) =>
      _data.removeWhere((k, _) => k.startsWith(prefix));
}
