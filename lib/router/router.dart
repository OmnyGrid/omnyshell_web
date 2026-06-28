import 'package:web/web.dart' as web;

import '../core/observable.dart';
import '../ui/dom.dart';
import 'route_match.dart';

export 'route_match.dart' show RouteMatch, matchRoute;

/// Hash-based router (`#/path`) — needs no server rewrites, so the app hosts as
/// pure static files. Holds the [current] match observable and translates
/// browser `hashchange` events into route updates. The matching logic lives in
/// `route_match.dart` (DOM-free, unit-tested on the VM).
class Router {
  /// Registered route patterns, most specific first.
  final List<String> patterns;

  final web.Window _window;

  /// The active route (observable for the shell to render the matching screen).
  final Observable<RouteMatch> current;

  void Function()? _detach;

  /// Creates a router over [patterns]. [window] is injectable for tests.
  Router(this.patterns, {web.Window? window})
    : _window = window ?? web.window,
      current = Observable(
        matchRoute(patterns, hashToPath((window ?? web.window).location.hash)),
      );

  /// Begins listening for `hashchange` and emits the initial route.
  void start() {
    _detach = on(_window, 'hashchange', (_) => _sync());
    _sync();
  }

  /// Stops listening.
  void stop() {
    _detach?.call();
    _detach = null;
  }

  /// Navigates to [path] (updates the hash, which triggers a route update).
  void go(String path) {
    final normalized = path.startsWith('/') ? path : '/$path';
    final target = '#$normalized';
    if (_window.location.hash == target) {
      _sync();
    } else {
      _window.location.hash = target;
    }
  }

  /// Replaces the current route without leaving a history entry.
  void replace(String path) {
    final normalized = path.startsWith('/') ? path : '/$path';
    _window.location.replace('#$normalized');
    _sync();
  }

  void _sync() =>
      current.value = matchRoute(patterns, hashToPath(_window.location.hash));
}
