import { get } from 'svelte/store';
import { inject as genericInject } from '../generic';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import type {} from '@sveltejs/kit';

type Params = Parameters<typeof genericInject>[0];

export function injectSpeedInsights(props?: Params): void {
  if (browser) {
    const speedInsights = genericInject({
      route: get(page).route.id,
      ...props,
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
