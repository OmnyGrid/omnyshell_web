@TestOn('browser')
library;

import 'package:omnyshell_web/app/app.dart';
import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';

void main() {
  late DomHarness h;
  late App app;

  setUp(() {
    web.window.location.hash = '';
    h = DomHarness(hub: FakeHub(validToken: 'good'));
    app = App(h.ctx, h.container);
  });

  tearDown(() {
    app.dispose();
    h.dispose();
  });

  Future<void> pump([int ms = 20]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  web.HTMLInputElement field(String id) =>
      query(h.container, '#$id') as web.HTMLInputElement;

  web.HTMLElement? buttonWhere(bool Function(web.HTMLElement) test) {
    final list = h.container.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (test(b)) return b;
    }
    return null;
  }

  Future<void> loginOk() async {
    field('login-hub').value = 'h:8443';
    field('login-principal').value = 'alice';
    field('login-token').value = 'good';
    query(h.container, 'button.primary').click();
    await pump();
  }

  test('guards an unauthenticated visitor to the login screen', () async {
    app.start();
    await pump();
    expect(h.container.querySelector('#login-hub'), isNotNull);
  });

  test('logs in and lands on the nodes screen', () async {
    app.start();
    await pump();
    await loginOk();
    expect(h.ctx.auth.snapshot.status, AuthStatus.connected);
    expect(h.container.textContent, contains('Nodes'));
  });

  test('sign out returns to the login screen', () async {
    app.start();
    await pump();
    await loginOk();

    buttonWhere((b) => b.textContent == 'Sign out')!.click();
    await pump();
    expect(h.container.querySelector('#login-hub'), isNotNull);
    expect(h.ctx.auth.snapshot.status, AuthStatus.signedOut);
  });

  test('header theme toggle cycles the theme preference', () async {
    app.start();
    await pump();
    await loginOk();

    final toggle = buttonWhere(
      (b) => (b.getAttribute('aria-label') ?? '').startsWith('Theme:'),
    );
    expect(toggle, isNotNull);
    final before = h.ctx.theme.mode.value;
    toggle!.click();
    await pump();
    expect(h.ctx.theme.mode.value, isNot(equals(before)));
  });
}
