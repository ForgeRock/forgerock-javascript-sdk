/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import * as path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/davinci-client',

  plugins: [
    dts({
      rollupTypes: true,
      insertTypesEntry: false,
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    externalizeDeps(),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'davinci-client',
      fileName: (ext, name) => `${name}.js`,
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      external: ['./src/lib/mock-data'],
      output: {
        // This is the directory your library will be compiled to.
        dir: './dist',
        preserveModules: true,
      },
      // External packages that should not be bundled into your library.
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/davinci-client',
      provider: 'v8',
    },
  },
});
