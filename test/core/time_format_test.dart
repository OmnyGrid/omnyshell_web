import 'package:omnyshell_web/core/time_format.dart';
import 'package:test/test.dart';

void main() {
  final now = DateTime.utc(2026, 1, 1, 12);

  group('relativeTime', () {
    test('seconds', () {
      expect(
        relativeTime(now.subtract(const Duration(seconds: 30)), now),
        '30s ago',
      );
    });
    test('minutes', () {
      expect(
        relativeTime(now.subtract(const Duration(minutes: 5)), now),
        '5m ago',
      );
    });
    test('hours', () {
      expect(
        relativeTime(now.subtract(const Duration(hours: 3)), now),
        '3h ago',
      );
    });
    test('days', () {
      expect(
        relativeTime(now.subtract(const Duration(days: 2)), now),
        '2d ago',
      );
    });
    test('future clamps to just now', () {
      expect(
        relativeTime(now.add(const Duration(minutes: 1)), now),
        'just now',
      );
    });
  });

  group('untilExpiry', () {
    test('minutes', () {
      expect(untilExpiry(now.add(const Duration(minutes: 30)), now), 'in 30m');
    });
    test('hours', () {
      expect(untilExpiry(now.add(const Duration(hours: 4)), now), 'in 4h');
    });
    test('past is expired', () {
      expect(
        untilExpiry(now.subtract(const Duration(minutes: 1)), now),
        'expired',
      );
    });
  });
}
