# Embedding an OmnyShell terminal

A minimal web app that connects to a Hub and opens a live shell on a node —
everything `package:omnyshell_web` gives you, and nothing else.

`main.dart` is the whole app. It uses only the three public barrels
(`client.dart`, `terminal.dart`, `ui_kit.dart`), so it also serves as a check
that they are sufficient on their own: if this compiles without reaching into
`package:omnyshell_web/src/...`-style deep paths, the public surface is complete.

## Run it

```sh
dart pub get
dart run omnyshell_web:copy_assets   # xterm bundle + kit.css + terminal.css → web/
dart pub global activate webdev
webdev serve
```

You need a Hub and a node to connect to:

```sh
cd ../../omnyshell
./run-hub.sh                                       # prints a grant token
dart run bin/omnyshell.dart node start --id web-01
```

## What to look at

- `WebShellHost` drives the session: prompt, echo, line editing, history,
  Ctrl-C routing, PTY resize. Passing `commands: null` gives a plain remote
  shell with no `:ai` and no `:ide`.
- `TerminalFitter` keeps the terminal correctly sized against window resizes, a
  soft keyboard and fullscreen. It is the part you really don't want to rewrite.
- `TerminalAccessoryBar` supplies Esc/Tab/Ctrl/arrows and copy-paste, which a
  touch device has no keys for.
