// build.js
const esbuild = require('esbuild');
const process = require('process');
const fs = require('fs');
const path = require('path');

const { env } = process;

const production = Boolean(env?.PROD) ?? false;
const watch = Boolean(env?.WATCH) ?? false;

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    target: 'node20', // or your preferred Node.js version
    assetNames: 'assets',
    format: 'esm',
    outfile: 'dist/main.js',
    sourcemap: true,
    watch,
    minify: production, // Set to true for production
  })
  .then(() => {
    // Copy CSS file to dist directory
    fs.copyFileSync(
      path.join(__dirname, 'src', 'index.css'),
      path.join(__dirname, 'dist', 'index.css'),
    );
    console.log('CSS file copied to dist directory');

    console.log('Build completed successfully!');
  })
  .catch(() => process.exit(1));
