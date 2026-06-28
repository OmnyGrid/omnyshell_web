import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// Minimal JS-interop bindings for xterm.js (loaded from a CDN UMD bundle that
/// exposes the global `Terminal`) and its fit addon (`FitAddon.FitAddon`). Only
/// the members the app uses are declared.

@JS('Terminal')
extension type XTerminal._(JSObject _) implements JSObject {
  /// Constructs a terminal with an options object.
  external factory XTerminal(JSObject options);

  /// Attaches the terminal to [parent].
  external void open(web.Element parent);

  /// Writes [data] (a JS string or `Uint8Array`).
  external void write(JSAny data);

  /// Loads an addon (e.g. the fit addon).
  external void loadAddon(JSObject addon);

  /// Registers a keystroke handler; the callback receives a JS string.
  external XDisposable onData(JSFunction handler);

  /// Registers a resize handler; the callback receives `{cols, rows}`.
  external XDisposable onResize(JSFunction handler);

  /// Gives the terminal focus.
  external void focus();

  /// The currently selected text.
  external String getSelection();

  /// Clears any active selection.
  external void clearSelection();

  /// Scrolls the viewport to the bottom (the latest output / prompt).
  external void scrollToBottom();

  /// Disposes the terminal.
  external void dispose();

  /// Current column count.
  external int get cols;

  /// Current row count.
  external int get rows;
}

/// An xterm disposable handle.
extension type XDisposable._(JSObject _) implements JSObject {
  /// Detaches the listener.
  external void dispose();
}

/// The fit addon (`@xterm/addon-fit`), exposed by the UMD bundle as
/// `FitAddon.FitAddon`.
@JS('FitAddon.FitAddon')
extension type XFitAddon._(JSObject _) implements JSObject {
  /// Constructs a fit addon.
  external factory XFitAddon();

  /// Resizes the terminal to fit its container.
  external void fit();
}

/// The `{cols, rows}` payload of xterm's resize event.
extension type XResize._(JSObject _) implements JSObject {
  /// New column count.
  external int get cols;

  /// New row count.
  external int get rows;
}
