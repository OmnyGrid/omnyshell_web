/// The app foundation: the OmnyShell service facade, state primitives, storage
/// and routing.
///
/// Everything a browser app needs *around* the terminal, with no DOM framework
/// and no app-specific coupling:
///
/// * [OmnyShellService] — the only thing that touches omnyshell's `ClientRuntime`.
///   It normalizes Hub URLs, translates exceptions into [AppError]s, and exposes
///   connect / nodes / sessions / shell operations. A `ConnectionFactory` can be
///   injected to drive it against a fake Hub in tests.
/// * [Observable] and [AsyncState] — the state model. Controllers own observables
///   of immutable snapshots; screens subscribe and re-render their own subtree.
///   `AsyncState` deliberately keeps `data` while `loading` or in `error`, so the
///   UI can show last-known content under a spinner or a banner.
/// * [KeyValueStore] / [SettingsStore] / [NodeCache] — persistence, behind an
///   interface so the logic is testable on the VM. **Pass your own `prefix`**:
///   `localStorage` is per-origin and one Hub can serve two apps, which would
///   otherwise clobber each other's theme, Hub and token.
/// * [Router] — hash-based (`#/path`), so the app deploys as static files with no
///   server rewrites. `matchRoute` is pure and VM-testable.
/// * [ThemeController] — light/dark/system, DOM-free (application is injected),
///   so the pre-paint theme script can drive it without a flash.
///
/// The domain types themselves (`NodeDescriptor`, `RemoteSession`, `Principal`, …)
/// come from `package:omnyshell/omnyshell_client_web.dart`.
/// Note the split: the DOM-free half of this lives in `foundation.dart`, which
/// this re-exports. A consuming app's service and controller layers should
/// import **that** — it runs on the VM, so they stay unit-testable with
/// `dart test` instead of needing headless Chrome. Only what actually touches
/// the page (`LocalStorageStore`, `Router`) needs this library.
library;

export 'core/omnyshell_service.dart';
export 'foundation.dart';
export 'router/router.dart';
export 'state/auth_controller.dart';
export 'state/nodes_controller.dart';
export 'state/sessions_controller.dart';
export 'state/terminal_display_controller.dart';
export 'state/theme_controller.dart';
export 'storage/local_storage_store.dart';
