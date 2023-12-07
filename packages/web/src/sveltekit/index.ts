import { get } from 'svelte/store';
import {
  injectSpeedInsights as genericInject,
  type SpeedInsightsProps,
} from '../generic';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded

export function injectSpeedInsights(props?: SpeedInsightsProps): void {
  if (browser) {
    const speedInsights = genericInject({
      route: get(page).route.id,
      ...props,
      framework: 'sveltekit',
    });

    if (speedInsights) {
      page.subscribe((value) => {
        if (value.route.id) {
          speedInsights.setRoute(value.route.id);
        }
      });
    }
  }
}
