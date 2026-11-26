/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export -- vitest needs a default export.
export default defineConfig({
  plugins: [
    {
      // SvelteKit's Vite plugin provides `$app/*` in apps. Tests get empty
      // modules instead, and mock what they need with `vi.mock()`.
      name: 'sveltekit-app-modules',
      resolveId: (id) => (id.startsWith('$app/') ? `\0${id}` : undefined),
      load: (id) => (id.startsWith('\0$app/') ? 'export {};' : undefined),
    },
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
  },
});
