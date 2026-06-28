import 'dart:js_interop';
import 'dart:js_interop_unsafe';
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import 'terminal_view.dart';
import 'xterm_interop.dart';

/// A [TerminalView] backed by xterm.js. Requires the xterm UMD bundle + fit
/// addon to be loaded on the page (see `web/index.html`).
class XtermTerminalView implements TerminalView {
  final XTerminal _term;
  final XFitAddon _fit;
  XDisposable? _dataSub;
  XDisposable? _resizeSub;

  /// Creates the terminal inside [parent] and fits it to the container.
  XtermTerminalView(web.HTMLElement parent)
    : _term = XTerminal(_options()),
      _fit = XFitAddon() {
    _term.loadAddon(_fit);
    _term.open(parent);
    _fit.fit();
  }

  static JSObject _options() {
    final o = JSObject();
    o['cursorBlink'] = true.toJS;
    o['fontFamily'] =
        'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'.toJS;
    o['fontSize'] = 13.toJS;
    o['scrollback'] = 5000.toJS;
    final theme = JSObject();
    theme['background'] = '#0b0e12'.toJS;
    theme['foreground'] = '#e6e9ee'.toJS;
    theme['cursor'] = '#4f8bff'.toJS;
    o['theme'] = theme;
    return o;
  }

  /// Refits the terminal to its container (call after layout/resize).
  void fit() => _fit.fit();

  @override
  void write(List<int> bytes) =>
      _term.write(Uint8List.fromList(bytes).toJS as JSAny);

  @override
  void writeText(String text) => _term.write(text.toJS);

  @override
  void onInput(void Function(String data) handler) {
    _dataSub = _term.onData(((JSString data) => handler(data.toDart)).toJS);
  }

  @override
  void onResize(void Function(int cols, int rows) handler) {
    _resizeSub = _term.onResize(((XResize e) => handler(e.cols, e.rows)).toJS);
  }

  @override
  ({int cols, int rows}) get size => (cols: _term.cols, rows: _term.rows);

  @override
  void focus() => _term.focus();

  @override
  void dispose() {
    _dataSub?.dispose();
    _resizeSub?.dispose();
    _term.dispose();
  }
}
