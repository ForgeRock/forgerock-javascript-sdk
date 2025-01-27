import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'fs';
import pkg from './package.json';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/',
  build: {
    outDir: './dist',
    target: ['esnext', 'es2020'],
    lib: {
      entry: 'src/index.ts',
      name: 'javascript-sdk',
      formats: ['es', 'cjs'],
      fileName: (format, fileName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${fileName}.${extension}`;
      },
    },
    rollupOptions: {
      output: {
        dir: './dist',
        preserveModulesRoot: './src',
        preserveModules: true,
      },
      external: Array.from(Object.keys(pkg.dependencies) || []).concat([
        './**/mock-data/*',
        '@reduxjs/toolkit/query',
      ]),
    },
  },
  plugins: [
    dts({
      declarationOnly: false,
      entryRoot: 'src',
      rollupTypes: false,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.lib.json',
      afterBuild: (file) => {
        file.forEach((v, k) => {
          copyFileSync(k, k.replace('.d.ts', '.d.cts'));
        });
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', 'tests/**/*.test.ts'],
    watch: !process.env['CI'],
    reporters: ['default'],
    setupFiles: ['./vitest.setup.ts'],
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
  },
});
