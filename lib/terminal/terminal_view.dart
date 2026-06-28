/// A terminal surface the app can write bytes to and receive input/resize from.
/// Abstracted so the host wiring ([WebShellHost]) is testable with a fake, while
/// the production implementation (`XtermTerminalView`) wraps xterm.js.
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

  /// The currently selected text (empty when there is no selection).
  String get selection;

  /// Clears any active selection.
  void clearSelection();

  /// Gives the terminal keyboard focus.
  void focus();

  /// Disposes the terminal and detaches listeners.
  void dispose();
}

/// The key-input surface the on-screen accessory bar drives: inject raw key
/// sequences and toggle a sticky Ctrl modifier. Implemented by [WebShellHost].
abstract class TerminalKeys {
  /// Injects [bytes] as if the user typed them.
  void sendKey(List<int> bytes);

  /// Toggles the sticky Ctrl modifier.
  void armCtrl();

  /// Whether the sticky Ctrl modifier is armed.
  bool get ctrlArmed;

  /// Set a callback notified when the Ctrl modifier arms/disarms.
  set onCtrlChange(void Function(bool armed)? callback);
}
