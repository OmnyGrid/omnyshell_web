import 'dart:io';
import 'dart:isolate';

/// Installs the browser assets the terminal and UI kit need into a consuming
/// app's `web/` directory.
///
/// A Dart package ships its `web/` directory inside the pub archive, but nothing
/// *serves* it to a consumer — `build_web_compilers` only serves the root
/// package's own `web/`. So an app that imports `package:omnyshell_web/terminal.dart`
/// still has to have the xterm bundle and the stylesheets sitting in its own
/// `web/`, or the terminal loads to a blank box and the widgets render unstyled.
///
/// ```sh
/// dart run omnyshell_web:copy_assets            # into ./web
/// dart run omnyshell_web:copy_assets --out site # somewhere else
/// dart run omnyshell_web:copy_assets --force    # overwrite existing files
/// ```
///
/// Re-run it after upgrading the package to pick up a new xterm or CSS fix;
/// without `--force` existing files are left alone, so local edits survive.
Future<void> main(List<String> args) async {
  final out = _option(args, '--out') ?? 'web';
  final force = args.contains('--force') || args.contains('-f');
  final withTerminal = !args.contains('--no-terminal');

  final packageWeb = await _packageWebDir();
  if (packageWeb == null) {
    stderr.writeln(
      'error: could not locate the omnyshell_web package directory.\n'
      'Run this from a project that depends on omnyshell_web.',
    );
    exitCode = 1;
    return;
  }

  final assets = <String>[
    'kit.css',
    'boot.js',
    if (withTerminal) ...[
      'terminal.css',
      'vendor/xterm/xterm.min.js',
      'vendor/xterm/xterm.min.css',
      'vendor/xterm/addon-fit.min.js',
    ],
  ];

  final target = Directory(out);
  if (!target.existsSync()) target.createSync(recursive: true);

  var copied = 0;
  var skipped = 0;
  for (final asset in assets) {
    final source = File('${packageWeb.path}/$asset');
    if (!source.existsSync()) {
      stderr.writeln('warning: $asset is missing from the package — skipping');
      continue;
    }
    final destination = File('${target.path}/$asset');
    if (destination.existsSync() && !force) {
      stdout.writeln('  exists  $asset (use --force to overwrite)');
      skipped++;
      continue;
    }
    destination.parent.createSync(recursive: true);
    source.copySync(destination.path);
    stdout.writeln('  copied  $asset');
    copied++;
  }

  stdout
    ..writeln('')
    ..writeln('$copied copied, $skipped left alone → ${target.path}/')
    ..writeln('')
    ..writeln('Reference them from your index.html:')
    ..writeln('  <link rel="stylesheet" href="kit.css">');
  if (withTerminal) {
    stdout
      ..writeln('  <link rel="stylesheet" href="terminal.css">')
      ..writeln('  <link rel="stylesheet" href="vendor/xterm/xterm.min.css">')
      ..writeln('  <script src="vendor/xterm/xterm.min.js"></script>')
      ..writeln('  <script src="vendor/xterm/addon-fit.min.js"></script>');
  }
  stdout.writeln('  <script src="boot.js"></script>');
}

/// This package's own `web/` directory, resolved through the package config, so
/// it works from a path, git or pub.dev dependency alike.
Future<Directory?> _packageWebDir() async {
  final lib = await Isolate.resolvePackageUri(
    Uri.parse('package:omnyshell_web/terminal.dart'),
  );
  if (lib == null) return null;
  // …/omnyshell_web/lib/terminal.dart → …/omnyshell_web/web
  final root = File.fromUri(lib).parent.parent;
  final web = Directory('${root.path}/web');
  return web.existsSync() ? web : null;
}

String? _option(List<String> args, String name) {
  final i = args.indexOf(name);
  if (i == -1 || i + 1 >= args.length) return null;
  return args[i + 1];
}
