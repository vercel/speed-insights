<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ route.params.slug }}!</h1>
  </div>
</template>
