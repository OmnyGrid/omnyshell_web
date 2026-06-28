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
