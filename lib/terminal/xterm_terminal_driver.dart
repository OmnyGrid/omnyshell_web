// Named constructor params map to private fields; a private named parameter
// can't be an initializing formal, so the assignment is intentional.
// ignore_for_file: prefer_initializing_formals
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart' show AnsiTerminalDriver;

import 'terminal_view.dart';

/// A [AnsiTerminalDriver] for the browser, backed by an xterm.js [TerminalView].
///
/// The omnyshell `:ide` engine renders into a `ScreenBuffer` each frame; the
/// shared [AnsiTerminalDriver] base turns those frames into alt-screen / SGR /
/// cursor ANSI (identical to the native TTY driver). This subclass only supplies
/// the browser specifics: write the bytes to xterm.js, report its size, and
/// expose the host-forwarded keystroke stream and resize events. xterm.js
/// implements the alternate screen (`?1049`) and DEC private modes, so the
/// engine's output renders unchanged.
class XtermTerminalDriver extends AnsiTerminalDriver {
  final TerminalView _term;
  final Stream<List<int>> _input;
  final Stream<void> _resizeEvents;

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
  void writeAnsi(String ansi) => _term.write(utf8.encode(ansi));

  @override
  ({int cols, int rows}) get size => _term.size;

  @override
  Stream<List<int>> get input => _input;

  @override
  Stream<void> get resizeEvents => _resizeEvents;
}
