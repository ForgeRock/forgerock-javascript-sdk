const path = require('path');
const dts = require('rollup-plugin-dts');
const copy = require('rollup-plugin-copy');

const config = [
  // your default rollup config for transpilation and bundling
  // ...
  {
    // path to your declaration files root
    input: path.resolve(__dirname, '../..', 'dist/temp/packages/token-vault/src/index.d.ts'),
    output: [{ file: 'dist/packages/token-vault/index.d.mts', format: 'es' }],
    plugins: [dts.default()],
  },
  {
    // path to your declaration files root
    input: path.resolve(__dirname, '../..', 'dist/temp/packages/token-vault/src/index.d.ts'),
    output: [{ file: 'dist/packages/token-vault/index.d.ts', format: 'cjs' }],
    plugins: [
      dts.default(),
      copy({
        targets: [
          { src: 'packages/token-vault/package.json', dest: 'dist/packages/token-vault' },
          { src: 'packages/token-vault/LICENSE', dest: 'dist/packages/token-vault' },
          { src: 'packages/token-vault/README.md', dest: 'dist/packages/token-vault' },
          { src: 'packages/token-vault/CHANGELOG.md', dest: 'dist/packages/token-vault' },
        ],
      }),
    ],
  },
];
module.exports = config;
