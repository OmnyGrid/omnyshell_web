import 'dart:async';
import 'dart:convert';

import 'terminal_view.dart';

/// Wires a [TerminalView] to a [SessionIo] in both directions:
///
/// - remote output → terminal (granting flow-control window for each chunk so
///   long output never stalls, mirroring `ClientRuntime.executeStreaming`);
/// - terminal keystrokes → remote stdin (UTF-8 encoded);
/// - terminal resize → remote resize;
/// - session exit → a local end-of-session notice.
///
/// Pure (no DOM / sockets) so the wiring is unit-testable with fakes.
class SessionBridge {
  final TerminalView _term;
  final SessionIo _io;
  StreamSubscription<List<int>>? _outputSub;
  bool _ended = false;

  /// Creates and immediately activates the bridge.
  SessionBridge(this._term, this._io) {
    _outputSub = _io.output.listen((bytes) {
      if (bytes.isEmpty) return;
      _io.grantWindow(bytes.length);
      _term.write(bytes);
    });

    _term.onInput((data) {
      if (data.isEmpty) return;
      _io.writeStdin(utf8.encode(data));
    });

    _term.onResize((cols, rows) => _io.resize(cols, rows));

    // Prime the remote with the current terminal size.
    final size = _term.size;
    if (size.cols > 0 && size.rows > 0) {
      _io.resize(size.cols, size.rows);
    }

    unawaited(_io.exitCode.then(_onExit).catchError((_) => _onExit(-1)));
  }

  void _onExit(int code) {
    if (_ended) return;
    _ended = true;
    _term.writeText('\r\n\x1b[90m[session ended — exit $code]\x1b[0m\r\n');
  }

  /// Whether the session has ended.
  bool get ended => _ended;

  /// Sends an interrupt to the session.
  void interrupt() => _io.interrupt();

  /// Detaches the session (keeps it alive on the node).
  Future<void> detach() async {
    await _outputSub?.cancel();
    await _io.detach();
  }

  /// Tears down the bridge and terminates the session.
  Future<void> close() async {
    await _outputSub?.cancel();
    await _io.close();
  }

  /// Cancels the output subscription without touching the session (on unmount).
  Future<void> dispose() async {
    await _outputSub?.cancel();
  }
}
