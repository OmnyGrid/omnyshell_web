import '../core/observable.dart';
import '../storage/settings_store.dart';
import '../terminal/terminal_dimensions.dart';

/// Owns the user's terminal display preferences — the dimension preset (and the
/// custom column/row values it uses) and the text size — persisting each change
/// and exposing them as observables the settings panel and session screen watch.
///
/// DOM-free so it stays unit-testable; the session screen supplies the live
/// [DeviceMetrics] (read from the browser) when resolving dimensions.
class TerminalDisplayController {
  final SettingsStore _settings;

  /// The chosen dimension preset (observable for the settings UI).
  final Observable<DimensionPreset> preset;

  /// Custom column count, used when [preset] is [DimensionPreset.custom].
  final Observable<int> customCols;

  /// Custom row count, used when [preset] is [DimensionPreset.custom].
  final Observable<int> customRows;

  /// The chosen text size (observable; the session screen re-applies it live).
  final Observable<TerminalTextSize> textSize;

  /// Creates a controller, restoring persisted preferences from [settings].
  TerminalDisplayController(this._settings)
    : preset = Observable(DimensionPreset.parse(_settings.terminalDimPreset)),
      customCols = Observable(
        (_settings.terminalCustomCols ?? 100).clamp(kMinCols, kMaxCols),
      ),
      customRows = Observable(
        (_settings.terminalCustomRows ?? 30).clamp(kMinRows, kMaxRows),
      ),
      textSize = Observable(TerminalTextSize.parse(_settings.terminalTextSize));

  /// Sets and persists the dimension [next].
  void setPreset(DimensionPreset next) {
    preset.value = next;
    _settings.terminalDimPreset = next.name;
  }

  /// Sets and persists the custom [cols]×[rows], clamped to the valid range.
  void setCustom(int cols, int rows) {
    final c = cols.clamp(kMinCols, kMaxCols);
    final r = rows.clamp(kMinRows, kMaxRows);
    customCols.value = c;
    customRows.value = r;
    _settings.terminalCustomCols = c;
    _settings.terminalCustomRows = r;
  }

  /// Sets and persists the text size [next].
  void setTextSize(TerminalTextSize next) {
    textSize.value = next;
    _settings.terminalTextSize = next.name;
  }

  /// The PTY dimensions to open a new session with, or `null` to let the fit
  /// addon size the terminal to its container ([DimensionPreset.autoFit]).
  ///
  /// [device] supplies the per-orientation screen boxes for the landscape and
  /// portrait presets.
  ({int cols, int rows})? resolveDimensions(DeviceMetrics device) =>
      switch (preset.value) {
        DimensionPreset.autoFit => null,
        DimensionPreset.standard => (cols: 80, rows: 24),
        DimensionPreset.custom => (
          cols: customCols.value,
          rows: customRows.value,
        ),
        DimensionPreset.landscape => computeFitDims(device.landscape),
        DimensionPreset.portrait => computeFitDims(device.portrait),
      };
}
