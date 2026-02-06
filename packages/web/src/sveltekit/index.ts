import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { injectSpeedInsights as inject } from '../generic';
import type { BeforeSend, BeforeSendEvent, SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString } from './utils';

export function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (browser) {
    const speedInsights = inject(
      {
        route: get(page).route?.id,
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
export type { SpeedInsightsProps, BeforeSend, BeforeSendEvent };
