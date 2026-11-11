import { addPlugin, addTemplate, defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import type { SpeedInsightsProps } from '../types';

export interface ModuleOptions
  extends Pick<
    SpeedInsightsProps,
    'dsn' | 'sampleRate' | 'debug' | 'softNavs' | 'scriptSrc' | 'endpoint'
  > {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vercel/speed-insights',
    configKey: 'speedInsights',
    docs: 'https://vercel.com/docs/speed-insights/quickstart',
  },
  setup(options) {
    const template = addTemplate({
      filename: 'vercel-speed-insights.client.ts',
      getContents: () => `
import { injectSpeedInsights } from '@vercel/speed-insights/nuxt/runtime'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  injectSpeedInsights(${JSON.stringify(options)})
})
`,
    });

    addPlugin({
      src: template.dst,
      mode: 'client',
    });
  },
}) as NuxtModule<ModuleOptions>;
