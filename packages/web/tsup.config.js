import { defineConfig } from 'tsup';

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'],
};

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'src/generic.ts',
    },
    outDir: 'dist',
  },
  {
    ...cfg,
    entry: {
      index: 'src/nextjs/index.tsx',
    },
    external: ['react', 'next'],
    outDir: 'dist/next',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    ...cfg,
    entry: {
      index: 'src/remix/index.tsx',
    },
    external: ['react', '@remix-run/react'],
    outDir: 'dist/remix',
  },
]);
