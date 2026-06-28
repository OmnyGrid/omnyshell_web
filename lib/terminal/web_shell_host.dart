// (Named constructor params map to private fields; an initializing formal can't
// be a private named parameter, so the assignment is intentional.)
// ignore_for_file: prefer_initializing_formals
import 'dart:async';
import 'dart:convert';

import 'package:omnyshell/omnyshell_client_web.dart'
    show InteractiveShellController, ShellPromptState, ShellSessionPort;

import 'terminal_view.dart';

/// The browser host for an [InteractiveShellController]: local line editing and
/// prompt rendering over an xterm.js [TerminalView].
///
/// OmnyShell's remote shell is a pipe (no echo, no prompt); the controller owns
/// the protocol loop (marker priming, command wrapping, completion, passthrough)
/// and this host owns the terminal specifics — echoing input, editing the line,
/// formatting the prompt from [ShellPromptState], and relaying raw bytes while a
/// program owns the terminal. Implements [TerminalKeys] so the on-screen
/// accessory bar drives the same input pipeline.
class WebShellHost implements TerminalKeys {
  final TerminalView _term;
  final String _principal;
  final String _nodeId;
  late final InteractiveShellController _controller;

  final List<int> _line = [];
  bool _passthrough = false;
  bool _ctrlArmed = false;
  bool _ended = false;
  ShellPromptState _lastPrompt = const ShellPromptState();

  @override
  void Function(bool armed)? onCtrlChange;

  /// Creates the host over [term] and [session], and starts the controller.
  WebShellHost({
    required TerminalView term,
    required ShellSessionPort session,
    required String principal,
    required String nodeId,
  }) : _term = term,
       _principal = principal,
       _nodeId = nodeId {
    _controller = InteractiveShellController(
      session: session,
      onOutput: _term.write,
      onPrompt: _onPrompt,
      onPassthrough: (active) => _passthrough = active,
      onExit: _onExit,
    );
    _term.onInput((data) => _handleBytes(utf8.encode(data)));
    _term.onResize(_controller.resize);
    final size = _term.size;
    if (size.cols > 0 && size.rows > 0) {
      _controller.resize(size.cols, size.rows);
    }
    _controller.start();
  }

  /// Whether the session has ended.
  bool get ended => _ended;

  void _onPrompt(ShellPromptState state) {
    _lastPrompt = state;
    _line.clear();
    _term.write(utf8.encode(_prompt(state)));
  }

  String _prompt(ShellPromptState s) {
    final cwd = s.cwd ?? '~';
    final symbol = s.isRoot ? '#' : r'$';
    final git = (s.branch != null && s.branch!.isNotEmpty)
        ? ' \x1b[33m(${s.branch}${s.gitStatus != null ? ' ${s.gitStatus}' : ''})\x1b[0m'
        : '';
    return '\x1b[1;32m$_principal@$_nodeId\x1b[0m:'
        '\x1b[1;34m$cwd\x1b[0m$git $symbol ';
  }

  void _onExit(int code) {
    if (_ended) return;
    _ended = true;
    _term.writeText('\r\n\x1b[90m[session ended — exit $code]\x1b[0m\r\n');
  }

  void _handleBytes(List<int> raw) {
    if (_ended || raw.isEmpty) return;
    final bytes = _applyArmedCtrl(raw);

    if (_passthrough) {
      // A program owns the terminal: relay raw, but turn Ctrl-C into an
      // interrupt (a pipe shell has no line discipline to do it).
      if (bytes.length == 1 && bytes[0] == 0x03) {
        _controller.interrupt();
        return;
      }
      _controller.sendRaw(bytes);
      return;
    }

    for (var i = 0; i < bytes.length; i++) {
      final c = bytes[i];
      switch (c) {
        case 0x1b: // Escape sequence (arrows, fn-keys) — not handled at idle.
          return;
        case 0x0d: // Enter (CR)
        case 0x0a: // Enter (LF)
          _commit();
          return;
        case 0x7f: // Backspace (DEL)
        case 0x08: // Backspace (BS)
          if (_line.isNotEmpty) {
            _line.removeLast();
            _term.write(const [0x08, 0x20, 0x08]);
          }
        case 0x03: // Ctrl-C at idle: discard the line, repaint the prompt.
          _term.write(utf8.encode('^C\r\n'));
          _line.clear();
          _term.write(utf8.encode(_prompt(_lastPrompt)));
          return;
        case 0x04: // Ctrl-D on an empty line: end the session.
          if (_line.isEmpty) {
            unawaited(close());
            return;
          }
        case 0x0c: // Ctrl-L: clear screen, keep the line.
          _term.write(utf8.encode('\x1b[2J\x1b[H'));
          _term.write(utf8.encode(_prompt(_lastPrompt)));
          _term.write(List<int>.from(_line));
        default:
          if (c >= 0x20) {
            _line.add(c);
            _term.write([c]);
          }
      }
    }
  }

  void _commit() {
    final line = utf8.decode(_line, allowMalformed: true);
    _line.clear();
    _term.write(utf8.encode('\r\n'));
    // The controller wraps + dispatches (and repaints the prompt via onPrompt
    // when the command completes); a blank line just repaints.
    _controller.submitLine(line);
  }

  List<int> _applyArmedCtrl(List<int> bytes) {
    if (!_ctrlArmed) return bytes;
    _disarmCtrl();
    if (bytes.isEmpty) return bytes;
    final c = bytes.first;
    if ((c >= 0x40 && c <= 0x5f) || (c >= 0x61 && c <= 0x7a)) {
      return [c & 0x1f, ...bytes.skip(1)];
    }
    return bytes;
  }

  // --- TerminalKeys (accessory bar) ------------------------------------------

  @override
  void sendKey(List<int> bytes) => _handleBytes(bytes);

  @override
  void armCtrl() {
    _ctrlArmed = !_ctrlArmed;
    onCtrlChange?.call(_ctrlArmed);
  }

  @override
  bool get ctrlArmed => _ctrlArmed;

  void _disarmCtrl() {
    if (!_ctrlArmed) return;
    _ctrlArmed = false;
    onCtrlChange?.call(false);
  }

  // --- Lifecycle -------------------------------------------------------------

  /// Detaches the session (keeps it alive on the node).
  Future<void> detach() => _controller.detach();

  /// Terminates the session.
  Future<void> close() => _controller.close();

  /// Stops driving the session without detaching/closing it (on unmount).
  Future<void> dispose() => _controller.dispose();
}
