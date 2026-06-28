import 'key_value_store.dart';

/// Typed, namespaced access to persisted app settings over a [KeyValueStore].
///
/// Holds non-secret preferences (theme, last Hub, last principal) plus, when
/// the user opts in, the bearer token per Hub. Tokens are stored in
/// `localStorage` and are therefore exposed to any script that runs on the
/// page — see the README security note; [rememberToken] lets the user keep the
/// token in memory only.
class SettingsStore {
  static const String _prefix = 'omnyshell.';
  static const String _themeKey = '${_prefix}theme';
  static const String _hubKey = '${_prefix}hub';
  static const String _principalKey = '${_prefix}principal';
  static const String _rememberKey = '${_prefix}rememberToken';
  static const String _tokenPrefix = '${_prefix}token.';

  final KeyValueStore _kv;

  /// Creates a settings store over [kv].
  SettingsStore(this._kv);

  /// The persisted theme preference (`light`, `dark`, or `system`), or `null`.
  String? get theme => _kv.read(_themeKey);
  set theme(String? value) =>
      value == null ? _kv.remove(_themeKey) : _kv.write(_themeKey, value);

  /// The last Hub URL used.
  String? get hub => _kv.read(_hubKey);
  set hub(String? value) =>
      value == null ? _kv.remove(_hubKey) : _kv.write(_hubKey, value);

  /// The last principal (login name) used.
  String? get principal => _kv.read(_principalKey);
  set principal(String? value) => value == null
      ? _kv.remove(_principalKey)
      : _kv.write(_principalKey, value);

  /// Whether the user opted to persist their token across reloads.
  bool get rememberToken => _kv.read(_rememberKey) == 'true';
  set rememberToken(bool value) =>
      _kv.write(_rememberKey, value ? 'true' : 'false');

  /// Reads the saved token for [hubUri], or `null` if none was persisted.
  String? tokenFor(String hubUri) => _kv.read('$_tokenPrefix$hubUri');

  /// Persists [token] for [hubUri].
  void saveToken(String hubUri, String token) =>
      _kv.write('$_tokenPrefix$hubUri', token);

  /// Removes the saved token for [hubUri].
  void clearToken(String hubUri) => _kv.remove('$_tokenPrefix$hubUri');

  /// Removes every persisted token (used on "forget all").
  void clearAllTokens() => _kv.removeWhereKeyStartsWith(_tokenPrefix);
}
