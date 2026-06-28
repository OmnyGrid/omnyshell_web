@TestOn('browser')
library;

import 'package:omnyshell_web/core/app_error.dart';
import 'package:omnyshell_web/state/theme_controller.dart';
import 'package:omnyshell_web/ui/widgets.dart' as w;
import 'package:test/test.dart';

import '../support/dom_harness.dart';

void main() {
  group('button', () {
    test('loading shows a spinner and disables', () {
      final b = w.button('Go', primary: true, loading: true);
      expect(b.disabled, isTrue);
      expect(b.querySelector('.spinner'), isNotNull);
      expect(b.className, contains('primary'));
    });

    test('click invokes the handler', () {
      var clicks = 0;
      final b = w.button('Go', onClick: () => clicks++);
      b.click();
      expect(clicks, 1);
    });
  });

  test('errorBanner renders message and hint', () {
    const err = AppError(
      AppErrorKind.transport,
      'Connection failed',
      hint: 'check the URL',
    );
    final banner = w.errorBanner(err);
    expect(banner.getAttribute('role'), 'alert');
    expect(banner.textContent, contains('Connection failed'));
    expect(banner.textContent, contains('check the URL'));
  });

  test('statusBadge reflects online state', () {
    expect(w.statusBadge(online: true).className, contains('online'));
    expect(w.statusBadge(online: false).className, contains('offline'));
  });

  group('theme application to the DOM', () {
    late DomHarness h;
    setUp(() => h = DomHarness(prefersDark: false));
    tearDown(() => h.dispose());

    test('applies data-theme on construction and on change', () {
      // Constructed in the harness with system + light OS preference.
      expect(h.themeTarget.getAttribute('data-theme'), 'light');
      h.ctx.theme.set(ThemeMode.dark);
      expect(h.themeTarget.getAttribute('data-theme'), 'dark');
    });
  });

  group('toasts', () {
    late DomHarness h;
    setUp(() => h = DomHarness());
    tearDown(() => h.dispose());

    test('shows then auto-dismisses', () async {
      h.ctx.toasts.error('boom');
      expect(h.toastHost.querySelector('.toast.error'), isNotNull);
      expect(h.toastHost.textContent, contains('boom'));
      await Future<void>.delayed(const Duration(milliseconds: 80));
      expect(h.toastHost.querySelector('.toast'), isNull);
    });
  });
}
