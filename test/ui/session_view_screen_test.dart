@TestOn('browser')
library;

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:omnyshell_web/ui/dom.dart';
import 'package:omnyshell_web/ui/screens/session_view_screen.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';
import '../support/fake_terminal.dart';

void main() {
  setUp(() => web.window.location.hash = '');

  Future<void> pump([int ms = 20]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  Future<DomHarness> connected() async {
    final h = DomHarness(hub: FakeHub(validToken: 'good'));
    await h.ctx.auth.login(
      hub: 'h',
      principal: 'alice',
      token: 'good',
      remember: false,
    );
    return h;
  }

  web.HTMLElement? buttonWithText(web.Element root, String text) {
    final list = root.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (b.textContent == text) return b;
    }
    return null;
  }

  test('locks page scroll while mounted, releases it on dispose', () async {
    final h = await connected();
    final root = web.document.documentElement!;
    expect(root.classList.contains('terminal-active'), isFalse);

    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(),
      opener: (cols, rows) async => FakeShellSessionPort(),
    );
    mount(h.container, screen.element);
    await pump();
    expect(root.classList.contains('terminal-active'), isTrue);

    screen.dispose();
    expect(root.classList.contains('terminal-active'), isFalse);
    h.dispose();
  });

  test('connects and wires terminal output and input', () async {
    final h = await connected();
    final term = FakeTerminalView(cols: 90, rows: 30);
    final io = FakeShellSessionPort();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => term,
      opener: (cols, rows) async => io,
    );
    mount(h.container, screen.element);
    await pump();

    // Connected: status cleared, terminal focused, initial size primed.
    expect(term.focused, isTrue);
    expect(io.resizes, contains((90, 30)));
    // The on-screen accessory key bar is mounted.
    expect(h.container.querySelector('.term-accessory'), isNotNull);

    // The host primed the shell on connect (init line + marker → stdin).
    expect(io.stdin, isNotEmpty);

    // Remote output reaches the terminal.
    io.emit([104, 105]);
    await pump();
    expect(term.writes.single, [104, 105]);

    screen.dispose();
    h.dispose();
  });

  test('detach navigates back to the sessions list', () async {
    final h = await connected();
    h.ctx.router.start();
    final io = FakeShellSessionPort();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'abcd',
      terminalFactory: (_) => FakeTerminalView(),
      opener: (cols, rows) async => io,
    );
    mount(h.container, screen.element);
    await pump();

    buttonWithText(h.container, 'Detach')!.click();
    await pump();

    expect(io.detached, isTrue);
    expect(h.ctx.router.current.value.pattern, '/nodes/:id/sessions');

    h.ctx.router.stop();
    screen.dispose();
    h.dispose();
  });

  test('fullscreen toggle flips the root class and dispose clears it', () async {
    final h = await connected();
    final io = FakeShellSessionPort();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(),
      opener: (cols, rows) async => io,
    );
    mount(h.container, screen.element);
    await pump();

    final root = web.document.documentElement!;
    expect(root.classList.contains('term-fullscreen'), isFalse);

    // Enter fullscreen.
    buttonWithText(h.container, '⤢ Fullscreen')!.click();
    await pump();
    expect(root.classList.contains('term-fullscreen'), isTrue);
    expect(buttonWithText(h.container, '⤡ Exit'), isNotNull);

    // Exit via the floating button (glyph ⤡, distinct from the toolbar toggle).
    (h.container.querySelector('.term-exit-fullscreen') as web.HTMLElement)
        .click();
    await pump();
    expect(root.classList.contains('term-fullscreen'), isFalse);

    // Re-enter, then dispose: the class must not leak onto the rest of the app.
    buttonWithText(h.container, '⤢ Fullscreen')!.click();
    await pump();
    expect(root.classList.contains('term-fullscreen'), isTrue);
    screen.dispose();
    expect(root.classList.contains('term-fullscreen'), isFalse);

    h.dispose();
  });

  test('fullscreen toggle scrolls the terminal to the bottom', () async {
    final h = await connected();
    final term = FakeTerminalView();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => term,
      opener: (cols, rows) async => FakeShellSessionPort(),
    );
    mount(h.container, screen.element);
    await pump();
    final before = term.scrollToBottomCount;

    buttonWithText(h.container, '⤢ Fullscreen')!.click();
    await pump(60); // let the requestAnimationFrame settle pass run
    expect(term.scrollToBottomCount, greaterThan(before));

    screen.dispose();
    h.dispose();
  });

  test('a failed open shows an error banner', () async {
    final h = await connected();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(),
      opener: (cols, rows) async =>
          throw const AuthorizationException('not allowed'),
    );
    mount(h.container, screen.element);
    await pump();

    expect(h.container.querySelector('.banner.error'), isNotNull);
    expect(h.container.textContent, contains('Not authorized'));

    screen.dispose();
    h.dispose();
  });
}
