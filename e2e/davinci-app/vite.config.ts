import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/e2e/davinci-app',
    reportCompressedSize: true,
    target: 'esnext',
    minify: false,
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
