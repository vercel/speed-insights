# SvelteKit 3 Demo application for Vercel Speed Insights

## Setup

This application was created with the following commands:

- `cd apps`
- `pnpm create svelte@latest sveltekit` (answers: Skeleton project, JavaScript with JSDoc, no additional option)
- `cd sveltekit`
- add `src/+layout.js` to include `import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit-next'; injectSpeedInsights();`
- edit package.json to add `"@vercel/speed-insights": "workspace:*"` dependency and change `@sveltejs/adapter-auto` into `@sveltejs/adapter-vercel`
- `pnpm i`

## Usage

Start it with `pnpm -F sveltekit dev` and browse to [http://localhost:5173](http://localhost:5173)
