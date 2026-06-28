import 'dart:async';
import 'dart:typed_data';

import 'package:omnyshell/omnyshell_client_web.dart'
    show SessionId, ShellFamily, ShellSessionPort;
import 'package:omnyshell_web/terminal/terminal_view.dart';

/// A scriptable [TerminalView] for tests: records output and lets tests drive
/// input/resize events.
class FakeTerminalView implements TerminalView {
  /// Raw byte chunks written to the terminal.
  final List<List<int>> writes = [];

  /// Text notices written to the terminal.
  final List<String> texts = [];

  /// Whether the terminal was focused / disposed.
  bool focused = false;
  bool disposed = false;

  void Function(String data)? _input;
  void Function(int cols, int rows)? _resize;

  ({int cols, int rows}) _size;

  /// Creates a fake terminal of [cols]×[rows].
  FakeTerminalView({int cols = 80, int rows = 24})
    : _size = (cols: cols, rows: rows);

  /// Simulates the user typing [data].
  void emitInput(String data) => _input?.call(data);

  /// Simulates a terminal resize.
  void emitResize(int cols, int rows) {
    _size = (cols: cols, rows: rows);
    _resize?.call(cols, rows);
  }

  @override
  void write(List<int> bytes) => writes.add(bytes);

  @override
  void writeText(String text) => texts.add(text);

  @override
  void onInput(void Function(String data) handler) => _input = handler;

  @override
  void onResize(void Function(int cols, int rows) handler) => _resize = handler;

  @override
  ({int cols, int rows}) get size => _size;

  @override
  void focus() => focused = true;

  /// Test-settable selection text returned by [selection].
  String selectionText = '';

  @override
  String get selection => selectionText;

  @override
  void clearSelection() => selectionText = '';

  @override
  void dispose() => disposed = true;
}

/// A scriptable [ShellSessionPort] for tests (separate stdout/stderr, mirroring
/// `RemoteSession`).
class FakeShellSessionPort implements ShellSessionPort {
  final StreamController<Uint8List> _stdout = StreamController<Uint8List>();
  final StreamController<Uint8List> _stderr = StreamController<Uint8List>();
  final Completer<int> _exit = Completer<int>();

  @override
  ShellFamily shellFamily;

  @override
  SessionId? id;

  bool _wasDetached = false;

  /// stdin chunks received.
  final List<List<int>> stdin = [];

  /// Resize calls received as `(cols, rows)`.
  final List<(int, int)> resizes = [];

  /// Window grants received.
  final List<int> grants = [];

  /// Interrupt / detach / close call counts.
  int interrupts = 0;
  bool detached = false;
  bool closed = false;

  FakeShellSessionPort({this.shellFamily = ShellFamily.posix, this.id});

  /// Pushes remote stdout (no-op once closed/detached).
  void emit(List<int> bytes) {
    if (!_stdout.isClosed) _stdout.add(Uint8List.fromList(bytes));
  }

  /// Pushes remote stderr.
  void emitStderr(List<int> bytes) {
    if (!_stderr.isClosed) _stderr.add(Uint8List.fromList(bytes));
  }

  /// Completes the session with [code].
  void exit(int code) {
    if (!_exit.isCompleted) _exit.complete(code);
  }

  @override
  Stream<Uint8List> get stdout => _stdout.stream;

  @override
  Stream<Uint8List> get stderr => _stderr.stream;

  @override
  Future<int> get exitCode => _exit.future;

  @override
  bool get wasDetached => _wasDetached;

  @override
  void writeStdin(List<int> data) => stdin.add(data);

  @override
  void resize({required int cols, required int rows}) =>
      resizes.add((cols, rows));

  @override
  void grantWindow(int credit) => grants.add(credit);

  @override
  void interrupt() => interrupts++;

  @override
  Future<void> detach() async {
    detached = true;
    _wasDetached = true;
    await _close();
  }

  @override
  Future<void> close() async {
    closed = true;
    await _close();
  }

  Future<void> _close() async {
    if (!_stdout.isClosed) await _stdout.close();
    if (!_stderr.isClosed) await _stderr.close();
  }
}
