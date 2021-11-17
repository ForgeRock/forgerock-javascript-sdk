// Rollup plugins
const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);

  const conf = {
    input: nxConfig.input,
    plugins: nxConfig.plugins,
    output: [
      nxConfig.output,
      {
        /**
         * This is the build for the samples/_static/js dir
         * it' s a umd build that gets moved into that directory
         */
        format: 'umd',
        dir: 'packages/javascript-sdk/bundles',
        name: 'forgerock',
      },
      {
        /**
         * This is the build for the samples/_static/js dir
         * it' s a umd build that gets moved into that directory
         */
        format: 'umd',
        dir: 'samples/_static/js',
        name: 'forgerock',
      },
    ],
  };

  return conf;
};
