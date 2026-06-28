import 'package:omnyshell/omnyshell_client_web.dart'
    show CommandHistoryBuffer, HistoryCursor;

import '../storage/key_value_store.dart';

/// Persistent, per-key command history backed by a [KeyValueStore].
///
/// The browser counterpart to the omnyshell CLI's file-backed `CommandHistory`:
/// it reuses the package's shared [CommandHistoryBuffer] for the entry rules
/// (newest-last, capped, skip blanks and consecutive duplicates) and exposes the
/// same [HistoryCursor] for Up/Down navigation, so history behaves identically
/// to the CLI — only the storage differs. Each key (typically
/// `<principal>@<node>`) maps to its own `localStorage` entry, so connecting to
/// different nodes or as different principals never mixes histories. Entries are
/// persisted as newline-joined lines.
class CommandHistory {
  /// Namespace for stored histories, kept distinct from settings/cache keys.
  static const String storagePrefix = 'omnyshell.history.';

  /// The shared, storage-agnostic entry buffer (add rules + cap + navigation).
  final CommandHistoryBuffer _buffer;

  /// Backing store, or `null` for an in-memory-only history (used by tests).
  final KeyValueStore? _kv;

  /// The full storage key under which entries are persisted.
  final String _storageKey;

  CommandHistory._(this._buffer, this._kv, this._storageKey);

  /// Loads the history for [key] from [kv], returning an empty history when none
  /// is stored yet. A corrupt or unreadable entry is treated as empty so it can
  /// never break the shell.
  factory CommandHistory.load({
    required KeyValueStore kv,
    required String key,
    int maxEntries = 1000,
  }) {
    final storageKey = '$storagePrefix${CommandHistoryBuffer.sanitizeKey(key)}';
    final buffer = CommandHistoryBuffer(maxEntries: maxEntries);
    try {
      final raw = kv.read(storageKey);
      if (raw != null) {
        buffer.replaceAll(raw.split('\n').where((l) => l.trim().isNotEmpty));
      }
    } on Object {
      // A corrupt or unreadable entry must never break the shell.
    }
    return CommandHistory._(buffer, kv, storageKey);
  }

  /// An in-memory history with no backing store (used by tests).
  factory CommandHistory.inMemory({
    List<String>? entries,
    int maxEntries = 1000,
  }) => CommandHistory._(
    CommandHistoryBuffer(entries: entries, maxEntries: maxEntries),
    null,
    '',
  );

  /// The entries, oldest first. The returned list is a copy.
  List<String> get entries => _buffer.entries;

  /// A fresh Up/Down navigation cursor over this history's entries.
  HistoryCursor cursor() => HistoryCursor(_buffer);

  /// Records [entry], skipping blank lines and consecutive duplicates, then
  /// persists. Storage failures are swallowed so the interactive session is
  /// never interrupted by a write error.
  void add(String entry) {
    if (_buffer.add(entry)) _persist();
  }

  void _persist() {
    final kv = _kv;
    if (kv == null) return;
    try {
      kv.write(_storageKey, _buffer.entries.join('\n'));
    } on Object {
      // Best-effort persistence only.
    }
  }
}
