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
    { caseName: 'empty options', options: {}, serialized: '{}' },
    {
      caseName: 'sampleRate',
      options: { sampleRate: 0.25 },
      serialized: '{"sampleRate":0.25}',
    },
    {
      caseName: 'softNavs=true',
      options: { softNavs: true },
      serialized: '{"softNavs":true}',
    },
    {
      caseName: 'softNavs=false',
      options: { softNavs: false },
      serialized: '{"softNavs":false}',
    },
    {
      caseName: 'softNavs=undefined',
      options: { softNavs: undefined },
      serialized: '{}',
    },
    {
      caseName: 'debug and softNavs',
      options: { debug: false, softNavs: false },
      serialized: '{"debug":false,"softNavs":false}',
    },
  ])('forwards $caseName to the plugin', ({ options, serialized }) => {
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
