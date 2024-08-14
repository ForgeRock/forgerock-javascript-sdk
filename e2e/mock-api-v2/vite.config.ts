/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/mock-api-v2',
  plugins: [nodePolyfills({ protocolImports: true })],
  build: {
    target: 'node12',
    lib: {
      entry: './src/main.ts',
      formats: ['es'],
    },
  },
  ssr: {
    noExternal: true,
    target: 'node',
  },
  resolve: {
    // Change default resolution to node rather than browser
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    conditions: ['node'],
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    watch: false,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/e2e/mock-api-v2',
      provider: 'v8',
    },
  },
});
