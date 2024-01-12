import { injectSpeedInsights } from './generic';

describe('injectSpeedInsights()', () => {
  it('allows no parameters', () => {
    expect(injectSpeedInsights()).toEqual({
      setRoute: expect.any(Function) as () => void,
    });
    expectInjectedScript();
  });

  it('can set framework', () => {
    const framework = 'sveltekit';
    expect(injectSpeedInsights({ framework })).toEqual({
      setRoute: expect.any(Function) as () => void,
    });
    expectInjectedScript({ framework });
  });
});

function expectInjectedScript({
  src = 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
  framework = '',
} = {}): void {
  const candidateScript = document.querySelector('script');
  expect(candidateScript).toBeDefined();
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the previous assertion fails otherwise */
  const script = candidateScript!;
  expect(script.defer).toBe(true);
  expect(script.src).toBe(src);
  expect(script.dataset.sdkn).toBe(
    `@vercel/speed-insights${framework ? `/${framework}` : ''}`,
  );
}
