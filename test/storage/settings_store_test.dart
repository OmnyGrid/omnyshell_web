import 'package:omnyshell_web/storage/key_value_store.dart';
import 'package:omnyshell_web/storage/settings_store.dart';
import 'package:test/test.dart';

void main() {
  late MemoryKeyValueStore kv;
  late SettingsStore settings;

  setUp(() {
    kv = MemoryKeyValueStore();
    settings = SettingsStore(kv);
  });

  test('persists theme, hub and principal', () {
    settings
      ..theme = 'dark'
      ..hub = 'wss://hub:8443'
      ..principal = 'alice';
    expect(settings.theme, 'dark');
    expect(settings.hub, 'wss://hub:8443');
    expect(settings.principal, 'alice');
  });

  test('rememberToken defaults to false and round-trips', () {
    expect(settings.rememberToken, isFalse);
    settings.rememberToken = true;
    expect(settings.rememberToken, isTrue);
  });

  test('tokens are namespaced per hub', () {
    settings.saveToken('wss://a', 'ta');
    settings.saveToken('wss://b', 'tb');
    expect(settings.tokenFor('wss://a'), 'ta');
    expect(settings.tokenFor('wss://b'), 'tb');
  });

  test('clearToken removes a single hub token', () {
    settings.saveToken('wss://a', 'ta');
    settings.saveToken('wss://b', 'tb');
    settings.clearToken('wss://a');
    expect(settings.tokenFor('wss://a'), isNull);
    expect(settings.tokenFor('wss://b'), 'tb');
  });

  test('clearAllTokens leaves non-token settings intact', () {
    settings
      ..theme = 'light'
      ..saveToken('wss://a', 'ta')
      ..saveToken('wss://b', 'tb');
    settings.clearAllTokens();
    expect(settings.tokenFor('wss://a'), isNull);
    expect(settings.tokenFor('wss://b'), isNull);
    expect(settings.theme, 'light');
  });

  test('writes through to the underlying store with the omnyshell prefix', () {
    settings.theme = 'dark';
    expect(kv.snapshot.keys, contains('omnyshell.theme'));
  });

  test('terminal display preferences round-trip with the omnyshell prefix', () {
    settings
      ..terminalDimPreset = 'custom'
      ..terminalCustomCols = 120
      ..terminalCustomRows = 40
      ..terminalTextSize = 'smaller';
    expect(settings.terminalDimPreset, 'custom');
    expect(settings.terminalCustomCols, 120);
    expect(settings.terminalCustomRows, 40);
    expect(settings.terminalTextSize, 'smaller');
    expect(
      kv.snapshot.keys,
      containsAll([
        'omnyshell.terminal.dimPreset',
        'omnyshell.terminal.customCols',
        'omnyshell.terminal.customRows',
        'omnyshell.terminal.textSize',
      ]),
    );
  });

  test('terminal custom dims are null when unset or non-numeric', () {
    expect(settings.terminalCustomCols, isNull);
    settings.terminalCustomCols = null;
    expect(settings.terminalCustomCols, isNull);
  });
}
