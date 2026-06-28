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

  WebShellHost build() => WebShellHost(
    term: term,
    session: port,
    principal: 'alice',
    nodeId: 'web-01',
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
    expect(shown(), contains('ls')); // local echo

    term.emitInput('\r');
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
    expect(sent(), contains("eval 'a'"));
    expect(sent(), isNot(contains("eval 'ab'")));
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
