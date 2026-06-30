import 'package:omnyshell/omnyshell_client_web.dart';

import '../core/omnyshell_service.dart';
import '../storage/settings_store.dart';

/// Builds and registers the `:ai` command on [registry] from the user's stored
/// AI settings and the Hub's advertised default.
///
/// Provider HTTPS calls go through the Hub (a browser cannot reach AI APIs
/// directly, and the Hub holds the key) via a [HubHttpClient]:
///
/// * **Custom key** — when the user opted out of the Hub default and supplied an
///   API key, the request is forwarded verbatim ([HttpProxyCredentialMode.none]).
/// * **Hub default** — otherwise the Hub's configured provider/model is used and
///   the Hub injects its key ([HttpProxyCredentialMode.hubDefault]).
///
/// When neither is available (no custom key and the Hub has no default), a stub
/// `:ai` is registered that points the user at Settings. All failures fall back
/// to the stub so session open is never blocked.
Future<void> registerAiCommand({
  required LocalCommandRegistry registry,
  required SettingsStore settings,
  required OmnyShellService service,
  required void Function() openSettings,
}) async {
  final wiring = await resolveAiWiring(settings: settings, service: service);
  if (wiring == null) {
    registry.register(AiSetupCommand(openSettings));
    return;
  }
  registry.addAiCommand(
    config: wiring.config,
    httpClient: wiring.httpClient,
    style: const AnsiAgentStyle(),
    onModeChanged: (mode) => settings.aiMode = mode.wireName,
    onLanguageChanged: (language) => settings.aiLanguage = language,
  );
}

/// Resolves the AI provider config and the Hub-routed HTTP client for the
/// connected session, mirroring `:ai`'s precedence:
///
/// * **Custom key** — when the user opted out of the Hub default and supplied an
///   API key, it is forwarded verbatim ([HttpProxyCredentialMode.none]).
/// * **Hub default** — otherwise the Hub's configured provider/model is used and
///   the Hub injects its key ([HttpProxyCredentialMode.hubDefault]).
///
/// Returns `null` when no provider is configured (custom key absent and the Hub
/// advertises no default) or on any failure — callers then treat AI as
/// unavailable (a stub `:ai`, or the `:ide` agent panel showing setup help).
/// Shared by [registerAiCommand] and the `:ide` command so both wire the agent
/// identically.
Future<({AiConfig config, HubHttpClient httpClient})?> resolveAiWiring({
  required SettingsStore settings,
  required OmnyShellService service,
}) async {
  try {
    final customKey = settings.aiApiKey;
    if (!settings.aiUseHubDefault &&
        customKey != null &&
        customKey.isNotEmpty) {
      final provider =
          AiProviderKind.tryParse(settings.aiProvider) ??
          AiProviderKind.anthropic;
      final config = AiConfig(
        provider: provider,
        model: settings.aiModel ?? defaultModelFor(provider),
        apiKey: customKey,
        defaultMode: AgentMode.tryParse(settings.aiMode) ?? AgentMode.plan,
        language: settings.aiLanguage,
      );
      return (config: config, httpClient: HubHttpClient(service.client));
    }

    // Don't let a silent/slow Hub stall session open; fall back to no provider.
    final hub = await service.fetchHubAiConfig().timeout(
      const Duration(seconds: 8),
    );
    final providerToken = hub.provider;
    if (!hub.available || providerToken == null) return null;
    final provider =
        AiProviderKind.tryParse(providerToken) ?? AiProviderKind.anthropic;
    final config = AiConfig(
      // Hub default means the Hub's provider *and* model; a stale custom model
      // (set then switched back to Hub default) must not leak in here.
      model: hub.model ?? defaultModelFor(provider),
      provider: provider,
      apiKey: '', // injected Hub-side
      plannerModel: hub.plannerModel,
      executorModel: hub.executorModel,
      explainerModel: hub.explainerModel,
      baseUrl: hub.baseUrl,
      defaultMode:
          AgentMode.tryParse(settings.aiMode ?? hub.mode) ?? AgentMode.plan,
      language: settings.aiLanguage ?? hub.language,
    );
    return (
      config: config,
      httpClient: HubHttpClient(
        service.client,
        credentialMode: HttpProxyCredentialMode.hubDefault,
        provider: provider.wireName,
      ),
    );
  } on Object {
    return null;
  }
}

/// A placeholder `:ai` shown when no provider is configured; points at Settings.
class AiSetupCommand extends LocalCommand {
  /// Opens the settings panel so the user can configure AI.
  final void Function() openSettings;

  /// Creates a setup stub.
  AiSetupCommand(this.openSettings);

  @override
  String get name => 'ai';

  @override
  String get description => 'AI agent (not configured — open Settings)';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    context.writeLine('ai: no provider configured.');
    context.writeLine(
      'Open Settings to use the Hub default or set your own API key.',
    );
    openSettings();
  }
}
