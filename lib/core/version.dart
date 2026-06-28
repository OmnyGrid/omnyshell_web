/// Versions surfaced in the UI (e.g. the login footer).
///
/// The `omnyshell` package does not export its version to browser embedders, so
/// [bundledOmnyShellVersion] is mirrored here — keep it in sync with the
/// `omnyshell` constraint in `pubspec.yaml`, and [webClientVersion] with this
/// package's own `version:`.
library;

/// This web client's version (matches `pubspec.yaml`).
const String webClientVersion = '1.1.0';

/// The `omnyshell` package this client is built against.
const String bundledOmnyShellVersion = '1.31.0';
