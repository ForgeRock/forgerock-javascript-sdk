/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/token-vault-interceptor',

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    lib: {
      entry: 'src/interceptor.ts',
      name: 'tokenvaultinterceptor',
      fileName: 'index',
      formats: ['iife'],
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
    watch: false,
    globals: true,
    environment: 'node',
    passWithNoTests: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default', 'json', 'html'],
    coverage: {
      reportsDirectory: './coverage',
      provider: 'v8',
    },
  },
});
