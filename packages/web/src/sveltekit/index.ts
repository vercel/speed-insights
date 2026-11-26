import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded
import { get } from 'svelte/store';
// @ts-expect-error $app/environment has been removed in kit 3
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { injectSpeedInsights as inject } from '../generic';
import type { BeforeSend, BeforeSendEvent, SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString } from './utils';

/**
 * Injects Vercel Speed Insights in SvelteKit 2 apps.
 * In SvelteKit 3, use `@vercel/speed-insights/sveltekit-next` instead:
 * this entry logs an error there and injects nothing.
 */
export function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (browser) {
    let route: string | null | undefined;
    try {
      route = get(page).route?.id;
    } catch (error) {
      // SvelteKit 3 keeps `$app/stores` as a stub that throws on first use.
      // Left alone, the error stops the app from hydrating.
      if (isAppStoresRemoved(error)) {
        console.error(
          '[Vercel Speed Insights] `@vercel/speed-insights/sveltekit` is for SvelteKit 2 and does nothing in SvelteKit 3. Import `injectSpeedInsights` from `@vercel/speed-insights/sveltekit-next` instead.',
        );
        return;
      }
      throw error;
    }

    const speedInsights = inject(
      {
        route,
        ...props,
        framework: 'sveltekit',
        basePath: getBasePath(),
      },
      getConfigString(),
    );

    if (speedInsights) {
      page.subscribe(({ route }) => {
        if (route?.id) {
          speedInsights.setRoute(route.id);
        }
      });
    }
  }
}

function isAppStoresRemoved(error: unknown): boolean {
  // The message is `app_stores_removed` plus text in development, and
  // https://svelte.dev/e/kit/app_stores_removed in production.
  return error instanceof Error && error.message.includes('app_stores_removed');
}

export type { SpeedInsightsProps, BeforeSend, BeforeSendEvent };
