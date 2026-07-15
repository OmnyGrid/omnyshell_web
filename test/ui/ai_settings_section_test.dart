@TestOn('browser')
library;

import 'package:omnyshell_web/ui_kit.dart' show aiSettingsSection;
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';

void main() {
  // The section is the portable half of the settings dialog: it takes only an
  // AiSettingsController, no AppContext, so a different app can reuse it.
  test('renders the AI controls from just the controller', () {
    final h = DomHarness();
    final host = web.document.createElement('div') as web.HTMLElement;
    for (final row in aiSettingsSection(h.ctx.ai)) {
      host.appendChild(row);
    }

    final provider =
        host.querySelector('#ai-provider') as web.HTMLSelectElement?;
    expect(provider, isNotNull);
    expect(provider!.value, h.ctx.ai.provider);
    expect(host.querySelector('#ai-model'), isNotNull);
    expect(host.querySelector('#ai-key'), isNotNull);
    expect(host.querySelector('#ai-use-hub'), isNotNull);
    expect(host.textContent, contains('AI agent'));
  });

  test('a change persists through the controller', () {
    final h = DomHarness();
    final host = web.document.createElement('div') as web.HTMLElement;
    for (final row in aiSettingsSection(h.ctx.ai)) {
      host.appendChild(row);
    }

    final model = host.querySelector('#ai-model') as web.HTMLInputElement;
    model.value = 'claude-sonnet-5';
    model.dispatchEvent(web.Event('change'));
    expect(h.ctx.ai.model, 'claude-sonnet-5');
  });
}
