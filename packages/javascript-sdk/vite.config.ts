/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { copyFileSync } from 'fs';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/javascript-sdk',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'javascript-sdk',
      formats: ['es', 'cjs'],
      fileName(format, name) {
        return `${name}.${format === 'cjs' ? 'js' : 'mjs'}`;
      },
    },
    rollupOptions: {
      output: {
        dir: 'dist/packages/javascript-sdk',
        preserveModules: true,
        preserveModulesRoot: 'packages/javascript-sdk',
      },
    },
  },
  plugins: [
    dts({
      copyDtsFiles: true,
      outDir: '../../dist',
      rollupTypes: false,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.lib.json',
      afterBuild: (files) => {
        return files.forEach((value, key) => copyFileSync(key, key.replace('.ts', '.mts')));
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/packages/javascript-sdk',
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
