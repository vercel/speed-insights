import { afterEach, describe, expect, it, vi } from 'vitest';

const { addTemplate, addPlugin } = vi.hoisted(() => ({
  addTemplate: vi.fn(),
  addPlugin: vi.fn(),
}));

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: (definition: { setup: unknown }) => definition,
  addTemplate,
  addPlugin,
}));

import module from './module';

const nuxt = {} as never;

afterEach(() => {
  addTemplate.mockReset();
  addPlugin.mockReset();
});

describe('nuxt module', () => {
  it.each([
    [{}, '{}'],
    [{ sampleRate: 0.25 }, '{"sampleRate":0.25}'],
    [{ debug: false, softNavs: false }, '{"debug":false,"softNavs":false}'],
  ] as const)('passes %j options to the plugin', (options, serialized) => {
    const dst = '/tmp/vercel-speed-insights.client.ts';
    addTemplate.mockReturnValue({ dst });

    // @ts-expect-error - setup is exposed by the mocked defineNuxtModule
    module.setup(options, nuxt);

    const template = addTemplate.mock.calls[0]?.[0] as {
      filename: string;
      getContents: () => string;
    };
    expect(template.filename).toBe('vercel-speed-insights.client.ts');
    expect(template.getContents()).toContain(
      `injectSpeedInsights(${serialized})`,
    );

    expect(addPlugin).toHaveBeenCalledWith({ src: dst, mode: 'client' });
  });
});
