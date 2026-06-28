import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart';

import '../core/app_error.dart';
import '../core/observable.dart';
import '../core/omnyshell_service.dart';
import 'async_state.dart';

/// The outcome of a session action (kill/detach), surfaced to the UI as a toast.
class ActionResult {
  /// Whether the action succeeded.
  final bool ok;

  /// A human-readable message.
  final String message;

  /// Creates an action result.
  const ActionResult(this.ok, this.message);
}

/// A captured session screen, decoded to text for display.
class PeekResult {
  /// Whether the capture succeeded.
  final bool ok;

  /// A human-readable message on failure.
  final String message;

  /// The screen content decoded as UTF-8 (may contain ANSI escapes).
  final String text;

  /// Whether the capture ends inside a full-screen (alt-screen) program.
  final bool altScreen;

  /// Creates a peek result.
  const PeekResult({
    required this.ok,
    required this.message,
    required this.text,
    required this.altScreen,
  });
}

/// Loads and acts on the sessions of a single node: list, kill, detach, peek.
/// Created per sessions-screen instance (sessions are per-node and ephemeral).
class SessionsController {
  final OmnyShellService _service;

  /// The node whose sessions are managed.
  final String nodeId;

  /// Observable session-list state.
  final Observable<AsyncState<List<DetachedSessionInfo>>> state;

  /// Creates a controller for [nodeId].
  SessionsController(this._service, this.nodeId)
    : state = Observable(const AsyncState.idle());

  /// Fetches the session list from the node.
  Future<void> refresh() async {
    final prev = state.value.data;
    state.value = AsyncState.loading(data: prev, stale: prev != null);
    try {
      final sessions = await _service.listSessions(nodeId);
      state.value = AsyncState.ready(sessions);
    } on AppError catch (e) {
      state.value = AsyncState.error(e, data: prev);
    }
  }

  /// Terminates [sessionRef], then refreshes. Returns the outcome.
  Future<ActionResult> kill(String sessionRef) async {
    try {
      final r = await _service.killSession(nodeId, sessionRef);
      await refresh();
      return ActionResult(
        r.ok,
        r.message.isEmpty ? 'Session terminated.' : r.message,
      );
    } on AppError catch (e) {
      return ActionResult(false, e.message);
    }
  }

  /// Detaches the active [sessionRef] (empty = sole active), then refreshes.
  Future<ActionResult> detach(String sessionRef) async {
    try {
      final r = await _service.detachSession(nodeId, sessionRef: sessionRef);
      await refresh();
      final msg = r.message.isNotEmpty
          ? r.message
          : (r.ok ? 'Detached ${r.shortId}.' : 'Detach failed.');
      return ActionResult(r.ok, msg);
    } on AppError catch (e) {
      return ActionResult(false, e.message);
    }
  }

  /// Captures the current screen of [sessionRef] without attaching.
  Future<PeekResult> peek(String sessionRef) async {
    try {
      final r = await _service.peekSession(nodeId, sessionRef);
      return PeekResult(
        ok: r.ok,
        message: r.message,
        text: utf8.decode(r.screen, allowMalformed: true),
        altScreen: r.altScreen,
      );
    } on AppError catch (e) {
      return PeekResult(
        ok: false,
        message: e.message,
        text: '',
        altScreen: false,
      );
    }
  }
}
