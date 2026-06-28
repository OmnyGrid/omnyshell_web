import '../core/app_error.dart';

/// Where an async load currently stands.
enum LoadStatus {
  /// Not started.
  idle,

  /// A load is in flight.
  loading,

  /// Loaded successfully.
  ready,

  /// The load failed.
  error,
}

/// An immutable snapshot of an asynchronous value with explicit loading/error
/// states — the shape every data screen renders. Carries optional [data] even
/// while [LoadStatus.loading] or [LoadStatus.error] so the UI can show
/// last-known content (e.g. cached nodes) under a spinner or error banner.
class AsyncState<T> {
  /// The current status.
  final LoadStatus status;

  /// The current value, if any.
  final T? data;

  /// The failure when [status] is [LoadStatus.error].
  final AppError? error;

  /// Whether [data] is known-stale (e.g. served from cache pending a refresh).
  final bool stale;

  const AsyncState._(this.status, this.data, this.error, this.stale);

  /// Nothing loaded yet.
  const AsyncState.idle() : this._(LoadStatus.idle, null, null, false);

  /// A load is in flight, optionally over existing [data] (which may be [stale]).
  const AsyncState.loading({T? data, bool stale = false})
    : this._(LoadStatus.loading, data, null, stale);

  /// Loaded [data] successfully.
  const AsyncState.ready(T data) : this._(LoadStatus.ready, data, null, false);

  /// Failed with [error], optionally retaining prior [data].
  const AsyncState.error(AppError error, {T? data})
    : this._(LoadStatus.error, data, error, false);

  /// Whether a value is present.
  bool get hasData => data != null;

  /// Whether a load is currently running.
  bool get isLoading => status == LoadStatus.loading;
}
