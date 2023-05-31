/// <reference types="vitest" />
import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import { rollup, InputOptions, OutputOptions } from 'rollup';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/token-vault-app',

  server: {
    port: 4200,
    host: '0.0.0.0',
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    {
      name: 'configure-service-worker-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Service-Worker-Allowed', '/');
          res.setHeader('Service-Worker', 'script');
          next();
        });
      },
    },
  ],

  worker: {
    plugins: [
      viteTsConfigPaths({
        root: '../../',
      }),
    ],
    format: 'es',
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
