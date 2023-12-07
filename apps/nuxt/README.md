# Nuxt 3 Demo application for Vercel Speed-insights

## Setup

This application was created with the following commands:

- `cd apps`
- `npx nuxi@latest init nuxt` (answers: npm, no git)
- `cd nuxt`
- `rm -rf node_modules .nuxt`
- manually edit package.json to add `"@vercel/speed-insights": "workspace:*"` dependency
- `pnpm i`

Then we moved some code from vue's official template (styles, HelloWorld SFC) and added a few dynamic route to illustrate the use.
We also imported and used `<SpeedInsights />` component in `layouts/default.vue` file:

```vue
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

## Usage

Start it with `cd apps/nuxt` + `pnpm dev` and browse to [http://localhost:3000](http://localhost:3000)
