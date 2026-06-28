import 'package:omnyshell_web/core/observable.dart';
import 'package:test/test.dart';

void main() {
  group('Observable', () {
    test('notifies listeners on change', () async {
      final obs = Observable<int>(0);
      final seen = <int>[];
      final sub = obs.stream.listen(seen.add);
      obs.value = 1;
      obs.value = 2;
      await Future<void>.delayed(Duration.zero);
      expect(seen, [1, 2]);
      await sub.cancel();
    });

    test('dedupes equal values', () async {
      final obs = Observable<int>(0);
      final seen = <int>[];
      final sub = obs.stream.listen(seen.add);
      obs.value = 1;
      obs.value = 1;
      await Future<void>.delayed(Duration.zero);
      expect(seen, [1]);
      await sub.cancel();
    });

    test('listen() delivers the current value immediately', () {
      final obs = Observable<String>('hi');
      String? first;
      final sub = obs.listen((v) => first ??= v);
      expect(first, 'hi');
      sub.cancel();
    });

    test('notify() forces an update even when unchanged', () async {
      final obs = Observable<List<int>>([1]);
      var count = 0;
      final sub = obs.stream.listen((_) => count++);
      obs.value.add(2);
      obs.notify();
      await Future<void>.delayed(Duration.zero);
      expect(count, 1);
      await sub.cancel();
    });
  });
}
