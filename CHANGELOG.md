## Unreleased

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

### Changed

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
