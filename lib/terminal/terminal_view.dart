/// A terminal surface the app can write bytes to and receive input/resize from.
/// Abstracted so the wiring ([SessionBridge]) is testable with a fake, while the
/// production implementation (`XtermTerminalView`) wraps xterm.js.
abstract class TerminalView {
  /// Writes raw output [bytes] to the terminal.
  void write(List<int> bytes);

  /// Writes a UTF-8 [text] line (used for local status notices).
  void writeText(String text);

  /// Registers [handler] for user keystrokes (xterm delivers a decoded string).
  void onInput(void Function(String data) handler);

  /// Registers [handler] for terminal resize (new column/row counts).
  void onResize(void Function(int cols, int rows) handler);

  /// Current terminal size in columns/rows.
  ({int cols, int rows}) get size;

  /// Gives the terminal keyboard focus.
  void focus();

  /// Disposes the terminal and detaches listeners.
  void dispose();
}

/// The session-side I/O the terminal is wired to: a merged output stream, stdin,
/// resize, flow-control window grants, and lifecycle. Abstracted so the bridge
/// is testable without a real `RemoteSession`/socket.
abstract class SessionIo {
  /// Merged stdout+stderr from the remote session.
  Stream<List<int>> get output;

  /// Sends [data] to the remote session's stdin.
  void writeStdin(List<int> data);

  /// Informs the remote of a new terminal size.
  void resize(int cols, int rows);

  /// Replenishes the remote's send window by [bytes] consumed (back-pressure).
  void grantWindow(int bytes);

  /// Sends an interrupt (Ctrl-C / SIGINT).
  void interrupt();

  /// Completes with the process exit code when the session ends.
  Future<int> get exitCode;

  /// Detaches the session, leaving it alive on the node for later resume.
  Future<void> detach();

  /// Closes/terminates the session.
  Future<void> close();
}
