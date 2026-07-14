import 'key_value_store.dart';

/// Typed, namespaced access to persisted app settings over a [KeyValueStore].
///
/// Holds non-secret preferences (theme, last Hub, last principal) plus, when
/// the user opts in, the bearer token per Hub. Tokens are stored in
/// `localStorage` and are therefore exposed to any script that runs on the
/// page — see the README security note; [rememberToken] lets the user keep the
/// token in memory only.
class SettingsStore {
  /// The default key namespace.
  static const String defaultPrefix = 'omnyshell.';

  /// The namespace every key of this store is written under.
  ///
  /// Another app embedding this package — the OmnyServer dashboard, say — is
  /// very likely served from the *same origin* as this one (one Hub can host
  /// both), and `localStorage` is per-origin. Sharing the namespace would mean
  /// sharing, and clobbering, each other's theme, Hub, token and terminal
  /// preferences. Give each app its own prefix.
  final String prefix;

  final KeyValueStore _kv;

  /// Creates a settings store over [kv], namespacing keys under [prefix].
  SettingsStore(this._kv, {this.prefix = defaultPrefix});

  String get _themeKey => '${prefix}theme';
  String get _hubKey => '${prefix}hub';
  String get _principalKey => '${prefix}principal';
  String get _rememberKey => '${prefix}rememberToken';
  String get _tokenPrefix => '${prefix}token.';
  String get _termDimKey => '${prefix}terminal.dimPreset';
  String get _termColsKey => '${prefix}terminal.customCols';
  String get _termRowsKey => '${prefix}terminal.customRows';
  String get _termTextKey => '${prefix}terminal.textSize';
  String get _aiUseHubKey => '${prefix}ai.useHubDefault';
  String get _aiProviderKey => '${prefix}ai.provider';
  String get _aiModelKey => '${prefix}ai.model';
  String get _aiApiKeyKey => '${prefix}ai.apiKey';
  String get _aiModeKey => '${prefix}ai.mode';
  String get _aiLanguageKey => '${prefix}ai.language';

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

  /// The persisted terminal dimension preset name, or `null`.
  String? get terminalDimPreset => _kv.read(_termDimKey);
  set terminalDimPreset(String? value) =>
      value == null ? _kv.remove(_termDimKey) : _kv.write(_termDimKey, value);

  /// The persisted custom column count, or `null`.
  int? get terminalCustomCols => int.tryParse(_kv.read(_termColsKey) ?? '');
  set terminalCustomCols(int? value) => value == null
      ? _kv.remove(_termColsKey)
      : _kv.write(_termColsKey, '$value');

  /// The persisted custom row count, or `null`.
  int? get terminalCustomRows => int.tryParse(_kv.read(_termRowsKey) ?? '');
  set terminalCustomRows(int? value) => value == null
      ? _kv.remove(_termRowsKey)
      : _kv.write(_termRowsKey, '$value');

  /// The persisted terminal text-size preference, or `null`.
  String? get terminalTextSize => _kv.read(_termTextKey);
  set terminalTextSize(String? value) =>
      value == null ? _kv.remove(_termTextKey) : _kv.write(_termTextKey, value);

  // --- AI settings ----------------------------------------------------------
  //
  // Whether to use the Hub's default provider/model/key (the key stays on the
  // Hub) or a custom provider/model with the user's own key. The key, like the
  // bearer token, lives in localStorage and is exposed to any script on the
  // page — prefer the Hub default unless you accept that trade-off.

  /// Whether to use the Hub's default AI provider/model (key injected Hub-side).
  /// Defaults to `true` when never set.
  bool get aiUseHubDefault => _kv.read(_aiUseHubKey) != 'false';
  set aiUseHubDefault(bool value) =>
      _kv.write(_aiUseHubKey, value ? 'true' : 'false');

  /// The user's custom AI provider token (`anthropic`/`openai`/`gemini`), or
  /// `null` to fall back to the Hub default.
  String? get aiProvider => _kv.read(_aiProviderKey);
  set aiProvider(String? value) => value == null
      ? _kv.remove(_aiProviderKey)
      : _kv.write(_aiProviderKey, value);

  /// The user's custom model id, or `null`.
  String? get aiModel => _kv.read(_aiModelKey);
  set aiModel(String? value) =>
      value == null ? _kv.remove(_aiModelKey) : _kv.write(_aiModelKey, value);

  /// The user's own API key, or `null` to use the Hub's key.
  String? get aiApiKey => _kv.read(_aiApiKeyKey);
  set aiApiKey(String? value) => value == null || value.isEmpty
      ? _kv.remove(_aiApiKeyKey)
      : _kv.write(_aiApiKeyKey, value);

  /// The default agent mode token (`standard`/`plan`/`auto`), or `null`.
  String? get aiMode => _kv.read(_aiModeKey);
  set aiMode(String? value) =>
      value == null ? _kv.remove(_aiModeKey) : _kv.write(_aiModeKey, value);

  /// The reply-language preference, or `null` for the model default.
  String? get aiLanguage => _kv.read(_aiLanguageKey);
  set aiLanguage(String? value) => value == null || value.isEmpty
      ? _kv.remove(_aiLanguageKey)
      : _kv.write(_aiLanguageKey, value);
}
