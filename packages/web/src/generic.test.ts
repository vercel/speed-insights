import { describe, it, expect } from '@jest/globals';
import { injectSpeedInsights, type SpeedInsightsProps } from './generic';

describe('injectSpeedInsights()', () => {
  it('allows no parameters', () => {
    expect(injectSpeedInsights()).toEqual({
      setRoute: expect.any(Function),
    });
    expectInjectedScript();
  });

  it('can set framework', () => {
    const framework = 'sveltekit';
    expect(injectSpeedInsights({ framework })).toEqual({
      setRoute: expect.any(Function),
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
});

function expectInjectedScript({
  src = 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
  framework = '',
} = {}): void {
  const script = document.querySelector('script');
  expect(script).toBeDefined();
  expect(script?.defer).toBe(true);
  expect(script?.src).toBe(src);
  expect(script?.dataset.sdkn).toBe(
    `@vercel/speed-insights${framework ? `/${framework}` : ''}`,
  );
}
