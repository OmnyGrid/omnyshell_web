@TestOn('browser')
library;

import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:omnyshell_web/terminal/terminal_dimensions.dart';
import 'package:omnyshell_web/ui/dom.dart';
import 'package:omnyshell_web/ui/screens/session_view_screen.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';
import '../support/fake_hub.dart';
import '../support/fake_terminal.dart';
import '../support/sample_data.dart';

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

    // Remote output reaches the terminal. The editor wraps it (erase line +
    // repaint prompt around it), so the bytes are one of several writes.
    io.emit([104, 105]);
    await pump();
    expect(term.writes, contains(equals([104, 105])));

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

  test(
    'terminate kills the session on the node via the control plane',
    () async {
      final hub = FakeHub(validToken: 'good', sessions: [sampleSession('s1')]);
      final h = DomHarness(hub: hub);
      await h.ctx.auth.login(
        hub: 'h',
        principal: 'alice',
        token: 'good',
        remember: false,
      );
      h.ctx.router.start();

      final screen = SessionViewScreen(
        h.ctx,
        'web-01',
        'new',
        terminalFactory: (_) => FakeTerminalView(),
        // The opened port reports the session's full id (as a real one would).
        opener: (cols, rows) async =>
            FakeShellSessionPort(id: SessionId('session-s1-full')),
      );
      mount(h.container, screen.element);
      await pump();
      expect(hub.sessions.any((s) => s.sessionId == 'session-s1-full'), isTrue);

      buttonWithText(h.container, 'Terminate')!.click();
      await pump();

      // The node received a kill-by-id and the session is no longer listed —
      // a plain channel close would have left it parked/listed.
      expect(hub.received.any((m) => m is DetachedSessionKillRequest), isTrue);
      expect(
        hub.sessions.any((s) => s.sessionId == 'session-s1-full'),
        isFalse,
      );
      expect(h.ctx.router.current.value.pattern, '/nodes/:id/sessions');

      h.ctx.router.stop();
      screen.dispose();
      h.dispose();
    },
  );

  test('disposing while the session is opening detaches the orphan', () async {
    final h = await connected();
    final io = FakeShellSessionPort();
    final gate = Completer<ShellSessionPort>();
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(),
      // Hold the open in flight until we release it after disposing.
      opener: (cols, rows) => gate.future,
    );
    mount(h.container, screen.element);
    await pump();

    // Navigate away (dispose) before the open completes, then complete it.
    screen.dispose();
    gate.complete(io);
    await pump();

    // The orphaned session is detached (kept resumable), not left wired up.
    expect(io.detached, isTrue);
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

  test('opens a fresh session with the selected fixed dimensions', () async {
    final h = await connected();
    h.ctx.display.setPreset(DimensionPreset.custom);
    h.ctx.display.setCustom(120, 40);
    final opened = <(int, int)>[];
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(cols: 90, rows: 30),
      opener: (cols, rows) async {
        opened.add((cols, rows));
        return FakeShellSessionPort();
      },
    );
    mount(h.container, screen.element);
    await pump();

    expect(opened, contains((120, 40)));

    screen.dispose();
    h.dispose();
  });

  test('standard preset opens at 80x24', () async {
    final h = await connected();
    h.ctx.display.setPreset(DimensionPreset.standard);
    final opened = <(int, int)>[];
    final screen = SessionViewScreen(
      h.ctx,
      'web-01',
      'new',
      terminalFactory: (_) => FakeTerminalView(cols: 90, rows: 30),
      opener: (cols, rows) async {
        opened.add((cols, rows));
        return FakeShellSessionPort();
      },
    );
    mount(h.container, screen.element);
    await pump();

    expect(opened, contains((80, 24)));

    screen.dispose();
    h.dispose();
  });

  test(
    'auto-fit uses the terminal size; a resumed session ignores the preset',
    () async {
      final h = await connected();
      // Even with a fixed preset set, resuming (sessionRef != 'new') must use the
      // terminal's own size — the detached PTY can't be resized.
      h.ctx.display.setPreset(DimensionPreset.standard);
      final opened = <(int, int)>[];
      final screen = SessionViewScreen(
        h.ctx,
        'web-01',
        'abcd',
        terminalFactory: (_) => FakeTerminalView(cols: 90, rows: 30),
        opener: (cols, rows) async {
          opened.add((cols, rows));
          return FakeShellSessionPort();
        },
      );
      mount(h.container, screen.element);
      await pump();

      expect(opened, contains((90, 30)));

      screen.dispose();
      h.dispose();
    },
  );

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
