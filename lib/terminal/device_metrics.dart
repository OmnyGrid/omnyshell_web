import 'package:web/web.dart' as web;

import 'terminal_dimensions.dart';

/// Reads this device's screen boxes in both orientations from the browser.
///
/// `screen.width/height` are orientation-stable enough to derive both boxes, so
/// the dimension presets stay correct regardless of how the device is currently
/// held.
///
/// Kept apart from `terminal_dimensions.dart`, which is deliberately pure
/// (and so unit-testable on the VM): this is the one function that has to touch
/// the DOM.
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
