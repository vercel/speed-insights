import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url));

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
    }),
  ],
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
});
