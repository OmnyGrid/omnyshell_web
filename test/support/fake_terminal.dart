import 'dart:async';

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

  @override
  void dispose() => disposed = true;
}

/// A scriptable [SessionIo] for tests.
class FakeSessionIo implements SessionIo {
  final StreamController<List<int>> _output = StreamController<List<int>>();
  final Completer<int> _exit = Completer<int>();

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

  /// Pushes remote output (no-op once the session has closed/detached).
  void emit(List<int> bytes) {
    if (!_output.isClosed) _output.add(bytes);
  }

  /// Completes the session with [code].
  void exit(int code) {
    if (!_exit.isCompleted) _exit.complete(code);
  }

  @override
  Stream<List<int>> get output => _output.stream;

  @override
  void writeStdin(List<int> data) => stdin.add(data);

  @override
  void resize(int cols, int rows) => resizes.add((cols, rows));

  @override
  void grantWindow(int bytes) => grants.add(bytes);

  @override
  void interrupt() => interrupts++;

  @override
  Future<int> get exitCode => _exit.future;

  @override
  Future<void> detach() async {
    detached = true;
    if (!_output.isClosed) await _output.close();
  }

  @override
  Future<void> close() async {
    closed = true;
    if (!_output.isClosed) await _output.close();
  }
}
