import 'package:omnyshell/omnyshell_client_web.dart';

/// A user-facing error category, mapped from the lower-level OmnyShell
/// exceptions so the UI can show a tailored message and recovery hint without
/// switching on raw exception types everywhere.
enum AppErrorKind {
  /// Authentication was rejected (bad principal/token).
  auth,

  /// The transport failed — Hub unreachable, TLS not trusted, socket dropped.
  transport,

  /// The Hub took too long to respond.
  timeout,

  /// The caller lacks permission for the action.
  authorization,

  /// A node or session was not found / unavailable.
  notFound,

  /// Anything not otherwise classified.
  unknown,
}

/// A normalized error with a human-readable [message] and an optional recovery
/// [hint]. Built from any thrown object via [AppError.from].
class AppError implements Exception {
  /// The category of failure.
  final AppErrorKind kind;

  /// A concise, user-facing description.
  final String message;

  /// An optional next-step suggestion shown beneath the message.
  final String? hint;

  /// The original thrown object, kept for logging/diagnostics.
  final Object? cause;

  /// Creates an app error.
  const AppError(this.kind, this.message, {this.hint, this.cause});

  /// Classifies an arbitrary thrown [error] into an [AppError].
  factory AppError.from(Object error) {
    if (error is AppError) return error;
    if (error is AuthException) {
      return AppError(
        AppErrorKind.auth,
        'Authentication failed: ${error.message}',
        hint: 'Check the principal and token, then try again.',
        cause: error,
      );
    }
    if (error is AuthorizationException) {
      return AppError(
        AppErrorKind.authorization,
        'Not authorized: ${error.message}',
        cause: error,
      );
    }
    if (error is OmnyShellTimeoutException) {
      return AppError(
        AppErrorKind.timeout,
        'The Hub did not respond in time.',
        hint: 'It may be busy or unreachable — retry shortly.',
        cause: error,
      );
    }
    if (error is NodeUnavailableException) {
      return AppError(
        AppErrorKind.notFound,
        'Node unavailable: ${error.message}',
        cause: error,
      );
    }
    if (error is TransportException) {
      return AppError(
        AppErrorKind.transport,
        'Connection failed: ${error.message}',
        hint:
            'Verify the Hub URL is reachable over wss:// and its certificate '
            'is trusted by this browser. Self-signed Hubs must be trusted at '
            'the OS/browser level first.',
        cause: error,
      );
    }
    if (error is OmnyShellException) {
      return AppError(AppErrorKind.unknown, error.message, cause: error);
    }
    return AppError(AppErrorKind.unknown, error.toString(), cause: error);
  }

  @override
  String toString() => 'AppError($kind, $message)';
}
