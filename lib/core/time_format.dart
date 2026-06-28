/// Formats [time] as a compact relative age from [now] (e.g. `5m ago`,
/// `2h ago`, `3d ago`). Pure for unit testing — the live caller passes
/// `DateTime.now()`.
String relativeTime(DateTime time, DateTime now) {
  final d = now.difference(time);
  if (d.isNegative) return 'just now';
  if (d.inSeconds < 60) return '${d.inSeconds}s ago';
  if (d.inMinutes < 60) return '${d.inMinutes}m ago';
  if (d.inHours < 24) return '${d.inHours}h ago';
  return '${d.inDays}d ago';
}

/// Formats a [Duration] until expiry as `in 5m` / `in 2h` / `expired`.
String untilExpiry(DateTime expiresAt, DateTime now) {
  final d = expiresAt.difference(now);
  if (d.isNegative) return 'expired';
  if (d.inMinutes < 60) return 'in ${d.inMinutes}m';
  if (d.inHours < 24) return 'in ${d.inHours}h';
  return 'in ${d.inDays}d';
}
