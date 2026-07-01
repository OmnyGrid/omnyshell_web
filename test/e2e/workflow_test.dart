@TestOn('browser')
library;

import 'package:omnyshell_web/app/app.dart';
import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';
import '../support/sample_data.dart';

/// End-to-end workflows driven through the real [App] over a fake Hub: login,
/// node discovery, node detail, session list/peek, logout, plus session
/// persistence (reload) and reconnection after a dropped connection.
void main() {
  setUp(() => web.window.location.hash = '');

  Future<void> pump([int ms = 25]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  FakeHub populatedHub() => FakeHub(
    validToken: 'good',
    nodes: [sampleNode('web-01'), sampleNode('db-02', online: false)],
    sessions: [sampleSession('aaaa1111', command: 'vim')],
    peekScreen: 'captured screen text',
  );

  web.HTMLElement? byText(web.Element root, String text) {
    final list = root.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (b.textContent == text) return b;
    }
    return null;
  }

  Future<void> loginThrough(DomHarness h) async {
    (h.container.querySelector('#login-hub') as web.HTMLInputElement).value =
        'h:8443';
    (h.container.querySelector('#login-principal') as web.HTMLInputElement)
            .value =
        'alice';
    (h.container.querySelector('#login-token') as web.HTMLInputElement).value =
        'good';
    (h.container.querySelector('button.primary') as web.HTMLElement).click();
    await pump();
  }

  test(
    'full workflow: login → nodes → detail → sessions → peek → logout',
    () async {
      final h = DomHarness(hub: populatedHub());
      final app = App(h.ctx, h.container);
      app.start();
      await pump();

      // Login.
      await loginThrough(h);
      expect(h.ctx.auth.snapshot.status, AuthStatus.connected);
      expect(h.container.textContent, contains('web-01'));

      // Open node detail.
      (h.container.querySelector('.list-item') as web.HTMLElement).click();
      await pump();
      expect(h.container.textContent, contains('Overview'));

      // Go to sessions (via the node's sessions-preview "View all" button).
      byText(h.container, 'View all')!.click();
      await pump();
      expect(h.container.textContent, contains('aaaa1111'));

      // Peek a session.
      final row = h.container.querySelector('.list-item') as web.HTMLElement;
      byText(row, 'Peek')!.click();
      await pump();
      expect(
        web.document.querySelector('.screen-capture')!.textContent,
        contains('captured screen text'),
      );
      byText(web.document.querySelector('.modal')!, '✕')!.click();
      await pump();

      // Logout.
      byText(h.container, 'Sign out')!.click();
      await pump();
      expect(h.container.querySelector('#login-hub'), isNotNull);

      app.dispose();
      h.dispose();
    },
  );

  test('persistence: a remembered session is restored on reload', () async {
    // Simulate a prior session persisted to storage.
    final seed = {
      'omnyshell.hub': 'h:8443',
      'omnyshell.principal': 'alice',
      'omnyshell.rememberToken': 'true',
      'omnyshell.token.wss://h:8443': 'good',
    };
    final h = DomHarness(hub: populatedHub(), seed: seed);
    final app = App(h.ctx, h.container);
    app.start();
    // Mirror bootstrap's restore step.
    await h.ctx.auth.tryRestore();
    await pump();

    expect(h.ctx.auth.snapshot.isConnected, isTrue);
    expect(h.container.textContent, contains('Nodes'));

    app.dispose();
    h.dispose();
  });

  test(
    'reconnection: a dropped connection returns to login, then reconnects',
    () async {
      final hub = populatedHub();
      final h = DomHarness(hub: hub, seed: {'omnyshell.rememberToken': 'true'});
      final app = App(h.ctx, h.container);
      app.start();
      await pump();
      await loginThrough(h);
      expect(h.ctx.auth.snapshot.isConnected, isTrue);

      // The Hub drops the socket.
      await hub.connection!.close();
      await pump();

      // Back on login with a connection-lost error and a prefilled token.
      expect(h.container.querySelector('#login-hub'), isNotNull);
      expect(
        h.container.textContent,
        contains('Connection to the Hub was lost'),
      );
      final token =
          h.container.querySelector('#login-token') as web.HTMLInputElement;
      expect(token.value, 'good');

      // One-click reconnect.
      (h.container.querySelector('button.primary') as web.HTMLElement).click();
      await pump();
      expect(h.ctx.auth.snapshot.isConnected, isTrue);
      expect(h.container.textContent, contains('Nodes'));

      app.dispose();
      h.dispose();
    },
  );
}
