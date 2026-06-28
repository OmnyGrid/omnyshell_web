@TestOn('browser')
library;

import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:omnyshell_web/ui/dom.dart';
import 'package:omnyshell_web/ui/screens/login_screen.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';

void main() {
  late DomHarness h;

  setUp(() => h = DomHarness(hub: FakeHub(validToken: 'good')));
  tearDown(() => h.dispose());

  Future<void> pump() => Future<void>.delayed(const Duration(milliseconds: 10));

  test('renders the login form fields', () {
    final screen = LoginScreen(h.ctx);
    mount(h.container, screen.element);
    expect(h.container.querySelector('#login-hub'), isNotNull);
    expect(h.container.querySelector('#login-principal'), isNotNull);
    expect(h.container.querySelector('#login-token'), isNotNull);
    expect(h.container.querySelector('#login-remember'), isNotNull);
    expect(h.container.textContent, contains('Connect'));
    screen.dispose();
  });

  test('hub and principal opt out of mobile auto-capitalization', () {
    final screen = LoginScreen(h.ctx);
    mount(h.container, screen.element);
    for (final id in ['#login-hub', '#login-principal']) {
      final field = query(h.container, id) as web.HTMLInputElement;
      expect(field.getAttribute('autocapitalize'), 'none', reason: id);
      expect(field.getAttribute('autocorrect'), 'off', reason: id);
      expect(field.spellcheck, isFalse, reason: id);
    }
    screen.dispose();
  });

  test('prefills hub and principal from settings', () {
    h.settings
      ..hub = 'wss://saved:8443'
      ..principal = 'bob';
    final screen = LoginScreen(h.ctx);
    mount(h.container, screen.element);
    final hub = query(h.container, '#login-hub') as web.HTMLInputElement;
    final principal =
        query(h.container, '#login-principal') as web.HTMLInputElement;
    expect(hub.value, 'wss://saved:8443');
    expect(principal.value, 'bob');
    screen.dispose();
  });

  test(
    'successful login connects and persists when remember is checked',
    () async {
      final screen = LoginScreen(h.ctx);
      mount(h.container, screen.element);

      (query(h.container, '#login-hub') as web.HTMLInputElement).value =
          'h:8443';
      (query(h.container, '#login-principal') as web.HTMLInputElement).value =
          'alice';
      (query(h.container, '#login-token') as web.HTMLInputElement).value =
          'good';
      (query(h.container, '#login-remember') as web.HTMLInputElement).checked =
          true;

      query(h.container, 'button.primary').click();
      await pump();

      expect(h.ctx.auth.snapshot.status, AuthStatus.connected);
      expect(h.settings.tokenFor('wss://h:8443'), 'good');
      screen.dispose();
    },
  );

  test('a bad token surfaces an error banner', () async {
    final screen = LoginScreen(h.ctx);
    mount(h.container, screen.element);

    (query(h.container, '#login-hub') as web.HTMLInputElement).value = 'h';
    (query(h.container, '#login-principal') as web.HTMLInputElement).value =
        'alice';
    (query(h.container, '#login-token') as web.HTMLInputElement).value =
        'wrong';

    query(h.container, 'button.primary').click();
    await pump();

    expect(h.ctx.auth.snapshot.status, AuthStatus.error);
    expect(h.container.querySelector('.banner.error'), isNotNull);
    expect(h.container.textContent, contains('Authentication failed'));
    screen.dispose();
  });
}
