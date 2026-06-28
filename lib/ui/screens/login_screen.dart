import 'dart:async';

import 'package:web/web.dart' as web;

import '../../app/app_context.dart';
import '../../core/version.dart';
import '../../state/auth_controller.dart';
import '../dom.dart';
import '../widgets.dart';

/// The login screen: collects Hub URL, principal and bearer token, connects via
/// [AuthController], and reflects connecting/error state.
class LoginScreen implements Screen {
  final AppContext ctx;

  @override
  late final web.HTMLElement element;

  late final web.HTMLInputElement _hub;
  late final web.HTMLInputElement _principal;
  late final web.HTMLInputElement _token;
  late final web.HTMLInputElement _remember;
  late final web.HTMLElement _messages;
  late final web.HTMLElement _actions;
  StreamSubscription<AuthSnapshot>? _sub;

  /// Builds the screen for [ctx].
  LoginScreen(this.ctx) {
    final prefill = ctx.auth.prefill;
    _hub = input(
      id: 'login-hub',
      type: 'text',
      value: prefill.hub,
      placeholder: 'hub.example.com:8443',
      autocomplete: 'url',
      autocapitalize: 'none',
      onEnter: _submit,
    );
    _principal = input(
      id: 'login-principal',
      value: prefill.principal,
      placeholder: 'alice',
      autocomplete: 'username',
      autocapitalize: 'none',
      onEnter: _submit,
    );
    _token = input(
      id: 'login-token',
      type: 'password',
      value: prefill.token,
      placeholder: 'bearer token',
      autocomplete: 'current-password',
      onEnter: _submit,
    );
    final remember = checkbox(
      'Remember token on this device',
      id: 'login-remember',
      checked: ctx.settings.rememberToken,
    );
    _remember = remember.box;
    _messages = div();
    _actions = div(classes: 'row');
    _renderActions(connecting: false);

    element = el(
      'div',
      classes: 'center-host',
      children: [
        el(
          'div',
          classes: 'card pad-lg narrow stack',
          children: [
            el(
              'div',
              classes: 'brand',
              children: [
                el('span', classes: 'dot'),
                el('h1', text: 'OmnyShell'),
              ],
            ),
            el(
              'p',
              classes: 'muted',
              text: 'Connect to a Hub to discover nodes and manage sessions.',
            ),
            _messages,
            field(
              'Hub address',
              _hub,
              hint: 'Uses wss:// when no scheme given.',
            ),
            field('Principal', _principal),
            field('Token', _token),
            remember.root,
            _actions,
            el(
              'p',
              classes: 'hint',
              text:
                  'Self-signed / dev Hubs must have their certificate trusted '
                  'by this browser or OS first — the browser controls TLS, so '
                  'there is no in-app bypass.',
            ),
            el(
              'p',
              classes: 'hint version-footer',
              text:
                  'Web Client v$webClientVersion · '
                  'OmnyShell v$bundledOmnyShellVersion',
            ),
          ],
        ),
      ],
    );

    // listen() delivers the current snapshot immediately, so an error set
    // before this screen mounted (e.g. a dropped connection) renders at once.
    _sub = ctx.auth.state.listen(_onAuth);
    // Focus the first field that still needs input for fast keyboard entry.
    scheduleMicrotask(() {
      if (_hub.value.isEmpty) {
        _hub.focus();
      } else if (_principal.value.isEmpty) {
        _principal.focus();
      } else {
        _token.focus();
      }
    });
  }

  void _renderActions({required bool connecting}) {
    clearChildren(_actions);
    _actions.appendChild(
      button(
        connecting ? 'Connecting…' : 'Connect',
        primary: true,
        loading: connecting,
        className: 'grow',
        onClick: _submit,
      ),
    );
  }

  void _onAuth(AuthSnapshot snap) {
    clearChildren(_messages);
    _renderActions(connecting: snap.status == AuthStatus.connecting);
    if (snap.status == AuthStatus.error && snap.error != null) {
      _messages.appendChild(errorBanner(snap.error!));
    }
  }

  Future<void> _submit() async {
    if (ctx.auth.snapshot.status == AuthStatus.connecting) return;
    await ctx.auth.login(
      hub: _hub.value,
      principal: _principal.value,
      token: _token.value,
      remember: _remember.checked,
    );
    if (ctx.auth.snapshot.isConnected) {
      ctx.router.go(Routes.nodes);
    }
  }

  @override
  void dispose() => _sub?.cancel();
}
