const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const preprocess = require('svelte-preprocess');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  features: {
    interactionsDebugger: true,
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-svelte-csf',
    '@washingtonpost/storybook-addon-web-vitals',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: import('postcss').default,
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: preprocess(),
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: '../../tsconfig.base.json',
        extensions: config.resolve.extensions,
      }),
    ];
    config.module.rules.push({
      test: [/\.stories\.ts$/, /index\.ts$/, /\.stories\.svelte$/],
      use: [import('@storybook/source-loader')],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre',
    });
    config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];

    // config.resolve.alias = {
    // ...config.resolve.alias,
    // $lib: path.resolve(__dirname, '../src/lib'),
    // $components: path.resolve(__dirname, '../src/lib/components'),
    // };
    return config;
  },
};
