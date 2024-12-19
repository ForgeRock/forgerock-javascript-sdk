/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/ping-protect',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ping-protect',
      formats: ['es'],
      fileName: (extension, filename) => `${filename}.js`,
    },
    rollupOptions: {
      external: ['@forgerock/javascript-sdk'],
      output: {
        dir: './dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    dts({
      declarationOnly: false,
      rollupTypes: true,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  test: {
    reporters: ['default'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    watch: !process.env['CI'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      enabled: Boolean(process.env['CI']),
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
