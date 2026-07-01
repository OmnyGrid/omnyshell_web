## 1.14.3

### Changed

- Bumped the `omnyshell` dependency to ^1.47.0. That release adds the `omnyshell dashboard`
  full-screen CLI TUI (which itself ports UX from this web client — session sorting/highlight,
  soft refresh failures, friendly login errors). The changes are node/CLI-side; the browser
  barrel is unchanged, so this is a routine dependency refresh.

## 1.14.2

### Added

- **Ctrl combinations popup on the terminal key bar.** The `Ctrl` button now opens a menu of
  common combos (^A ^B ^C ^D ^F ^L ^Q ^S ^N ^P ^W ^Z), a custom single-character entry, and a
  sticky "Ctrl + next key" modifier. A one-tap quick key repeats the last-used combo (defaults
  to Ctrl-C); the two read as one segmented control.
- **Sessions preview on the node info screen.** Opening a node shows a card summarizing its
  current sessions (count + a compact list) with a `View all` button, before visiting the list.

### Changed

- **Sessions list ordering and highlight.** The last-interacted session (clicked from a node's
  preview, resumed, or freshly created/opened) is highlighted with an accent ring and sorted to
  the top, followed by sessions running a program, then detached before attached, then newer
  first. A running program is shown as a green badge beside the attached/detached badge.
- **Sessions list layout.** The node id is shown big and white (like the node-info title); the
  `Sessions` heading is slightly smaller; the `New` and `Refresh` buttons are compact; and the
  per-session action buttons are smaller and fit on a single line on phones.
- **Top menu polish.** The theme (`System`/`Light`/`Dark`) and `Sign out` buttons use smaller
  text; the settings gear is slightly larger. On the node screen the `Sessions` button was
  removed and `New shell` moved to the top-right.

## 1.14.1

### Fixed

- **Typing after TAB/Arrow-Up no longer staircases a new prompt line per keystroke on a narrow
  terminal (iOS Safari).** The shared `LineEditor` repainted the input line assuming it fits one
  row, so once a completed path or recalled command wrapped, every keystroke redrew a fresh
  prompt. `WebShellHost` now feeds the xterm terminal width to the editor (and updates it on
  resize), and the `omnyshell` dependency is bumped to ^1.46.0, which repaints across wrapped
  rows. Reproduced on iOS Safari (narrow terminal); desktop Chrome was wide enough to avoid the
  wrap.

## 1.14.0

### Changed

- Bumped the `omnyshell` dependency to ^1.45.0. That release adds live PTY resize to the node's
  default `script` backend (no FFI) and makes a resume apply the resuming device's geometry — so,
  together with the 1.13.2 measure-before-open fix, resuming on a differently-sized device now
  resizes the shell and reflows a full-screen program. The upstream changes are node/CLI-side; the
  browser barrel is unchanged, so this is a routine dependency refresh.

## 1.13.2

### Fixed

- Resuming a session now opens at the **current device's** terminal size instead of briefly at
  xterm's 80×24 default. The resume path read the terminal size synchronously, before the xterm
  view's deferred fit had run; it now fits to the container first, so the size sent to the node
  is correct on the first try (no reflow flash). When the node runs omnyshell 1.45.0+ (which
  resizes the resumed PTY to the size the client opens with), resuming on a differently-sized
  device reflows the shell / a full-screen program to this device. (No dependency bump — the
  client's `omnyshell` package is unchanged.)


### Fixed

- Resuming a session whose program is in the **alternate screen** (nano, vim,
  `claude`, …) no longer corrupts it. The web client was always priming the
  shell on connect — running the init line and a cwd/marker command to draw the
  prompt — even when resuming into a full-screen program, so those commands were
  injected into the program. The host now honors the session's
  `resumedInAltScreen` flag (already reported by the node on resume): it starts
  in passthrough and skips priming, letting the replayed output repaint the
  program and its queued marker restore the prompt when it exits — matching the
  CLI's `connect` loop.

## 1.13.0

### Changed

- **The terminal now uses omnyshell's shared `LineEditor`** instead of a
  hand-rolled, append-only editor, so the browser behaves identically to the
  CLI. The visible gain is **full mid-line editing**: Left/Right, Home/End (and
  Ctrl-A/Ctrl-E), and Delete now move and edit within the line rather than only
  appending at the end. History navigation, TAB completion, the `:ai`
  confirmation prompts and the `:ide` full-screen takeover are all driven
  through the same editor.
- Ctrl-C semantics now match the CLI: at idle it clears the line and interrupts
  the remote shell; while the `:ai` agent owns the screen it fires the agent's
  abort and unblocks any pending confirmation; during a `:ide` session or while
  a remote program owns the screen it is delivered to that program.


### Changed

- Bumped the `omnyshell` dependency to ^1.44.0 and adopted its new shared,
  browser-safe building blocks, replacing the web client's duplicated copies so
  the two clients can't drift apart:
  - the AI default-model map → `defaultModelFor` (drops the local `_defaultModel`);
  - the `:ide` remote-root resolution and shell-family → command syntax →
    `resolveRemoteIdeRoot` / `ideCommandSyntaxFor` (drops the local copies and
    the direct `package:path` dependency);
  - the IDE terminal driver's ANSI emission → `XtermTerminalDriver` now extends
    the shared `AnsiTerminalDriver` and only supplies the xterm.js byte sink,
    size, and input/resize streams;
  - command history now implements the shared `CommandHistoryStore` interface.
- The shell prompt is now formatted by the shared `formatShellPrompt`, so it
  matches the CLI: the working directory is cyan (was blue), the git segment is
  blue with a red branch and green status counts (was yellow), and the
  superuser is shown with a bold-red `(⚠ root)` warning (was a `#` symbol).


### Added

- **`:ide` (alias `:edit`) — the full-screen terminal IDE in the browser.**
  Typing `:ide [path]` in a session opens omnyshell's TUI IDE on the **connected
  node**, rendered right inside the xterm.js terminal: a file-tree sidebar with
  git status, tabbed editing with syntax highlighting and a git-change gutter, an
  integrated terminal, and an AI agent panel. `Ctrl-Q` returns to the shell.
  - The IDE engine (`IdeApp`/`ScreenBuffer`/`RemoteWorkspace`, exported by
    omnyshell ^1.43.1) is `dart:io`-free; this adds the browser glue: an
    `XtermTerminalDriver` that maps the engine's alternate-screen frames to
    xterm.js (and its `onData`/`onResize` back to the engine), and a full-screen
    takeover seam in `WebShellHost` (the browser counterpart to the CLI's
    `LineEditor.suspendInput`) that diverts every raw keystroke to the IDE while
    it owns the screen and restores the prompt on exit.
  - The agent panel routes provider calls through the Hub (same precedence as
    `:ai`: custom key → Hub default → setup help) and gates its `run_command`
    tool with the same `command_shield` the CLI uses. File operations run on the
    node over the connected session (`RemoteWorkspace`).

## 1.10.1

### Fixed

- The release web build (`dart2js`) produced no `main.dart.js` under omnyshell
  1.43.0: that release's "web-safe" barrel transitively imported `dart:io` (via
  `RemoteWorkspace → local_workspace.dart`), so dart2js silently skipped
  compiling `web/main.dart`. Bumped the `omnyshell` dependency to ^1.43.1, which
  moves `WorkspaceException` into the `dart:io`-free `Workspace` port and makes
  the barrel genuinely browser-compilable again. No web code change.

## 1.10.0

### Changed

- Bumped the `omnyshell` dependency to ^1.43.0. The upstream release refactors
  the `:ide` engine behind an async, `dart:io`-free `Workspace` port so it now
  **compiles to JavaScript** for the browser: the web client barrel now exports
  `IdeApp`, `Workspace`, `RemoteWorkspace`, `TerminalDriver`, `ScreenBuffer` and
  the key decoder, the building blocks for embedding the terminal IDE in a web
  app (supply a `TerminalDriver` that renders `ScreenBuffer` frames into a
  browser terminal and a `RemoteWorkspace` over the connected client). This bump
  only pulls in those exports; the web client does not yet wire up the IDE, so
  there is no user-facing change — a routine dependency refresh.

## 1.9.0

### Changed

- Bumped the `omnyshell` dependency to ^1.42.0. The upstream release adds the
  full-screen `:ide` TUI (a terminal IDE with a file tree, tabs, syntax
  highlighting, a git-change gutter, an integrated terminal and an AI agent
  panel) plus an optional starting directory for `omnyshell local`. All of it is
  native-only (`:ide` is browser-excluded because it needs `dart:io`), so it does
  not affect the browser client; this is a routine dependency refresh.

## 1.8.1

### Changed

- Bumped the `omnyshell` dependency to ^1.41.1. The upstream changes (a native
  `omnyshell local` CLI mode and README documentation) do not affect the browser
  client; this is a routine dependency refresh.

### Documentation

- README: added the live PWA link (<https://omnygrid.github.io/omnyshell_web/>),
  documented the in-browser `:ai` agent (provider/model/key or Hub default, with
  the post-run token-usage stats line), and corrected the install instructions —
  the client now depends on the published `omnyshell` package from pub.dev, not a
  `../omnyshell` path override (which is now a local-only dev aid).

## 1.8.0

### Changed

- Bumped the `omnyshell` dependency to ^1.40.0, which upgrades the `:ai` agent's
  command shield (`command_shield` ^1.4.0) with a correct bash/POSIX
  file-descriptor redirection parser. The discard/merge idioms the model
  routinely emits — `cmd 2>&1`, `cmd >/dev/null 2>&1`, `&>/dev/null` — are now
  read as a single clean command instead of producing a spurious "Redirection
  without a target" diagnostic and a phantom invocation, and they no longer
  over-report a filesystem write.

## 1.7.0

### Added

- Bumped the `omnyshell` dependency to ^1.39.0, which adds an AI agent
  token-usage summary to the web client:
  - After every `:ai` answer the agent prints a muted (gray) stats line — shown
    just before the "chat to continue / Enter to end" prompt so the running totals
    are visible before the interaction ends — e.g. `ai: 12,840 tokens (in 10,210 ·
    out 2,630 · cached 1,024) · 78 tok/s · 4 requests · 14.6s` — reporting tokens
    used (input/output, plus prompt-cache hits), the output generation speed
    (tok/s), the number of model requests, and the wall-clock duration. Totals
    accumulate across a multi-turn session and the line also shows on abort or a
    provider error.
  - Generation speed stays accurate over the Hub proxy: the Hub reports its real
    upstream request time, so the browser↔Hub round-trip is excluded from tok/s.

## 1.6.0

### Added

- Bumped the `omnyshell` dependency to ^1.38.0, which improves the `:ai` agent in
  the web client:
  - A magenta divider (`╌`) is drawn just before a presented plan, separating it
    from the preceding investigation output so the "investigating → here is the
    plan" transition reads at a glance.
  - After the final answer the agent asks whether to keep chatting or end. Typing
    a message continues the conversation in the **same context** (a fresh step
    budget is granted and the in-flight plan state resets); pressing Enter ends
    the agent.

## 1.5.2

### Fixed

- The `:ai` agent no longer flashes a fresh shell prompt line between its
  command outputs in the web client. While the agent owns the screen its idle
  prompt is now suppressed — matching the CLI — and restored once the agent
  finishes. Interactive confirmation prompts are unaffected.

## 1.5.1

### Changed

- Bumped the `omnyshell` dependency to ^1.37.0, which improves the `:ai` agent:
  plan mode now continues from the failed step on a re-presented plan (no
  re-running already-succeeded, possibly non-idempotent commands), and
  version/help probes (`node --version`, `dart --version`, …) are classified as
  safe investigation instead of mutating commands.

### Fixed

- The `:ai` agent now runs its commands in the **live PTY session** (POSIX
  shells), matching the CLI, so interactive prompts work — e.g. `sudo` can ask
  for a password and the user types it directly in the terminal. Previously the
  web agent used a one-off `exec` with no TTY, so `sudo` failed with "a terminal
  is required to read the password". Non-POSIX shells still fall back to `exec`.

## 1.5.0

### Added

- AI agent in the browser: the `:ai` command now works in the web client. A
  browser can't call AI provider APIs directly (CORS), so provider HTTPS calls are
  routed through the Hub; the agent then investigates the node, plans, and runs
  commands toward a natural-language goal — the same three modes as the CLI
  (`standard`, `plan`, `auto`). Requires omnyshell ^1.36.0 (Hub AI proxy +
  `HubHttpClient`); to use the "Hub default" path the Hub must be started with AI
  credentials (`omnyshell hub start --ai-config <path>`, or `~/.omnyshell/ai.yaml`
  / `*_API_KEY` env), otherwise bring your own key in Settings.
- AI settings in the global Settings panel (⚙): use the Hub's default
  provider/model (the API key stays on the Hub and is injected when proxying) or
  bring your own provider/model + API key (stored in this browser only, forwarded
  via the Hub). Also sets the default agent mode and reply language.
- Interactive agent prompts in the terminal — confirmations are read inline, and
  Ctrl-C aborts a running `:ai` agent.

### Changed

- Bumped the `omnyshell` dependency to ^1.36.0.

### Fixed

- The `:ai` agent's captured command output no longer "staircases" in the
  terminal: local-command output now normalizes bare LFs to CRLF (the browser
  terminal is a pipe with no line discipline, unlike the remote shell's PTY).

## 1.4.1

### Fixed

- The login footer showed the wrong Web Client version (`1.3.0`) in the 1.4.0
  release: the hardcoded `webClientVersion` constant wasn't bumped alongside
  `pubspec.yaml`. Now reports the correct version.

## 1.4.0

### Added

- Selectable terminal dimensions for new sessions, in a new global Settings
  panel (⚙ in the header): Auto-fit (the previous behavior), a Standard 80×24,
  device-aware "Fit landscape" / "Fit portrait" presets computed for the current
  screen, and a Custom cols×rows entry. The PTY can't be resized after a session
  starts, so a fixed grid is pinned and the font is scaled to fit it — the
  terminal tracks the window in both orientations without changing cols/rows.
- Terminal text-size control (Auto / Smaller / Normal / Larger). Auto derives the
  font from the chosen columns so they fill the width; the on-screen key bar
  scales with the text, so a smaller font yields smaller keys and more columns on
  a phone. Dimension choices apply to the next session; text size applies live.

### Changed

- Bumped the `omnyshell` dependency to ^1.34.0.
- The terminal host is now pinned to a definite height equal to the available
  space, so it reliably shrinks as well as grows with the window (previously a
  too-tall canvas — e.g. after exiting fullscreen — could not shrink back).
- Exiting fullscreen forces an xterm redraw and the terminal re-fits across a few
  frames after mount, fixing a stale height that previously needed a manual
  reflow.

### Fixed

- "Terminate" on the session screen now reliably ends the session on the node.
  It uses the control-plane kill-by-id (the same path the sessions list uses)
  instead of an in-channel close, whose `ChannelClose` frame a browser WebSocket
  could drop on teardown — leaving the node to park the session so it stayed
  listed.

## 1.3.0

### Added

- Command history in the terminal: Up/Down walk previously entered commands
  (prefix-restricted when text has been typed), persisted to `localStorage` and
  scoped per principal+node. This reuses the `omnyshell` package's shared
  history primitives (`CommandHistoryBuffer` + `HistoryCursor`, requires
  `omnyshell` ^1.33.0), so it behaves identically to the CLI — only the storage
  differs (browser storage vs a history file).

### Changed

- The login form panel uses more of the screen width on phones: the outer gutter
  and the card's inner padding are trimmed on small viewports (respecting
  safe-area insets), giving the inputs noticeably more room.

## 1.2.1

### Changed

- Maintenance release to exercise the release-triggered GitHub Pages deploy.

## 1.2.0

### Added

- The login screen footer shows the Web Client version and the OmnyShell version
  (read from the package's `omnyShellVersion`, requires `omnyshell` ^1.32.0).

## 1.1.0

### Added

- Fullscreen toggle for the terminal: a button expands the terminal to fill the
  whole window (hiding the app header and toolbar) so mobile devices get the
  maximum screen area, with a floating exit button to restore the normal layout.
- TAB completion in the terminal — pressing Tab now completes the word under the
  cursor by running the shell's completion command on the node (the same
  mechanism the CLI uses), instead of being dropped.
- Local `:` commands now work in the web terminal (`:help`, `:tree`, `:tunnel`,
  `:info`, `:whoami`, `:ping`, `:detach`, `:exit`, …). They are handled
  client-side via the shared `omnyshell` registry and never forwarded to the
  remote shell. Filesystem commands (`:download`/`:upload`/`:drive`) are
  intentionally unavailable in the browser.

### Fixed

- The terminal now refits reliably on fullscreen enter/exit (and keyboard /
  rotation / resize) via a `ResizeObserver`, instead of mis-sizing until the
  keyboard was toggled.
- After exiting fullscreen the terminal no longer overflows the screen on iOS:
  the locked terminal screen is anchored to the visible viewport
  (`--vvh`/`100dvh`) rather than the (taller) layout viewport, so the bottom row
  and key bar stay on-screen.
- The login Hub and Principal fields opt out of mobile auto-capitalization and
  auto-correction (`autocapitalize=none`, `autocorrect=off`, `spellcheck=false`)
  so the keyboard no longer capitalizes the first letter.

### Changed

- The terminal floors its height at the available space (between the chrome
  above it and the key bar reserved below it) so it always uses the full area
  without overlapping the key bar — except in fullscreen or while the keyboard
  is open.
- Navigating to another screen (nodes / sessions / …) now resets scroll to the
  top instead of inheriting the previous screen's scroll position.
- Long key/value entries (e.g. a node UID) truncate with an ellipsis instead of
  widening the page on mobile.
- Entering/exiting fullscreen now scrolls the terminal to the bottom (latest
  output / prompt) and re-fits at a few delays (next frame, 120/300/500 ms) to
  catch the mobile browser chrome animating in/out, so the terminal box and key
  bar settle to the right size/position.
- On the terminal screen the page no longer scrolls or rubber-bands; the
  terminal fills the space below the toolbar and only its own content (xterm
  scrollback) scrolls.
- The terminal now stays usable with the mobile soft keyboard open: the layout
  tracks the visual viewport so the on-screen key bar sits just above the
  keyboard and the prompt row stays visible (xterm re-fits on keyboard
  open/close). Implemented via a `visualViewport` tracker exposing `--vvh`/`--kb`
  and a `.keyboard-open` flag.
- Added a **New Session** button to the sessions list so a fresh shell can be
  opened without going back to the node screen.
- Removed the redundant session title ("New shell" / "Session …") from the
  terminal toolbar to reclaim space.
- The on-screen accessory key bar now places Home/End/PgUp/PgDn at the end
  (after Copy/Paste).
- Disabled pinch-to-zoom on mobile (viewport meta + `touch-action` + iOS gesture
  handlers) so two-finger gestures don't zoom the page; panning/scrolling stays.
- The terminal toolbar (Sessions / Fullscreen / Detach / Terminate) uses
  smaller buttons and wraps instead of overflowing, so the row fits a phone
  width.
- Rotating the device while in fullscreen now exits fullscreen, since the
  layout isn't usable across an orientation change.
- Bumped `omnyshell` to ^1.31.0 (for the browser-safe local-command layer).

## 1.0.0

- Initial release of the OmnyShell web client.
- Browser-only client over the real `omnyshell` protocol (no custom backend),
  enabled by a browser-compatible transport seam added to the `omnyshell`
  package.
- Authentication (bearer token) with logout, session persistence, auto-restore,
  and one-click reconnect after a dropped connection.
- Node discovery: list, detail (platform/capabilities/labels/status), refresh,
  cache-backed instant paint.
- Session management: list, peek, detach, resume, kill, and open a new shell.
- Interactive xterm.js terminal wired to remote sessions.
- Light / dark / system theming with a persistent selector and no flash on load.
- Comprehensive unit, integration, widget/DOM, and end-to-end tests.
