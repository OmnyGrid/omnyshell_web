/// The DOM-free foundation: state primitives, error mapping, storage contracts.
///
/// Everything here runs on the **Dart VM** as well as in a browser, because none
/// of it imports `package:web`. That is the whole point of the split: a consuming
/// app's service and controller layers can be unit-tested with `dart test` — no
/// headless Chrome, no DOM — while only the parts that genuinely touch the page
/// need a browser.
///
/// Import [client.dart] instead when you also need the browser-bound pieces
/// (`LocalStorageStore`, `Router`, `OmnyShellService` and the controllers built
/// on them); it re-exports everything here.
library;

export 'core/app_error.dart';
export 'core/observable.dart';
export 'core/time_format.dart';
export 'router/route_match.dart';
export 'state/async_state.dart';
export 'storage/key_value_store.dart';
export 'storage/node_cache.dart';
export 'storage/settings_store.dart';
