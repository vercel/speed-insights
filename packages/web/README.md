![Speed Insights](https://github.com/vercel/speed-insights/blob/main/.github/banner.png)

<div align="center"><strong>Vercel Speed Insights</strong></div>
<div align="center">Performance insights for your website</div>
<br />
<div align="center">
<a href="https://vercel.com/docs/speed-insights">Website</a>
<span> · </span>
<a href="https://vercel.com/docs/speed-insights/package">Documentation</a>
<span> · </span>
<a href="https://twitter.com/vercel">Twitter</a>
</div>

## Overview

`@vercel/speed-insights` automatically tracks web vitals and other performance metrics for your website.

This package does **not** track data in development mode.

It has 1st class integration with:

| Framework   | Package                                   |
| ----------- | ----------------------------------------- |
| Next.js     | `@vercel/speed-insights/next`             |
| Nuxt        | `@vercel/speed-insights/nuxt`             |
| SvelteKit   | `@vercel/speed-insights/sveltekit`        |
| SvelteKit 3 | `@vercel/speed-insights/sveltekit-next`  |
| Remix       | `@vercel/speed-insights/remix`            |
| React       | `@vercel/speed-insights/react`            |
| Astro       | `@vercel/speed-insights/astro`            |
| Vue         | `@vercel/speed-insights/vue`              |

It also supports other frameworks, vanilla JS and static websites.

## Quickstart

1. Enable Vercel Speed Insights for a project in the [Vercel Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights&title=Open+Web+Analytics).
2. Add the `@vercel/speed-insights` package to your project
3. Inject Speed Insights to your app

   - If you are using **Next.js**, **React**, **Nuxt** or **Vue** you can use the framework-specific `<SpeedInsights />` component to inject the script into your app.
   - If you are using **SvelteKit 2**, you can use the `injectSpeedInsights()` function from `@vercel/speed-insights/sveltekit` in your top-level `+layout.js/ts` file.
   - If you are using **SvelteKit 3**, import `injectSpeedInsights()` from `@vercel/speed-insights/sveltekit-next` instead.
   - For other frameworks, you can use the `inject` function add the tracking script to your app.
   - If you want to use Vercel Speed Insights on a static site without npm, follow the instructions in the [documentation](https://vercel.com/docs/speed-insights/quickstart).

4. Deploy your app to Vercel and see data flowing in.

## Soft navigations

To disable performance reporting for client-side navigations, set `softNavs` to `false` when you initialize Speed Insights. Hard-navigation reporting is not affected.

For React, Next.js, Remix, and Astro components:

```jsx
<SpeedInsights softNavs={false} />
```

For Vue and Nuxt components, bind the boolean value:

```vue
<SpeedInsights :soft-navs="false" />
```

For `injectSpeedInsights`, including the SvelteKit and Nuxt runtime integrations:

```js
injectSpeedInsights({ softNavs: false });
```

## Documentation

Find more details about this package in our [documentation](https://vercel.com/docs/speed-insights/quickstart).
