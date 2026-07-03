import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      vitePlugin: {
        experimental: {
          // TODO: remove once @sveltejs/vite-plugin-svelte includes sveltejs/vite-plugin-svelte#1293.
          compileModule: {
            extensions: ['.ts', '.js', '.mjs'],
          },
        },
      },
    }),
  ],
});
