import 'package:omnyshell/omnyshell_client_web.dart';

import '../core/app_error.dart';
import '../core/observable.dart';
import '../core/omnyshell_service.dart';
import '../storage/node_cache.dart';
import 'async_state.dart';

/// Loads and holds the discoverable node list, with cache-backed instant paint
/// and explicit loading/error states.
class NodesController {
  final OmnyShellService _service;
  final NodeCache _cache;

  /// Observable node-list state.
  final Observable<AsyncState<List<NodeDescriptor>>> state;

  /// Creates a controller.
  NodesController(this._service, this._cache)
    : state = Observable(const AsyncState.idle());

  /// Seeds from cache (shown as stale) then refreshes from the Hub. Safe to call
  /// on every navigation to the nodes screen.
  Future<void> load() async {
    if (!state.value.hasData) {
      final cached = _cache.read();
      if (cached != null && cached.isNotEmpty) {
        state.value = AsyncState.loading(data: cached, stale: true);
      }
    }
    await refresh();
  }

  /// Fetches the node list from the Hub, updating the cache on success and
  /// retaining prior data on failure.
  Future<void> refresh() async {
    final prev = state.value.data;
    state.value = AsyncState.loading(data: prev, stale: prev != null);
    try {
      final nodes = await _service.listNodes();
      _cache.write(nodes);
      state.value = AsyncState.ready(nodes);
    } on AppError catch (e) {
      state.value = AsyncState.error(e, data: prev);
    }
  }

  /// The node with [id] from the current list, or `null` if not loaded/found.
  NodeDescriptor? byId(String id) {
    for (final n in state.value.data ?? const <NodeDescriptor>[]) {
      if (n.id.value == id) return n;
    }
    return null;
  }

  /// Resets state and clears the cache (on sign-out).
  void reset() {
    _cache.clear();
    state.value = const AsyncState.idle();
  }
}
