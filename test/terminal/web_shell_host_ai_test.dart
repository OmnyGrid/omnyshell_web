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

/// A probe command exercising the interactive context the `:ai` agent relies on:
/// it reads a line, registers an interrupt handler, and records both.
class _ProbeCommand extends LocalCommand {
  String? answer;
  var interrupted = false;
  final _started = Completer<void>();

  /// Completes once [run] has begun (so a test can drive input deterministically).
  Future<void> get started => _started.future;

  @override
  String get name => 'probe';

  @override
  String get description => 'test probe';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    context.onInterruptRequest?.call(() => interrupted = true);
    _started.complete();
    answer = await context.readLine?.call('Confirm? ');
    context.onInterruptRequest?.call(null);
  }
}

/// A probe that writes a (possibly multi-line) string via `context.writeLine`.
class _WriterCommand extends LocalCommand {
  _WriterCommand(this._text);
  final String _text;

  @override
  String get name => 'write';

  @override
  String get description => 'test writer';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async =>
      context.writeLine(_text);
}

/// Records whether the context offered a live-session runner (so the `:ai` agent
/// runs sudo-capable commands in the PTY rather than via one-off exec).
class _RunnerProbe extends LocalCommand {
  bool? hasSessionRunner;

  @override
  String get name => 'runner';

  @override
  String get description => 'test runner probe';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    hasSessionRunner = context.runInSession != null;
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

  WebShellHost buildWith(LocalCommandRegistry registry) => WebShellHost(
    term: term,
    session: port,
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

  test('readLine delivers the next committed line to the command', () async {
    final probe = _ProbeCommand();
    final registry = LocalCommandRegistry()..register(probe);
    buildWith(registry);

    term.emitInput(':probe\r');
    await probe.started;
    // The prompt was written to the terminal.
    expect(shown(), contains('Confirm? '));

    // Type an answer; Enter routes it to the pending readLine, not the shell.
    term.emitInput('yes\r');
    await pumpMs();

    expect(probe.answer, 'yes');
  });

  test('multi-line command output is CRLF-normalized (no staircase)', () async {
    final probe = _WriterCommand('line1\nline2\nline3');
    final registry = LocalCommandRegistry()..register(probe);
    buildWith(registry);

    term.emitInput(':write\r');
    await pumpMs();

    final out = shown();
    expect(out, contains('line1\r\nline2\r\nline3\r\n'));
    // No bare LF that isn't part of a CRLF (the staircase signature).
    expect(RegExp(r'(?<!\r)\n').hasMatch(out), isFalse);
  });

  test('Ctrl-C while reading aborts the prompt with "q"', () async {
    final probe = _ProbeCommand();
    final registry = LocalCommandRegistry()..register(probe);
    buildWith(registry);

    term.emitInput(':probe\r');
    await probe.started;

    term.emitInput('\x03'); // Ctrl-C
    await pumpMs();

    expect(probe.answer, 'q');
    expect(shown(), contains('^C'));
  });

  test(
    'POSIX session wires runInSession (so sudo can prompt in the PTY)',
    () async {
      final probe = _RunnerProbe();
      final registry = LocalCommandRegistry()..register(probe);
      buildWith(registry); // default fake port is POSIX

      term.emitInput(':runner\r');
      await pumpMs();

      expect(probe.hasSessionRunner, isTrue);
    },
  );

  test(
    'non-POSIX session leaves runInSession null (falls back to exec)',
    () async {
      final probe = _RunnerProbe();
      final registry = LocalCommandRegistry()..register(probe);
      final cmdPort = FakeShellSessionPort(
        id: SessionId('testnonce'),
        shellFamily: ShellFamily.cmd,
      );
      WebShellHost(
        term: term,
        session: cmdPort,
        principal: 'alice',
        nodeId: 'web-01',
        commands: registry,
        client: client(),
        nodeInfo: node,
      );

      term.emitInput(':runner\r');
      await pumpMs();

      expect(probe.hasSessionRunner, isFalse);
    },
  );
}
