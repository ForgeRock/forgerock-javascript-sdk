import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import * as pkg from './package.json';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/davinci-client',

  plugins: [
    dts({
      rollupTypes: false,
      insertTypesEntry: false,
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  build: {
    outDir: './dist',
    target: ['esnext', 'es2020'],
    rollupOptions: {
      output: {
        // This is the directory your library will be compiled to.
        dir: './dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      external: Array.from(Object.keys(pkg.dependencies) || []).concat([
        './src/lib/mock-data',
        '@reduxjs/toolkit/query',
        '@forgerock/javascript-sdk',
        '@forgerock/javascript-sdk/src/oauth2-client/state-pkce',
        'javascript-sdk',
      ]),
    },
    lib: {
      entry: 'src/index.ts',
      name: 'davinci-client',
      fileName: (format, fileName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${fileName}.${extension}`;
      },
      formats: ['es'],
    },
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },

  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../../coverage/packages/davinci-client', provider: 'v8' },
  },
});
