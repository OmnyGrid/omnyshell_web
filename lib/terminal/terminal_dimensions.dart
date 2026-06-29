// Pure (DOM-free) terminal geometry: the dimension/text-size choices the user
// can make and the math that turns a device's screen box into a fitting
// column/row count. Kept free of `package:web` so it is unit-testable without a
// browser; the screen supplies the device metrics.

/// How the PTY dimensions for a new session are chosen.
enum DimensionPreset {
  /// Let the fit addon size the terminal to its container (the default, and the
  /// app's original behavior). The PTY then tracks the live container size.
  autoFit,

  /// A fixed size computed for this device in landscape orientation.
  landscape,

  /// A fixed size computed for this device in portrait orientation.
  portrait,

  /// The conventional fixed 80×24.
  standard,

  /// A user-entered fixed [customCols]×[customRows].
  custom;

  /// Parses a persisted name, defaulting to [DimensionPreset.autoFit].
  static DimensionPreset parse(String? name) => DimensionPreset.values
      .firstWhere((p) => p.name == name, orElse: () => DimensionPreset.autoFit);
}

/// The terminal text-size preference. [auto] derives the font from the chosen
/// columns so they fit the container width; the others adjust that baseline.
enum TerminalTextSize {
  /// Derive the font size from the column count and container width.
  auto,

  /// Smaller than auto — fits more columns/keys (handy on phones).
  smaller,

  /// A fixed comfortable size.
  normal,

  /// Larger than auto.
  larger;

  /// Parses a persisted name, defaulting to [TerminalTextSize.auto].
  static TerminalTextSize parse(String? name) => TerminalTextSize.values
      .firstWhere((t) => t.name == name, orElse: () => TerminalTextSize.auto);
}

/// One orientation's usable screen box in CSS pixels.
class OrientationBox {
  /// Box width in CSS pixels.
  final double width;

  /// Box height in CSS pixels.
  final double height;

  /// Creates a box of [width]×[height].
  const OrientationBox(this.width, this.height);
}

/// A device's screen boxes in both orientations, used to suggest fitting
/// dimensions regardless of how the device is currently held.
class DeviceMetrics {
  /// The portrait (tall) box.
  final OrientationBox portrait;

  /// The landscape (wide) box.
  final OrientationBox landscape;

  /// Creates metrics from a [portrait] and [landscape] box.
  const DeviceMetrics({required this.portrait, required this.landscape});
}

/// The reference font size (px) the device presets are computed at. The live
/// terminal font then rescales to make those columns fit the real container,
/// which is why presets don't depend on the eventual font (no circularity).
const int kRefFontPx = 13;

/// Approximate monospace cell width as a fraction of the font size.
const double kCellWidthRatio = 0.60;

/// Approximate monospace line-box height as a fraction of the font size.
const double kCellHeightRatio = 1.20;

/// Horizontal chrome (terminal card padding + borders) subtracted from a box.
const double kHorizontalChrome = 24;

/// Vertical chrome (header, toolbar, key bar, gaps) subtracted from a box.
const double kVerticalChrome = 230;

/// Smallest/largest selectable column counts.
const int kMinCols = 20;
const int kMaxCols = 400;

/// Smallest/largest selectable row counts.
const int kMinRows = 5;
const int kMaxRows = 200;

/// Bounds for the rendered terminal font (px) when scaling a fixed grid to fit
/// its container. Wide enough that a fixed grid can both shrink onto a phone and
/// grow to fill a desktop window, so the terminal tracks the window size.
const int kMinFontPx = 6;
const int kMaxFontPx = 40;

/// Computes the columns/rows that fit [box] at [fontPx], after reserving the
/// terminal chrome, clamped to the selectable range.
({int cols, int rows}) computeFitDims(
  OrientationBox box, {
  int fontPx = kRefFontPx,
}) {
  // Guard against a non-positive font: a zero cell size divides to Infinity,
  // whose .floor() throws. Fall back to the reference size.
  final f = fontPx < 1 ? kRefFontPx : fontPx;
  final cellWidth = f * kCellWidthRatio;
  final cellHeight = f * kCellHeightRatio;
  final cols = ((box.width - kHorizontalChrome) / cellWidth).floor().clamp(
    kMinCols,
    kMaxCols,
  );
  final rows = ((box.height - kVerticalChrome) / cellHeight).floor().clamp(
    kMinRows,
    kMaxRows,
  );
  return (cols: cols, rows: rows);
}
