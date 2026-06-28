import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart';

import 'key_value_store.dart';

/// Caches the last-known node list so the nodes screen can paint instantly on
/// reload while a fresh fetch runs. Backed by [KeyValueStore]; the cache is
/// best-effort — any decode error yields `null` (treated as a cold cache).
class NodeCache {
  static const String _key = 'omnyshell.cache.nodes';
  final KeyValueStore _kv;

  /// Creates a cache over [kv].
  NodeCache(this._kv);

  /// Returns the cached nodes, or `null` if absent/unreadable.
  List<NodeDescriptor>? read() {
    final raw = _kv.read(_key);
    if (raw == null) return null;
    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) return null;
      return [
        for (final item in decoded)
          NodeDescriptor.fromJson((item as Map).cast<String, dynamic>()),
      ];
    } on Object {
      return null;
    }
  }

  /// Replaces the cache with [nodes].
  void write(List<NodeDescriptor> nodes) =>
      _kv.write(_key, jsonEncode([for (final n in nodes) n.toJson()]));

  /// Clears the cache (e.g. on sign-out).
  void clear() => _kv.remove(_key);
}
