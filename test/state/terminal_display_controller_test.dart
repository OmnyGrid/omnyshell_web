import 'package:omnyshell_web/state/terminal_display_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:omnyshell_web/terminal/terminal_dimensions.dart';
import 'package:test/test.dart';

void main() {
  late SettingsStore settings;

  setUp(() => settings = SettingsStore(MemoryKeyValueStore()));

  const device = DeviceMetrics(
    portrait: OrientationBox(450, 900),
    landscape: OrientationBox(900, 450),
  );

  test('defaults to auto-fit and auto text size', () {
    final c = TerminalDisplayController(settings);
    expect(c.preset.value, DimensionPreset.autoFit);
    expect(c.textSize.value, TerminalTextSize.auto);
    expect(c.resolveDimensions(device), isNull);
  });

  test('setPreset persists and round-trips', () {
    TerminalDisplayController(settings).setPreset(DimensionPreset.standard);
    expect(settings.terminalDimPreset, 'standard');
    expect(
      TerminalDisplayController(settings).preset.value,
      DimensionPreset.standard,
    );
  });

  test('setTextSize persists and round-trips', () {
    TerminalDisplayController(settings).setTextSize(TerminalTextSize.smaller);
    expect(settings.terminalTextSize, 'smaller');
    expect(
      TerminalDisplayController(settings).textSize.value,
      TerminalTextSize.smaller,
    );
  });

  test('setCustom persists, clamps, and round-trips', () {
    final c = TerminalDisplayController(settings);
    c.setCustom(120, 40);
    expect(settings.terminalCustomCols, 120);
    expect(settings.terminalCustomRows, 40);

    // Out-of-range values are clamped to the valid bounds.
    c.setCustom(5, 1000);
    expect(c.customCols.value, kMinCols);
    expect(c.customRows.value, kMaxRows);
    expect(settings.terminalCustomCols, kMinCols);
    expect(settings.terminalCustomRows, kMaxRows);
  });

  group('resolveDimensions', () {
    test('autoFit -> null', () {
      final c = TerminalDisplayController(settings)
        ..setPreset(DimensionPreset.autoFit);
      expect(c.resolveDimensions(device), isNull);
    });

    test('standard -> 80x24', () {
      final c = TerminalDisplayController(settings)
        ..setPreset(DimensionPreset.standard);
      expect(c.resolveDimensions(device), (cols: 80, rows: 24));
    });

    test('custom -> the chosen cols/rows', () {
      final c = TerminalDisplayController(settings)
        ..setPreset(DimensionPreset.custom)
        ..setCustom(120, 40);
      expect(c.resolveDimensions(device), (cols: 120, rows: 40));
    });

    test('landscape/portrait -> computed dims for the device', () {
      final c = TerminalDisplayController(settings)
        ..setPreset(DimensionPreset.landscape);
      expect(c.resolveDimensions(device), computeFitDims(device.landscape));
      c.setPreset(DimensionPreset.portrait);
      expect(c.resolveDimensions(device), computeFitDims(device.portrait));
    });
  });
}
