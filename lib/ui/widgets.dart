import 'dart:js_interop';

import 'package:web/web.dart' as web;

import '../core/app_error.dart';
import 'dom.dart';

/// A primary or secondary button. When [loading] it shows a spinner and is
/// disabled.
web.HTMLButtonElement button(
  String label, {
  bool primary = false,
  bool loading = false,
  bool disabled = false,
  String? className,
  String? ariaLabel,
  void Function()? onClick,
}) {
  final classes = [if (primary) 'primary', ?className].join(' ');
  final b =
      el(
            'button',
            classes: classes.isEmpty ? null : classes,
            ariaLabel: ariaLabel,
            onClick: onClick == null ? null : (_) => onClick(),
          )
          as web.HTMLButtonElement;
  b.type = 'button';
  if (loading) {
    b.appendChild(el('span', classes: 'spinner'));
    b.appendChild(textNode(' $label'));
  } else {
    b.textContent = label;
  }
  b.disabled = disabled || loading;
  return b;
}

/// A labelled form field wrapping [input], with an optional [hint].
web.HTMLElement field(String label, web.HTMLElement input, {String? hint}) =>
    el(
      'div',
      classes: 'field',
      children: [
        el('label', text: label, attrs: {'for': input.id}),
        input,
        if (hint != null) el('div', classes: 'hint', text: hint),
      ],
    );

/// A text/password/url input. Returns the element so callers can read `.value`.
web.HTMLInputElement input({
  required String id,
  String type = 'text',
  String? value,
  String? placeholder,
  String? autocomplete,
  String? autocapitalize,
  void Function()? onEnter,
}) {
  final e = el('input', id: id) as web.HTMLInputElement;
  e.type = type;
  if (value != null) e.value = value;
  if (placeholder != null) e.placeholder = placeholder;
  if (autocomplete != null) e.autocomplete = autocomplete;
  // Opt out of mobile auto-capitalization / -correction for case-sensitive
  // identifiers (host, principal) so the keyboard doesn't capitalize the first
  // letter or "correct" the value.
  if (autocapitalize != null) {
    e.autocapitalize = autocapitalize;
    e.setAttribute('autocorrect', 'off');
    e.spellcheck = false;
  }
  if (onEnter != null) {
    e.addEventListener(
      'keydown',
      (web.Event ev) {
        if ((ev as web.KeyboardEvent).key == 'Enter') onEnter();
      }.toJS,
    );
  }
  return e;
}

/// A checkbox with a label.
({web.HTMLElement root, web.HTMLInputElement box}) checkbox(
  String label, {
  required String id,
  bool checked = false,
}) {
  final box = el('input', id: id) as web.HTMLInputElement;
  box.type = 'checkbox';
  box.checked = checked;
  final root = el(
    'label',
    classes: 'check',
    attrs: {'for': id},
    children: [box, textNode(label)],
  );
  return (root: root, box: box);
}

/// An error banner rendering [error]'s message and optional recovery hint.
web.HTMLElement errorBanner(AppError error) => el(
  'div',
  classes: 'banner error',
  role: 'alert',
  children: [
    el(
      'div',
      children: [
        el('div', text: error.message),
        if (error.hint != null) el('div', classes: 'hint', text: error.hint),
      ],
    ),
  ],
);

/// A small online/offline status pill.
web.HTMLElement statusBadge({required bool online}) => el(
  'span',
  classes: online ? 'badge online' : 'badge offline',
  children: [
    el('span', classes: 'dot'),
    textNode(online ? 'online' : 'offline'),
  ],
);

/// A centered empty-state message.
web.HTMLElement emptyState(String message) =>
    el('div', classes: 'empty', text: message);

/// A spinner row with an optional label, for inline loading states.
web.HTMLElement loadingRow([String? label]) => el(
  'div',
  classes: 'row',
  role: 'status',
  children: [
    el('span', classes: 'spinner'),
    if (label != null) el('span', classes: 'muted', text: label),
  ],
);
