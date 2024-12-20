/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/token-vault',

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'token-vault',
      formats: ['es'],
      fileName(format, name) {
        return `${name}.js`;
      },
    },
    rollupOptions: {
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
      entryRoot: 'src',
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    pool: 'forks',
    reporters: ['default'],
    watch: !process.env['CI'],
    coverage: {
      enabled: Boolean(process.env['CI']),
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      provider: 'v8',
    },
  },
});
