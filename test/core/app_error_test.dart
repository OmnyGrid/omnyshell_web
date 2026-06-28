import 'package:omnyshell/omnyshell_client_web.dart';
import 'package:omnyshell_web/core/app_error.dart';
import 'package:test/test.dart';

void main() {
  group('AppError.from', () {
    test('maps AuthException to auth kind with a hint', () {
      final e = AppError.from(const AuthException('bad token'));
      expect(e.kind, AppErrorKind.auth);
      expect(e.message, contains('bad token'));
      expect(e.hint, isNotNull);
    });

    test('maps TransportException to transport kind with TLS guidance', () {
      final e = AppError.from(const TransportException('refused'));
      expect(e.kind, AppErrorKind.transport);
      expect(e.hint, contains('trusted'));
    });

    test('maps timeout', () {
      final e = AppError.from(const OmnyShellTimeoutException('slow'));
      expect(e.kind, AppErrorKind.timeout);
    });

    test('passes through an existing AppError unchanged', () {
      const original = AppError(AppErrorKind.unknown, 'x');
      expect(identical(AppError.from(original), original), isTrue);
    });

    test('falls back to unknown for arbitrary objects', () {
      final e = AppError.from(StateError('boom'));
      expect(e.kind, AppErrorKind.unknown);
      expect(e.message, contains('boom'));
    });
  });
}
