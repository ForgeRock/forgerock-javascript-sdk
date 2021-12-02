// Rollup plugins
const path = require('path');
const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const { visualizer } = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  return {
    ...nxConfig,
    output: [
      {
        format: 'es', // ESM Module Format
        dir: 'packages/javascript-sdk/lib-esm',
        preserveModules: true,
      },
      {
        format: 'cjs', // Allow for CJS
        dir: 'packages/javascript-sdk/lib',
        preserveModules: true,
      },
    ],
    plugins: [
      ...nxConfig.plugins,
      copy({
        verbose: true,
        targets: [
          {
            src: path.resolve(__dirname, '../javascript-sdk-app-e2e/src/env.config.ts'),
            dest: path.resolve(__dirname, '../javascript-sdk-app-e2e/src/server/'),
            rename: 'env.config.copy.mjs',
          },
        ],
      }),
      process.env.NODE_ENV === 'analyze' && visualizer({ open: true }),
      (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'analyze') && terser(),
    ],
  };
};
