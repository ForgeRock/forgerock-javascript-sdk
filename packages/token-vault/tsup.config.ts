import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['packages/token-vault/src/index.ts'],
  splitting: false,
  sourcemap: true,
  dts: false,
  clean: false,
  format: ['cjs', 'esm'],
  outDir: 'dist/packages/token-vault',
});
