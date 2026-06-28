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

## Layers (`lib/`)

```
app/         App (root: header, route guard, screen mounting), AppContext,
             bootstrap (production wiring), Routes
core/        OmnyShellService (facade over ClientRuntime), AppError mapping,
             Observable, time formatting
state/       Auth / Nodes / Sessions / Theme controllers, AsyncState
storage/     KeyValueStore (+ localStorage & in-memory impls), SettingsStore,
             NodeCache
router/      Router (hash-based) + pure route matcher
terminal/    TerminalView/SessionIo interfaces, SessionBridge (pure wiring),
             xterm.js interop + RemoteSession adapter
ui/          dom helpers, widgets, toasts, modal, screens/
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
