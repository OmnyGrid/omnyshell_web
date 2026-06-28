import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/state/async_state.dart';
import 'package:omnyshell_web/state/sessions_controller.dart';
import 'package:test/test.dart';

import '../support/fake_hub.dart';
import '../support/sample_data.dart';

void main() {
  Future<(OmnyShellService, SessionsController, FakeHub)> connected({
    List<dynamic>? sessions,
  }) async {
    final hub = FakeHub(
      validToken: 'good',
      sessions: [
        sampleSession('aaaa1111', command: 'vim'),
        sampleSession('bbbb2222'),
      ],
      peekScreen: 'hello from the session',
    );
    final service = OmnyShellService(connectionFactory: hub.factory);
    await service.connect(hubUri: 'h', principal: 'alice', token: 'good');
    return (service, SessionsController(service, 'web-01'), hub);
  }

  test('refresh loads the node sessions', () async {
    final (_, sessions, _) = await connected();
    await sessions.refresh();
    expect(sessions.state.value.status, LoadStatus.ready);
    expect(sessions.state.value.data!.map((s) => s.shortId), [
      'aaaa1111',
      'bbbb2222',
    ]);
  });

  test('kill removes the session and reports success', () async {
    final (_, sessions, _) = await connected();
    await sessions.refresh();
    final result = await sessions.kill('aaaa1111');
    expect(result.ok, isTrue);
    expect(sessions.state.value.data!.map((s) => s.shortId), ['bbbb2222']);
  });

  test('kill of an unknown ref reports failure', () async {
    final (_, sessions, _) = await connected();
    await sessions.refresh();
    final result = await sessions.kill('zzzz9999');
    expect(result.ok, isFalse);
  });

  test('detach reports the short id', () async {
    final (_, sessions, _) = await connected();
    await sessions.refresh();
    final result = await sessions.detach('aaaa1111');
    expect(result.ok, isTrue);
    expect(result.message, contains('detached'));
  });

  test('peek decodes the screen text', () async {
    final (_, sessions, _) = await connected();
    final peek = await sessions.peek('aaaa1111');
    expect(peek.ok, isTrue);
    expect(peek.text, 'hello from the session');
  });

  test('refresh error surfaces and retains prior data', () async {
    final (service, sessions, _) = await connected();
    await sessions.refresh();
    await service.disconnect();
    await sessions.refresh();
    expect(sessions.state.value.status, LoadStatus.error);
    expect(sessions.state.value.data, isNotNull);
  });
}
