// tsup.config.js
import { defineConfig } from "tsup";
var cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ["esm", "cjs"]
};
var tsup_config_default = defineConfig([
  // {
  //   ...cfg,
  //   entry: {
  //     index: 'src/generic.ts',
  //   },
  //   outDir: 'dist',
  // },
  {
    ...cfg,
    entry: {
      index: "src/nextjs/index.tsx"
    },
    external: ["react", "next"],
    outDir: "dist/next",
    esbuildOptions: (options) => {
      options.banner = {
        js: '"use client";'
      };
    }
  }
]);
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3RvYmlhc2xpbnMvUmVwb3MvdmVyY2VsL3NwZWVkLWluc2lnaHRzL3BhY2thZ2VzL3dlYi90c3VwLmNvbmZpZy5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvdG9iaWFzbGlucy9SZXBvcy92ZXJjZWwvc3BlZWQtaW5zaWdodHMvcGFja2FnZXMvd2ViXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy90b2JpYXNsaW5zL1JlcG9zL3ZlcmNlbC9zcGVlZC1pbnNpZ2h0cy9wYWNrYWdlcy93ZWIvdHN1cC5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJztcblxuY29uc3QgY2ZnID0ge1xuICBzcGxpdHRpbmc6IGZhbHNlLFxuICBzb3VyY2VtYXA6IHRydWUsXG4gIGNsZWFuOiB0cnVlLFxuICB0cmVlc2hha2U6IGZhbHNlLFxuICBkdHM6IHRydWUsXG4gIGZvcm1hdDogWydlc20nLCAnY2pzJ10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoW1xuICAvLyB7XG4gIC8vICAgLi4uY2ZnLFxuICAvLyAgIGVudHJ5OiB7XG4gIC8vICAgICBpbmRleDogJ3NyYy9nZW5lcmljLnRzJyxcbiAgLy8gICB9LFxuICAvLyAgIG91dERpcjogJ2Rpc3QnLFxuICAvLyB9LFxuICB7XG4gICAgLi4uY2ZnLFxuICAgIGVudHJ5OiB7XG4gICAgICBpbmRleDogJ3NyYy9uZXh0anMvaW5kZXgudHN4JyxcbiAgICB9LFxuICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ25leHQnXSxcbiAgICBvdXREaXI6ICdkaXN0L25leHQnLFxuICAgIGVzYnVpbGRPcHRpb25zOiAob3B0aW9ucykgPT4ge1xuICAgICAgLy8gQXBwZW5kIFwidXNlIGNsaWVudFwiIHRvIHRoZSB0b3Agb2YgdGhlIHJlYWN0IGVudHJ5IHBvaW50XG4gICAgICBvcHRpb25zLmJhbm5lciA9IHtcbiAgICAgICAganM6ICdcInVzZSBjbGllbnRcIjsnLFxuICAgICAgfTtcbiAgICB9LFxuICB9LFxuXSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBRXpWLElBQU0sTUFBTTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLEVBQ0wsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUN2QjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFRMUI7QUFBQSxJQUNFLEdBQUc7QUFBQSxJQUNILE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxVQUFVLENBQUMsU0FBUyxNQUFNO0FBQUEsSUFDMUIsUUFBUTtBQUFBLElBQ1IsZ0JBQWdCLENBQUMsWUFBWTtBQUUzQixjQUFRLFNBQVM7QUFBQSxRQUNmLElBQUk7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
