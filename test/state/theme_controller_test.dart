import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:omnyshell_web/state/theme_controller.dart';
import 'package:test/test.dart';

void main() {
  late SettingsStore settings;
  late List<ResolvedTheme> applied;

  ThemeController build({bool prefersDark = false}) {
    applied = [];
    return ThemeController(
      settings,
      prefersDark: () => prefersDark,
      onApply: applied.add,
    );
  }

  setUp(() => settings = SettingsStore(MemoryKeyValueStore()));

  test('defaults to system and applies on construction', () {
    final c = build(prefersDark: true);
    expect(c.mode.value, ThemeMode.system);
    expect(c.resolved, ResolvedTheme.dark);
    expect(applied, [ResolvedTheme.dark]);
  });

  test('system mode follows the OS preference', () {
    expect(build(prefersDark: false).resolved, ResolvedTheme.light);
    expect(build(prefersDark: true).resolved, ResolvedTheme.dark);
  });

  test('explicit light overrides a dark OS preference', () {
    final c = build(prefersDark: true);
    c.set(ThemeMode.light);
    expect(c.resolved, ResolvedTheme.light);
    expect(applied.last, ResolvedTheme.light);
    expect(settings.theme, 'light');
  });

  test('restores the persisted preference', () {
    settings.theme = 'dark';
    final c = build(prefersDark: false);
    expect(c.mode.value, ThemeMode.dark);
    expect(c.resolved, ResolvedTheme.dark);
  });

  test('cycle advances light → dark → system', () {
    final c = build();
    c.set(ThemeMode.light);
    c.cycle();
    expect(c.mode.value, ThemeMode.dark);
    c.cycle();
    expect(c.mode.value, ThemeMode.system);
    c.cycle();
    expect(c.mode.value, ThemeMode.light);
  });

  test('parse falls back to system for unknown values', () {
    expect(ThemeMode.parse(null), ThemeMode.system);
    expect(ThemeMode.parse('bogus'), ThemeMode.system);
    expect(ThemeMode.parse('dark'), ThemeMode.dark);
  });
}
