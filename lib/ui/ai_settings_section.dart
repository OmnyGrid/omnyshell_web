import 'dart:async';

import 'package:web/web.dart' as web;

import '../state/ai_settings_controller.dart';
import 'dom.dart';
import 'widgets.dart';

/// The AI-agent settings controls, bound to an [AiSettingsController].
///
/// This is the portable half of the settings dialog: it needs no `AppContext`,
/// only the controller (which itself wraps the settings store and the shell
/// service), so any app that offers the `:ai` command can drop these rows into
/// its own settings modal. Returns the section's elements in order, ready to
/// place under the rest of a settings body.
///
/// Bindings persist on `change` through the controller; the "use Hub default"
/// checkbox enables or disables the custom provider/model/key fields, and the
/// Hub's advertised default (if any) is fetched and shown as a hint.
List<web.HTMLElement> aiSettingsSection(AiSettingsController ai) {
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

  return [
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
  ];
}
