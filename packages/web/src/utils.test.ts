import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { computeRoute, loadProps } from './utils';

describe('utils', () => {
  describe('computeRoute()', () => {
    it('returns unchanged pathname if no pathParams provided', () => {
      expect(computeRoute('/vercel/next-site/analytics', null)).toBe(
        '/vercel/next-site/analytics',
      );
    });

    it('returns null for null pathname', () => {
      expect(computeRoute(null, {})).toBe(null);
    });

    it('replaces segments', () => {
      const input = '/vercel/next-site/analytics';
      const params = {
        teamSlug: 'vercel',
        project: 'next-site',
      };
      const expected = '/[teamSlug]/[project]/analytics';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('replaces segments even one param is not used', () => {
      const input = '/vercel/next-site/analytics';
      const params = {
        lang: 'en',
        teamSlug: 'vercel',
        project: 'next-site',
      };
      const expected = '/[teamSlug]/[project]/analytics';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('must not replace partial segments', () => {
      const input = '/next-site/vercel-site';
      const params = {
        teamSlug: 'vercel',
      };
      const expected = '/next-site/vercel-site'; // remains unchanged because "vercel" is a partial match
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('handles array segments', () => {
      const input = '/en/us/next-site';
      const params = {
        langs: ['en', 'us'],
      };
      const expected = '/[...langs]/next-site';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('handles array segments and individual segments', () => {
      const input = '/en/us/next-site';
      const params = {
        langs: ['en', 'us'],
        team: 'next-site',
      };
      const expected = '/[...langs]/[team]';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('handles special characters in url', () => {
      const input = '/123/test(test';
      const params = {
        teamSlug: '123',
        project: 'test(test',
      };

      const expected = '/[teamSlug]/[project]';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('handles special more characters', () => {
      const input = '/123/tes\\t(test/3.*';
      const params = {
        teamSlug: '123',
      };

      const expected = '/[teamSlug]/tes\\t(test/3.*';
      expect(computeRoute(input, params)).toBe(expected);
    });

    it('parallel routes where params matched both individually and within arrays', () => {
      const params = {
        catchAll: ['m', 'john', 'p', 'shirt'],
        merchantId: 'john',
        productSlug: 'shirt',
      };
      expect(computeRoute('/m/john/p/shirt', params)).toBe(
        '/m/[merchantId]/p/[productSlug]',
      );
    });

    describe('edge case handling (same values for multiple params)', () => {
      it('replaces based on the priority of the pathParams keys', () => {
        const input = '/test/test';
        const params = {
          teamSlug: 'test',
          project: 'test',
        };
        const expected = '/[teamSlug]/[project]'; // 'teamSlug' takes priority over 'project' based on their order in the params object
        expect(computeRoute(input, params)).toBe(expected);
      });

      it('handles reversed priority', () => {
        const input = '/test/test';
        const params = {
          project: 'test',
          teamSlug: 'test',
        };
        const expected = '/[project]/[teamSlug]'; // 'project' takes priority over 'teamSlug' here due to the reversed order in the params object
        expect(computeRoute(input, params)).toBe(expected);
      });
    });
  });

  describe('loadProps()', () => {
    const envSave = { ...process.env };

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env = { ...envSave };
    });

    describe('script src', () => {
      it('returns debug script in development', () => {
        process.env.NODE_ENV = 'development';
        expect(loadProps({}).src).toBe(
          'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
        );
      });

      it('uses the override prop in development', () => {
        process.env.NODE_ENV = 'development';
        const scriptSrc = `https://example.com/${Math.random()}/script.js`;
        expect(loadProps({ scriptSrc }).src).toBe(scriptSrc);
      });

      it('returns generic route in production', () => {
        expect(loadProps({}).src).toBe('/_vercel/speed-insights/script.js');
      });

      it('uses base path in production', () => {
        const basePath = `/_vercel-${Math.random()}`;
        expect(loadProps({ basePath }).src).toBe(
          `${basePath}/speed-insights/script.js`,
        );
      });

      it('ignores base path when using dsn and bas', () => {
        const basePath = `/_vercel-${Math.random()}`;
        expect(loadProps({ basePath, dsn: 'test' }).src).toBe(
          'https://va.vercel-scripts.com/v1/speed-insights/script.js',
        );
      });

      it('uses override prop in production', () => {
        const scriptSrc = `https://example.com/${Math.random()}/script.js`;
        expect(loadProps({ scriptSrc }).src).toBe(scriptSrc);
      });

      it('uses value from config string', () => {
        const scriptSrc = `https://example.com/${Math.random()}.js`;
        expect(
          loadProps({}, JSON.stringify({ speedInsights: { scriptSrc } })).src,
        ).toBe(scriptSrc);
      });

      it('adds leading slash to config value', () => {
        const scriptSrc = `${Math.random()}.js`;
        expect(
          loadProps({}, JSON.stringify({ speedInsights: { scriptSrc } })).src,
        ).toBe(`/${scriptSrc}`);
      });

      it('uses props over config string', () => {
        const scriptSrc = `https://example.com/${Math.random()}.js`;
        expect(
          loadProps(
            { scriptSrc },
            JSON.stringify({ speedInsights: { scriptSrc: 'notused' } }),
          ).src,
        ).toBe(scriptSrc);
      });

      it('adds leading slash to props value', () => {
        const scriptSrc = `${Math.random()}.js`;
        expect(
          loadProps(
            { scriptSrc },
            JSON.stringify({ speedInsights: { scriptSrc: 'notused' } }),
          ).src,
        ).toBe(`/${scriptSrc}`);
      });
    });

    describe('dataset', () => {
      it('returns default dataset with version and package name only', () => {
        expect(loadProps({}).dataset).toEqual({
          sdkn: '@vercel/speed-insights',
          sdkv: expect.any(String) as string,
        });
      });

      it('includes the provided framework in sdkn', () => {
        const framework = 'dojo';
        expect(loadProps({ framework: framework }).dataset).toEqual(
          expect.objectContaining({
            sdkn: `@vercel/speed-insights/${framework}`,
          }),
        );
      });

      it('uses the provided endpoint', () => {
        const endpoint = 'https://example.com/speed-insights/vitals';
        expect(loadProps({ endpoint }).dataset.endpoint).toEqual(endpoint);
      });

      it('uses the provided basepath', () => {
        const basePath = '/custom-base';
        expect(loadProps({ basePath }).dataset.endpoint).toEqual(
          `${basePath}/speed-insights/vitals`,
        );
      });

      it('prefers explicit endpoint over basePath', () => {
        const endpoint = 'https://example.com/analytics';
        const basePath = '/custom-base';
        expect(loadProps({ endpoint, basePath }).dataset.endpoint).toEqual(
          endpoint,
        );
      });

      it('uses the provided dsn', () => {
        const dsn = 'test-dsn-value';
        expect(loadProps({ dsn }).dataset.dsn).toEqual(dsn);
      });

      it('can override debug in development', () => {
        process.env.NODE_ENV = 'development';
        expect(loadProps({ debug: false }).dataset.debug).toBe('false');
      });

      it('can not set debug in production', () => {
        expect(loadProps({ debug: false }).dataset).not.toHaveProperty('debug');
      });

      it('returns complete dataset with all properties', () => {
        process.env.NODE_ENV = 'development';
        const dsn = 'test-dsn-value';
        const endpoint = 'https://example.com/vitals';
        const framework = 'nuxt';
        const sampleRate = 0.5;
        expect(
          loadProps({
            framework,
            endpoint,
            dsn,
            debug: false,
            sampleRate,
          }).dataset,
        ).toEqual(
          expect.objectContaining({
            sdkn: `@vercel/speed-insights/${framework}`,
            sdkv: expect.any(String) as string,
            endpoint,
            dsn,
            sampleRate: sampleRate.toString(),
            debug: 'false',
          }),
        );
      });

      it('uses values from config string', () => {
        process.env.NODE_ENV = 'development';
        const dsn = 'test-dsn-value';
        const endpoint = 'https://example.com/vitals';
        const framework = 'nuxt';
        const sampleRate = 0.5;
        expect(
          loadProps(
            {},
            JSON.stringify({
              speedInsights: {
                framework,
                sampleRate,
                endpoint,
                dsn,
                debug: false,
              },
            }),
          ).dataset,
        ).toEqual(
          expect.objectContaining({
            sdkn: `@vercel/speed-insights/${framework}`,
            sdkv: expect.any(String) as string,
            endpoint,
            dsn,
            sampleRate: sampleRate.toString(),
            debug: 'false',
          }),
        );
      });

      it('uses props over config string', () => {
        process.env.NODE_ENV = 'development';
        const dsn = 'test-dsn-value';
        const endpoint = 'https://example.com/analytics';
        const framework = 'nuxt';
        const sampleRate = 0.4;
        expect(
          loadProps(
            {
              framework,
              endpoint,
              dsn,
              sampleRate,
              debug: false,
            },
            JSON.stringify({
              analytics: {
                framework: 'nextjs',
                sampleRate: 0.25,
                endpoint: 'unused',
                dsn: 'unused',
                debug: true,
              },
            }),
          ).dataset,
        ).toEqual(
          expect.objectContaining({
            sdkn: `@vercel/speed-insights/${framework}`,
            sdkv: expect.any(String) as string,
            endpoint,
            dsn,
            sampleRate: sampleRate.toString(),
            debug: 'false',
          }),
        );
      });

      it('ignores invalid config string and returns props ', () => {
        process.env.NODE_ENV = 'development';
        const dsn = 'test-dsn-value';
        const endpoint = 'https://example.com/vitals';
        const framework = 'nuxt';
        const sampleRate = 0.5;
        expect(
          loadProps(
            {
              framework,
              endpoint,
              dsn,
              debug: false,
              sampleRate,
            },
            '{"invalid:{}}',
          ).dataset,
        ).toEqual(
          expect.objectContaining({
            sdkn: `@vercel/speed-insights/${framework}`,
            sdkv: expect.any(String) as string,
            endpoint,
            dsn,
            sampleRate: sampleRate.toString(),
            debug: 'false',
          }),
        );
      });
    });
  });
});
