import 'dart:async';
import 'dart:js_interop';
import 'dart:js_interop_unsafe';
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import 'terminal_view.dart';
import 'xterm_interop.dart';

/// The colours xterm renders with.
///
/// Separate from the app's CSS theme: xterm paints to a canvas, so it cannot
/// inherit CSS custom properties and must be told its colours explicitly.
class XtermTheme {
  /// The terminal background.
  final String background;

  /// The default foreground (text) colour.
  final String foreground;

  /// The cursor colour.
  final String cursor;

  /// Creates a theme.
  const XtermTheme({
    required this.background,
    required this.foreground,
    required this.cursor,
  });

  /// OmnyShell's palette — the default, and what `styles.css` is tuned against.
  static const XtermTheme omnyShell = XtermTheme(
    background: '#0b0e12',
    foreground: '#e6e9ee',
    cursor: '#4f8bff',
  );
}

/// A [TerminalView] backed by xterm.js. Requires the xterm UMD bundle + fit
/// addon to be loaded on the page (see `web/index.html`; `tool/copy_assets.dart`
/// installs them into a consuming app).
class XtermTerminalView implements TerminalView {
  /// The default monospace stack — the system's own, so no font is shipped.
  static const String defaultFontFamily =
      'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

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
  ///
  /// [theme], [fontSize] and [fontFamily] let an embedding app match its own
  /// look; the defaults are OmnyShell's.
  XtermTerminalView(
    web.HTMLElement parent, {
    XtermTheme theme = XtermTheme.omnyShell,
    int fontSize = 13,
    String fontFamily = defaultFontFamily,
    int scrollback = 5000,
  }) : _term = XTerminal(
         _options(
           theme: theme,
           fontSize: fontSize,
           fontFamily: fontFamily,
           scrollback: scrollback,
         ),
       ),
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

  static JSObject _options({
    required XtermTheme theme,
    required int fontSize,
    required String fontFamily,
    required int scrollback,
  }) {
    final o = JSObject();
    o['cursorBlink'] = true.toJS;
    o['fontFamily'] = fontFamily.toJS;
    o['fontSize'] = fontSize.toJS;
    o['scrollback'] = scrollback.toJS;
    final t = JSObject();
    t['background'] = theme.background.toJS;
    t['foreground'] = theme.foreground.toJS;
    t['cursor'] = theme.cursor.toJS;
    o['theme'] = t;
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

  /// Pins the terminal to an explicit [cols]×[rows] (no-op in xterm when
  /// unchanged, so it won't spuriously fire a resize event). Guarded like the
  /// other JS calls in case it lands on a not-yet-ready or disposed terminal.
  void resize(int cols, int rows) {
    try {
      _term.resize(cols, rows);
    } on Object {
      // Terminal not ready (or already disposed); a later fit will reconcile.
    }
  }

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
