import 'package:omnyshell_web/core/app_error.dart';
import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:test/test.dart';

import '../support/fake_hub.dart';

void main() {
  Future<void> pump() => Future<void>.delayed(Duration.zero);

  test('an unexpected disconnect flips auth into a transport error', () async {
    final hub = FakeHub(validToken: 'good');
    final service = OmnyShellService(connectionFactory: hub.factory);
    final auth = AuthController(service, SettingsStore(MemoryKeyValueStore()));
    await auth.login(hub: 'h', principal: 'a', token: 'good', remember: false);
    expect(auth.snapshot.isConnected, isTrue);

    await hub.connection!.close(); // simulate the Hub dropping the socket
    await pump();

    expect(auth.snapshot.status, AuthStatus.error);
    expect(auth.snapshot.error!.kind, AppErrorKind.transport);
    expect(service.isConnected, isFalse);
  });

  test(
    'an intentional logout does not raise a connection-lost error',
    () async {
      final hub = FakeHub(validToken: 'good');
      final service = OmnyShellService(connectionFactory: hub.factory);
      final auth = AuthController(
        service,
        SettingsStore(MemoryKeyValueStore()),
      );
      await auth.login(
        hub: 'h',
        principal: 'a',
        token: 'good',
        remember: false,
      );
      await auth.logout();
      await pump();
      expect(auth.snapshot.status, AuthStatus.signedOut);
    },
  );

  test('prefill includes a remembered token for one-click reconnect', () async {
    final kv = MemoryKeyValueStore();
    final settings = SettingsStore(kv);
    final hub = FakeHub(validToken: 'good');
    final service = OmnyShellService(connectionFactory: hub.factory);
    final auth = AuthController(service, settings);

    await auth.login(
      hub: 'h:8443',
      principal: 'alice',
      token: 'good',
      remember: true,
    );
    final prefill = auth.prefill;
    expect(prefill.hub, 'h:8443');
    expect(prefill.principal, 'alice');
    expect(prefill.token, 'good');
  });
}
