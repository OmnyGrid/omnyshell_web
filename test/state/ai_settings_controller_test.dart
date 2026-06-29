import 'package:omnyshell_web/core/omnyshell_service.dart';
import 'package:omnyshell_web/state/ai_settings_controller.dart';
import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:test/test.dart';

void main() {
  late MemoryKeyValueStore kv;
  late SettingsStore settings;
  late AiSettingsController ai;

  setUp(() {
    kv = MemoryKeyValueStore();
    settings = SettingsStore(kv);
    // The service is only used by hubDefault() (needs a connection); the
    // getters/setters under test never touch it.
    ai = AiSettingsController(settings, OmnyShellService());
  });

  test('useHubDefault defaults to true and round-trips', () {
    expect(ai.useHubDefault, isTrue);
    ai.useHubDefault = false;
    expect(ai.useHubDefault, isFalse);
    expect(settings.aiUseHubDefault, isFalse);
  });

  test('provider defaults to anthropic and persists', () {
    expect(ai.provider, 'anthropic');
    ai.provider = 'openai';
    expect(ai.provider, 'openai');
    expect(settings.aiProvider, 'openai');
  });

  test('blank model/apiKey/language clear the stored value', () {
    ai
      ..model = 'gpt-4.1-mini'
      ..apiKey = 'sk-123'
      ..language = 'portuguese';
    expect(settings.aiModel, 'gpt-4.1-mini');
    expect(settings.aiApiKey, 'sk-123');
    expect(settings.aiLanguage, 'portuguese');

    ai
      ..model = '   '
      ..apiKey = ''
      ..language = '';
    expect(settings.aiModel, isNull);
    expect(settings.aiApiKey, isNull);
    expect(settings.aiLanguage, isNull);
  });

  test('mode defaults to plan and persists', () {
    expect(ai.mode, 'plan');
    ai.mode = 'auto';
    expect(ai.mode, 'auto');
    expect(settings.aiMode, 'auto');
  });

  test('the API key persists only under the ai namespace', () {
    ai.apiKey = 'sk-secret';
    expect(kv.snapshot.keys, contains('omnyshell.ai.apiKey'));
    // No stray persistence outside the ai namespace.
    expect(
      kv.snapshot.keys.where((k) => !k.startsWith('omnyshell.ai.')),
      isEmpty,
    );
  });
}
