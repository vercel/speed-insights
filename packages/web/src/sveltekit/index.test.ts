import { afterEach, describe, expect, it, vi } from 'vitest';
import { injectSpeedInsights } from './index';

type Subscribe = (
  run: (value: { route: { id: string | null } }) => void,
) => () => void;

const stores = vi.hoisted(() => ({
  page: { subscribe: (() => () => undefined) as Subscribe },
}));

vi.mock('$app/environment', () => ({ browser: true }));
vi.mock('$app/stores', () => stores);

/** A SvelteKit 2 `page` store on this route. */
function pageOn(id: string): Subscribe {
  return (run) => {
    run({ route: { id } });
    return () => undefined;
  };
}

/** SvelteKit 3's `$app/stores` stub, which throws on first use. */
function removedStores(message: string): Subscribe {
  return () => {
    throw new Error(message);
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('injectSpeedInsights() for SvelteKit', () => {
  it('injects the script with the current route', () => {
    stores.page.subscribe = pageOn('/blog/[slug]');

    injectSpeedInsights();

    const script = document.head.querySelector('script');
    expect(script?.dataset.route).toBe('/blog/[slug]');
    expect(script?.dataset.sdkn).toBe('@vercel/speed-insights/sveltekit');
  });

  it.each([
    [
      'development',
      'app_stores_removed\n`$app/stores` has been removed in favour of `$app/state`\nhttps://svelte.dev/e/kit/app_stores_removed',
    ],
    ['production', 'https://svelte.dev/e/kit/app_stores_removed'],
  ])('points to sveltekit-next in a SvelteKit 3 %s build, without throwing', (_, message) => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    stores.page.subscribe = removedStores(message);

    expect(() => injectSpeedInsights()).not.toThrow();

    expect(document.head.querySelector('script')).toBeNull();
    expect(error).toHaveBeenCalledOnce();
    expect(error.mock.calls[0]?.[0]).toContain(
      '@vercel/speed-insights/sveltekit-next',
    );
  });

  it('still throws any other error', () => {
    stores.page.subscribe = removedStores('something else');

    expect(() => injectSpeedInsights()).toThrow('something else');
  });
});
