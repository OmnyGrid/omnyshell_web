@TestOn('vm')
library;

import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        ClientConfig,
        ClientRuntime,
        LocalCommand,
        LocalCommandContext,
        LocalCommandRegistry,
        NodeDescriptor,
        NodeId,
        PlatformInfo,
        SessionId,
        ShellFamily,
        TokenCredentialProvider;
import 'package:omnyshell_web/terminal/web_shell_host.dart';
import 'package:test/test.dart';

import '../support/fake_terminal.dart';

/// A probe exercising the full-screen seam the `:ide` TUI relies on: it takes
/// over via [LocalCommandContext.runFullScreen], records what it sees, and ends
/// when it reads Ctrl-Q (0x11).
class _FullScreenProbe extends LocalCommand {
  bool? hadRunFullScreen;
  ShellFamily? family;
  final received = <int>[];
  final _started = Completer<void>();

  /// Completes once the takeover body has begun reading input.
  Future<void> get started => _started.future;

  @override
  String get name => 'fs';

  @override
  String get description => 'full-screen test probe';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    hadRunFullScreen = context.runFullScreen != null;
    family = context.shellFamily;
    final runFullScreen = context.runFullScreen;
    if (runFullScreen == null) return;
    await runFullScreen((input) async {
      _started.complete();
      await for (final chunk in input) {
        received.addAll(chunk);
        if (chunk.length == 1 && chunk.first == 0x11) break; // Ctrl-Q ends
      }
    });
  }
}

void main() {
  late FakeTerminalView term;
  late FakeShellSessionPort port;

  setUp(() {
    term = FakeTerminalView(cols: 100, rows: 30);
    port = FakeShellSessionPort(id: SessionId('testnonce'));
  });

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

  WebShellHost buildWith(
    LocalCommandRegistry registry, {
    FakeShellSessionPort? session,
  }) => WebShellHost(
    term: term,
    session: session ?? port,
    principal: 'alice',
    nodeId: 'web-01',
    commands: registry,
    client: client(),
    nodeInfo: node,
  );

  String shown() =>
      term.writes.map((w) => utf8.decode(w, allowMalformed: true)).join();
  Future<void> pumpMs([int ms = 5]) =>
      Future<void>.delayed(Duration(milliseconds: ms));

  test('the context exposes runFullScreen and the shell family', () async {
    final probe = _FullScreenProbe();
    buildWith(LocalCommandRegistry()..register(probe));

    term.emitInput(':fs\r');
    await probe.started;

    expect(probe.hadRunFullScreen, isTrue);
    expect(probe.family, ShellFamily.posix);

    term.emitInput('\x11'); // Ctrl-Q ends the takeover
    await pumpMs();
  });

  test('every keystroke is diverted raw to the takeover body', () async {
    final probe = _FullScreenProbe();
    buildWith(LocalCommandRegistry()..register(probe));

    term.emitInput(':fs\r');
    await probe.started;
    port.stdin.clear();

    // Keys that the idle line editor would otherwise interpret: an arrow walks
    // history, Ctrl-C clears the line. In full-screen they must pass through raw.
    term.emitInput('\x1b[A'); // Up arrow
    term.emitInput('\x03'); // Ctrl-C
    term.emitInput('x'); // printable
    await pumpMs();
    term.emitInput('\x11'); // Ctrl-Q ends
    await pumpMs();

    expect(probe.received, containsAllInOrder(utf8.encode('\x1b[A')));
    expect(probe.received, contains(0x03));
    expect(probe.received, contains(0x78)); // 'x'
    // Nothing leaked to the remote shell while the IDE owned the screen.
    expect(port.stdin, isEmpty);
  });

  test('terminal resizes are broadcast to the takeover', () async {
    final probe = _FullScreenProbe();
    final host = buildWith(LocalCommandRegistry()..register(probe));

    var resizes = 0;
    final sub = host.resizeEvents.listen((_) => resizes++);

    term.emitInput(':fs\r');
    await probe.started;

    term.emitResize(120, 40);
    await pumpMs();
    expect(resizes, 1);

    term.emitInput('\x11');
    await pumpMs();
    await sub.cancel();
  });

  test('the idle prompt is restored once after the takeover ends', () async {
    final probe = _FullScreenProbe();
    buildWith(LocalCommandRegistry()..register(probe));

    term.emitInput(':fs\r');
    await probe.started;
    // No idle prompt while the IDE owns the screen.
    expect('alice@web-01'.allMatches(shown()).length, 0);

    term.emitInput('\x11'); // Ctrl-Q ends the takeover
    await pumpMs();

    // The prompt is repainted exactly once (by _runLocalCommand) on return.
    expect('alice@web-01'.allMatches(shown()).length, 1);
  });

  test('dispose tears down without error during a takeover', () async {
    final probe = _FullScreenProbe();
    final host = buildWith(LocalCommandRegistry()..register(probe));

    term.emitInput(':fs\r');
    await probe.started;

    await host.dispose();
  });
}
