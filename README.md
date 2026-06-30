# OmnyShell Web

A browser-only client for the
[OmnyShell](https://github.com/OmnyGrid/omnyshell) ecosystem. Connect to a Hub,
discover nodes, and manage interactive sessions — entirely from the browser, with
**no custom backend**. All communication is the browser talking directly to
existing OmnyShell infrastructure over a single WebSocket, using the real
`omnyshell` package APIs and wire protocol (no duplicated business logic).

**Live app:** <https://omnygrid.github.io/omnyshell_web/> — installable as a PWA
(see [Install as an app](#install-as-an-app-pwa)).

Built as a plain Dart→JS web app (`package:web` + `build_web_compilers`), not
Flutter.

## Features

- **Authentication** — bearer-token login, logout, session persistence, and
  automatic restore on reload.
- **Nodes** — list, view details (platform, capabilities, labels, online
  status), refresh, with cache-backed instant paint.
- **Sessions** — list active/detached sessions, view status, peek a screen
  snapshot, detach, resume, and kill. Open a fresh interactive shell.
- **Interactive terminal** — a real [xterm.js](https://xtermjs.org) terminal
  wired to the remote session (stdin/stdout/stderr, resize, flow control), with
  selectable terminal dimensions and adjustable text/key sizing.
- **AI agent (`:ai`)** — drive the node in natural language from the terminal.
  Configure a provider/model and API key in Settings, or use the Hub's default
  provider (the key stays on the Hub). Commands run in the live session, gated by
  the same `command_shield` safety checks as the CLI, and each interaction ends
  with a token-usage stats line (tokens, tok/s, requests, duration).
- **Terminal IDE (`:ide`, alias `:edit`)** — open the full-screen TUI IDE on the
  connected node, right inside the browser terminal: a file-tree sidebar with git
  status, tabbed editing with syntax highlighting and a git-change gutter, an
  integrated terminal, and an AI agent panel (gated by the same `command_shield`
  as `:ai`). `:ide [path]` opens a directory; `Ctrl-Q` returns to the shell. The
  IDE operates on the remote node over the connected session.
- **Theming** — light, dark, and system themes with a persistent selector and
  no flash of the wrong palette on load.
- **Resilience** — explicit loading/empty/error states everywhere, dropped-
  connection detection, and one-click reconnect.

These map to the `omnyshell` CLI's client commands: `login`/`logout`,
`nodes list`, `connect`, `sessions list/peek/resume/detach/kill`, and the
in-session `:ai` agent and `:ide` terminal IDE.

## Running

This app depends on the published `omnyshell` package (from pub.dev), which
includes a browser-compatible transport (see
[ARCHITECTURE.md](ARCHITECTURE.md) → *omnyshell browser seam*). To develop
against a local checkout, drop a git-ignored `pubspec_overrides.yaml` with
`dependency_overrides: { omnyshell: { path: ../omnyshell } }`.

```bash
dart pub get

# Dev server with hot rebuild:
dart pub global activate webdev
webdev serve            # → http://localhost:8080

# Production build:
webdev build            # → build/
```

You'll need a running Hub and at least one Node to connect to. From the
`omnyshell` repo:

```bash
cd ../omnyshell
./run-hub.sh            # starts a Hub and prints a grant token
dart run bin/omnyshell.dart node start --id web-01   # register a node
```

Then open the web app, enter the Hub address (e.g. `localhost:8443`), your
principal, and the grant token.

### TLS / self-signed Hubs

The browser owns the TLS stack, so there is **no in-app certificate bypass**. To
use a self-signed/dev Hub, trust its certificate at the OS/browser level first
(or front the Hub with a publicly-trusted certificate). The login screen surfaces
this guidance instead of a fake "insecure" toggle.

## Install as an app (PWA)

The app is live at <https://omnygrid.github.io/omnyshell_web/>.

OmnyShell Web is an installable Progressive Web App on Android and iOS — it adds
a home-screen icon and launches standalone (no browser chrome), with the app
shell cached by a service worker so it loads instantly and survives flaky
networks.

- **Android (Chrome/Edge):** open <https://omnygrid.github.io/omnyshell_web/> →
  menu → **Install app** / *Add to Home screen*.
- **iOS/iPadOS (Safari):** open <https://omnygrid.github.io/omnyshell_web/> →
  **Share** → **Add to Home Screen**.

Installability requires the app to be served over **HTTPS** (or `localhost` for
testing). The status bar and theme colour follow the in-app light/dark theme,
and the layout respects device safe areas (notch / home indicator).

Icons are generated from a single source:

```bash
dart run tool/generate_icons.dart   # regenerates web/icons/*.png
```

## Testing

```bash
dart analyze
dart test                              # unit + integration (VM, fast)
dart test -p chrome test/ui test/e2e   # widget/DOM + end-to-end (headless Chrome)
```

- **Unit** — storage, state controllers, routing, error mapping, time
  formatting (pure, VM).
- **Integration** — `OmnyShellService` driven through a fake Hub connection
  (`test/support/fake_hub.dart`) that speaks the real protocol, exercising the
  actual `ClientRuntime`.
- **Widget/DOM** — each screen and component rendered into the DOM and asserted
  (`test/ui`).
- **End-to-end** — full user journeys over the fake Hub (`test/e2e`): login →
  nodes → detail → sessions → peek → logout, session persistence across reload,
  and reconnection after a dropped connection.

## Security notes

- The bearer token, when "remember" is checked, is stored in `localStorage` and
  is therefore reachable by any script on the page. Leave it unchecked to keep
  the token in memory only. Serve the app with a strict Content-Security-Policy
  in production.
- No credentials are sent to anyone but the configured Hub.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the design in depth.
