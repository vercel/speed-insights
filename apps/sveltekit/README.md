# Sveltekit Demo application for Vercel Speed-insights

## Setup

This application was created with the following commands:

- `cd apps`
- `pnpm create svelte@latest sveltekit` (answers: Skeleton project, JavaScript with JSDoc, no additional option)
- `cd sveltekit`
- add `src/+layout.js` to include `import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'; injectSpeedInsights();`
- edit package.json to add `"@vercel/speed-insights": "workspace:*"` dependency and change `@sveltejs/adapter-auto` into `@sveltejs/adapter-vercel`
- eddi `svelte.config.js` to change `@sveltejs/adapter-auto` into `@sveltejs/adapter-vercel`
- `pnpm i`

## Usage

Start it with `cd apps/sveltekit` + `pnpm dev` and browse to [http://localhost:5173](http://localhost:5173)
