/// <reference types="vitest" />
import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  cacheDir: '../../node_modules/.vite/ping-protect',

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ping-protect',
      formats: ['es', 'cjs'],
      fileName(format, name) {
        return `${name}.${format === 'cjs' ? 'cjs' : 'js'}`;
      },
    },
    rollupOptions: {
      output: {
        dir: 'dist',
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
