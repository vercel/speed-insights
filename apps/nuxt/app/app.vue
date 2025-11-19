<script setup lang="ts">
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
