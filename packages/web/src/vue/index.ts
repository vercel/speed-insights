import { defineComponent, watch } from 'vue';
// for barebone vue project, vite will issue a warning since 'vue-router' import can't be resolved,
import { useRoute } from 'vue-router';
import { injectSpeedInsights, type SpeedInsightsProps } from '../generic';
import { computeRoute } from '../utils';

export const SpeedInsights = defineComponent({
  props: [
    'token',
    'sampleRate',
    'beforeSend',
    'debug',
    'scriptSrc',
    'endpoint',
  ],
  setup(props: Omit<SpeedInsightsProps, 'framework'>) {
    const route = useRoute();
    const configure = injectSpeedInsights({ ...props, framework: 'vue' });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- route is undefined for barebone vue project
    if (route && configure) {
      const changeRoute = (): void => {
        configure.setRoute(computeRoute(route.path, route.params));
      };

      changeRoute();
      watch(route, changeRoute);
    }
  },
  // Vue component must have a render function, or a template.
  render() {
    return null;
  },
});
