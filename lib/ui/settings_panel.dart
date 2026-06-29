import 'package:web/web.dart' as web;

import '../app/app_context.dart';
import '../terminal/terminal_dimensions.dart';
import 'dom.dart';
import 'modal.dart';
import 'widgets.dart';

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
    ],
  );

  modal = Modal(
    title: 'Settings',
    body: body,
    actions: [button('Close', primary: true, onClick: () => modal.close())],
  );
  modal.show();
}

/// Reads this device's screen boxes in both orientations from the browser.
/// `screen.width/height` are orientation-stable enough to derive both boxes, so
/// the presets stay correct regardless of how the device is currently held.
DeviceMetrics deviceMetrics() {
  final s = web.window.screen;
  final w = s.width.toDouble();
  final h = s.height.toDouble();
  final short = w < h ? w : h;
  final long = w < h ? h : w;
  return DeviceMetrics(
    portrait: OrientationBox(short, long),
    landscape: OrientationBox(long, short),
  );
}
