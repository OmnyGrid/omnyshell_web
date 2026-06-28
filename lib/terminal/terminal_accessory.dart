import 'dart:convert';
import 'dart:js_interop';

import 'package:web/web.dart' as web;

import '../ui/dom.dart';
import '../ui/widgets.dart';
import 'terminal_view.dart';

/// Reads the system clipboard (used by the Paste key). Returns `null` when empty
/// or unavailable.
typedef ClipboardReader = Future<String?> Function();

/// Writes [text] to the system clipboard (used by the Copy key).
typedef ClipboardWriter = Future<void> Function(String text);

/// An on-screen key bar for the terminal, giving touch devices the keys a soft
/// keyboard lacks — Esc, Tab, a sticky Ctrl, arrows, Home/End/PgUp/PgDn, common
/// symbols — plus Copy/Paste. Keys inject their byte sequences through the
/// [TerminalKeys] surface (the interactive shell), and taps avoid stealing focus
/// from the terminal so typing continues uninterrupted.
class TerminalAccessoryBar {
  final TerminalKeys keys;
  final TerminalView term;
  final ClipboardReader clipboardRead;
  final ClipboardWriter clipboardWrite;
  final void Function(String message) onToast;

  /// The bar's root element.
  late final web.HTMLElement element;

  late final web.HTMLButtonElement _ctrlButton;

  /// Builds the bar.
  TerminalAccessoryBar({
    required this.keys,
    required this.term,
    required this.clipboardRead,
    required this.clipboardWrite,
    required this.onToast,
  }) {
    _ctrlButton = _key('Ctrl', keys.armCtrl, aria: 'Control modifier');
    keys.onCtrlChange = (armed) =>
        _ctrlButton.classList.toggle('active', armed);

    element = el(
      'div',
      classes: 'term-accessory',
      role: 'toolbar',
      ariaLabel: 'Terminal keys',
      children: [
        _send('Esc', const [0x1b]),
        _send('Tab', const [0x09]),
        _ctrlButton,
        _send('Ctrl-C', const [0x03], aria: 'Control C'),
        _send('Ctrl-D', const [0x04], aria: 'Control D'),
        _send('Ctrl-Z', const [0x1a], aria: 'Control Z'),
        _send('↑', const [0x1b, 0x5b, 0x41], aria: 'Up'),
        _send('↓', const [0x1b, 0x5b, 0x42], aria: 'Down'),
        _send('←', const [0x1b, 0x5b, 0x44], aria: 'Left'),
        _send('→', const [0x1b, 0x5b, 0x43], aria: 'Right'),
        _send('Home', const [0x1b, 0x5b, 0x48]),
        _send('End', const [0x1b, 0x5b, 0x46]),
        _send('PgUp', const [0x1b, 0x5b, 0x35, 0x7e]),
        _send('PgDn', const [0x1b, 0x5b, 0x36, 0x7e]),
        _text('|'),
        _text('~'),
        _text('/'),
        _text('-'),
        _key('Copy', _copy),
        _key('Paste', _paste),
      ],
    );
  }

  /// A key that injects fixed [bytes].
  web.HTMLButtonElement _send(String label, List<int> bytes, {String? aria}) =>
      _key(label, () => keys.sendKey(bytes), aria: aria);

  /// A key that types a literal [char].
  web.HTMLButtonElement _text(String char) =>
      _key(char, () => keys.sendKey(utf8.encode(char)));

  web.HTMLButtonElement _key(
    String label,
    void Function() action, {
    String? aria,
  }) {
    final b = button(
      label,
      className: 'mono',
      ariaLabel: aria,
      onClick: () {
        action();
        term.focus();
      },
    );
    // Keep keyboard focus on the terminal when tapping a key.
    on(b, 'mousedown', (event) => event.preventDefault());
    return b;
  }

  Future<void> _copy() async {
    final selection = term.selection;
    if (selection.isEmpty) {
      onToast('Select text in the terminal first.');
      return;
    }
    try {
      await clipboardWrite(selection);
      term.clearSelection();
      onToast('Copied to clipboard.');
    } on Object {
      onToast('Copy failed — clipboard unavailable.');
    }
  }

  Future<void> _paste() async {
    try {
      final text = await clipboardRead();
      if (text != null && text.isNotEmpty) {
        keys.sendKey(utf8.encode(text));
      }
    } on Object {
      onToast('Paste blocked — allow clipboard access.');
    }
    term.focus();
  }
}

/// The default clipboard reader over `navigator.clipboard` (secure contexts).
Future<String?> defaultClipboardRead() async {
  final text = await web.window.navigator.clipboard.readText().toDart;
  return text.toDart;
}

/// The default clipboard writer over `navigator.clipboard`.
Future<void> defaultClipboardWrite(String text) async {
  await web.window.navigator.clipboard.writeText(text).toDart;
}
