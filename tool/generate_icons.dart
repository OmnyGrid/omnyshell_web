// Generates the PWA icon set into web/icons/.
//
// Run from the package root:
//   dart run tool/generate_icons.dart
//
// The mark is a terminal prompt ">_" in the OmnyShell accent on a dark navy
// background — "any" icons get rounded corners; maskable/Apple icons are
// full-bleed squares (the platform applies its own mask/rounding).
import 'dart:io';

import 'package:image/image.dart';

final _bg = ColorRgba8(0x0b, 0x0e, 0x12, 255);
final _accent = ColorRgba8(0x4f, 0x8b, 0xff, 255);

/// Draws one icon of [size] px. [frac] is the glyph's content box as a fraction
/// of the canvas; [rounded] adds rounded corners (for "any"/favicon icons).
Image makeIcon(int size, {required double frac, required bool rounded}) {
  final img = Image(width: size, height: size, numChannels: 4);
  fill(img, color: ColorRgba8(0, 0, 0, 0));

  final radius = rounded ? (size * 0.22).round() : 0;
  fillRect(
    img,
    x1: 0,
    y1: 0,
    x2: size - 1,
    y2: size - 1,
    color: _bg,
    radius: radius,
  );

  final box = size * frac;
  final ox = (size - box) / 2;
  final oy = (size - box) / 2;
  final thickness = (box * 0.14).clamp(2, size.toDouble());

  int px(double f) => (ox + f * box).round();
  int py(double f) => (oy + f * box).round();

  // Chevron ">": two strokes meeting at a right-of-centre apex.
  drawLine(
    img,
    x1: px(0.12),
    y1: py(0.16),
    x2: px(0.60),
    y2: py(0.50),
    color: _accent,
    antialias: true,
    thickness: thickness,
  );
  drawLine(
    img,
    x1: px(0.60),
    y1: py(0.50),
    x2: px(0.12),
    y2: py(0.84),
    color: _accent,
    antialias: true,
    thickness: thickness,
  );

  // Underscore "_": a rounded bar to the lower right.
  fillRect(
    img,
    x1: px(0.52),
    y1: py(0.74),
    x2: px(0.92),
    y2: py(0.74) + (thickness).round(),
    color: _accent,
    radius: (thickness / 2).round(),
  );

  return img;
}

void write(String path, Image img) {
  final file = File(path)..createSync(recursive: true);
  file.writeAsBytesSync(encodePng(img));
  stdout.writeln('wrote $path (${img.width}x${img.height})');
}

void main() {
  const dir = 'web/icons';
  write('$dir/icon-192.png', makeIcon(192, frac: 0.62, rounded: true));
  write('$dir/icon-512.png', makeIcon(512, frac: 0.62, rounded: true));
  write(
    '$dir/icon-maskable-192.png',
    makeIcon(192, frac: 0.50, rounded: false),
  );
  write(
    '$dir/icon-maskable-512.png',
    makeIcon(512, frac: 0.50, rounded: false),
  );
  write('$dir/apple-touch-icon.png', makeIcon(180, frac: 0.58, rounded: false));
  write('$dir/favicon.png', makeIcon(48, frac: 0.66, rounded: true));
}
