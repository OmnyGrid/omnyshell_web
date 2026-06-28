@TestOn('vm')
library;

import 'dart:convert';
import 'dart:io';

import 'package:test/test.dart';

/// Validates the PWA assets so the app stays installable on Android and iOS.
void main() {
  group('manifest.json', () {
    late Map<String, dynamic> manifest;

    setUpAll(() {
      manifest =
          jsonDecode(File('web/manifest.json').readAsStringSync())
              as Map<String, dynamic>;
    });

    test('has the core installability fields', () {
      expect(manifest['name'], isNotEmpty);
      expect(manifest['short_name'], isNotEmpty);
      expect(manifest['start_url'], isNotNull);
      expect(manifest['display'], 'standalone');
      expect(manifest['theme_color'], isNotNull);
      expect(manifest['background_color'], isNotNull);
    });

    test('declares 192 and 512 icons plus a maskable icon', () {
      final icons = (manifest['icons'] as List).cast<Map<String, dynamic>>();
      final sizes = icons.map((i) => i['sizes']).toSet();
      expect(sizes, containsAll(['192x192', '512x512']));
      expect(
        icons.any(
          (i) => (i['purpose'] as String?)?.contains('maskable') ?? false,
        ),
        isTrue,
      );
      // Every referenced icon file exists.
      for (final icon in icons) {
        expect(
          File('web/${icon['src']}').existsSync(),
          isTrue,
          reason: 'missing ${icon['src']}',
        );
      }
    });
  });

  test('icon set is present', () {
    for (final name in [
      'icon-192.png',
      'icon-512.png',
      'icon-maskable-192.png',
      'icon-maskable-512.png',
      'apple-touch-icon.png',
      'favicon.png',
    ]) {
      expect(File('web/icons/$name').existsSync(), isTrue, reason: name);
    }
  });

  test('index.html wires manifest, iOS tags, boot and self-hosted xterm', () {
    final html = File('web/index.html').readAsStringSync();
    expect(html, contains('rel="manifest"'));
    expect(html, contains('apple-mobile-web-app-capable'));
    expect(html, contains('apple-touch-icon'));
    expect(html, contains('name="theme-color"'));
    expect(html, contains('viewport-fit=cover'));
    expect(html, contains('src="boot.js"'));
    // xterm is self-hosted (CSP-friendly): no third-party CDN references.
    expect(html, contains('vendor/xterm/xterm.min.js'));
    expect(html, isNot(contains('cdn.jsdelivr.net')));
  });

  test('boot.js registers the service worker and applies the theme', () {
    final boot = File('web/boot.js').readAsStringSync();
    expect(boot, contains("serviceWorker.register('service_worker.js')"));
    expect(boot, contains('data-theme'));
  });

  test('self-hosted xterm assets are present', () {
    for (final f in [
      'vendor/xterm/xterm.min.js',
      'vendor/xterm/xterm.min.css',
      'vendor/xterm/addon-fit.min.js',
    ]) {
      expect(File('web/$f').existsSync(), isTrue, reason: f);
    }
  });

  test('service worker handles install and fetch', () {
    final sw = File('web/service_worker.js').readAsStringSync();
    expect(sw, contains("addEventListener('install'"));
    expect(sw, contains("addEventListener('activate'"));
    expect(sw, contains("addEventListener('fetch'"));
  });
}
