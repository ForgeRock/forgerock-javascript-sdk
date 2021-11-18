// Rollup plugins
const path = require('path');
const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const { visualizer } = require('rollup-plugin-visualizer');
const copy = require('rollup-plugin-copy');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  console.log(__dirname);
  return {
    ...nxConfig,
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
    ],
  };
};
