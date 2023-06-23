const path = require('path');
const dts = require('rollup-plugin-dts');
const copy = require('rollup-plugin-copy');

const config = [
  // your default rollup config for transpilation and bundling
  // ...
  {
    // path to your declaration files root
    input: path.resolve(__dirname, '../..', 'dist/temp/packages/token-vault/src/index.d.ts'),
    output: [{ file: 'dist/packages/token-vault/index.d.ts', format: 'es' }],
    plugins: [
      dts.default(),
      copy({
        targets: [
          { src: 'packages/token-vault/package.json', dest: 'dist/packages/token-vault' },
          {
            src: 'dist/packages/token-vault/index.d.ts',
            dest: 'dist/packages/token-vault/',
            rename: 'index.d.mts',
          },
        ],
      }),
    ],
  },
];
module.exports = config;
