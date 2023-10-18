<script lang="ts">
  import { page } from '$app/stores';
  import { inject } from '@vercel/speed-insights';

  const speedInsights = inject({ route: $page.route.id });

  $: {
    if (speedInsights && $page.route.id) {
      speedInsights.setRoute($page.route.id);
    }
  }
</script>
