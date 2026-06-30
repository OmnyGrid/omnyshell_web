@TestOn('vm')
library;

import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart' show ScreenBuffer, Style;
import 'package:omnyshell_web/terminal/xterm_terminal_driver.dart';
import 'package:test/test.dart';

import '../support/fake_terminal.dart';

void main() {
  late FakeTerminalView term;

  setUp(() => term = FakeTerminalView(cols: 80, rows: 24));

  XtermTerminalDriver build({Stream<List<int>>? input, Stream<void>? resize}) =>
      XtermTerminalDriver(
        term: term,
        input: input ?? const Stream<List<int>>.empty(),
        resizeEvents: resize ?? const Stream<void>.empty(),
      );

  String shown() =>
      term.writes.map((w) => utf8.decode(w, allowMalformed: true)).join();

  test('enter switches to the alternate screen and hides the cursor', () {
    build().enter();
    final out = shown();
    expect(out, contains('\x1b[?1049h')); // alternate screen
    expect(out, contains('\x1b[2J')); // clear
    expect(out, contains('\x1b[H')); // home
    expect(out, contains('\x1b[?25l')); // hide cursor
  });

  test('leave restores the primary screen and shows the cursor', () {
    build().leave();
    final out = shown();
    expect(out, contains('\x1b[?25h')); // show cursor
    expect(out, contains('\x1b[?1049l')); // primary screen
  });

  test('present renders the frame and positions the cursor (1-based)', () {
    final driver = build();
    final frame = ScreenBuffer(5, 1);
    frame.drawText(0, 0, 'hi', Style.none);
    driver.present(frame, cursorX: 1, cursorY: 0);
    final out = shown();
    expect(out, contains('hi'));
    // cursorX/Y are 0-based; the ANSI position is 1-based (row;col).
    expect(out, contains('\x1b[1;2H'));
    expect(out, contains('\x1b[?25h')); // cursor shown after positioning
  });

  test('present diffs against the previous frame', () {
    final driver = build();
    final first = ScreenBuffer(5, 1)..drawText(0, 0, 'hi', Style.none);
    driver.present(first);
    term.writes.clear();

    // An identical frame should produce no cell output on the diff.
    final same = ScreenBuffer(5, 1)..drawText(0, 0, 'hi', Style.none);
    driver.present(same);
    expect(shown(), isNot(contains('hi')));
  });

  test('invalidate forces the next present to repaint in full', () {
    final driver = build();
    final frame = ScreenBuffer(5, 1)..drawText(0, 0, 'hi', Style.none);
    driver.present(frame);
    term.writes.clear();

    driver.invalidate();
    driver.present(ScreenBuffer(5, 1)..drawText(0, 0, 'hi', Style.none));
    expect(shown(), contains('hi')); // full repaint despite identical content
  });

  test('size reflects the terminal', () {
    expect(build().size, (cols: 80, rows: 24));
  });

  test('input and resizeEvents pass the supplied streams through', () async {
    final input = StreamController<List<int>>();
    final resize = StreamController<void>();
    final driver = build(input: input.stream, resize: resize.stream);

    final keys = <int>[];
    var resizes = 0;
    final s1 = driver.input.listen(keys.addAll);
    final s2 = driver.resizeEvents.listen((_) => resizes++);

    input.add([0x61, 0x62]);
    resize.add(null);
    await Future<void>.delayed(Duration.zero);

    expect(keys, [0x61, 0x62]);
    expect(resizes, 1);
    await s1.cancel();
    await s2.cancel();
    await input.close();
    await resize.close();
  });
}
