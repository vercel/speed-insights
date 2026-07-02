import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded
import { browser } from '$app/env';
import { page } from '$app/state';
import { injectSpeedInsights as inject } from '../generic';
import type { BeforeSend, BeforeSendEvent, SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString } from './utils';

/**
 * Injects Vercel Speed Insights in SvelteKit 3 apps.
 */
export function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  let speedInsights: ReturnType<typeof inject> = null;

  if (browser) {
    $effect.root(() => {
      $effect.pre(() => {
        const route = props.route ?? page.route?.id;

        if (!route) {
          return;
        }

        if (!speedInsights) {
          speedInsights = inject(
            {
              ...props,
              route,
              framework: 'sveltekit',
              basePath: getBasePath(),
            },
            getConfigString(),
          );
          return;
        }

        speedInsights.setRoute(route);
      });
    });
  }
}
export type { SpeedInsightsProps, BeforeSend, BeforeSendEvent };
