import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart';

/// An in-memory [OmnyShellConnection] that emulates just enough Hub behaviour to
/// drive `ClientRuntime` (and therefore `OmnyShellService`) in tests without a
/// real WebSocket: the hello/auth handshake, node discovery and ping.
///
/// Wire it into a service via:
/// ```dart
/// final hub = FakeHub(validToken: 't', nodes: [...]);
/// final service = OmnyShellService(connectionFactory: hub.factory);
/// ```
class FakeHub {
  /// The token that authenticates successfully.
  final String validToken;

  /// Roles returned in `auth.ok`.
  final List<String> roles;

  /// Nodes returned by `node.list.response`.
  List<NodeDescriptor> nodes;

  /// Detached/active sessions returned by `sessions.list.response`, across all
  /// nodes; responses are filtered by the requested node id.
  List<DetachedSessionInfo> sessions;

  /// A canned screen returned by `sessions.screen.response` (peek).
  String peekScreen;

  /// When true, the connection drops immediately after a successful auth
  /// (simulates an unstable Hub).
  final bool dropAfterAuth;

  /// Every control message the client sent, in order (for assertions).
  final List<ControlMessage> received = [];

  /// The most recently created connection (the live one).
  FakeHubConnection? connection;

  /// Creates a fake Hub.
  FakeHub({
    this.validToken = 'valid-token',
    this.roles = const ['admin'],
    this.nodes = const [],
    this.sessions = const [],
    this.peekScreen = 'screen contents',
    this.dropAfterAuth = false,
  });

  /// A [ConnectionFactory] that yields a fresh [FakeHubConnection] per connect.
  Future<OmnyShellConnection> factory(
    Uri uri, {
    Map<String, String>? headers,
  }) async {
    final c = FakeHubConnection(this);
    connection = c;
    return c;
  }
}

/// One emulated Hub connection.
class FakeHubConnection implements OmnyShellConnection {
  final FakeHub _hub;
  final StreamController<OmnyShellFrame> _incoming =
      StreamController<OmnyShellFrame>();
  final Completer<void> _done = Completer<void>();
  bool _open = true;

  /// Creates a connection that greets the client with a hub `hello` + nonce.
  FakeHubConnection(this._hub) {
    _emit(
      const ControlFrame(
        Hello(
          role: 'hub',
          protocolVersion: kProtocolVersion,
          minVersion: kMinProtocolVersion,
          nonce: 'test-nonce',
        ),
      ),
    );
  }

  @override
  Stream<OmnyShellFrame> get incoming => _incoming.stream;

  @override
  bool get isOpen => _open;

  @override
  Future<void> get done => _done.future;

  @override
  void send(OmnyShellFrame frame) {
    if (frame is! ControlFrame) return;
    final message = frame.message;
    _hub.received.add(message);
    switch (message) {
      case Hello():
        break;
      case AuthRequest(:final method, :final principal, :final token):
        if (method == 'token' && token == _hub.validToken) {
          _emit(
            ControlFrame(
              AuthOk(
                principal: principal,
                displayName: principal,
                roles: _hub.roles,
                sessionToken: 'session-token',
              ),
            ),
          );
          if (_hub.dropAfterAuth) {
            _emit(_close);
          }
        } else {
          _emit(
            const ControlFrame(
              AuthFail(reason: 'invalid_token', message: 'Invalid token'),
            ),
          );
        }
      case NodeListRequest():
        _emit(ControlFrame(NodeListResponse(_hub.nodes)));
      case AiConfigRequest(:final requestId):
        // The fake hub advertises no default AI provider; the web client then
        // registers the `:ai` setup stub.
        _emit(
          ControlFrame(
            AiConfigResponse(requestId: requestId, available: false),
          ),
        );
      case Ping(:final id, :final ts):
        _emit(ControlFrame(Pong(id: id, ts: ts, serverTs: ts)));
      case DetachedSessionsRequest(:final requestId, :final nodeId):
        final list = _hub.sessions.where((s) => s.nodeId == nodeId).toList();
        _emit(
          ControlFrame(
            DetachedSessionsResponse(requestId: requestId, sessions: list),
          ),
        );
      case DetachedSessionKillRequest(:final requestId, :final sessionRef):
        final before = _hub.sessions.length;
        _hub.sessions = _hub.sessions
            .where((s) => !_matches(s, sessionRef))
            .toList();
        final killed = _hub.sessions.length < before;
        _emit(
          ControlFrame(
            DetachedSessionKillResponse(
              requestId: requestId,
              ok: killed,
              message: killed ? 'terminated' : 'not found',
            ),
          ),
        );
      case ActiveSessionDetachRequest(:final requestId, :final sessionRef):
        DetachedSessionInfo? match;
        for (final s in _hub.sessions) {
          if (sessionRef.isEmpty || _matches(s, sessionRef)) {
            match = s;
            break;
          }
        }
        _emit(
          ControlFrame(
            ActiveSessionDetachResponse(
              requestId: requestId,
              ok: match != null,
              shortId: match?.shortId ?? '',
              message: match != null ? 'detached' : 'no active session',
            ),
          ),
        );
      case SessionScreenRequest(:final requestId, :final sessionRef):
        final found = _hub.sessions.any((s) => _matches(s, sessionRef));
        _emit(
          ControlFrame(
            SessionScreenResponse(
              requestId: requestId,
              ok: found,
              message: found ? '' : 'not found',
              screenBase64: found
                  ? base64.encode(utf8.encode(_hub.peekScreen))
                  : '',
            ),
          ),
        );
      default:
        break;
    }
  }

  bool _matches(DetachedSessionInfo s, String ref) =>
      s.sessionId == ref ||
      s.shortId == ref ||
      s.sessionId.startsWith(ref) ||
      s.shortId.startsWith(ref);

  /// Sentinel meaning "close the connection".
  static const OmnyShellFrame _close = ControlFrame(
    Hello(role: '__close__', protocolVersion: 0, minVersion: 0),
  );

  void _emit(OmnyShellFrame frame) {
    scheduleMicrotask(() {
      if (!_open || _incoming.isClosed) return;
      if (identical(frame, _close)) {
        unawaited(close());
      } else {
        _incoming.add(frame);
      }
    });
  }

  @override
  Future<void> close([int? code, String? reason]) async {
    if (!_open) return;
    _open = false;
    if (!_incoming.isClosed) await _incoming.close();
    if (!_done.isCompleted) _done.complete();
  }
}
