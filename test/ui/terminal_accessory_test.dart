@TestOn('browser')
library;

import 'dart:convert';

import 'package:omnyshell_web/terminal/terminal_accessory.dart';
import 'package:omnyshell_web/terminal/terminal_view.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/fake_terminal.dart';

/// Records the keys injected by the accessory bar, so the bar's wiring can be
/// asserted independently of how a host interprets them.
class RecordingKeys implements TerminalKeys {
  final List<List<int>> sent = [];
  bool _armed = false;

  @override
  void Function(bool armed)? onCtrlChange;

  @override
  void sendKey(List<int> bytes) => sent.add(bytes);

  @override
  void armCtrl() {
    _armed = !_armed;
    onCtrlChange?.call(_armed);
  }

  @override
  bool get ctrlArmed => _armed;
}

void main() {
  late FakeTerminalView term;
  late RecordingKeys keys;
  late List<String> toasts;
  String? written;
  late TerminalAccessoryBar bar;

  setUp(() {
    term = FakeTerminalView();
    keys = RecordingKeys();
    toasts = [];
    written = null;
    bar = TerminalAccessoryBar(
      keys: keys,
      term: term,
      clipboardRead: () async => 'pasted-text',
      clipboardWrite: (t) async => written = t,
      onToast: toasts.add,
    );
    web.document.body!.appendChild(bar.element);
  });

  tearDown(() {
    web.document.querySelector('.ctrl-menu')?.remove();
    bar.element.remove();
  });

  Future<void> pump() => Future<void>.delayed(const Duration(milliseconds: 5));

  // Searches the whole document so it finds both bar keys and popup menu items
  // (the Ctrl popup is appended to document.body).
  web.HTMLElement key(String label) {
    final list = web.document.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (b.textContent == label) return b;
    }
    throw StateError('no key "$label"');
  }

  bool ctrlMenuOpen() => web.document.querySelector('.ctrl-menu') != null;

  test('Esc and Tab inject their control bytes', () {
    key('Esc').click();
    expect(keys.sent.last, [0x1b]);
    key('Tab').click();
    expect(keys.sent.last, [0x09]);
  });

  test('arrow keys inject ANSI cursor sequences', () {
    key('↑').click();
    expect(keys.sent.last, [0x1b, 0x5b, 0x41]);
    key('→').click();
    expect(keys.sent.last, [0x1b, 0x5b, 0x43]);
  });

  test('Ctrl opens the combinations popup and toggles closed', () {
    expect(ctrlMenuOpen(), isFalse);
    key('Ctrl').click();
    expect(ctrlMenuOpen(), isTrue);
    key('Ctrl').click();
    expect(ctrlMenuOpen(), isFalse);
  });

  test('the last-used quick key defaults to Ctrl-C and injects 0x03', () {
    key('Ctrl-C').click();
    expect(keys.sent.last, [0x03]);
  });

  test('picking a combo sends it and becomes the quick key', () {
    key('Ctrl').click(); // open popup
    key('^F').click(); // Ctrl-F
    expect(keys.sent.last, [0x06]);
    expect(ctrlMenuOpen(), isFalse); // closes after picking
    // The quick key now repeats Ctrl-F.
    key('Ctrl-F').click();
    expect(keys.sent.last, [0x06]);
  });

  test('custom entry sends Ctrl-<char> and updates the quick key', () {
    key('Ctrl').click();
    final field =
        web.document.querySelector('.ctrl-custom-input')
            as web.HTMLInputElement;
    field.value = 'r';
    key('Send').click();
    expect(keys.sent.last, [0x12]); // Ctrl-R
    expect(key('Ctrl-R'), isNotNull); // quick key relabeled
  });

  test('Ctrl + next key arms the sticky modifier', () {
    key('Ctrl').click();
    key('Ctrl + next key').click();
    expect(keys.ctrlArmed, isTrue);
    expect(key('Ctrl').classList.contains('active'), isTrue);
  });

  test('a symbol key injects its literal character', () {
    key('|').click();
    expect(keys.sent.last, utf8.encode('|'));
  });

  test('Copy writes the terminal selection to the clipboard', () async {
    term.selectionText = 'selected output';
    key('Copy').click();
    await pump();
    expect(written, 'selected output');
    expect(term.selectionText, ''); // cleared after copy
    expect(toasts.last, contains('Copied'));
  });

  test('Copy with no selection prompts the user', () async {
    key('Copy').click();
    await pump();
    expect(written, isNull);
    expect(toasts.last, contains('Select text'));
  });

  test('Paste injects clipboard text', () async {
    key('Paste').click();
    await pump();
    expect(keys.sent.last, utf8.encode('pasted-text'));
  });
}
