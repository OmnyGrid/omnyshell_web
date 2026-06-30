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

/// Owns the screen (registers an interrupt handler, like the running agent) but
/// holds via a test-controlled completer rather than a pending prompt — so a
/// marker arriving mid-run mirrors the agent running a command, not awaiting a
/// confirmation.
class _ScreenOwnerProbe extends LocalCommand {
  final _started = Completer<void>();
  final _finish = Completer<void>();

  /// Completes once [run] has begun and taken the screen.
  Future<void> get started => _started.future;

  /// Lets [run] return.
  void finish() => _finish.complete();

  @override
  String get name => 'own';

  @override
  String get description => 'owns the screen';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    context.onInterruptRequest?.call(() {});
    _started.complete();
    await _finish.future;
    context.onInterruptRequest?.call(null);
  }
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
  // A command-completion marker (CwdMarker token derived from the session id).
  String markerLine(String cwd) => '__OMNYSHELL_CWD_testnonce__$cwd\t\t\t\n';

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

  test('idle prompt is suppressed while the agent owns the screen', () async {
    final probe = _ScreenOwnerProbe();
    final registry = LocalCommandRegistry()..register(probe);
    buildWith(registry);

    term.emitInput(':own\r');
    await probe.started; // the agent registered its interrupt handler

    // A command-completion marker arriving mid-run (as the `:ai` agent's own
    // commands do) must NOT paint a fresh idle prompt between output lines.
    final before = 'alice@web-01'.allMatches(shown()).length;
    port.emit(utf8.encode(markerLine('/home/alice')));
    await pumpMs();
    expect(
      'alice@web-01'.allMatches(shown()).length,
      before,
      reason: 'no idle prompt while the agent owns the screen',
    );

    // Finishing the agent restores the prompt (at least once), reflecting the
    // cwd the suppressed marker carried.
    probe.finish();
    await pumpMs();
    final after = shown();
    expect(
      'alice@web-01'.allMatches(after).length,
      greaterThanOrEqualTo(before + 1),
      reason: 'prompt repainted after the agent finishes',
    );
    expect(after, contains('/home/alice'));
  });

  test(
    'Ctrl-C while reading fires the interrupt handler and ends the prompt',
    () async {
      final probe = _ProbeCommand();
      final registry = LocalCommandRegistry()..register(probe);
      buildWith(registry);

      term.emitInput(':probe\r');
      await probe.started;

      term.emitInput('\x03'); // Ctrl-C
      await pumpMs();

      // The host routes a line-mode Ctrl-C like the CLI's SIGINT handler: it fires
      // the agent's registered interrupt handler (which requests the abort) and
      // unblocks the pending prompt (the editor completes it with '').
      expect(probe.interrupted, isTrue);
      expect(probe.answer, '');
      expect(shown(), contains('^C'));
    },
  );

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
