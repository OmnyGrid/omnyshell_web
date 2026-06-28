import 'dart:async';
import 'dart:typed_data';

import 'package:omnyshell/omnyshell_client_web.dart';

import 'terminal_view.dart';

/// Adapts a [RemoteSession] to the [SessionIo] the [SessionBridge] consumes,
/// merging stdout+stderr into one output stream and forwarding control.
class RemoteSessionIo implements SessionIo {
  final RemoteSession _session;
  final StreamController<List<int>> _output = StreamController<List<int>>();
  final List<StreamSubscription<Uint8List>> _subs = [];

  /// Wraps [session].
  RemoteSessionIo(this._session) {
    _subs.add(_session.stdout.listen(_output.add));
    _subs.add(_session.stderr.listen(_output.add));
  }

  @override
  Stream<List<int>> get output => _output.stream;

  @override
  void writeStdin(List<int> data) => _session.writeStdin(data);

  @override
  void resize(int cols, int rows) => _session.resize(cols: cols, rows: rows);

  @override
  void grantWindow(int bytes) => _session.grantWindow(bytes);

  @override
  void interrupt() => _session.interrupt();

  @override
  Future<int> get exitCode => _session.exitCode;

  @override
  Future<void> detach() async {
    await _session.detach();
    await _dispose();
  }

  @override
  Future<void> close() async {
    await _session.close();
    await _dispose();
  }

  Future<void> _dispose() async {
    for (final s in _subs) {
      await s.cancel();
    }
    _subs.clear();
    if (!_output.isClosed) await _output.close();
  }
}
