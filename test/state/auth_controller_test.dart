import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/state/auth_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:test/test.dart';

import '../support/fake_hub.dart';

void main() {
  late MemoryKeyValueStore kv;
  late SettingsStore settings;

  AuthController build(FakeHub hub) {
    final service = OmnyShellService(connectionFactory: hub.factory);
    return AuthController(service, settings);
  }

  setUp(() {
    kv = MemoryKeyValueStore();
    settings = SettingsStore(kv);
  });

  test('login transitions signedOut → connecting → connected', () async {
    final hub = FakeHub(validToken: 'good');
    final auth = build(hub);
    final seen = <AuthStatus>[];
    auth.state.stream.listen((s) => seen.add(s.status));

    await auth.login(
      hub: 'h:8443',
      principal: 'alice',
      token: 'good',
      remember: false,
    );
    // Let the broadcast stream flush the final event to the listener.
    await Future<void>.delayed(Duration.zero);

    expect(auth.snapshot.status, AuthStatus.connected);
    expect(auth.snapshot.principal!.id.value, 'alice');
    expect(seen, [AuthStatus.connecting, AuthStatus.connected]);
  });

  test('failed login ends in error state', () async {
    final auth = build(FakeHub(validToken: 'good'));
    await auth.login(
      hub: 'h',
      principal: 'alice',
      token: 'bad',
      remember: true,
    );
    expect(auth.snapshot.status, AuthStatus.error);
    expect(auth.snapshot.error, isNotNull);
    // A failed login must not persist a token.
    expect(
      kv.snapshot.keys.any((k) => k.startsWith('omnyshell.token.')),
      isFalse,
    );
  });

  test('remember=true persists hub, principal and token', () async {
    final auth = build(FakeHub(validToken: 'good'));
    await auth.login(
      hub: 'h:8443',
      principal: 'alice',
      token: 'good',
      remember: true,
    );
    expect(settings.hub, 'h:8443');
    expect(settings.principal, 'alice');
    expect(settings.rememberToken, isTrue);
    expect(settings.tokenFor('wss://h:8443'), 'good');
  });

  test('remember=false does not persist the token', () async {
    final auth = build(FakeHub(validToken: 'good'));
    await auth.login(
      hub: 'h:8443',
      principal: 'alice',
      token: 'good',
      remember: false,
    );
    expect(settings.tokenFor('wss://h:8443'), isNull);
  });

  test('logout disconnects and forgets the token', () async {
    final auth = build(FakeHub(validToken: 'good'));
    await auth.login(
      hub: 'h:8443',
      principal: 'alice',
      token: 'good',
      remember: true,
    );
    await auth.logout();
    expect(auth.snapshot.status, AuthStatus.signedOut);
    expect(settings.tokenFor('wss://h:8443'), isNull);
    expect(settings.rememberToken, isFalse);
    // Hub + principal are kept to prefill the next login.
    expect(settings.hub, 'h:8443');
    expect(settings.principal, 'alice');
  });

  test('tryRestore reconnects from a remembered token', () async {
    // Seed a prior remembered session.
    settings
      ..hub = 'h:8443'
      ..principal = 'alice'
      ..rememberToken = true
      ..saveToken('wss://h:8443', 'good');

    final auth = build(FakeHub(validToken: 'good'));
    final restored = await auth.tryRestore();
    expect(restored, isTrue);
    expect(auth.snapshot.isConnected, isTrue);
  });

  test('tryRestore returns false when nothing is remembered', () async {
    final auth = build(FakeHub(validToken: 'good'));
    expect(await auth.tryRestore(), isFalse);
    expect(auth.snapshot.status, AuthStatus.signedOut);
  });
}
