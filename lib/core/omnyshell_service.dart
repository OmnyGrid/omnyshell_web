import 'package:omnyshell/omnyshell_client_web.dart';

import 'app_error.dart';

/// A thin facade over the OmnyShell [ClientRuntime] that the UI talks to.
///
/// It owns the connected client, normalizes Hub URLs, and translates raw
/// OmnyShell exceptions into [AppError]s. Business logic (handshake, node
/// discovery, session lifecycle) stays in `ClientRuntime` — this layer only
/// adapts it to the web app.
class OmnyShellService {
  /// Optional transport override. Production leaves this `null` (the browser
  /// WebSocket default); tests inject a fake hub connection.
  final ConnectionFactory? connectionFactory;

  ClientRuntime? _client;
  Principal? _principal;
  Uri? _hubUri;
  bool _intentionalClose = false;

  /// Called when the Hub connection drops unexpectedly (not via [disconnect]).
  void Function()? onConnectionLost;

  /// Creates a service. Provide [connectionFactory] in tests to bypass a real
  /// WebSocket.
  OmnyShellService({this.connectionFactory});

  /// Whether a client is connected and authenticated.
  bool get isConnected => _client?.isConnected ?? false;

  /// The authenticated principal, or `null` when signed out.
  Principal? get principal => _principal;

  /// The Hub URI of the active connection, or `null`.
  Uri? get hubUri => _hubUri;

  /// The underlying client (available after [connect]); used by later
  /// milestones for node/session calls.
  ClientRuntime get client {
    final c = _client;
    if (c == null) {
      throw const AppError(AppErrorKind.transport, 'Not connected to a Hub.');
    }
    return c;
  }

  /// Connects to [hubUri] and authenticates as [principal] with [token].
  ///
  /// [hubUri] may omit the scheme (defaults to `wss://`). Throws an [AppError]
  /// on failure; the client is torn down so the caller can retry cleanly.
  Future<Principal> connect({
    required String hubUri,
    required String principal,
    required String token,
  }) async {
    final uri = normalizeHubUri(hubUri);
    _intentionalClose = false;
    final client = ClientRuntime(
      ClientConfig(
        hubUri: uri,
        credentials: TokenCredentialProvider(
          principal: principal,
          token: token,
        ),
        connectionFactory: connectionFactory,
        onDisconnected: _handleDisconnect,
      ),
    );
    try {
      await client.connect();
    } on Object catch (e) {
      await client.close();
      throw AppError.from(e);
    }
    _client = client;
    _principal = client.principal;
    _hubUri = uri;
    return client.principal!;
  }

  /// Disconnects and clears all in-memory connection state.
  Future<void> disconnect() async {
    _intentionalClose = true;
    final client = _client;
    _client = null;
    _principal = null;
    _hubUri = null;
    await client?.close();
  }

  void _handleDisconnect() {
    if (_intentionalClose) return;
    _client = null;
    _principal = null;
    onConnectionLost?.call();
  }

  /// Measures round-trip latency to the Hub.
  Future<Duration> ping() => _guard(() => client.ping());

  /// Lists the nodes visible to the authenticated principal.
  Future<List<NodeDescriptor>> listNodes({
    Map<String, String> filter = const {},
  }) => _guard(() => client.listNodes(filter: filter));

  /// Fetches the Hub's default AI configuration (provider/model, never a key).
  Future<HubAiConfig> fetchHubAiConfig() =>
      _guard(() => client.fetchHubAiConfig());

  /// Lists the caller's sessions (active + detached) on [nodeId].
  Future<List<DetachedSessionInfo>> listSessions(String nodeId) =>
      _guard(() => client.listSessions(nodeId: nodeId));

  /// Terminates the caller's session [sessionRef] on [nodeId].
  Future<DetachedSessionKillResult> killSession(
    String nodeId,
    String sessionRef,
  ) => _guard(() => client.killSession(nodeId: nodeId, sessionRef: sessionRef));

  /// Captures the current screen of session [sessionRef] on [nodeId] without
  /// attaching to it.
  Future<SessionScreenResult> peekSession(String nodeId, String sessionRef) =>
      _guard(() => client.peekSession(nodeId: nodeId, sessionRef: sessionRef));

  /// Detaches the caller's active session [sessionRef] on [nodeId] (empty
  /// [sessionRef] targets the sole active session).
  Future<ActiveSessionDetachResult> detachSession(
    String nodeId, {
    String sessionRef = '',
  }) => _guard(
    () => client.detachActiveSession(nodeId: nodeId, sessionRef: sessionRef),
  );

  /// Opens a fresh interactive shell on [nodeId] sized [cols]×[rows].
  Future<RemoteSession> openShell({
    required String nodeId,
    required int cols,
    required int rows,
  }) => _guard(
    () => client.openSession(
      nodeId: nodeId,
      mode: SessionMode.shell,
      pty: PtySpec(term: 'xterm-256color', cols: cols, rows: rows),
    ),
  );

  /// Resumes the detached session [sessionRef] on [nodeId] at [cols]×[rows].
  Future<RemoteSession> resumeSession({
    required String nodeId,
    required String sessionRef,
    required int cols,
    required int rows,
  }) => _guard(
    () => client.resumeSession(
      nodeId: nodeId,
      sessionId: sessionRef,
      pty: PtySpec(term: 'xterm-256color', cols: cols, rows: rows),
    ),
  );

  Future<T> _guard<T>(Future<T> Function() action) async {
    try {
      return await action();
    } on Object catch (e) {
      throw AppError.from(e);
    }
  }

  /// Normalizes a user-entered Hub address into a `wss://` [Uri].
  ///
  /// Accepts `host`, `host:port`, `wss://host:port[/path]`. A bare `ws://`
  /// scheme is preserved (for local dev), anything else becomes `wss://`.
  /// Throws an [AppError] for empty or unparseable input.
  static Uri normalizeHubUri(String input) {
    final trimmed = input.trim();
    if (trimmed.isEmpty) {
      throw const AppError(AppErrorKind.transport, 'Enter a Hub address.');
    }
    final hasScheme = trimmed.contains('://');
    final candidate = hasScheme ? trimmed : 'wss://$trimmed';
    final Uri uri;
    try {
      uri = Uri.parse(candidate);
    } on FormatException {
      throw AppError(AppErrorKind.transport, 'Invalid Hub address: $input');
    }
    if (uri.host.isEmpty) {
      throw AppError(AppErrorKind.transport, 'Invalid Hub address: $input');
    }
    if (uri.scheme != 'wss' && uri.scheme != 'ws') {
      return uri.replace(scheme: 'wss');
    }
    return uri;
  }
}
