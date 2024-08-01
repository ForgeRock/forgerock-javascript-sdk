/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/ping-protect',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
  build: {
    outDir: '../../dist',
    lib: {
      name: 'ping-protect',
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => `src/index.js`,
    },
    rollupOptions: {
      output: {
        dir: '../../dist/packages/ping-protect',
        preserveModules: true,
        preserveModulesRoot: './src',
      },
    },
  },
  test: {
    reporters: ['default'],
    globals: true,
    watch: false,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/packages/ping-protect',
    },
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
