import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/token-vault-app',
  build: {
    outDir: './dist',
    reportCompressedSize: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
  preview: {
    port: 5823,
  },
  server: {
    port: 5823,
    headers: {
      'Service-Worker-Allowed': '/',
      'Service-Worker': 'script',
    },
    strictPort: true,
  },
});
