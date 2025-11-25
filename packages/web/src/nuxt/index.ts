import { useRoute, useRouter } from 'nuxt/app';
import type { SpeedInsightsProps } from '../types';
import { createComponent } from '../vue/create-component';
import {
  injectSpeedInsights as genericInjectSpeedInsights,
  type BeforeSendMiddleware,
} from '../generic';
import { isBrowser, computeRoute } from '../utils';
import { getBasePath } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- vue's defineComponent return type is any
export const SpeedInsights = createComponent('nuxt');
export type { SpeedInsightsProps, BeforeSendMiddleware };

// Export the injectSpeedInsights script with automatic tracking on page changes
function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (isBrowser()) {
    const router = useRouter();
    const route = useRoute();

    const speedInsights = genericInjectSpeedInsights({
      ...props,
      route: computeRoute(route.path, route.params),
      framework: 'nuxt',
      basePath: getBasePath(),
    });
    // On navigation to a new page
    router.afterEach((to) => {
      speedInsights?.setRoute(computeRoute(to.path, to.params));
    });
  }
}

export { injectSpeedInsights };
