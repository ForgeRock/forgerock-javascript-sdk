import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    passWithNoTests: true,
    watch: !process.env['CI'],
    coverage: {
      enabled: Boolean(process.env['CI']),
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      provider: 'v8',
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
