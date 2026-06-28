import 'package:web/web.dart' as web;

import 'dom.dart';
import 'widgets.dart';

/// A simple modal dialog appended to `document.body`, dismissed by the close
/// button, the backdrop, or Escape.
class Modal {
  late final web.HTMLElement _overlay;
  void Function()? _detachKeys;

  /// Builds a modal titled [title] containing [body], with optional footer
  /// [actions].
  Modal({
    required String title,
    required web.HTMLElement body,
    List<web.HTMLElement> actions = const [],
  }) {
    final dialog = el(
      'div',
      classes: 'modal',
      role: 'dialog',
      attrs: {'aria-modal': 'true', 'aria-label': title},
      children: [
        el(
          'div',
          classes: 'modal-head',
          children: [
            el('h2', text: title),
            button(
              '✕',
              className: 'icon ghost',
              ariaLabel: 'Close',
              onClick: close,
            ),
          ],
        ),
        el('div', classes: 'modal-body', children: [body]),
        if (actions.isNotEmpty)
          el('div', classes: 'modal-foot', children: actions),
      ],
    );
    _overlay = el(
      'div',
      classes: 'modal-overlay',
      onClick: (event) {
        if (event.target == _overlay) close();
      },
      children: [dialog],
    );
  }

  /// Shows the modal.
  void show() {
    web.document.body!.appendChild(_overlay);
    _detachKeys = on(web.document, 'keydown', (event) {
      if ((event as web.KeyboardEvent).key == 'Escape') close();
    });
  }

  /// Closes and removes the modal.
  void close() {
    _detachKeys?.call();
    _detachKeys = null;
    if (_overlay.parentNode != null) _overlay.remove();
  }
}
