import 'dart:js_interop';

import 'package:web/web.dart' as web;

import '../core/observable.dart';
import '../core/omnyshell_service.dart';
import '../router/router.dart';
import '../state/ai_settings_controller.dart';
import '../state/auth_controller.dart';
import '../state/nodes_controller.dart';
import '../state/terminal_display_controller.dart';
import '../state/theme_controller.dart';
import '../storage/local_storage_store.dart';
import '../storage/node_cache.dart';
import '../storage/settings_store.dart';
import '../ui/toasts.dart';
import 'app.dart';
import 'app_context.dart';

/// Wires the production app: real `localStorage`, browser WebSocket transport,
/// DOM-applied theming, then mounts [App] on [root] and attempts to restore a
/// remembered session. Returns the running app.
Future<App> bootstrap(web.HTMLElement root) async {
  final kv = LocalStorageStore();
  final settings = SettingsStore(kv);
  final service = OmnyShellService();
  final auth = AuthController(service, settings);
  final nodes = NodesController(service, NodeCache(kv));
  final display = TerminalDisplayController(settings);
  final ai = AiSettingsController(settings, service);

  final darkQuery = web.window.matchMedia('(prefers-color-scheme: dark)');
  final theme = ThemeController(
    settings,
    prefersDark: () => darkQuery.matches,
    onApply: (t) {
      web.document.documentElement?.setAttribute('data-theme', t.attr);
      // Keep the PWA status-bar/theme colour in sync with the chosen theme.
      web.document
          .getElementById('theme-color')
          ?.setAttribute(
            'content',
            t == ResolvedTheme.dark ? '#0f1318' : '#f6f7f9',
          );
    },
  );
  // Follow OS theme changes while in "system" mode.
  darkQuery.addEventListener(
    'change',
    (web.Event _) {
      theme.refreshSystem();
    }.toJS,
  );

  final router = Router(Routes.all);
  final toasts = Toasts(web.document.getElementById('toasts')!);

  final ctx = AppContext(
    service: service,
    auth: auth,
    nodes: nodes,
    theme: theme,
    display: display,
    ai: ai,
    router: router,
    settings: settings,
    kv: kv,
    toasts: toasts,
    lastSession: Observable<String?>(null),
  );

  final app = App(ctx, root);
  app.start();
  await auth.tryRestore();
  return app;
}
