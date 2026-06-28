import 'dart:async';

import 'package:web/web.dart' as web;

import 'dom.dart';

/// Transient notifications shown in the bottom-right `#toasts` region.
class Toasts {
  final web.Element _host;

  /// How long a toast stays before auto-dismissing.
  final Duration ttl;

  /// Creates a toast host bound to [host].
  Toasts(this._host, {this.ttl = const Duration(seconds: 4)});

  /// Shows a neutral toast.
  void show(String message, {String kind = ''}) {
    final classes = kind.isEmpty ? 'toast' : 'toast $kind';
    final toast = el('div', classes: classes, role: 'status', text: message);
    _host.appendChild(toast);
    Timer(ttl, () {
      if (toast.parentNode != null) toast.remove();
    });
  }

  /// Shows an error toast.
  void error(String message) => show(message, kind: 'error');

  /// Shows a success toast.
  void success(String message) => show(message, kind: 'success');
}
