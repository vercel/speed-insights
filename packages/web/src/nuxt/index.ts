import { useRoute, useNuxtApp } from 'nuxt/app';
import type { SpeedInsightsProps, BeforeSendMiddleware } from '../types';
import { createComponent } from '../vue/create-component';
import { injectSpeedInsights as genericInjectSpeedInsights } from '../generic';
import { isBrowser } from '../utils';
import { getBasePath } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- vue's defineComponent return type is any
export const SpeedInsights = createComponent('nuxt');
export type { SpeedInsightsProps };

// Export the injectSpeedInsights script with automatic tracking on page changes
function injectSpeedInsights(
  props: Omit<SpeedInsightsProps, 'framework'> = {},
): void {
  if (isBrowser()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we are not using a React here
    const nuxtApp = useNuxtApp();
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we are not using a React here
    const route = useRoute();

    const speedInsights = genericInjectSpeedInsights({
      ...props,
      route: route.matched[0]?.path || route.path,
      framework: 'nuxt',
      basePath: getBasePath(),
    });
    // On navigation to a new page
    nuxtApp.hooks.hook('page:finish', () => {
      speedInsights?.setRoute(route.matched[0]?.path || route.path);
    });
  }
}

export { injectSpeedInsights };
