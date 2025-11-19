import { defineNuxtModule, addPlugin, addTemplate } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';

// eslint-disable-next-line import/no-default-export -- default export is required for nuxt module
export default defineNuxtModule({
  meta: {
    name: '@vercel/speed-insights',
    configKey: 'speed-insights',
    docs: 'https://vercel.com/docs/speed-insights/quickstart',
  },
  setup() {
    const template = addTemplate({
      filename: 'vercel-speed-insights.client.ts',
      getContents: () => `
import { injectSpeedInsights } from '@vercel/speed-insights/nuxt'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  injectSpeedInsights()
})
`,
    });

    addPlugin({
      src: template.dst,
      mode: 'client',
    });
  },
}) as NuxtModule;
