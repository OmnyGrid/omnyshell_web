/// A matched route: the [pattern] that matched, the concrete [path], and any
/// extracted path [params] (e.g. `/nodes/:id` against `/nodes/web-01` yields
/// `{id: web-01}`).
///
/// Kept free of `package:web` so the matching logic is unit-testable on the VM.
class RouteMatch {
  /// The registered pattern that matched (or `''` for no-match).
  final String pattern;

  /// The concrete path that was matched.
  final String path;

  /// Path parameters extracted from the pattern.
  final Map<String, String> params;

  /// Creates a route match.
  const RouteMatch(this.pattern, this.path, [this.params = const {}]);

  /// Whether any registered pattern matched.
  bool get matched => pattern.isNotEmpty;
}

/// Matches [path] against [patterns], returning the first match. Patterns use
/// `:name` segments for parameters. Pure and DOM-free.
RouteMatch matchRoute(List<String> patterns, String path) {
  final pathSegs = _segments(path);
  for (final pattern in patterns) {
    final patSegs = _segments(pattern);
    if (patSegs.length != pathSegs.length) continue;
    final params = <String, String>{};
    var ok = true;
    for (var i = 0; i < patSegs.length; i++) {
      final p = patSegs[i];
      final v = pathSegs[i];
      if (p.startsWith(':')) {
        params[p.substring(1)] = Uri.decodeComponent(v);
      } else if (p != v) {
        ok = false;
        break;
      }
    }
    if (ok) return RouteMatch(pattern, path, params);
  }
  return RouteMatch('', path);
}

/// Normalizes a URL hash (`#/foo`) to a path (`/foo`); empty hash → `/`.
String hashToPath(String hash) {
  if (hash.isEmpty || hash == '#') return '/';
  final raw = hash.startsWith('#') ? hash.substring(1) : hash;
  return raw.startsWith('/') ? raw : '/$raw';
}

List<String> _segments(String path) =>
    path.split('/').where((s) => s.isNotEmpty).toList();
