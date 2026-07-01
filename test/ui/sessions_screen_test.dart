@TestOn('browser')
library;

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:omnyshell_web/ui/dom.dart';
import 'package:omnyshell_web/ui/screens/sessions_screen.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';
import '../support/sample_data.dart';

void main() {
  setUp(() => web.window.location.hash = '');

  Future<void> pump([int ms = 20]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  Future<DomHarness> connectedHarness(FakeHub hub) async {
    final h = DomHarness(hub: hub);
    await h.ctx.auth.login(
      hub: 'h',
      principal: 'alice',
      token: 'good',
      remember: false,
    );
    return h;
  }

  FakeHub hubWithSessions() => FakeHub(
    validToken: 'good',
    sessions: [
      sampleSession('aaaa1111', command: 'vim'),
      sampleSession('bbbb2222'),
    ],
    peekScreen: 'hello screen',
  );

  web.HTMLElement? buttonWithText(web.Element root, String text) {
    final list = root.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (b.textContent == text) return b;
    }
    return null;
  }

  test('lists sessions with short id, state and actions', () async {
    final h = await connectedHarness(hubWithSessions());
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    expect(h.container.querySelectorAll('.list-item').length, 2);
    expect(h.container.textContent, contains('aaaa1111'));
    expect(h.container.textContent, contains('detached'));
    expect(buttonWithText(h.container, 'Resume'), isNotNull);
    expect(buttonWithText(h.container, 'Kill'), isNotNull);

    screen.dispose();
    h.dispose();
  });

  test('shows the running program as a badge beside the state', () async {
    final h = await connectedHarness(hubWithSessions());
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    // aaaa1111 runs 'vim'; it renders as a command badge.
    final cmd = h.container.querySelector('.badge.cmd');
    expect(cmd, isNotNull);
    expect(cmd!.textContent, 'vim');

    screen.dispose();
    h.dispose();
  });

  test('orders: highlighted, running, then detached and newer first', () async {
    final hub = FakeHub(
      validToken: 'good',
      sessions: [
        sampleSession(
          'att',
          state: SessionState.attached,
          detached: false,
          createdAt: DateTime.utc(2026, 4),
        ),
        sampleSession('oldp', createdAt: DateTime.utc(2026, 2)),
        sampleSession('newp', createdAt: DateTime.utc(2026, 3)),
        sampleSession('cmd', command: 'top'),
        sampleSession('hi'),
      ],
    );
    final h = await connectedHarness(hub);
    h.ctx.lastSession.value = 'hi';
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final nodes = h.container.querySelectorAll('.list-item .title');
    final titles = [
      for (var i = 0; i < nodes.length; i++)
        (nodes.item(i) as web.HTMLElement).textContent,
    ];
    expect(titles, ['hi', 'cmd', 'newp', 'oldp', 'att']);

    screen.dispose();
    h.dispose();
  });

  test('highlights the last-interacted session', () async {
    final h = await connectedHarness(hubWithSessions());
    h.ctx.lastSession.value = 'bbbb2222';
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final highlighted = h.container.querySelector('.list-item.highlight');
    expect(highlighted, isNotNull);
    expect(highlighted!.textContent, contains('bbbb2222'));

    screen.dispose();
    h.dispose();
  });

  test('highlights by full session id (freshly created session)', () async {
    final h = await connectedHarness(hubWithSessions());
    // The terminal view sets lastSession to the full session id on open.
    h.ctx.lastSession.value = 'session-bbbb2222-full';
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final highlighted = h.container.querySelector('.list-item.highlight');
    expect(highlighted, isNotNull);
    expect(highlighted!.textContent, contains('bbbb2222'));

    screen.dispose();
    h.dispose();
  });

  test('empty state when the node has no sessions', () async {
    final h = await connectedHarness(FakeHub(validToken: 'good'));
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();
    expect(h.container.textContent, contains('No sessions'));
    screen.dispose();
    h.dispose();
  });

  test('New opens a fresh shell without going back', () async {
    final h = await connectedHarness(hubWithSessions());
    h.ctx.router.start();
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final btn = buttonWithText(h.container, 'New');
    expect(btn, isNotNull);
    btn!.click();
    await pump();

    expect(h.ctx.router.current.value.pattern, '/nodes/:id/sessions/:sid');
    expect(web.window.location.hash, contains('/sessions/new'));

    h.ctx.router.stop();
    screen.dispose();
    h.dispose();
  });

  test('kill asks for confirmation then removes the session', () async {
    final h = await connectedHarness(hubWithSessions());
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    // First row's Kill button.
    final firstRow = h.container.querySelector('.list-item') as web.HTMLElement;
    buttonWithText(firstRow, 'Kill')!.click();
    await pump();

    // Confirmation modal appears.
    final modal = web.document.querySelector('.modal-overlay');
    expect(modal, isNotNull);
    buttonWithText(modal!, 'Terminate')!.click();
    await pump();

    expect(h.container.querySelectorAll('.list-item').length, 1);
    expect(web.document.querySelector('.modal-overlay'), isNull);

    screen.dispose();
    h.dispose();
  });

  test('peek opens a modal showing the captured screen', () async {
    final h = await connectedHarness(hubWithSessions());
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final firstRow = h.container.querySelector('.list-item') as web.HTMLElement;
    buttonWithText(firstRow, 'Peek')!.click();
    await pump();

    final capture = web.document.querySelector('.screen-capture');
    expect(capture, isNotNull);
    expect(capture!.textContent, contains('hello screen'));

    // Close via the overlay's close button.
    buttonWithText(web.document.querySelector('.modal')!, '✕')!.click();
    await pump();
    expect(web.document.querySelector('.modal-overlay'), isNull);

    screen.dispose();
    h.dispose();
  });

  test('resume navigates to the session view route', () async {
    final h = await connectedHarness(hubWithSessions());
    h.ctx.router.start();
    final screen = SessionsScreen(h.ctx, 'web-01');
    mount(h.container, screen.element);
    await pump();

    final firstRow = h.container.querySelector('.list-item') as web.HTMLElement;
    buttonWithText(firstRow, 'Resume')!.click();
    await pump();

    final route = h.ctx.router.current.value;
    expect(route.pattern, '/nodes/:id/sessions/:sid');
    expect(route.params['sid'], 'aaaa1111');

    h.ctx.router.stop();
    screen.dispose();
    h.dispose();
  });
}
