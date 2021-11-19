// Rollup plugins
const path = require('path');
const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const pkg = require('./package.json');
const { visualizer } = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  return {
    ...nxConfig,
    output: [
      {
        format: 'umd',
        name: 'javascript-sdk.umd',
        dir: 'packages/javascript-sdk/bundles/umd',
      },
      {
        format: 'es', // the preferred format
        dir: 'packages/javascript-sdk/bundles/esm',
      },
      {
        format: 'cjs',
        dir: 'packages/javascript-sdk/bundles/cjs',
      },
    ],
    plugins: [
      ...nxConfig.plugins,
      copy({
        verbose: true,
        targets: [
          {
            src: path.resolve(__dirname, '../javascript-sdk-e2e/src/e2e/env.config.ts'),
            dest: path.resolve(__dirname, '../javascript-sdk-e2e/src/e2e/server/'),
            rename: 'env.config.copy.mjs',
          },
        ],
      }),
      process.env.NODE_ENV === 'analyze' && visualizer({ open: true }),
      process.env.NODE_ENV === 'production' && terser(),
    ],
  };
};
