/// The browser terminal: an xterm.js surface wired to a live OmnyShell session.
///
/// This is the reusable heart of OmnyShell Web. Any web app that can reach an
/// OmnyShell broker — including the OmnyServer dashboard, whose Hub hosts one on
/// the same port — can embed a real remote shell with it, rather than
/// re-implementing the parts that are genuinely hard: PTY sizing, soft-keyboard
/// insets, line editing, history and flow control.
///
/// The wiring, end to end:
///
/// ```dart
/// final term = XtermTerminalView(hostElement);
/// final session = await service.openShell(nodeId: id, cols: 80, rows: 24);
/// final shell = WebShellHost(
///   term: term,
///   session: session,
///   principal: 'alice',
///   nodeId: id,
///   commands: null, // a plain remote shell: no :ai, no :ide
/// );
/// mount(accessorySlot, TerminalAccessoryBar(
///   keys: shell,
///   term: term,
///   clipboardRead: defaultClipboardRead,
///   clipboardWrite: defaultClipboardWrite,
///   onToast: showToast,
/// ).element);
/// TerminalFitter(
///   term: term,
///   host: hostElement,
///   accessory: accessorySlot,
///   scaleTarget: screenRoot,
/// ).attach();
/// ```
///
/// The session type itself ([ShellSessionPort], `RemoteSession`) comes from
/// `package:omnyshell/omnyshell_client_web.dart`, not from here.
///
/// The xterm.js bundle and stylesheet are **assets**, and pub does not serve a
/// dependency's `web/` directory to a consuming app. Install them with:
///
/// ```sh
/// dart run omnyshell_web:copy_assets
/// ```
library;

export 'terminal/command_history.dart';
export 'terminal/device_metrics.dart';
export 'terminal/terminal_accessory.dart';
export 'terminal/terminal_dimensions.dart';
export 'terminal/terminal_fitter.dart';
export 'terminal/terminal_view.dart';
export 'terminal/web_shell_host.dart';
export 'terminal/xterm_terminal_view.dart';
// Local shell commands a browser adds on top of the omnyshell built-ins:
// `:ai` (the in-terminal agent, proxied through the Hub) and `:ide` (the
// terminal IDE on the node). A dashboard that embeds this terminal registers
// them the same way the shell app does.
export 'terminal/ai_command_factory.dart';
export 'terminal/ide_command_factory.dart';
