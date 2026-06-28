import 'dart:async';

import 'package:web/web.dart' as web;

import '../router/router.dart';
import '../state/theme_controller.dart';
import '../ui/dom.dart';
import '../ui/screens/login_screen.dart';
import '../ui/screens/node_detail_screen.dart';
import '../ui/screens/nodes_screen.dart';
import '../ui/screens/session_view_screen.dart';
import '../ui/screens/sessions_screen.dart';
import '../ui/widgets.dart';
import 'app_context.dart';

/// The application root: renders the header + main region, enforces the auth
/// route guard, and mounts the screen for the active route. Owns the
/// router/auth subscriptions for the app's lifetime.
class App {
  final AppContext ctx;
  final web.HTMLElement _root;

  late final web.HTMLElement _header;
  late final web.HTMLElement _main;

  Screen? _screen;
  String _mountedKey = '';
  final List<StreamSubscription<Object?>> _subs = [];

  /// Creates the app bound to the [root] element (`#app`).
  App(this.ctx, web.HTMLElement root) : _root = root {
    _header = el('header', classes: 'app-header');
    _main = el('main', classes: 'app-main');
    mount(_root, el('div', children: [_header, _main]));
    _root.setAttribute('aria-busy', 'false');
  }

  /// Starts the app: wires subscriptions, the router, and renders.
  void start() {
    _subs.add(ctx.router.current.stream.listen((_) => _render()));
    _subs.add(ctx.auth.state.stream.listen((_) => _render()));
    _subs.add(ctx.theme.mode.stream.listen((_) => _renderHeader()));
    ctx.router.start();
    _render();
  }

  void _render() {
    final connected = ctx.auth.snapshot.isConnected;
    final route = ctx.router.current.value;

    // Route guard / redirects.
    if (!connected && route.pattern != Routes.login) {
      ctx.router.replace(Routes.login);
      return;
    }
    if (connected && (route.pattern == Routes.login || route.pattern.isEmpty)) {
      ctx.router.replace(Routes.nodes);
      return;
    }

    _renderHeader();
    _mountScreen(route, connected);
  }

  void _mountScreen(RouteMatch route, bool connected) {
    final key = '$connected:${route.path}';
    if (key == _mountedKey && _screen != null) return;
    _mountedKey = key;
    _screen?.dispose();
    _screen = _screenFor(route, connected);
    mount(_main, _screen!.element);
    // A new screen starts at the top — don't inherit the previous screen's
    // scroll position (e.g. a long nodes/sessions list).
    web.document.documentElement?.scrollTop = 0;
    web.document.body?.scrollTop = 0;
    _main.scrollTop = 0;
  }

  Screen _screenFor(RouteMatch route, bool connected) {
    if (!connected) return LoginScreen(ctx);
    switch (route.pattern) {
      case Routes.sessionView:
        return SessionViewScreen(
          ctx,
          route.params['id'] ?? '',
          route.params['sid'] ?? '',
        );
      case Routes.nodeSessions:
        return SessionsScreen(ctx, route.params['id'] ?? '');
      case Routes.nodeDetail:
        return NodeDetailScreen(ctx, route.params['id'] ?? '');
      case Routes.nodes:
      default:
        return NodesScreen(ctx);
    }
  }

  void _renderHeader() {
    final connected = ctx.auth.snapshot.isConnected;
    final children = <web.Node>[
      el(
        'div',
        classes: 'brand',
        children: [
          el('span', classes: 'dot'),
          textNode('OmnyShell'),
        ],
      ),
      el('div', classes: 'spacer'),
    ];

    if (connected) {
      final principal = ctx.service.principal?.id.value ?? '';
      children.add(
        el(
          'span',
          classes: 'meta hide-sm',
          text: '${ctx.service.hubUri?.host ?? ''} · $principal',
        ),
      );
    }

    children.add(_themeToggle());

    if (connected) {
      children.add(button('Sign out', className: 'ghost', onClick: _logout));
    }

    clearChildren(_header);
    for (final c in children) {
      _header.appendChild(c);
    }
  }

  web.HTMLElement _themeToggle() {
    final mode = ctx.theme.mode.value;
    final label = switch (mode) {
      ThemeMode.light => '☀ Light',
      ThemeMode.dark => '☾ Dark',
      ThemeMode.system => '◐ System',
    };
    return button(
      label,
      className: 'ghost',
      ariaLabel: 'Theme: ${mode.name}. Click to change.',
      onClick: ctx.theme.cycle,
    );
  }

  Future<void> _logout() async {
    await ctx.auth.logout();
    ctx.nodes.reset();
    ctx.toasts.success('Signed out.');
    ctx.router.go(Routes.login);
  }

  /// Disposes subscriptions and the mounted screen.
  void dispose() {
    for (final s in _subs) {
      s.cancel();
    }
    _subs.clear();
    _screen?.dispose();
    ctx.router.stop();
  }
}
