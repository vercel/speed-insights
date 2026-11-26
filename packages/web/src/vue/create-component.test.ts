import { afterEach, describe, expect, it, vi } from 'vitest';
import { type App, createApp } from 'vue';
import { createComponent } from './create-component';

vi.mock('vue-router', () => ({ useRoute: () => undefined }));

describe.each(['vue', 'nuxt'])('%s SpeedInsights component', (framework) => {
  let app: App | undefined;

  afterEach(() => {
    app?.unmount();
    vi.unstubAllEnvs();
  });

  function mount(props: { softNavs?: boolean } = {}) {
    app = createApp(createComponent(framework), props);
    app.mount(document.createElement('div'));
    return document.head.querySelector('script');
  }

  it.each([
    { softNavs: true },
    { softNavs: false },
    { softNavs: undefined },
  ])('passes softNavs=$softNavs', ({ softNavs }) => {
    expect(mount({ softNavs })?.getAttribute('data-soft-navs')).toBe(
      softNavs === undefined ? null : String(softNavs),
    );
  });

  it.each([
    { softNavs: true },
    { softNavs: false },
  ])('preserves softNavs=$softNavs from config when omitted', ({
    softNavs,
  }) => {
    vi.stubEnv(
      'VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG',
      JSON.stringify({ speedInsights: { softNavs } }),
    );

    expect(mount()?.getAttribute('data-soft-navs')).toBe(String(softNavs));
  });

  it.each([
    { softNavs: true },
    { softNavs: false },
  ])('prefers explicit softNavs=$softNavs over config', ({ softNavs }) => {
    vi.stubEnv(
      'VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG',
      JSON.stringify({ speedInsights: { softNavs: !softNavs } }),
    );

    expect(mount({ softNavs })?.getAttribute('data-soft-navs')).toBe(
      String(softNavs),
    );
  });
});
