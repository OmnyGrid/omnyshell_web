import 'package:omnyshell_web/app/bootstrap.dart';
import 'package:web/web.dart' as web;

void main() {
  final root = web.document.getElementById('app') as web.HTMLElement;
  bootstrap(root);
}
