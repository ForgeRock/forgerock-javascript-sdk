/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/mock-api-v2',

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    watch: !process.env['CI'],
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/e2e/mock-api-v2',
      provider: 'v8',
    },
  },
});
