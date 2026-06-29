import 'package:omnyshell/omnyshell_client_web.dart' show HubAiConfig;

import '../core/omnyshell_service.dart';
import '../storage/settings_store.dart';

/// Owns the user's AI preferences, persisting each change to [SettingsStore] and
/// exposing the Hub's advertised default for the settings panel.
///
/// The agent can run with the Hub's default provider/model (the API key stays on
/// the Hub and is injected when proxying) or with a custom provider/model and the
/// user's own key. DOM-free so it stays unit-testable; changes take effect the
/// next time a session registers the `:ai` command.
class AiSettingsController {
  final SettingsStore _settings;
  final OmnyShellService _service;

  /// Creates a controller over [settings] and [service].
  AiSettingsController(this._settings, this._service);

  /// Whether to use the Hub's default provider/model (key injected Hub-side).
  bool get useHubDefault => _settings.aiUseHubDefault;
  set useHubDefault(bool value) => _settings.aiUseHubDefault = value;

  /// The user's custom provider token (`anthropic`/`openai`/`gemini`).
  String get provider => _settings.aiProvider ?? 'anthropic';
  set provider(String value) => _settings.aiProvider = value;

  /// The user's custom model id (empty falls back to the provider default).
  String get model => _settings.aiModel ?? '';
  set model(String value) {
    final v = value.trim();
    _settings.aiModel = v.isEmpty ? null : v;
  }

  /// The user's own API key (empty uses the Hub's key).
  String get apiKey => _settings.aiApiKey ?? '';
  set apiKey(String value) {
    final v = value.trim();
    _settings.aiApiKey = v.isEmpty ? null : v;
  }

  /// The default agent mode token (`standard`/`plan`/`auto`).
  String get mode => _settings.aiMode ?? 'plan';
  set mode(String value) => _settings.aiMode = value;

  /// The reply-language preference (empty for the model default).
  String get language => _settings.aiLanguage ?? '';
  set language(String value) {
    final v = value.trim();
    _settings.aiLanguage = v.isEmpty ? null : v;
  }

  /// Fetches the Hub's advertised default AI config (provider/model, no key),
  /// or `null` when unavailable or the call fails (best-effort, for display).
  Future<HubAiConfig?> hubDefault() async {
    try {
      return await _service.fetchHubAiConfig();
    } on Object {
      return null;
    }
  }
}
