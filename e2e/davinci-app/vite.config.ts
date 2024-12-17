import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: './dist',
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
    port: 5829,
  },
  server: {
    port: 5829,
    headers: {
      'Service-Worker-Allowed': '/',
      'Service-Worker': 'script',
    },
    strictPort: true,
  },
});
