@TestOn('vm')
library;

import 'dart:async';

import 'package:omnyshell/omnyshell_client_web.dart'
    show
        ClientConfig,
        ClientRuntime,
        LocalCommandContext,
        NodeDescriptor,
        NodeId,
        PlatformInfo,
        TokenCredentialProvider;
import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:omnyshell_web/terminal/ide_command_factory.dart';
import 'package:test/test.dart';

import '../support/fake_terminal.dart';

void main() {
  late FakeTerminalView term;
  late List<String> lines;

  setUp(() {
    term = FakeTerminalView(cols: 80, rows: 24);
    lines = [];
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

  WebIdeCommand command() => WebIdeCommand(
    term: term,
    resizeEvents: const Stream<void>.empty(),
    service: OmnyShellService(),
    settings: SettingsStore(MemoryKeyValueStore()),
  );

  // A no-op full-screen seam; the guard paths under test return before using it.
  Future<void> noopFullScreen(
    Future<void> Function(Stream<List<int>> input) body,
  ) async {}

  LocalCommandContext context({
    Future<void> Function(Future<void> Function(Stream<List<int>>) body)?
    runFullScreen,
    ClientRuntime? client,
    String? Function()? currentRemoteCwd,
  }) => LocalCommandContext(
    node: node(),
    startedAt: DateTime.now(),
    writeLine: lines.add,
    client: client,
    currentRemoteCwd: currentRemoteCwd,
    runFullScreen: runFullScreen,
  );

  test('registers under :ide with the :edit alias', () {
    final cmd = command();
    expect(cmd.name, 'ide');
    expect(cmd.aliases, contains('edit'));
  });

  test('refuses without a full-screen-capable terminal', () async {
    await command().run(context(client: client()), const []);
    expect(lines.join(), contains('requires an interactive terminal'));
  });

  test('refuses without a connected session', () async {
    await command().run(
      context(runFullScreen: noopFullScreen, client: null),
      const [],
    );
    expect(lines.join(), contains('requires a connected session'));
  });

  test('rejects more than one path argument', () async {
    await command().run(
      context(runFullScreen: noopFullScreen, client: client()),
      const ['a', 'b'],
    );
    expect(lines.join(), contains('usage: :ide [path]'));
  });

  test('reports when the remote cwd is not yet known', () async {
    await command().run(
      context(
        runFullScreen: noopFullScreen,
        client: client(),
        currentRemoteCwd: () => null,
      ),
      const [], // no path arg → needs the cwd, which is unknown
    );
    expect(lines.join(), contains('remote working directory unknown'));
  });
}
