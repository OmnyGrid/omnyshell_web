@TestOn('browser')
library;

import 'package:omnyshell_web/terminal/terminal_dimensions.dart';
import 'package:omnyshell_web/ui/settings_panel.dart';
import 'package:test/test.dart';
import 'package:web/web.dart' as web;

import '../support/dom_harness.dart';

void main() {
  web.HTMLElement overlay() =>
      web.document.querySelector('.modal-overlay') as web.HTMLElement;

  void closeAnyModal() {
    web.document.querySelector('.modal-overlay')?.remove();
  }

  tearDown(closeAnyModal);

  test('shows the panel reflecting the current preferences', () {
    final h = DomHarness();
    h.ctx.display.setPreset(DimensionPreset.standard);
    showSettingsPanel(h.ctx);

    final standard =
        web.document.getElementById('term-dim-standard')
            as web.HTMLInputElement;
    expect(standard.checked, isTrue);
    final autoText =
        web.document.getElementById('term-text-auto') as web.HTMLInputElement;
    expect(autoText.checked, isTrue);

    h.dispose();
  });

  test('selecting a dimension preset persists it via the controller', () {
    final h = DomHarness();
    showSettingsPanel(h.ctx);

    final custom =
        web.document.getElementById('term-dim-custom') as web.HTMLInputElement;
    custom.checked = true;
    custom.dispatchEvent(web.Event('change'));

    expect(h.ctx.display.preset.value, DimensionPreset.custom);
    expect(h.settings.terminalDimPreset, 'custom');

    // Custom inputs become enabled when the custom preset is active.
    final cols =
        web.document.getElementById('term-cols') as web.HTMLInputElement;
    expect(cols.disabled, isFalse);

    h.dispose();
  });

  test('editing custom cols/rows persists clamped values', () {
    final h = DomHarness();
    h.ctx.display.setPreset(DimensionPreset.custom);
    showSettingsPanel(h.ctx);

    final cols =
        web.document.getElementById('term-cols') as web.HTMLInputElement;
    final rows =
        web.document.getElementById('term-rows') as web.HTMLInputElement;
    cols.value = '5'; // below kMinCols -> clamped
    rows.value = '40';
    cols.dispatchEvent(web.Event('change'));
    rows.dispatchEvent(web.Event('change'));

    expect(h.ctx.display.customCols.value, kMinCols);
    expect(h.ctx.display.customRows.value, 40);
    // The clamped value is reflected back into the input.
    expect(cols.value, '$kMinCols');

    h.dispose();
  });

  test('changing text size persists it', () {
    final h = DomHarness();
    showSettingsPanel(h.ctx);

    final smaller =
        web.document.getElementById('term-text-smaller')
            as web.HTMLInputElement;
    smaller.checked = true;
    smaller.dispatchEvent(web.Event('change'));

    expect(h.ctx.display.textSize.value, TerminalTextSize.smaller);
    expect(h.settings.terminalTextSize, 'smaller');

    h.dispose();
  });

  test('Close removes the modal', () {
    final h = DomHarness();
    showSettingsPanel(h.ctx);
    expect(web.document.querySelector('.modal-overlay'), isNotNull);

    final buttons = overlay().querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      final b = buttons.item(i) as web.HTMLElement;
      if (b.textContent == 'Close') b.click();
    }
    expect(web.document.querySelector('.modal-overlay'), isNull);

    h.dispose();
  });
}
