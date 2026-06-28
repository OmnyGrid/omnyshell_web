import 'dart:async';

/// A minimal observable value: holds a current [value] and notifies listeners
/// on change via a broadcast [stream]. The web app's lightweight alternative to
/// a state-management framework — screens subscribe and re-render their DOM
/// subtree when the value changes.
class Observable<T> {
  T _value;
  final StreamController<T> _controller = StreamController<T>.broadcast();

  /// Creates an observable seeded with [initial].
  Observable(T initial) : _value = initial;

  /// The current value.
  T get value => _value;

  /// Replaces the value and notifies listeners. A no-op if [next] equals the
  /// current value (by `==`), so identical updates don't churn the DOM.
  set value(T next) {
    if (_value == next) return;
    _value = next;
    if (!_controller.isClosed) _controller.add(next);
  }

  /// Forces a notification even when the value is unchanged (e.g. after an
  /// in-place mutation of a collection held by reference).
  void notify() {
    if (!_controller.isClosed) _controller.add(_value);
  }

  /// The change stream (broadcast; does not replay the current value).
  Stream<T> get stream => _controller.stream;

  /// Subscribes [listener], invoking it immediately with the current value and
  /// again on every change. Returns the subscription for cancellation.
  StreamSubscription<T> listen(void Function(T value) listener) {
    listener(_value);
    return _controller.stream.listen(listener);
  }

  /// Releases the underlying stream controller.
  Future<void> dispose() => _controller.close();
}
