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

/// The Ctrl-letter combinations offered in the Ctrl popup.
const List<String> _commonCtrl = [
  'A',
  'B',
  'C',
  'D',
  'F',
  'L',
  'Q',
  'S',
  'N',
  'P',
  'W',
  'Z',
];

/// An on-screen key bar for the terminal, giving touch devices the keys a soft
/// keyboard lacks — Esc, Tab, arrows, Home/End/PgUp/PgDn, common symbols — plus
/// Copy/Paste and a Ctrl combinations menu. Keys inject their byte sequences
/// through the [TerminalKeys] surface (the interactive shell), and taps avoid
/// stealing focus from the terminal so typing continues uninterrupted.
///
/// Ctrl works as a one-tap quick key for the last-used combination (defaulting
/// to Ctrl-C) next to a `Ctrl ▾` button that opens a popup with common combos,
/// a custom single-character entry, and a sticky "next key" modifier.
class TerminalAccessoryBar {
  final TerminalKeys keys;
  final TerminalView term;
  final ClipboardReader clipboardRead;
  final ClipboardWriter clipboardWrite;
  final void Function(String message) onToast;

  /// The bar's root element.
  late final web.HTMLElement element;

  /// The `Ctrl ▾` button that opens the combinations popup (and shows the
  /// sticky-armed highlight).
  late final web.HTMLButtonElement _ctrlButton;

  /// The one-tap quick key that repeats the last-used Ctrl combination.
  late final web.HTMLButtonElement _lastCtrlButton;

  /// The character of the last-used Ctrl combination (uppercased for display);
  /// seeds the quick key and updates whenever a combo is sent from the popup.
  String _lastCtrlChar = 'C';

  /// The open Ctrl popup, or `null` when closed, plus its dismiss (listener
  /// teardown) callback.
  web.HTMLElement? _ctrlMenu;
  void Function()? _dismissMenu;

  /// Builds the bar.
  TerminalAccessoryBar({
    required this.keys,
    required this.term,
    required this.clipboardRead,
    required this.clipboardWrite,
    required this.onToast,
  }) {
    _lastCtrlButton = _key(
      _ctrlLabel(_lastCtrlChar),
      () => _sendCtrl(_lastCtrlChar),
      aria: 'Control $_lastCtrlChar',
    );
    _ctrlButton = _key('Ctrl', _toggleCtrlMenu, aria: 'Control combinations');
    _ctrlButton.classList.add('has-menu');
    _ctrlButton.setAttribute('aria-haspopup', 'menu');
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
        // The quick key and the popup trigger read as one segmented control.
        el(
          'div',
          classes: 'term-ctrl-group',
          role: 'group',
          ariaLabel: 'Control',
          children: [_lastCtrlButton, _ctrlButton],
        ),
        _send('↑', const [0x1b, 0x5b, 0x41], aria: 'Up'),
        _send('↓', const [0x1b, 0x5b, 0x42], aria: 'Down'),
        _send('←', const [0x1b, 0x5b, 0x44], aria: 'Left'),
        _send('→', const [0x1b, 0x5b, 0x43], aria: 'Right'),
        _text('|'),
        _text('~'),
        _text('/'),
        _text('-'),
        _key('Copy', _copy),
        _key('Paste', _paste),
        _send('Home', const [0x1b, 0x5b, 0x48]),
        _send('End', const [0x1b, 0x5b, 0x46]),
        _send('PgUp', const [0x1b, 0x5b, 0x35, 0x7e]),
        _send('PgDn', const [0x1b, 0x5b, 0x36, 0x7e]),
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

  // --- Ctrl combinations ------------------------------------------------------

  /// The display label for a Ctrl combination on the given [char].
  String _ctrlLabel(String char) => 'Ctrl-$char';

  /// The control byte for `Ctrl-[char]`, or `null` when [char] has no control
  /// mapping. Mirrors the terminal's own control encoding (letters and the
  /// `@[\]^_` range map via `& 0x1f`; space → NUL, `?` → DEL).
  int? _ctrlByte(String char) {
    if (char.isEmpty) return null;
    final c = char.codeUnitAt(0);
    if (c >= 0x40 && c <= 0x5f) return c & 0x1f; // @ A–Z [ \ ] ^ _
    if (c >= 0x61 && c <= 0x7a) return c & 0x1f; // a–z
    if (c == 0x20) return 0x00; // space → NUL (Ctrl-@)
    if (c == 0x3f) return 0x7f; // ? → DEL
    return null;
  }

  /// Sends `Ctrl-[char]` and records it as the last-used combo (updating the
  /// quick key). Returns `false` (with a toast) when [char] isn't a valid combo.
  bool _sendCtrl(String char) {
    final byte = _ctrlByte(char);
    if (byte == null) {
      onToast('"$char" is not a valid Ctrl combination.');
      return false;
    }
    keys.sendKey([byte]);
    final display = char.substring(0, 1).toUpperCase();
    _lastCtrlChar = display;
    _lastCtrlButton.textContent = _ctrlLabel(display);
    _lastCtrlButton.setAttribute('aria-label', 'Control $display');
    return true;
  }

  void _toggleCtrlMenu() {
    if (_ctrlMenu != null) {
      _closeCtrlMenu();
    } else {
      _openCtrlMenu();
    }
  }

  void _openCtrlMenu() {
    // Common combos: tap sends and closes.
    final grid = el(
      'div',
      classes: 'ctrl-menu-grid',
      role: 'group',
      children: [for (final ch in _commonCtrl) _combo(ch)],
    );

    // Custom entry: type one character, send Ctrl-<char>.
    final custom =
        input(id: 'ctrl-custom-char', placeholder: '·', autocapitalize: 'off')
          ..maxLength = 1
          ..className = 'ctrl-custom-input mono';
    void sendCustom() {
      final v = custom.value.trim();
      if (v.isEmpty) return;
      if (_sendCtrl(v)) {
        _closeCtrlMenu();
        term.focus();
      }
    }

    on(custom, 'keydown', (event) {
      if ((event as web.KeyboardEvent).key == 'Enter') sendCustom();
    });
    final sendBtn = button('Send', onClick: sendCustom);
    on(sendBtn, 'mousedown', (event) => event.preventDefault());
    final customRow = el(
      'div',
      classes: 'ctrl-menu-custom',
      children: [
        el('span', classes: 'ctrl-menu-label mono', text: 'Ctrl-'),
        custom,
        sendBtn,
      ],
    );

    // Sticky modifier: arm Ctrl so the next key becomes a control code.
    final armBtn = button(
      'Ctrl + next key',
      className: 'ctrl-menu-arm',
      ariaLabel: 'Arm Control for the next key',
      onClick: () {
        keys.armCtrl();
        _closeCtrlMenu();
        term.focus();
      },
    );
    on(armBtn, 'mousedown', (event) => event.preventDefault());

    final menu = el(
      'div',
      classes: 'ctrl-menu',
      role: 'menu',
      ariaLabel: 'Control combinations',
      children: [
        grid,
        customRow,
        el('div', classes: 'ctrl-menu-sep'),
        armBtn,
      ],
    );
    _ctrlMenu = menu;
    web.document.body!.appendChild(menu);
    _positionCtrlMenu(menu);

    // Dismiss on an outside pointer press or Escape.
    final offDown = on(web.document, 'mousedown', (event) {
      final t = event.target as web.Node?;
      if (t != null && (menu.contains(t) || _ctrlButton.contains(t))) return;
      _closeCtrlMenu();
    });
    final offKey = on(web.document, 'keydown', (event) {
      if ((event as web.KeyboardEvent).key == 'Escape') {
        _closeCtrlMenu();
        term.focus();
      }
    });
    _dismissMenu = () {
      offDown();
      offKey();
    };
  }

  /// A common-combo menu button that sends `Ctrl-[char]` and closes the popup.
  web.HTMLButtonElement _combo(String char) {
    final b = button(
      '^$char',
      className: 'mono ctrl-menu-item',
      ariaLabel: 'Control $char',
      onClick: () {
        _sendCtrl(char);
        _closeCtrlMenu();
        term.focus();
      },
    );
    on(b, 'mousedown', (event) => event.preventDefault());
    return b;
  }

  /// Anchors [menu] just above the `Ctrl ▾` button, clamped to the viewport.
  void _positionCtrlMenu(web.HTMLElement menu) {
    final r = _ctrlButton.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.bottom = '${(web.window.innerHeight - r.top + 6).round()}px';
    final width = menu.getBoundingClientRect().width;
    var left = r.left;
    final maxLeft = web.window.innerWidth - width - 8;
    if (left > maxLeft) left = maxLeft;
    if (left < 8) left = 8;
    menu.style.left = '${left.round()}px';
  }

  void _closeCtrlMenu() {
    _dismissMenu?.call();
    _dismissMenu = null;
    _ctrlMenu?.remove();
    _ctrlMenu = null;
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
