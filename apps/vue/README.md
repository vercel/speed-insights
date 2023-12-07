# Vue 3 barebone demo application for Vercel Speed-insights

## Setup

This application was created with the following commands:

- `cd apps`
- `npm create vue@latest vue` (answer no to all questions)
- `cd vue`
- manually edit package.json to add `"@vercel/speed-insights": "workspace:*"` dependency
- `pnpm i`

Then we imported and used `<SpeedInsights />` component in `src/App.vue` file:

```vue
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

## Usage

Start it with `cd apps/vue` + `pnpm dev` and browse to [http://localhost:5173](http://localhost:5173)
