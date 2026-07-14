// A minimal app that embeds an OmnyShell terminal.
//
// Uses only the public barrels — if this compiles, the shared surface is
// self-sufficient and no consumer needs a deep import.
import 'package:omnyshell_web/client.dart';
import 'package:omnyshell_web/terminal.dart';
import 'package:omnyshell_web/ui_kit.dart';
import 'package:web/web.dart' as web;

void main() {
  final root = web.document.getElementById('app') as web.HTMLElement;
  final toasts = Toasts(web.document.getElementById('toasts')!);
  ExampleApp(root, toasts).start();
}

/// Login → open a shell on a node → drive it in an xterm terminal.
class ExampleApp {
  /// Where the app renders.
  final web.HTMLElement root;

  /// Where transient messages go.
  final Toasts toasts;

  /// The only thing that talks to omnyshell's `ClientRuntime`.
  final OmnyShellService service = OmnyShellService();

  /// Creates the app.
  ExampleApp(this.root, this.toasts);

  /// Renders the login form.
  void start() {
    final hub = input(id: 'hub', placeholder: 'hub.example.com');
    final principal = input(id: 'principal', placeholder: 'alice');
    final token = input(id: 'token', type: 'password');
    final node = input(id: 'node', placeholder: 'worker-01');

    clearChildren(root);
    mount(
      root,
      el(
        'div',
        classes: 'card pad-lg',
        children: [
          el('h1', text: 'Terminal'),
          field('Hub', hub),
          field('Principal', principal),
          field('Token', token),
          field('Node', node),
          button(
            'Connect',
            primary: true,
            onClick: () => _connect(
              hub: hub.value,
              principal: principal.value,
              token: token.value,
              nodeId: node.value,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _connect({
    required String hub,
    required String principal,
    required String token,
    required String nodeId,
  }) async {
    try {
      await service.connect(hubUri: hub, principal: principal, token: token);
      await _openShell(principal: principal, nodeId: nodeId);
    } on AppError catch (e) {
      // Every omnyshell failure arrives already translated into an AppError with
      // a message worth showing a human.
      toasts.error(e.message);
    }
  }

  Future<void> _openShell({
    required String principal,
    required String nodeId,
  }) async {
    final host = el('div', classes: 'terminal-host');
    final accessory = el('div');
    final screen = el(
      'div',
      classes: 'terminal-screen stack',
      children: [
        el('div', classes: 'card terminal-card', children: [host]),
        accessory,
      ],
    );
    clearChildren(root);
    mount(root, screen);

    final term = XtermTerminalView(host);
    final session = await service.openShell(
      nodeId: nodeId,
      cols: term.size.cols,
      rows: term.size.rows,
    );

    // The shell driver: prompt, local echo, line editing, history, Ctrl-C
    // routing, PTY resize. `commands: null` keeps it a plain remote shell — no
    // `:ai`, no `:ide`, and so no command_shield in the graph.
    final shell = WebShellHost(
      term: term,
      session: session,
      principal: principal,
      nodeId: nodeId,
      commands: null,
    );

    // Touch devices have no Esc/Tab/Ctrl/arrow keys, and no easy copy-paste.
    mount(
      accessory,
      TerminalAccessoryBar(
        keys: shell,
        term: term,
        clipboardRead: defaultClipboardRead,
        clipboardWrite: defaultClipboardWrite,
        onToast: toasts.show,
      ).element,
    );

    // Keeps the terminal sized against window resizes, a soft keyboard and
    // rotation. Auto-fit mode: no fixedDims, so xterm derives cols/rows.
    TerminalFitter(
      term: term,
      host: host,
      accessory: accessory,
      scaleTarget: screen,
    ).attach();

    term.focus();
  }
}
