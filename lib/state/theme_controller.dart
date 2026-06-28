import '../core/observable.dart';
import '../storage/settings_store.dart';

/// The user's theme preference.
enum ThemeMode {
  /// Always light.
  light,

  /// Always dark.
  dark,

  /// Follow the OS/browser `prefers-color-scheme`.
  system;

  /// Parses a persisted name, defaulting to [ThemeMode.system].
  static ThemeMode parse(String? name) => ThemeMode.values.firstWhere(
    (m) => m.name == name,
    orElse: () => ThemeMode.system,
  );
}

/// The concrete theme applied to the document: only light or dark.
enum ResolvedTheme {
  /// Light palette.
  light,

  /// Dark palette.
  dark;

  /// The `data-theme` attribute value.
  String get attr => name;
}

/// Owns the theme [mode], persists it, and exposes the [resolved] theme that the
/// UI applies as `data-theme` on the document root.
///
/// DOM application is delegated to [apply] so this controller stays unit-testable
/// without a browser; the live app passes a callback that sets the attribute and
/// `prefersDark` wired to `matchMedia('(prefers-color-scheme: dark)')`.
class ThemeController {
  final SettingsStore _settings;

  /// Reports whether the OS/browser currently prefers a dark scheme.
  final bool Function() prefersDark;

  /// Applies the resolved theme to the document (null in non-DOM tests).
  final void Function(ResolvedTheme theme)? onApply;

  /// The current preference (observable for the theme toggle UI).
  final Observable<ThemeMode> mode;

  /// Creates a controller, restoring the persisted preference from settings.
  ThemeController(this._settings, {required this.prefersDark, this.onApply})
    : mode = Observable(ThemeMode.parse(_settings.theme)) {
    _applyNow();
  }

  /// The theme actually rendered, resolving [ThemeMode.system] against the OS.
  ResolvedTheme get resolved => switch (mode.value) {
    ThemeMode.light => ResolvedTheme.light,
    ThemeMode.dark => ResolvedTheme.dark,
    ThemeMode.system =>
      prefersDark() ? ResolvedTheme.dark : ResolvedTheme.light,
  };

  /// Sets the preference, persists it, and re-applies.
  void set(ThemeMode next) {
    mode.value = next;
    _settings.theme = next.name;
    _applyNow();
  }

  /// Cycles light → dark → system → light (used by the header toggle).
  void cycle() {
    final order = ThemeMode.values;
    set(order[(mode.value.index + 1) % order.length]);
  }

  /// Re-applies the resolved theme (call when the OS preference changes while in
  /// [ThemeMode.system]).
  void refreshSystem() => _applyNow();

  void _applyNow() => onApply?.call(resolved);
}
