// Named constructor params map to private fields; a private named parameter
// can't be an initializing formal, so the assignment is intentional.
// ignore_for_file: prefer_initializing_formals
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show ScreenBuffer, TerminalDriver;

import 'terminal_view.dart';

/// A [TerminalDriver] for the browser, backed by an xterm.js [TerminalView].
///
/// The omnyshell `:ide` engine is `dart:io`-free and renders into a
/// [ScreenBuffer] each frame; a driver turns those frames into bytes for a real
/// terminal. This mirrors the native `Terminal` driver (which writes to a TTY)
/// but targets xterm.js: it emits the same alternate-screen / SGR sequences,
/// reads raw keystrokes from the host-forwarded [input] stream (xterm `onData`),
/// and reflows on [resizeEvents] (xterm `onResize`). xterm.js implements the
/// alternate screen (`?1049`) and DEC private modes, so the engine's
/// [ScreenBuffer.renderDiff] output renders unchanged.
class XtermTerminalDriver implements TerminalDriver {
  final TerminalView _term;
  final Stream<List<int>> _input;
  final Stream<void> _resizeEvents;

  /// The last presented frame, for [ScreenBuffer.renderDiff]. Cleared by
  /// [enter]/[invalidate] to force a full repaint.
  ScreenBuffer? _front;

  /// Creates a driver over [term]. [input] is the raw keystroke stream the host
  /// forwards while the IDE owns the screen (see `WebShellHost.runFullScreen`);
  /// [resizeEvents] fires when the terminal's column/row count changes.
  XtermTerminalDriver({
    required TerminalView term,
    required Stream<List<int>> input,
    required Stream<void> resizeEvents,
  }) : _term = term,
       _input = input,
       _resizeEvents = resizeEvents;

  @override
  ({int cols, int rows}) get size => _term.size;

  @override
  Stream<List<int>> get input => _input;

  @override
  Stream<void> get resizeEvents => _resizeEvents;

  @override
  void enter() {
    _front = null;
    // Alternate screen + clear + home + hide cursor.
    _term.write(utf8.encode('\x1b[?1049h\x1b[2J\x1b[H\x1b[?25l'));
  }

  @override
  void leave() {
    // Reset SGR, show cursor, restore the primary screen (the shell prompt).
    _term.write(utf8.encode('\x1b[0m\x1b[?25h\x1b[?1049l'));
  }

  @override
  void invalidate() => _front = null;

  @override
  void present(ScreenBuffer frame, {int? cursorX, int? cursorY}) {
    final out = StringBuffer('\x1b[?25l'); // hide cursor during the repaint
    out.write(frame.renderDiff(_front));
    if (cursorX != null && cursorY != null) {
      out.write('\x1b[${cursorY + 1};${cursorX + 1}H\x1b[?25h');
    }
    _term.write(utf8.encode(out.toString()));
    _front = frame;
  }
}
