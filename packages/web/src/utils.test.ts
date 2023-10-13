import { computeRoute } from './utils';

describe('utils', () => {
  describe('computeRoute', () => {
    test('should return unchanged pathname if no pathParams provided', () => {
      expect(computeRoute('/vercel/next-site/analytics', null)).toBe(
        '/vercel/next-site/analytics',
      );
    });

    test('should return null for null pathname', () => {
      expect(computeRoute(null, {})).toBe(null);
    });

    test('should replace segments', () => {
      const input = '/vercel/next-site/analytics';
      const params = {
        teamSlug: 'vercel',
        project: 'next-site',
      };
      const expected = '/[teamSlug]/[project]/analytics';
      expect(computeRoute(input, params)).toBe(expected);
    });

    test('should replace segments even one param is not used', () => {
      const input = '/vercel/next-site/analytics';
      const params = {
        lang: 'en',
        teamSlug: 'vercel',
        project: 'next-site',
      };
      const expected = '/[teamSlug]/[project]/analytics';
      expect(computeRoute(input, params)).toBe(expected);
    });

    test('should not replace partial segments', () => {
      const input = '/next-site/vercel-site';
      const params = {
        teamSlug: 'vercel',
      };
      const expected = '/next-site/vercel-site'; // remains unchanged because "vercel" is a partial match
      expect(computeRoute(input, params)).toBe(expected);
    });

    test('should handle array segments', () => {
      const input = '/en/us/next-site';
      const params = {
        langs: ['en', 'us'],
        teamSlug: 'vercel',
      };
      const expected = '/[...langs]/next-site';
      expect(computeRoute(input, params)).toBe(expected);
    });
  });
});
