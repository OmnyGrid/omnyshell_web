import 'package:omnyshell/omnyshell_client_web.dart';

import '../core/app_error.dart';
import '../core/observable.dart';
import '../core/omnyshell_service.dart';
import '../storage/settings_store.dart';

/// Where the user is in the authentication lifecycle.
enum AuthStatus {
  /// No active connection.
  signedOut,

  /// A connect attempt is in flight.
  connecting,

  /// Connected and authenticated.
  connected,

  /// The last attempt failed.
  error,
}

/// An immutable snapshot of auth state, rendered by the UI.
class AuthSnapshot {
  /// The lifecycle status.
  final AuthStatus status;

  /// The authenticated principal when [status] is [AuthStatus.connected].
  final Principal? principal;

  /// The Hub URL of the active/last connection.
  final String? hubUri;

  /// The failure when [status] is [AuthStatus.error].
  final AppError? error;

  /// Creates a snapshot.
  const AuthSnapshot({
    required this.status,
    this.principal,
    this.hubUri,
    this.error,
  });

  /// The initial signed-out snapshot.
  const AuthSnapshot.signedOut() : this(status: AuthStatus.signedOut);

  /// Whether the user is connected.
  bool get isConnected => status == AuthStatus.connected;
}

/// Orchestrates login/logout and session persistence between the
/// [OmnyShellService] and the [SettingsStore], exposing an observable
/// [AuthSnapshot] for the UI.
class AuthController {
  final OmnyShellService _service;
  final SettingsStore _settings;

  /// Observable auth state.
  final Observable<AuthSnapshot> state;

  /// Creates a controller.
  AuthController(this._service, this._settings)
    : state = Observable(const AuthSnapshot.signedOut()) {
    _service.onConnectionLost = _onConnectionLost;
  }

  void _onConnectionLost() {
    if (!state.value.isConnected) return;
    state.value = AuthSnapshot(
      status: AuthStatus.error,
      hubUri: state.value.hubUri,
      error: const AppError(
        AppErrorKind.transport,
        'Connection to the Hub was lost.',
        hint: 'Reconnect to continue.',
      ),
    );
  }

  /// The current snapshot.
  AuthSnapshot get snapshot => state.value;

  /// Connects to [hub] as [principal] using [token]. When [remember] is set the
  /// token is persisted for the next reload; otherwise it is kept in memory
  /// only. Updates [state] to reflect connecting → connected/error.
  Future<void> login({
    required String hub,
    required String principal,
    required String token,
    required bool remember,
  }) async {
    state.value = const AuthSnapshot(status: AuthStatus.connecting);
    try {
      final identity = await _service.connect(
        hubUri: hub,
        principal: principal,
        token: token,
      );
      final uri = _service.hubUri!.toString();
      _settings
        ..hub = hub
        ..principal = principal
        ..rememberToken = remember;
      if (remember) {
        _settings.saveToken(uri, token);
      } else {
        _settings.clearToken(uri);
      }
      state.value = AuthSnapshot(
        status: AuthStatus.connected,
        principal: identity,
        hubUri: uri,
      );
    } on Object catch (e) {
      final err = AppError.from(e);
      state.value = AuthSnapshot(status: AuthStatus.error, error: err);
    }
  }

  /// Disconnects, forgets the persisted token for the active Hub, and returns to
  /// signed-out. The Hub URL and principal are kept to prefill the next login.
  Future<void> logout() async {
    final uri = _service.hubUri?.toString();
    await _service.disconnect();
    if (uri != null) _settings.clearToken(uri);
    _settings.rememberToken = false;
    state.value = const AuthSnapshot.signedOut();
  }

  /// Attempts to restore a prior session from storage on startup. Returns `true`
  /// when a remembered token existed and the reconnect succeeded.
  Future<bool> tryRestore() async {
    if (!_settings.rememberToken) return false;
    final hub = _settings.hub;
    final principal = _settings.principal;
    if (hub == null || principal == null) return false;
    final String uri;
    try {
      uri = OmnyShellService.normalizeHubUri(hub).toString();
    } on Object {
      return false;
    }
    final token = _settings.tokenFor(uri);
    if (token == null) return false;
    await login(hub: hub, principal: principal, token: token, remember: true);
    return state.value.isConnected;
  }

  /// Prefill values for the login form (last Hub + principal, and the remembered
  /// token when one is stored — enabling one-click reconnect).
  ({String hub, String principal, String token}) get prefill {
    final hub = _settings.hub ?? '';
    final principal = _settings.principal ?? '';
    var token = '';
    if (_settings.rememberToken && hub.isNotEmpty) {
      try {
        token =
            _settings.tokenFor(
              OmnyShellService.normalizeHubUri(hub).toString(),
            ) ??
            '';
      } on Object {
        token = '';
      }
    }
    return (hub: hub, principal: principal, token: token);
  }
}
