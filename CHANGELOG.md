## Unreleased

### Added

- The login screen footer shows the Web Client version and the bundled OmnyShell
  version.

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
