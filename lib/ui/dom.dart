import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// Ergonomic DOM construction over `package:web`.
///
/// `el('div', classes: 'card', children: [...])` reads far better than a stack
/// of `createElement` / `appendChild` calls, while staying plain DOM (no
/// framework). All UI components build their subtree with these helpers.
web.HTMLElement el(
  String tag, {
  String? classes,
  String? text,
  String? id,
  String? role,
  String? ariaLabel,
  Map<String, String>? attrs,
  List<web.Node> children = const [],
  void Function(web.Event event)? onClick,
}) {
  final e = web.document.createElement(tag) as web.HTMLElement;
  if (classes != null) e.className = classes;
  if (id != null) e.id = id;
  if (text != null) e.textContent = text;
  if (role != null) e.setAttribute('role', role);
  if (ariaLabel != null) e.setAttribute('aria-label', ariaLabel);
  attrs?.forEach((k, v) => e.setAttribute(k, v));
  for (final c in children) {
    e.appendChild(c);
  }
  if (onClick != null) e.addEventListener('click', onClick.toJS);
  return e;
}

/// A `<div>` with optional [classes] and [children].
web.HTMLElement div({
  String? classes,
  String? text,
  List<web.Node> children = const [],
}) => el('div', classes: classes, text: text, children: children);

/// A text node, for mixing raw strings into [children] lists.
web.Text textNode(String value) => web.Text(value);

/// Removes all children of [parent].
void clearChildren(web.Element parent) {
  while (parent.firstChild != null) {
    parent.removeChild(parent.firstChild!);
  }
}

/// Replaces the entire content of [parent] with [child].
void mount(web.Element parent, web.Node child) {
  clearChildren(parent);
  parent.appendChild(child);
}

/// Attaches [handler] to [event] on [target], returning a disposer that detaches
/// it (handy for components that re-render and must avoid listener leaks).
void Function() on(
  web.EventTarget target,
  String event,
  void Function(web.Event event) handler,
) {
  final js = handler.toJS;
  target.addEventListener(event, js);
  return () => target.removeEventListener(event, js);
}
