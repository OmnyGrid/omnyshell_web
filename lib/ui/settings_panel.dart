import 'dart:async';

import 'package:web/web.dart' as web;

import '../app/app_context.dart';
import '../terminal/device_metrics.dart';
import '../terminal/terminal_dimensions.dart';
import 'dom.dart';
import 'modal.dart';
import 'widgets.dart';

// `deviceMetrics` moved to `terminal/device_metrics.dart` so the terminal stack
// can be embedded without dragging this AppContext-coupled panel along. Kept
// exported here so existing importers are unaffected.
export '../terminal/device_metrics.dart' show deviceMetrics;

/// Opens the global settings panel — a modal where the user picks the terminal
/// dimensions for new sessions and the terminal text size. Both choices persist
/// immediately (via [TerminalDisplayController]); dimension changes take effect
/// the next time a session is opened, while text size applies live.
void showSettingsPanel(AppContext ctx) {
  final display = ctx.display;
  final device = deviceMetrics();
  final landscape = computeFitDims(device.landscape);
  final portrait = computeFitDims(device.portrait);

  // Custom cols/rows inputs (revealed when the "Custom" preset is selected).
  final cols = input(
    id: 'term-cols',
    type: 'number',
    value: '${display.customCols.value}',
  );
  final rows = input(
    id: 'term-rows',
    type: 'number',
    value: '${display.customRows.value}',
  );
  void commitCustom() {
    final c = int.tryParse(cols.value) ?? display.customCols.value;
    final r = int.tryParse(rows.value) ?? display.customRows.value;
    display.setCustom(c, r);
    // Reflect any clamping back into the inputs.
    cols.value = '${display.customCols.value}';
    rows.value = '${display.customRows.value}';
  }

  on(cols, 'change', (_) => commitCustom());
  on(rows, 'change', (_) => commitCustom());

  final customFields = el(
    'div',
    classes: 'row custom-dims',
    children: [
      field('Columns', cols, hint: '$kMinCols–$kMaxCols'),
      field('Rows', rows, hint: '$kMinRows–$kMaxRows'),
    ],
  );
  void syncCustomEnabled() {
    final enabled = display.preset.value == DimensionPreset.custom;
    customFields.classList.toggle('disabled', !enabled);
    cols.disabled = !enabled;
    rows.disabled = !enabled;
  }

  final dimensions = radioGroup(
    name: 'term-dim',
    ariaLabel: 'Terminal size',
    selected: display.preset.value.name,
    options: [
      (value: DimensionPreset.autoFit.name, label: 'Auto-fit (current screen)'),
      (
        value: DimensionPreset.landscape.name,
        label: 'Fit landscape · ${landscape.cols}×${landscape.rows}',
      ),
      (
        value: DimensionPreset.portrait.name,
        label: 'Fit portrait · ${portrait.cols}×${portrait.rows}',
      ),
      (value: DimensionPreset.standard.name, label: 'Standard · 80×24'),
      (value: DimensionPreset.custom.name, label: 'Custom'),
    ],
    onChange: (value) {
      display.setPreset(DimensionPreset.parse(value));
      syncCustomEnabled();
    },
  );
  syncCustomEnabled();

  final textSize = radioGroup(
    name: 'term-text',
    ariaLabel: 'Text size',
    selected: display.textSize.value.name,
    inline: true,
    options: [
      (value: TerminalTextSize.auto.name, label: 'Auto'),
      (value: TerminalTextSize.smaller.name, label: 'Smaller'),
      (value: TerminalTextSize.normal.name, label: 'Normal'),
      (value: TerminalTextSize.larger.name, label: 'Larger'),
    ],
    onChange: (value) => display.setTextSize(TerminalTextSize.parse(value)),
  );

  // --- AI agent -------------------------------------------------------------
  final ai = ctx.ai;

  final providerSelect =
      el('select', id: 'ai-provider') as web.HTMLSelectElement;
  for (final p in const ['anthropic', 'openai', 'gemini']) {
    final opt = el('option', text: p) as web.HTMLOptionElement;
    opt.value = p;
    opt.selected = p == ai.provider;
    providerSelect.appendChild(opt);
  }
  on(providerSelect, 'change', (_) => ai.provider = providerSelect.value);

  final aiModel = input(
    id: 'ai-model',
    value: ai.model,
    placeholder: 'provider default',
  );
  on(aiModel, 'change', (_) => ai.model = aiModel.value);

  final aiKey = input(
    id: 'ai-key',
    type: 'password',
    value: ai.apiKey,
    placeholder: 'sk-…',
    autocomplete: 'off',
  );
  on(aiKey, 'change', (_) => ai.apiKey = aiKey.value);

  final aiCustom = el(
    'div',
    classes: 'stack ai-custom',
    children: [
      field('Provider', providerSelect),
      field('Model', aiModel, hint: 'Leave blank for the provider default.'),
      field(
        'Your API key',
        aiKey,
        hint: 'Stored in this browser only; sent via the Hub to the provider.',
      ),
    ],
  );

  void syncAiEnabled() {
    final custom = !ai.useHubDefault;
    aiCustom.classList.toggle('disabled', !custom);
    providerSelect.disabled = !custom;
    aiModel.disabled = !custom;
    aiKey.disabled = !custom;
  }

  final hubHint = el('div', classes: 'hint', text: 'Checking the Hub default…');
  unawaited(
    ai.hubDefault().then((cfg) {
      hubHint.textContent = (cfg == null || !cfg.available)
          ? 'The Hub has no default AI provider — add your own key below.'
          : 'Hub default: ${cfg.provider} / ${cfg.model ?? 'model default'} '
                '(the key stays on the Hub).';
    }),
  );

  final useHub = checkbox(
    "Use the Hub's default AI provider",
    id: 'ai-use-hub',
    checked: ai.useHubDefault,
  );
  on(useHub.box, 'change', (_) {
    ai.useHubDefault = useHub.box.checked;
    syncAiEnabled();
  });

  final aiMode = radioGroup(
    name: 'ai-mode',
    ariaLabel: 'Agent mode',
    inline: true,
    selected: ai.mode,
    options: const [
      (value: 'standard', label: 'Standard'),
      (value: 'plan', label: 'Plan'),
      (value: 'auto', label: 'Auto'),
    ],
    onChange: (value) => ai.mode = value,
  );

  final aiLang = input(
    id: 'ai-lang',
    value: ai.language,
    placeholder: 'model default',
  );
  on(aiLang, 'change', (_) => ai.language = aiLang.value);

  syncAiEnabled();

  late final Modal modal;
  final body = el(
    'div',
    classes: 'stack settings-panel',
    children: [
      el('h3', text: 'Terminal size'),
      dimensions,
      customFields,
      el(
        'div',
        classes: 'hint',
        text:
            'Applies to the next session you open — '
            'running sessions keep their size.',
      ),
      el('h3', text: 'Text size'),
      textSize,
      el('div', classes: 'hint', text: 'Applies immediately.'),
      el('hr'),
      el('h3', text: 'AI agent'),
      useHub.root,
      hubHint,
      aiCustom,
      el('div', classes: 'hint', text: 'Default mode'),
      aiMode,
      field(
        'Reply language',
        aiLang,
        hint: 'e.g. english, portuguese — blank for the model default.',
      ),
      el('div', classes: 'hint', text: 'Applies to the next session you open.'),
    ],
  );

  modal = Modal(
    title: 'Settings',
    body: body,
    actions: [button('Close', primary: true, onClick: () => modal.close())],
  );
  modal.show();
}
