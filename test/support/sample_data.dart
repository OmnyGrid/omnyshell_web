import 'package:omnyshell/omnyshell_client_web.dart';

/// Builds a [DetachedSessionInfo] for tests with sensible defaults.
DetachedSessionInfo sampleSession(
  String shortId, {
  String nodeId = 'web-01',
  SessionState state = SessionState.detached,
  String? command,
  String? cwd = '/home/alice',
  bool detached = true,
  DateTime? createdAt,
}) {
  final created = createdAt ?? DateTime.utc(2026, 1, 1, 12);
  return DetachedSessionInfo(
    sessionId: 'session-$shortId-full',
    shortId: shortId,
    nodeId: nodeId,
    ownerUserId: 'alice',
    mode: SessionMode.shell,
    createdAt: created,
    state: state,
    detachedAt: detached ? created.add(const Duration(minutes: 5)) : null,
    currentCommand: command,
    currentCwd: cwd,
  );
}

/// Builds a [NodeDescriptor] for tests with sensible defaults.
NodeDescriptor sampleNode(
  String id, {
  bool online = true,
  String os = 'linux',
  String arch = 'x64',
  Map<String, String> labels = const {},
}) => NodeDescriptor(
  id: NodeId(id),
  displayName: id,
  online: online,
  platform: PlatformInfo(
    os: os,
    arch: arch,
    agentVersion: '1.0.0',
    hostname: '$id.local',
  ),
  labels: labels,
);
