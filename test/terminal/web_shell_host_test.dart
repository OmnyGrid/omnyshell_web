@TestOn('vm')
library;

import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart' show SessionId;
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
}
