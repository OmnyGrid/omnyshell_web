# Architecture

A pure browser client. The browser speaks the OmnyShell wire protocol directly
to a Hub over one WebSocket; there is no app-specific backend. Business logic
(handshake, auth, node discovery, session lifecycle, flow control) lives in the
`omnyshell` package's `ClientRuntime` — the web app only adapts it to the DOM.

## omnyshell browser seam

`omnyshell`'s client was not browser-compilable: `ClientRuntime`/`ClientConfig`
reached `dart:io` (TLS types, `IOWebSocketChannel`, `Socket`, `Platform.*`). It
was refactored (without changing native CLI/Hub/Node behaviour) to add a
transport seam:

- `ClientConfig.connectionFactory` — a `ConnectionFactory` typedef the runtime
  uses to open the transport. A conditional import (`transport_factory.dart`)
  selects a `dart:io` `wss://` socket on the VM and the platform WebSocket
  (`WsChannelConnection`) in the browser.
- TLS knobs (`SecurityContext`/`onBadCertificate`) moved out of `ClientConfig`
  into a `dart:io`-only `ioConnectionFactory(...)` used by the CLI/tests.
- `PlatformInfo.local()` and the local-tunnel TCP bridge were moved behind
  conditional imports so neither pulls `dart:io` into the browser graph.
- `ClientConfig.onDisconnected` was added so the app can detect dropped links.
- A browser-safe barrel, `lib/omnyshell_client_web.dart`, exports only the
  JS-compatible subset. The web app imports **this**, never
  `omnyshell_client.dart`.

A `dart compile js` gate proves the `ClientRuntime` graph carries no `dart:io`.

## Public surface

This package is consumed by other web apps (OmnyServer Web is the first), so the
`lib/` tree is split into a shared tier that is exported and an app tier that is
not. Three barrels:

| Barrel | Exports | Guarantees |
|---|---|---|
| `terminal.dart` | `TerminalView`/`TerminalKeys`, `WebShellHost`, `XtermTerminalView` (+`XtermTheme`), `TerminalAccessoryBar`, `TerminalFitter`, `CommandHistory`, `terminal_dimensions`, `deviceMetrics` | No `AppContext`, no screens. `WebShellHost` imports only `dart:async`, `dart:convert`, `omnyshell` and two leaf files. AI/IDE are opt-in and never imported by the host. |
| `ui_kit.dart` | `dom`, `widgets`, `toasts`, `modal` | DOM-only. **Styled by class names**, so a consumer must ship `kit.css`. |
| `client.dart` | `OmnyShellService`, `AppError`, `Observable`, `AsyncState`, the controllers, storage, router, `ThemeController` | No DOM framework. Storage prefixes and theme application are injected, never hardcoded. |

Not exported, and deliberately so: `app/` (App, AppContext, bootstrap, Routes),
`ui/screens/`, `ui/settings_panel.dart`. Those carry this app's identity — its
brand, its routes, its service locator — and exporting them is what would let the
shared tier quietly re-acquire `AppContext` coupling. **The rule: nothing under a
barrel may import `app/` or `ui/screens/`.**

The session seam itself — `ShellSessionPort`, which `RemoteSession` implements —
lives *upstream* in `package:omnyshell`, not here, so a consumer gets it for free.

Browser assets (the xterm bundle, `kit.css`, `terminal.css`, `boot.js`) ship
inside the pub archive but are never *served* to a consuming app by pub, so
`bin/copy_assets.dart` installs them into the consumer's own `web/`.

## Layers (`lib/`)

```
app/         App (root: header, route guard, screen mounting), AppContext,
             bootstrap (production wiring), Routes          [app-private]
core/        OmnyShellService (facade over ClientRuntime), AppError mapping,
             Observable, time formatting                    [client.dart]
state/       Auth / Nodes / Sessions / Theme controllers, AsyncState
                                                            [client.dart]
storage/     KeyValueStore (+ localStorage & in-memory impls), SettingsStore,
             NodeCache — all prefix-parameterized           [client.dart]
router/      Router (hash-based) + pure route matcher       [client.dart]
terminal/    TerminalView/TerminalKeys interfaces, WebShellHost (the shell
             driver), xterm.js interop, accessory key bar, TerminalFitter
             (sizing engine), command history               [terminal.dart]
ui/          dom helpers, widgets, toasts, modal            [ui_kit.dart]
             screens/, settings_panel.dart                  [app-private]
```

### State management

A lightweight observable pattern instead of a framework: `Observable<T>` holds a
value and a broadcast change stream. Controllers (`AuthController`,
`NodesController`, `SessionsController`, `ThemeController`) own observables of
immutable snapshots (`AsyncState<T>`, `AuthSnapshot`); screens subscribe and
re-render their DOM subtree. `AppContext` is the service locator wiring it all
together.

### Service facade

`OmnyShellService` is the only thing that touches `ClientRuntime`. It normalizes
Hub URLs, translates `omnyshell` exceptions into `AppError`s (with user-facing
messages + recovery hints), and exposes connect / nodes / sessions / terminal
operations. A `ConnectionFactory` can be injected to drive it with a fake Hub in
tests.

### Storage

`localStorage` behind a `KeyValueStore` interface (so logic is VM-testable with
an in-memory impl). Keys are namespaced `omnyshell.*`: theme, last hub/principal,
per-hub token (opt-in), and a node-list cache for instant first paint. Theme is
applied pre-paint by an inline script in `index.html` to avoid a flash.

### Routing

Hash-based (`#/path`) so the app hosts as static files with no server rewrites.
The pure matcher (`route_match.dart`) extracts `:params`; `App` enforces a guard
(unauthenticated → `/login`, authenticated away from `/login`) and mounts the
screen for the active route. Routes: `/login`, `/nodes`, `/nodes/:id`,
`/nodes/:id/sessions`, `/nodes/:id/sessions/:sid`.

### Terminal

The xterm.js binding is isolated behind a `TerminalView` interface and the
session behind a `SessionIo` interface, so the bidirectional wiring
(`SessionBridge`: output→terminal with flow-control grants, keystrokes→stdin,
resize, exit notice) is pure and unit-tested with fakes. `XtermTerminalView`
(JS interop) and `RemoteSessionIo` (adapts a `RemoteSession`, merging
stdout/stderr) are the thin production adapters.

## Testing strategy

- **Pure logic** runs on the Dart VM (`dart test`): storage, controllers,
  routing, error mapping, the session bridge.
- **Integration** drives the real `ClientRuntime` via `FakeHub`, an in-memory
  `OmnyShellConnection` that performs the actual hello/auth handshake and node /
  session message exchange — no sockets, no real Hub.
- **Widget/DOM and E2E** run in headless Chrome (`dart test -p chrome`),
  rendering real screens and exercising full journeys (including reconnect and
  persistence).

## Extensibility

New features slot in as a controller (+observable snapshot), a screen, and a
route, reusing `OmnyShellService` and the `AsyncState`/widget primitives. The
`omnyshell` protocol surface (tunnels, file transfer, drive mounts) is already
reachable through the runtime when those UIs are added.
