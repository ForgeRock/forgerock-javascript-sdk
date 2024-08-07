/// <reference types='vitest' />
import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';
import { copyFileSync } from 'node:fs';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/token-vault',
  build: {
    outDir: './dist',
    lib: {
      entry: 'src/index.ts',
      name: 'token-vault',
      formats: ['es', 'cjs'],
      fileName(format, name) {
        return `${name}.${format === 'cjs' ? 'cjs' : 'js'}`;
      },
    },
    rollupOptions: {
      output: {
        dir: './dist',
        preserveModules: true,
      },
    },
  },
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      rollupTypes: false,
      include: './src/**/*.ts',
      exclude: './src/**/*.test.ts',
      entryRoot: 'src',
      afterBuild: (files) => {
        return files.forEach((value, key) => copyFileSync(key, key.replace('.ts', '.cts')));
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    pool: 'forks',
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/token-vault',
      provider: 'v8',
    },
  },
});
