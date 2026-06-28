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

  tearDown(() => bar.element.remove());

  Future<void> pump() => Future<void>.delayed(const Duration(milliseconds: 5));

  web.HTMLElement key(String label) {
    final list = bar.element.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      final b = list.item(i) as web.HTMLElement;
      if (b.textContent == label) return b;
    }
    throw StateError('no accessory key "$label"');
  }

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

  test('Ctrl arms the modifier and highlights', () {
    key('Ctrl').click();
    expect(keys.ctrlArmed, isTrue);
    expect(key('Ctrl').classList.contains('active'), isTrue);
    key('Ctrl').click();
    expect(keys.ctrlArmed, isFalse);
    expect(key('Ctrl').classList.contains('active'), isFalse);
  });

  test('Ctrl-C key injects an interrupt byte', () {
    key('Ctrl-C').click();
    expect(keys.sent.last, [0x03]);
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
