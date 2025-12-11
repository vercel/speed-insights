<script setup lang="ts">
/**
 * Uncomment only when disabling the module in nuxt.config.ts
 * As well as using the deprected <SpeedInsights> component
 * We recommend using the module or the injectSpeedInsights function in a Nuxt plugin
 */
// import { SpeedInsights, type BeforeSendMiddleware } from '@vercel/speed-insights/nuxt';

// const beforeSend = (event: BeforeSendMiddleware) => {
//   console.log('Sending event:', event);
//   return event;
// };
</script>

<template>
  <!-- <SpeedInsights :before-send="beforeSend" /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
