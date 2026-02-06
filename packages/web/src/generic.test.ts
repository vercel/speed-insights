import { describe, expect, it } from 'vitest';
import { injectSpeedInsights, type SpeedInsightsProps } from './generic';

describe('injectSpeedInsights()', () => {
  it('allows no parameters', () => {
    expect(injectSpeedInsights()).toEqual({
      setRoute: expect.any(Function) as unknown,
    });
    expectInjectedScript();
  });

  it('can set framework', () => {
    const framework = 'sveltekit';
    expect(injectSpeedInsights({ framework })).toEqual({
      setRoute: expect.any(Function) as unknown,
    });
    expectInjectedScript({ framework });
  });

  it('can set beforeSend', () => {
    const beforeSend: Required<SpeedInsightsProps>['beforeSend'] = (event) =>
      event;
    injectSpeedInsights({ beforeSend });

    expect(window.siq?.[0]).toEqual(['beforeSend', beforeSend]);
    expect(window.siq).toHaveLength(1);
  });

  it('reads config string', () => {
    const dsn = 'test-dsn-value';
    const endpoint = 'https://example.com/vitals';
    const scriptSrc = 'https://example.com/custom-script.js';
    const sampleRate = 0.5;
    const framework = 'nuxt';

    injectSpeedInsights(
      {},
      JSON.stringify({
        speedInsights: { dsn, endpoint, scriptSrc, sampleRate, framework },
      }),
    );

    expectInjectedScript({
      scriptSrc,
      sampleRate: sampleRate.toString(),
      endpoint,
      dsn,
      framework,
    });
  });

  it('uses props over config string', () => {
    const dsn = 'test-dsn-value';
    const endpoint = 'https://example.com/vitals';
    const scriptSrc = 'https://example.com/custom-script.js';
    const sampleRate = 0.5;
    const framework = 'nuxt';

    injectSpeedInsights(
      { dsn, endpoint, scriptSrc, sampleRate, framework },
      JSON.stringify({
        speedInsights: {
          framework: 'nextjs',
          endpoint: 'unused',
          dsn: 0,
          scriptSrc: 'unused',
        },
      }),
    );

    expectInjectedScript({
      scriptSrc,
      sampleRate: sampleRate.toString(),
      endpoint,
      dsn,
      framework,
    });
  });

  it('ignores invalid confString', () => {
    const dsn = 'test-dsn-value';
    const endpoint = 'https://example.com/vitals';
    const scriptSrc = 'https://example.com/custom-script.js';
    const sampleRate = 0.5;
    const framework = 'nuxt';

    injectSpeedInsights(
      { dsn, endpoint, scriptSrc, sampleRate, framework },
      'invalid-json{',
    );

    expectInjectedScript({
      scriptSrc,
      sampleRate: sampleRate.toString(),
      endpoint,
      dsn,
      framework,
    });
  });
});

function expectInjectedScript({
  scriptSrc = 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
  framework = '',
  ...dataset
}: Record<string, string> = {}) {
  const script = document.querySelector('script');
  expect(script).toBeDefined();
  expect(script?.defer).toBe(true);
  expect(script?.src).toBe(scriptSrc);
  expect({ ...script?.dataset }).toEqual(
    expect.objectContaining({
      sdkn: `@vercel/speed-insights${framework ? `/${framework}` : ''}`,
      sdkv: expect.any(String) as string,
      ...dataset,
    }),
  );
}
