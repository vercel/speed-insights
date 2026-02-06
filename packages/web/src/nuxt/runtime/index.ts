import { useRoute, useRouter } from 'nuxt/app';
import {
  type BeforeSendMiddleware,
  injectSpeedInsights as inject,
} from '../../generic';
import type { SpeedInsightsProps } from '../../types';
import { computeRoute, isBrowser } from '../../utils';
import { createComponent } from '../../vue/create-component';
import { getBasePath, getConfigString } from './utils';

export const SpeedInsights = createComponent('nuxt');
export type { SpeedInsightsProps, BeforeSendMiddleware };

// Export the injectSpeedInsights script with automatic tracking on page changes
function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (isBrowser()) {
    const router = useRouter();
    const route = useRoute();

    const speedInsights = inject(
      {
        ...props,
        route: computeRoute(route.path, route.params),
        framework: 'nuxt',
        basePath: getBasePath(),
      },
      getConfigString(),
    );
    // On navigation to a new page
    router.afterEach((to) => {
      speedInsights?.setRoute(computeRoute(to.path, to.params));
    });
  }
}

export { injectSpeedInsights };
