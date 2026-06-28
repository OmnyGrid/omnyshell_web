import 'dart:convert';

import 'package:omnyshell_web/terminal/session_bridge.dart';
import 'package:test/test.dart';

import '../support/fake_terminal.dart';

void main() {
  late FakeTerminalView term;
  late FakeSessionIo io;

  setUp(() {
    term = FakeTerminalView(cols: 100, rows: 30);
    io = FakeSessionIo();
  });

  Future<void> pump() => Future<void>.delayed(Duration.zero);

  test('primes the remote with the initial terminal size', () {
    SessionBridge(term, io);
    expect(io.resizes, contains((100, 30)));
  });

  test('remote output is written to the terminal and grants window', () async {
    SessionBridge(term, io);
    io.emit([1, 2, 3, 4]);
    await pump();
    expect(term.writes.single, [1, 2, 3, 4]);
    expect(io.grants, contains(4));
  });

  test('empty output chunks are ignored', () async {
    SessionBridge(term, io);
    io.emit([]);
    await pump();
    expect(term.writes, isEmpty);
    expect(io.grants, isEmpty);
  });

  test('terminal input is UTF-8 encoded to stdin', () {
    SessionBridge(term, io);
    term.emitInput('ls\n');
    expect(io.stdin.single, utf8.encode('ls\n'));
  });

  test('terminal resize forwards to the session', () {
    SessionBridge(term, io);
    term.emitResize(120, 40);
    expect(io.resizes, contains((120, 40)));
  });

  test('session exit writes an end notice', () async {
    final bridge = SessionBridge(term, io);
    io.exit(0);
    await pump();
    expect(bridge.ended, isTrue);
    expect(term.texts.join(), contains('session ended'));
  });

  test('detach stops output and detaches the session', () async {
    final bridge = SessionBridge(term, io);
    await bridge.detach();
    expect(io.detached, isTrue);
    // Output after detach is no longer written.
    io.emit([9]);
    await pump();
    expect(term.writes, isEmpty);
  });

  test('close terminates the session', () async {
    final bridge = SessionBridge(term, io);
    await bridge.close();
    expect(io.closed, isTrue);
  });
}
