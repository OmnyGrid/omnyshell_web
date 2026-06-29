import 'package:omnyshell_web/terminal/terminal_dimensions.dart';
import 'package:test/test.dart';

void main() {
  group('computeFitDims', () {
    test('fits a known box at the reference font', () {
      // width 800: (800-24)/(13*0.60)=99.4 -> 99 cols
      // height 600: (600-230)/(13*1.20)=23.7 -> 23 rows
      final dims = computeFitDims(const OrientationBox(800, 600));
      expect(dims.cols, 99);
      expect(dims.rows, 23);
    });

    test('clamps to the minimum on a tiny box', () {
      final dims = computeFitDims(const OrientationBox(100, 100));
      expect(dims.cols, kMinCols);
      expect(dims.rows, kMinRows);
    });

    test('clamps to the maximum on a huge box', () {
      final dims = computeFitDims(const OrientationBox(100000, 100000));
      expect(dims.cols, kMaxCols);
      expect(dims.rows, kMaxRows);
    });

    test('landscape yields more columns than portrait for the same device', () {
      const long = 900.0, short = 450.0;
      final landscape = computeFitDims(const OrientationBox(long, short));
      final portrait = computeFitDims(const OrientationBox(short, long));
      expect(landscape.cols, greaterThan(portrait.cols));
      expect(portrait.rows, greaterThan(landscape.rows));
    });

    test('a smaller font fits more columns in the same box', () {
      final big = computeFitDims(const OrientationBox(800, 600), fontPx: 16);
      final small = computeFitDims(const OrientationBox(800, 600), fontPx: 10);
      expect(small.cols, greaterThan(big.cols));
    });
  });

  group('parse', () {
    test('DimensionPreset defaults to autoFit for unknown values', () {
      expect(DimensionPreset.parse(null), DimensionPreset.autoFit);
      expect(DimensionPreset.parse('bogus'), DimensionPreset.autoFit);
      expect(DimensionPreset.parse('custom'), DimensionPreset.custom);
    });

    test('TerminalTextSize defaults to auto for unknown values', () {
      expect(TerminalTextSize.parse(null), TerminalTextSize.auto);
      expect(TerminalTextSize.parse('bogus'), TerminalTextSize.auto);
      expect(TerminalTextSize.parse('larger'), TerminalTextSize.larger);
    });
  });
}
