import 'dart:async';
import 'dart:js_interop';

import 'package:web/web.dart' as web;

import 'terminal_dimensions.dart';
import 'terminal_view.dart';
import 'xterm_terminal_view.dart';

/// Keeps a terminal correctly sized as the page around it changes.
///
/// This is the fiddliest part of hosting xterm.js in a browser, and it is why it
/// lives here rather than inside a screen: any app embedding the terminal needs
/// all of it, and getting a *piece* of it wrong is what produces a terminal that
/// grows but never shrinks, renders 0×0, or hides its last line behind a soft
/// keyboard.
///
/// It handles two modes:
///
/// * **Fixed** ([fixedDims] set) — the grid is pinned to chosen cols×rows for the
///   session's lifetime, because the backend PTY cannot be resized. Only the
///   *font* rescales, to the largest size at which that grid still fits.
/// * **Auto-fit** ([fixedDims] null) — the font is fixed and xterm re-derives
///   cols/rows from the container.
///
/// Call [attach] once the terminal is mounted and the accessory bar exists, and
/// [dispose] when the screen goes away.
class TerminalFitter {
  /// The terminal being fitted. Only an [XtermTerminalView] can actually be
  /// resized; any other implementation makes every operation a no-op, which is
  /// what keeps tests with a fake terminal working.
  final TerminalView term;

  /// The element the terminal is rendered into.
  final web.HTMLElement host;

  /// The on-screen key bar below the terminal, whose box is reserved.
  final web.HTMLElement accessory;

  /// The element carrying the `--term-key-scale` custom property (typically the
  /// screen root), so the key bar scales with the terminal font.
  final web.HTMLElement scaleTarget;

  /// The pinned grid, or `null` for auto-fit.
  final ({int cols, int rows})? fixedDims;

  /// The current text-size preference. Defaults to [TerminalTextSize.auto].
  final TerminalTextSize Function() textSize;

  /// Whether the terminal is currently full-screen (its container then fills the
  /// window and must not be pinned to a measured height).
  final bool Function() isFullscreen;

  bool _fitScheduled = false;
  bool _disposed = false;
  Timer? _settleTimer;
  void Function()? _detachResize;
  void Function()? _detachViewport;
  web.ResizeObserver? _resizeObserver;
  StreamSubscription<TerminalTextSize>? _textSizeSub;

  /// Creates a fitter for [term] inside [host].
  TerminalFitter({
    required this.term,
    required this.host,
    required this.accessory,
    required this.scaleTarget,
    this.fixedDims,
    TerminalTextSize Function()? textSize,
    bool Function()? isFullscreen,
  }) : textSize = textSize ?? (() => TerminalTextSize.auto),
       isFullscreen = isFullscreen ?? (() => false);

  /// Starts watching everything that can change the terminal's geometry.
  ///
  /// [textSizeChanges] re-applies the font live when the preference changes.
  void attach({Stream<TerminalTextSize>? textSizeChanges}) {
    _detachResize = _on(web.window, 'resize', scheduleFit);
    // The soft keyboard resizes the *visual* viewport, not the window, so refit
    // on its changes too.
    final vv = web.window.visualViewport;
    if (vv != null) {
      _detachViewport = _on(vv, 'resize', scheduleSettle);
    }
    // The robust trigger: refit whenever the host actually changes size
    // (fullscreen toggle, keyboard, rotation, …). A ResizeObserver fires *after*
    // layout, so xterm measures the settled box rather than the previous one.
    final ro = web.ResizeObserver(
      ((JSArray<web.ResizeObserverEntry> entries, web.ResizeObserver observer) {
        scheduleFit();
      }).toJS,
    );
    ro.observe(host);
    _resizeObserver = ro;
    _textSizeSub = textSizeChanges?.listen((_) => scheduleFit());
  }

  /// Refits the terminal to its container.
  void fit() {
    if (_disposed) return;
    _applyHostHeight();
    applyFont();
  }

  /// Applies the resolved font size and scales the key bar to match.
  ///
  /// In fixed mode the baseline is the largest font at which the whole grid fits
  /// the container in *both* dimensions, so the terminal scales with the window
  /// (a pinned grid never reflows). In auto-fit mode the baseline is xterm's
  /// default. The text-size preference then adjusts that baseline.
  void applyFont() {
    final t = term;
    if (t is! XtermTerminalView) return;
    final fixed = fixedDims;
    final base = fixed == null ? 13 : _fitFontPx(fixed.cols, fixed.rows);
    final px = switch (textSize()) {
      TerminalTextSize.auto => base,
      TerminalTextSize.smaller => (base * 0.8).floor().clamp(
        kMinFontPx,
        kMaxFontPx,
      ),
      TerminalTextSize.normal => 13,
      TerminalTextSize.larger => (base * 1.25).ceil().clamp(
        kMinFontPx,
        kMaxFontPx,
      ),
    };
    t.setFontSize(px);
    _applyKeyScale(px);
    // Re-derive cols (auto-fit) or re-pin them (fixed) after the font change.
    if (fixed == null) {
      t.fit();
    } else {
      t.resize(fixed.cols, fixed.rows);
    }
  }

  /// Coalesces refit requests to once per frame, running the fit in a
  /// `requestAnimationFrame` callback — after style and layout for any pending
  /// change (class toggle, keyboard inset, …) have been computed, so xterm
  /// measures the settled box.
  void scheduleFit() {
    if (_fitScheduled || _disposed) return;
    _fitScheduled = true;
    web.window.requestAnimationFrame(
      (double _) {
        _fitScheduled = false;
        fit();
      }.toJS,
    );
  }

  /// Refits next frame, and once more after the viewport stops changing.
  ///
  /// Opening or closing the soft keyboard animates the visual viewport over many
  /// events; the trailing timer, reset on each call, fires only once it settles,
  /// so the final fit measures the right height.
  void scheduleSettle() {
    scheduleFit();
    _settleTimer?.cancel();
    _settleTimer = Timer(const Duration(milliseconds: 200), fit);
  }

  /// Refits across several frames and pins the view to the bottom. Use after a
  /// fullscreen toggle and once after the initial mount.
  ///
  /// The flex/`dvh` layout — and, on mobile, browser chrome animating in or out —
  /// settles over a few hundred milliseconds, so a single immediate fit measures
  /// a stale box and leaves the terminal mis-sized.
  void settle() {
    void apply() {
      if (_disposed) return;
      fit();
      // A layout change can leave the xterm canvas stale, so force a redraw of
      // the visible rows in normal mode.
      if (!isFullscreen()) {
        final t = term;
        if (t is XtermTerminalView) t.refresh();
      }
      term.scrollToBottom();
    }

    scheduleFit();
    web.window.requestAnimationFrame(((double _) => apply()).toJS);
    // Catch the post-animation / post-settle box size.
    for (final ms in const [120, 300, 500]) {
      Timer(Duration(milliseconds: ms), apply);
    }
  }

  /// Stops watching and releases every listener and timer.
  void dispose() {
    _disposed = true;
    _settleTimer?.cancel();
    _detachResize?.call();
    _detachViewport?.call();
    _resizeObserver?.disconnect();
    unawaited(_textSizeSub?.cancel());
  }

  /// The largest font (px) at which a [cols]×[rows] grid still fits the host in
  /// both width and height, clamped to a sane range. Falls back to the default
  /// before the host has a measurable size.
  int _fitFontPx(int cols, int rows) {
    // Width from the host (a block at width:100%, not inflated by content);
    // height from the viewport-available space, NOT the host's own height —
    // which the terminal canvas inflates. See [_availableHeight].
    final width = host.getBoundingClientRect().width;
    final height = _availableHeight();
    if (width <= 0 || height <= 0) return 13;
    final fitWidth = width / (cols * kCellWidthRatio);
    final fitHeight = height / (rows * kCellHeightRatio);
    final fit = fitWidth < fitHeight ? fitWidth : fitHeight;
    return fit.floor().clamp(kMinFontPx, kMaxFontPx);
  }

  /// Scales the on-screen key bar with the terminal font via a CSS variable, so
  /// smaller text yields smaller keys (more keys visible on a phone).
  void _applyKeyScale(int px) {
    final scale = (px / 13).clamp(0.7, 1.6);
    scaleTarget.style.setProperty('--term-key-scale', scale.toStringAsFixed(3));
  }

  /// Pins the host to a *definite* pixel height: the space available between the
  /// chrome above it and the key bar below it.
  ///
  /// A definite height, not merely a `min-height` floor, is essential. The xterm
  /// canvas can be taller than the viewport (right after exiting fullscreen, for
  /// instance) and when the CSS `height: 100%` resolves to `auto`, that content
  /// height wins — a `min-height` could never pull the host back down, so the
  /// terminal would grow with the window but never shrink. An explicit `height`
  /// is both floor and ceiling.
  ///
  /// Skipped in fullscreen (the fixed container already fills the screen) and
  /// while the keyboard is open (the fixed layout sizes the terminal); the inline
  /// height is removed so the CSS rules take over.
  void _applyHostHeight() {
    final kbOpen =
        web.document.documentElement?.classList.contains('keyboard-open') ??
        false;
    if (isFullscreen() || kbOpen) {
      host.style.removeProperty('height');
      return;
    }
    // Clear our prior height first, so the measurement isn't skewed by it.
    host.style.removeProperty('height');
    final available = _availableHeight();
    if (available > 0) {
      host.style.height = '${available.round()}px';
    }
  }

  /// The height available to the terminal: the viewport, minus the chrome above
  /// the host, minus the key bar (and its gap) reserved below it.
  ///
  /// Derived from the host's *top* offset (stable) and the bar's box — never the
  /// host's own height — so it cannot feed back on the terminal's current,
  /// content-inflated height. That feedback is what let a fixed-grid terminal
  /// grow but never shrink.
  double _availableHeight() {
    final viewport =
        web.window.visualViewport?.height ?? web.window.innerHeight.toDouble();
    final hostRect = host.getBoundingClientRect();
    final barRect = accessory.getBoundingClientRect();
    final gapBelow = barRect.top - hostRect.bottom;
    final reserveBelow = barRect.height + (gapBelow > 0 ? gapBelow : 0);
    return viewport - hostRect.top - reserveBelow;
  }

  /// Adds a DOM listener and returns its remover.
  static void Function() _on(
    web.EventTarget target,
    String type,
    void Function() handler,
  ) {
    final callback = ((web.Event _) => handler()).toJS;
    target.addEventListener(type, callback);
    return () => target.removeEventListener(type, callback);
  }
}
