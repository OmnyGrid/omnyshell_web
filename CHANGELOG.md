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
