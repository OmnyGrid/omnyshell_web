@TestOn('vm')
library;

import 'dart:io';

import 'package:omnyshell_web/core/version.dart';
import 'package:test/test.dart';

void main() {
  test('webClientVersion matches pubspec.yaml version', () {
    final pubspec = File('pubspec.yaml').readAsStringSync();
    // The top-level `version:` line (anchored at column 0 so the SDK constraint
    // under `environment:` isn't matched).
    final match = RegExp(
      r'^version:\s*(\S+)',
      multiLine: true,
    ).firstMatch(pubspec);
    expect(match, isNotNull, reason: 'no top-level version: in pubspec.yaml');
    expect(
      webClientVersion,
      match!.group(1),
      reason:
          'lib/core/version.dart webClientVersion must match pubspec.yaml '
          '(bump both together on each release).',
    );
  });
}
