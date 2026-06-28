import 'package:omnyshell_web/core/app_error.dart';
import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:test/test.dart';

import '../support/fake_hub.dart';
import '../support/sample_data.dart';

void main() {
  group('normalizeHubUri', () {
    test('adds wss:// when no scheme is given', () {
      expect(
        OmnyShellService.normalizeHubUri('hub.example.com:8443').toString(),
        'wss://hub.example.com:8443',
      );
    });

    test('preserves an explicit wss:// URL', () {
      expect(
        OmnyShellService.normalizeHubUri('wss://h:9/x').toString(),
        'wss://h:9/x',
      );
    });

    test('upgrades https:// to wss://', () {
      expect(OmnyShellService.normalizeHubUri('https://h:9').scheme, 'wss');
    });

    test('rejects empty input', () {
      expect(
        () => OmnyShellService.normalizeHubUri('  '),
        throwsA(isA<AppError>()),
      );
    });
  });

  group('connect', () {
    test('authenticates and exposes the principal', () async {
      final hub = FakeHub(validToken: 'good', roles: ['admin', 'dev']);
      final service = OmnyShellService(connectionFactory: hub.factory);
      final principal = await service.connect(
        hubUri: 'hub:8443',
        principal: 'alice',
        token: 'good',
      );
      expect(principal.id.value, 'alice');
      expect(service.isConnected, isTrue);
      expect(service.principal!.roles, containsAll(['admin', 'dev']));
      expect(service.hubUri.toString(), 'wss://hub:8443');
      await service.disconnect();
    });

    test('throws an auth AppError on a bad token', () async {
      final hub = FakeHub(validToken: 'good');
      final service = OmnyShellService(connectionFactory: hub.factory);
      await expectLater(
        service.connect(hubUri: 'hub:8443', principal: 'alice', token: 'bad'),
        throwsA(
          isA<AppError>().having((e) => e.kind, 'kind', AppErrorKind.auth),
        ),
      );
      expect(service.isConnected, isFalse);
    });

    test('lists nodes after connecting', () async {
      final hub = FakeHub(
        validToken: 'good',
        nodes: [sampleNode('web-01'), sampleNode('db-02', online: false)],
      );
      final service = OmnyShellService(connectionFactory: hub.factory);
      await service.connect(hubUri: 'h', principal: 'a', token: 'good');
      final nodes = await service.listNodes();
      expect(nodes.map((n) => n.id.value), ['web-01', 'db-02']);
      expect(nodes[1].online, isFalse);
      await service.disconnect();
    });

    test('disconnect clears state', () async {
      final hub = FakeHub(validToken: 'good');
      final service = OmnyShellService(connectionFactory: hub.factory);
      await service.connect(hubUri: 'h', principal: 'a', token: 'good');
      await service.disconnect();
      expect(service.isConnected, isFalse);
      expect(service.principal, isNull);
      expect(service.hubUri, isNull);
    });
  });
}
