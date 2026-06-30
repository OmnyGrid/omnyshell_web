// Named constructor params map to private fields; a private named parameter
// can't be an initializing formal, so the assignment is intentional.
// ignore_for_file: prefer_initializing_formals
import 'package:command_shield/command_shield.dart'
    show Analyzer, CommandShield, KnowledgeRiskDetector, SecurityAnalyzer;
import 'package:omnyshell/omnyshell_client_web.dart'
    show
        IdeApp,
        LocalCommand,
        LocalCommandContext,
        LocalCommandRegistry,
        RemoteWorkspace,
        ideCommandSyntaxFor,
        providerFor,
        resolveRemoteIdeRoot;

import '../core/omnyshell_service.dart';
import '../storage/settings_store.dart';
import 'ai_command_factory.dart';
import 'terminal_view.dart';
import 'xterm_terminal_driver.dart';

/// Registers the `:ide` command (alias `:edit`) on [registry].
///
/// Mirrors the native CLI's `IdeCommand`: it opens the omnyshell terminal IDE on
/// the **connected node** over a [RemoteWorkspace], renders the engine's frames
/// into the browser terminal via an [XtermTerminalDriver], and gates the AI
/// agent panel's `run_command` tool with the same `command_shield` the CLI uses.
///
/// [term] is the xterm.js surface the IDE paints onto; [resizeEvents] fires when
/// it is resized (so the IDE reflows). The raw keystroke stream is supplied by
/// the host through [LocalCommandContext.runFullScreen] when the command runs.
/// AI is resolved lazily (at command time) through the Hub, exactly like `:ai`.
void registerIdeCommand({
  required LocalCommandRegistry registry,
  required TerminalView term,
  required Stream<void> resizeEvents,
  required OmnyShellService service,
  required SettingsStore settings,
}) {
  registry.register(
    WebIdeCommand(
      term: term,
      resizeEvents: resizeEvents,
      service: service,
      settings: settings,
    ),
  );
}

/// The browser `:ide` command. The native equivalent lives in the `dart:io`
/// barrel (`ide_command.dart`); this version drives the same `dart:io`-free
/// engine over a [RemoteWorkspace] and an [XtermTerminalDriver].
class WebIdeCommand extends LocalCommand {
  final TerminalView _term;
  final Stream<void> _resizeEvents;
  final OmnyShellService _service;
  final SettingsStore _settings;

  /// Creates the command. See [registerIdeCommand] for the wiring.
  WebIdeCommand({
    required TerminalView term,
    required Stream<void> resizeEvents,
    required OmnyShellService service,
    required SettingsStore settings,
  }) : _term = term,
       _resizeEvents = resizeEvents,
       _service = service,
       _settings = settings;

  @override
  String get name => 'ide';

  @override
  List<String> get aliases => const ['edit'];

  @override
  String get description => 'Open the terminal IDE on the connected node';

  @override
  String? get usage => ':ide [path]';

  @override
  Future<void> run(LocalCommandContext context, List<String> args) async {
    final runFullScreen = context.runFullScreen;
    if (runFullScreen == null) {
      context.writeLine(':ide requires an interactive terminal.');
      return;
    }
    if (context.client == null) {
      context.writeLine(':ide requires a connected session.');
      return;
    }
    if (args.length > 1) {
      context.writeLine('usage: :ide [path]');
      return;
    }
    final arg = args.isEmpty ? null : args.first;

    final root = resolveRemoteIdeRoot(arg, context.currentRemoteCwd?.call());
    if (root == null) {
      context.writeLine(
        ':ide: remote working directory unknown yet — run a command first, '
        'or pass an absolute path.',
      );
      return;
    }

    final workspace = RemoteWorkspace(
      client: context.requireClient,
      nodeId: context.node.id.value,
      rootPath: root,
      shellFamily: context.shellFamily,
    );

    // Wire the AI agent panel through the Hub (same precedence as `:ai`); a null
    // provider makes the panel show setup help. The run_command tool is gated by
    // the same shield the CLI builds (default detectors + knowledge risk).
    final wiring = await resolveAiWiring(
      settings: _settings,
      service: _service,
    );
    final aiProvider = wiring == null
        ? null
        : providerFor(wiring.config, wiring.httpClient);
    final shield = CommandShield(
      analyzer: Analyzer(
        securityAnalyzer: SecurityAnalyzer(
          detectors: [
            ...SecurityAnalyzer.defaultDetectors,
            KnowledgeRiskDetector(),
          ],
        ),
      ),
    );

    await runFullScreen((input) async {
      final driver = XtermTerminalDriver(
        term: _term,
        input: input,
        resizeEvents: _resizeEvents,
      );
      final app = IdeApp(
        workspace: workspace,
        terminal: driver,
        aiProvider: aiProvider,
        aiModel: wiring?.config.model,
        shield: shield,
        commandSyntax: ideCommandSyntaxFor(context.shellFamily),
      );
      await app.run();
    });
  }
}
