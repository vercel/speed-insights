import { get } from 'svelte/store';
import {
  injectSpeedInsights as genericInject,
  type SpeedInsightsProps,
} from '../generic';
import { getBasePath } from './utils';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded

export function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (browser) {
    const speedInsights = genericInject({
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- route could be undefined in layout.js file
      route: get(page).route?.id,
      ...props,
      framework: 'sveltekit',
      basePath: getBasePath(),
    });

    if (speedInsights) {
      page.subscribe((value) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- route could be undefined in layout.js file
        if (value.route?.id) {
          speedInsights.setRoute(value.route.id);
        }
      });
    }
  }
}
