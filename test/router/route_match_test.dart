import 'package:omnyshell_web/router/route_match.dart';
import 'package:test/test.dart';

void main() {
  const patterns = ['/nodes/:id/sessions', '/nodes/:id', '/nodes', '/login'];

  group('matchRoute', () {
    test('matches a static route', () {
      final m = matchRoute(patterns, '/login');
      expect(m.matched, isTrue);
      expect(m.pattern, '/login');
      expect(m.params, isEmpty);
    });

    test('extracts a path parameter', () {
      final m = matchRoute(patterns, '/nodes/web-01');
      expect(m.pattern, '/nodes/:id');
      expect(m.params['id'], 'web-01');
    });

    test('prefers the most specific pattern listed first', () {
      final m = matchRoute(patterns, '/nodes/web-01/sessions');
      expect(m.pattern, '/nodes/:id/sessions');
      expect(m.params['id'], 'web-01');
    });

    test('URL-decodes parameters', () {
      final m = matchRoute(patterns, '/nodes/a%20b');
      expect(m.params['id'], 'a b');
    });

    test('returns an unmatched result for unknown paths', () {
      final m = matchRoute(patterns, '/nope/here');
      expect(m.matched, isFalse);
      expect(m.pattern, '');
    });
  });

  group('hashToPath', () {
    test('empty hash maps to root', () {
      expect(hashToPath(''), '/');
      expect(hashToPath('#'), '/');
    });

    test('strips the leading hash', () {
      expect(hashToPath('#/nodes'), '/nodes');
    });

    test('adds a leading slash when missing', () {
      expect(hashToPath('#nodes'), '/nodes');
    });
  });
}
