/// <reference types="vitest" />
import { defineConfig } from 'vite';
import * as path from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { joinPathFragments } from '@nx/devkit';

const resolveAlias = (alias: string) => `${path.resolve(__dirname, '../../', alias)}`;
const config = defineConfig({
  cacheDir: '../../node_modules/.vite/token-vault',
  resolve: {
    /**
     * This is a temporary work around
     * we can probably abstract this logic into our own plugin that works
     * i couldnt get the vite plugin working with the tsconfig paths
     */
    alias: {
      '@forgerock/javascript-sdk': resolveAlias('packages/javascript-sdk/src/index.ts'),
      '@forgerock/token-vault': resolveAlias('packages/token-vault/src/index.ts'),
      '@plugins/wait-for-api': resolveAlias('plugins/wait-for-api/src/index.ts'),
      '@shared/network': resolveAlias('shared/network/src/index.ts'),
      '@shared/types': resolveAlias('shared/types/src/index.ts'),
      '@shared/workers': resolveAlias('shared/workers/src/index.ts'),
    },
  },
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: joinPathFragments(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'token-vault',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
export default config;
