@TestOn('vm')
library;

import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        ClientConfig,
        ClientRuntime,
        LocalCommandRegistry,
        NodeDescriptor,
        NodeId,
        PlatformInfo,
        SessionId,
        TokenCredentialProvider;
import 'package:omnyshell_web/terminal/command_history.dart';
import 'package:omnyshell_web/terminal/web_shell_host.dart';
import 'package:test/test.dart';

import '../support/fake_terminal.dart';

void main() {
  late FakeTerminalView term;
  late FakeShellSessionPort port;
  // CwdMarker token derived from the session id (the host seeds it from there).
  const token = '__OMNYSHELL_CWD_testnonce__';

  setUp(() {
    term = FakeTerminalView(cols: 100, rows: 30);
    port = FakeShellSessionPort(id: SessionId('testnonce'));
  });

  WebShellHost build({CommandHistory? history}) => WebShellHost(
    term: term,
    session: port,
    principal: 'alice',
    nodeId: 'web-01',
    history: history,
  );

  Future<void> pump() => Future<void>.delayed(Duration.zero);
  String sent() =>
      port.stdin.map((b) => utf8.decode(b, allowMalformed: true)).join();
  String shown() =>
      term.writes.map((w) => utf8.decode(w, allowMalformed: true)).join();
  String markerLine(String cwd) => '$token$cwd\t\t\t\n';

  test('primes the shell on start (init line + marker)', () {
    build();
    final s = sent();
    expect(s, contains("trap ':' INT"));
    expect(s, contains('printf'));
  });

  test('resuming into a full-screen program does not prime the shell', () async {
    // A session resumed while nano/vim/claude owns the screen: the host must
    // NOT run the init line / cwd marker (priming) — those commands would be
    // injected into the full-screen program and corrupt it. It starts in
    // passthrough instead and relays keystrokes raw.
    WebShellHost(
      term: term,
      session: port,
      principal: 'alice',
      nodeId: 'web-01',
      resumedInAltScreen: true,
    );
    await pump();
    expect(sent(), isEmpty, reason: 'no priming commands while in alt-screen');

    // Replayed program output reaches the terminal, and typed keys are relayed
    // raw to the program rather than line-edited.
    port.emit([104, 105]); // the program repaints
    term.emitInput('x');
    await pump();
    expect(shown(), contains('hi'));
    expect(sent(), contains('x'));
  });

  test('draws a prompt with principal, node and cwd on completion', () async {
    build();
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pump();
    final out = shown();
    expect(out, contains('alice@web-01'));
    expect(out, contains('/home/alice'));
    expect(out, contains(r'$'));
    expect(out, isNot(contains(token)));
  });

  test('echoes typed input and sends a wrapped command on Enter', () async {
    build();
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pump();
    port.stdin.clear();

    term.emitInput('l');
    term.emitInput('s');
    await pump();
    expect(shown(), contains('ls')); // local echo

    term.emitInput('\r');
    await pump();
    expect(sent(), contains("eval 'ls'"));
  });

  test('renders command output with the marker stripped', () async {
    build();
    port.emit(utf8.encode('hello world\n${markerLine('/home/alice')}'));
    await pump();
    expect(shown(), contains('hello world'));
    expect(shown(), isNot(contains(token)));
  });

  test('Ctrl-C at idle clears the line and repaints the prompt', () async {
    build();
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pump();
    term.emitInput('r');
    term.emitInput('m');
    term.emitInput('\x03');
    final out = shown();
    expect(out, contains('^C'));
    expect('alice@web-01'.allMatches(out).length, greaterThanOrEqualTo(2));
  });

  test('Backspace erases the last character', () async {
    build();
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pump();
    port.stdin.clear();
    term.emitInput('a');
    term.emitInput('b');
    term.emitInput('\x7f');
    term.emitInput('\r');
    await pump();
    expect(sent(), contains("eval 'a'"));
    expect(sent(), isNot(contains("eval 'ab'")));
  });

  test('mid-line editing: Left arrow inserts at the cursor', () async {
    // The shared LineEditor gives the browser full mid-line editing (the old
    // hand-rolled host was append-only): typing "ac", moving Left, then "b"
    // yields "abc".
    build();
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pump();
    port.stdin.clear();

    term.emitInput('a');
    term.emitInput('c');
    term.emitInput('\x1b[D'); // Left
    term.emitInput('b');
    term.emitInput('\r');
    await pump();
    expect(sent(), contains("eval 'abc'"));
  });

  group('command history', () {
    const up = '\x1b[A';
    const down = '\x1b[B';

    test('records committed commands and Up recalls the most recent', () async {
      final history = CommandHistory.inMemory();
      build(history: history);
      port.emit(utf8.encode(markerLine('/home/alice')));
      await pump();

      term.emitInput('ls\r');
      await pump();
      expect(history.entries, ['ls']);
      // Let the command finish so the prompt returns before recalling.
      port.emit(utf8.encode(markerLine('/home/alice')));
      await pump();

      port.stdin.clear();
      term.emitInput(up); // recall "ls" onto the line
      await pump();
      term.emitInput('\r'); // commit the recalled command
      await pump();
      expect(sent(), contains("eval 'ls'"));
    });

    test(
      'Up then Down walks history and restores the in-progress line',
      () async {
        final history = CommandHistory.inMemory(entries: ['deploy', 'debug']);
        build(history: history);

        term.emitInput('de'); // an in-progress draft (a prefix of both entries)
        await pump();
        term.emitInput(up);
        await pump();
        expect(shown(), contains('debug'));
        term.emitInput(up);
        await pump();
        expect(shown(), contains('deploy'));
        term.emitInput(down);
        await pump();
        term.emitInput(down); // past the newest match: the draft returns
        await pump();
        expect(shown().endsWith('de'), isTrue);
      },
    );

    test('a typed prefix restricts which entries Up visits', () async {
      final history = CommandHistory.inMemory(
        entries: ['git status', 'ls', 'git log'],
      );
      build(history: history);

      term.emitInput('git');
      await pump();
      term.emitInput(up);
      await pump();
      expect(shown(), contains('git log'));
      term.emitInput(up);
      await pump();
      expect(shown(), contains('git status'));
    });

    test('arrow keys are a safe no-op when history is disabled', () async {
      build(); // no history wired
      port.stdin.clear();
      term.emitInput(up);
      term.emitInput(down);
      await pump();
      expect(sent(), isEmpty); // nothing forwarded to the shell
    });
  });

  test('exposes TerminalKeys (sticky Ctrl) for the accessory bar', () {
    final host = build();
    final changes = <bool>[];
    host.onCtrlChange = changes.add;
    host.armCtrl();
    expect(host.ctrlArmed, isTrue);
    // Armed Ctrl turns the next injected letter into a control code, then
    // self-disarms (Ctrl-C at idle here).
    host.sendKey(utf8.encode('c'));
    expect(changes, [true, false]);
    expect(host.ctrlArmed, isFalse);
  });

  test('exit writes an end-of-session notice', () async {
    final host = build();
    port.exit(0);
    await pump();
    expect(host.ended, isTrue);
    expect(term.texts.join(), contains('session ended'));
  });

  group('local commands and Tab completion', () {
    Future<void> pumpMs([int ms = 5]) =>
        Future<void>.delayed(Duration(milliseconds: ms));

    // A disconnected client; the commands exercised here never reach the wire.
    ClientRuntime client() => ClientRuntime(
      ClientConfig(
        hubUri: Uri.parse('wss://localhost:1/'),
        credentials: const TokenCredentialProvider(
          principal: 'tester',
          token: 'tok',
        ),
      ),
    );

    NodeDescriptor node() => NodeDescriptor(
      id: NodeId('web-01'),
      displayName: 'web-01',
      platform: const PlatformInfo(
        os: 'linux',
        arch: 'x64',
        agentVersion: '1.0.0',
        hostname: 'host',
      ),
      online: true,
    );

    WebShellHost buildWired({
      Future<List<String>> Function(String, bool, String?)? onComplete,
    }) => WebShellHost(
      term: term,
      session: port,
      principal: 'alice',
      nodeId: 'web-01',
      commands: LocalCommandRegistry.withDefaults(),
      client: client(),
      onComplete: onComplete,
      nodeInfo: node,
    );

    test(':help runs locally and is not forwarded to the shell', () async {
      buildWired();
      port.stdin.clear();

      term.emitInput(':help\r');
      await pumpMs();

      final out = shown();
      expect(out, contains('Local commands:'));
      expect(out, contains(':tree'));
      expect(out, contains(':tunnel'));
      // The download/upload/drive commands need dart:io and are excluded.
      expect(out, isNot(contains(':drive')));
      // Nothing was forwarded to the remote shell.
      expect(sent(), isEmpty);
    });

    test('an unknown :command reports an error, not forwarded', () async {
      buildWired();
      port.stdin.clear();

      term.emitInput(':bogus\r');
      await pumpMs();

      expect(shown(), contains('Unknown command: :bogus'));
      expect(sent(), isEmpty);
    });

    test('Tab completes a unique candidate and forwards on commit', () async {
      buildWired(
        onComplete: (word, isCommand, cwd) async => const ['README.md'],
      );
      port.emit(utf8.encode(markerLine('/home/alice')));
      await pump();
      port.stdin.clear();

      term.emitInput('RE');
      term.emitInput('\t');
      await pumpMs();
      expect(shown(), contains('README.md'));

      term.emitInput('\r');
      await pumpMs();
      expect(sent(), contains('README.md'));
    });

    test(
      'Tab passes the word, command position and cwd to the completer',
      () async {
        String? seenWord;
        bool? seenIsCommand;
        String? seenCwd;
        buildWired(
          onComplete: (word, isCommand, cwd) async {
            seenWord = word;
            seenIsCommand = isCommand;
            seenCwd = cwd;
            return const [];
          },
        );
        port.emit(utf8.encode(markerLine('/var/log')));
        await pump();

        term.emitInput('cat access');
        term.emitInput('\t');
        await pumpMs();

        expect(seenWord, 'access');
        expect(seenIsCommand, isFalse); // a word after "cat " is an argument
        expect(seenCwd, '/var/log');
      },
    );

    test('Tab lists multiple candidates with no common prefix', () async {
      buildWired(
        onComplete: (word, isCommand, cwd) async => const ['alpha', 'beta'],
      );
      term.emitInput('\t');
      await pumpMs();

      final out = shown();
      expect(out, contains('alpha'));
      expect(out, contains('beta'));
    });

    test('Tab is ignored (not forwarded) when no completer is wired', () async {
      build(); // no commands/client/onComplete
      port.stdin.clear();

      term.emitInput('\t');
      await pumpMs();

      expect(sent().contains('\t'), isFalse);
    });
  });
}
