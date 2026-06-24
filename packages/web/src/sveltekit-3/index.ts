import type {} from '@sveltejs/kit'; // don't remove, ensures ambient types for $app/* are loaded
import { browser } from '$app/env';
import { page } from '$app/state';
import { injectSpeedInsights as inject } from '../generic';
import type { BeforeSend, BeforeSendEvent, SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString } from './utils';

export function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  let speedInsights: ReturnType<typeof inject>;

  if (browser) {
    speedInsights = inject(
      {
        route: page.route?.id,
        ...props,
        framework: 'sveltekit',
        basePath: getBasePath(),
      },
      getConfigString(),
    );
  }

  $effect.pre(() => {
    speedInsights?.setRoute(page.route.id);
  });
}
export type { SpeedInsightsProps, BeforeSend, BeforeSendEvent };
