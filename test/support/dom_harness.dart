import 'package:omnyshell_web/app/app_context.dart';
import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/router/router.dart';
import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:omnyshell_web/state/nodes_controller.dart';
import 'package:omnyshell_web/state/theme_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/node_cache.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:omnyshell_web/ui/toasts.dart';
import 'package:web/web.dart' as web;

import 'fake_hub.dart';

/// A fully-wired [AppContext] for browser/DOM tests, backed by a [FakeHub] and
/// in-memory storage. Exposes the moving parts so tests can assert on them.
class DomHarness {
  /// The fake Hub backing the service.
  final FakeHub hub;

  /// In-memory settings backing store.
  final MemoryKeyValueStore kv;

  /// Persisted settings.
  final SettingsStore settings;

  /// The wired context handed to screens.
  final AppContext ctx;

  /// A detached container to mount screens into.
  final web.HTMLElement container;

  /// The toast host element.
  final web.HTMLElement toastHost;

  /// The element theme attributes are applied to.
  final web.HTMLElement themeTarget;

  DomHarness._({
    required this.hub,
    required this.kv,
    required this.settings,
    required this.ctx,
    required this.container,
    required this.toastHost,
    required this.themeTarget,
  });

  /// Builds a harness. [seed] pre-populates storage; [prefersDark] sets the
  /// simulated OS theme preference.
  factory DomHarness({
    FakeHub? hub,
    Map<String, String>? seed,
    bool prefersDark = false,
  }) {
    final theHub = hub ?? FakeHub(validToken: 'good');
    final kv = MemoryKeyValueStore(seed);
    final settings = SettingsStore(kv);
    final service = OmnyShellService(connectionFactory: theHub.factory);
    final auth = AuthController(service, settings);
    final nodes = NodesController(service, NodeCache(kv));

    final container = web.document.createElement('div') as web.HTMLElement;
    final toastHost = web.document.createElement('div') as web.HTMLElement;
    final themeTarget = web.document.createElement('div') as web.HTMLElement;
    web.document.body!
      ..appendChild(container)
      ..appendChild(toastHost);

    final theme = ThemeController(
      settings,
      prefersDark: () => prefersDark,
      onApply: (t) => themeTarget.setAttribute('data-theme', t.attr),
    );
    final router = Router(Routes.all);
    final toasts = Toasts(toastHost, ttl: const Duration(milliseconds: 50));

    final ctx = AppContext(
      service: service,
      auth: auth,
      nodes: nodes,
      theme: theme,
      router: router,
      settings: settings,
      kv: kv,
      toasts: toasts,
    );

    return DomHarness._(
      hub: theHub,
      kv: kv,
      settings: settings,
      ctx: ctx,
      container: container,
      toastHost: toastHost,
      themeTarget: themeTarget,
    );
  }

  /// Tears down DOM nodes created by the harness.
  void dispose() {
    container.remove();
    toastHost.remove();
  }
}

/// Finds a descendant by CSS [selector], or fails if absent.
web.HTMLElement query(web.HTMLElement root, String selector) {
  final found = root.querySelector(selector);
  if (found == null) {
    throw StateError('no element matched "$selector"');
  }
  return found as web.HTMLElement;
}
