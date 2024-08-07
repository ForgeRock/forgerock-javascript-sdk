/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  cacheDir: '../../node_modules/.vite/ping-protect',

  build: {
    outDir: './dist',
    lib: {
      entry: 'src/index.ts',
      name: 'ping-protect',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    dts({
      outDir: './dist',
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.lib.json',
      rollupTypes: true,
      include: './src/**/*.ts',
      exclude: './src/**/*.test.ts',
    }),
  ],
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
