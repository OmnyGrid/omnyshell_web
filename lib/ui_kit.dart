/// The UI kit: DOM helpers, form widgets, toasts and modals.
///
/// Small, framework-free primitives over `package:web` — enough to build a real
/// app without a framework, and shared so that two OmnyGrid web apps look and
/// behave like one product.
///
/// **These widgets are styled by CSS classes**, not inline styles, so a
/// consuming app must ship the stylesheet that defines them (`.primary`,
/// `.field`, `.banner`, `.badge`, `.modal`, `.toast`, …). Install it with:
///
/// ```sh
/// dart run omnyshell_web:copy_assets
/// ```
///
/// which copies `kit.css` (tokens, base, widgets, modal, toasts) and
/// `terminal.css` (terminal chrome, key bar, fullscreen, keyboard insets) into
/// your `web/`. Without them the widgets render unstyled.
library;

export 'ui/ai_settings_section.dart';
export 'ui/dom.dart';
export 'ui/modal.dart';
export 'ui/toasts.dart';
export 'ui/widgets.dart';
