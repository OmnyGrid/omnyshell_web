import 'package:web/web.dart' as web;

import '../core/omnyshell_service.dart';
import '../router/router.dart';
import '../state/auth_controller.dart';
import '../state/nodes_controller.dart';
import '../state/theme_controller.dart';
import '../storage/key_value_store.dart';
import '../storage/settings_store.dart';
import '../ui/toasts.dart';

/// Shared dependencies handed to every screen — the app's small service locator.
class AppContext {
  /// Facade over the OmnyShell client.
  final OmnyShellService service;

  /// Authentication + session persistence.
  final AuthController auth;

  /// Node discovery state.
  final NodesController nodes;

  /// Theme preference + application.
  final ThemeController theme;

  /// Hash router.
  final Router router;

  /// Persisted settings.
  final SettingsStore settings;

  /// Raw key/value store (used by features needing their own namespace, e.g.
  /// per-session command history).
  final KeyValueStore kv;

  /// Transient notifications.
  final Toasts toasts;

  /// Creates a context.
  const AppContext({
    required this.service,
    required this.auth,
    required this.nodes,
    required this.theme,
    required this.router,
    required this.settings,
    required this.kv,
    required this.toasts,
  });
}

/// A mounted screen: owns a DOM subtree and any subscriptions, cleaned up on
/// [dispose] when the route changes.
abstract class Screen {
  /// The screen's root element.
  web.HTMLElement get element;

  /// Releases subscriptions/resources. Called before the screen is unmounted.
  void dispose() {}
}

/// Route path constants.
abstract final class Routes {
  /// Login screen.
  static const String login = '/login';

  /// Node list (the connected home).
  static const String nodes = '/nodes';

  /// Node detail — `:id`.
  static const String nodeDetail = '/nodes/:id';

  /// Sessions for a node — `:id`.
  static const String nodeSessions = '/nodes/:id/sessions';

  /// Interactive view of one session — `:id` (node), `:sid` (session).
  static const String sessionView = '/nodes/:id/sessions/:sid';

  /// All registered patterns, most specific first.
  static const List<String> all = [
    sessionView,
    nodeSessions,
    nodeDetail,
    nodes,
    login,
  ];
}
