import 'dart:async';
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
  Timer? _autoFit0;
  Timer? _autoFit80;

  /// Creates the terminal inside [parent] and fits it to the container.
  ///
  /// The fit is deferred to later frames rather than run synchronously after
  /// `open()`: the fit addon reads the container's laid-out size, which isn't
  /// available in the same tick the element is attached — fitting too early
  /// leaves the terminal 0×0 and nothing renders. We fit on the next macrotask
  /// and again shortly after so it picks up the real geometry.
  XtermTerminalView(web.HTMLElement parent)
    : _term = XTerminal(_options()),
      _fit = XFitAddon() {
    _term.loadAddon(_fit);
    _term.open(parent);
    _autoFit0 = Timer(Duration.zero, fit);
    _autoFit80 = Timer(const Duration(milliseconds: 80), fit);
  }

  /// Cancels the deferred initial auto-fit. The session screen calls this in
  /// fixed-dimension mode, where it pins the columns/rows itself and the fit
  /// addon would otherwise override them once these timers fire.
  void cancelAutoFit() {
    _autoFit0?.cancel();
    _autoFit80?.cancel();
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

  /// Refits the terminal to its container (call after layout/resize). Safe to
  /// call before the container has a measurable size — fit failures are ignored.
  void fit() {
    try {
      _fit.fit();
    } on Object {
      // Container not measurable yet; a later fit (resize/timer) will succeed.
    }
  }

  /// Sets the rendered font size in CSS pixels. Re-renders glyphs at the new
  /// size but does *not* change the column/row count on its own — only [fit] or
  /// [resize] do — which is exactly what a fixed-dimension session needs.
  void setFontSize(int px) => _term.options['fontSize'] = px.toJS;

  /// The current rendered font size in CSS pixels (defaults to 13).
  int get fontSize {
    final v = _term.options['fontSize'];
    return v == null ? 13 : (v as JSNumber).toDartInt;
  }

  /// Pins the terminal to an explicit [cols]×[rows] (no-op in xterm when
  /// unchanged, so it won't spuriously fire a resize event).
  void resize(int cols, int rows) => _term.resize(cols, rows);

  /// Forces a redraw of every visible row (the canvas can go stale after a
  /// layout change such as exiting fullscreen).
  void refresh() {
    try {
      _term.refresh(0, _term.rows - 1);
    } on Object {
      // Harmless if the terminal isn't ready yet.
    }
  }

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
  String get selection => _term.getSelection();

  @override
  void clearSelection() => _term.clearSelection();

  @override
  void scrollToBottom() {
    try {
      _term.scrollToBottom();
    } on Object {
      // Harmless if the terminal isn't ready yet.
    }
  }

  @override
  void dispose() {
    _autoFit0?.cancel();
    _autoFit80?.cancel();
    _dataSub?.dispose();
    _resizeSub?.dispose();
    _term.dispose();
  }
}
