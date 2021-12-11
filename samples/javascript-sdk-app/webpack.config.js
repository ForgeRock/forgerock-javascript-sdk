const { exec } = require('child_process');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const banner = `
@forgerock/javascript-sdk

index.js

Copyright (c) ${new Date().getFullYear()} ForgeRock. All rights reserved.
This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details.
`;

const pages = [
  'authn-basic',
  'authn-central-login',
  'authn-device-profile',
  'authn-email-suspend',
  'authn-no-session',
  'authn-oauth',
  'authn-platform',
  'authn-second-factor',
  'authn-social-login-am',
  'authn-social-login-idm',
  'authn-webauthn',
  'authz-tree-basic',
  'authz-txn-basic',
  'authz-txn-oauth',
  'config-custom-paths',
  'config-request-middleware',
  'config-token-storage',
  'misc-callbacks',
  'register-basic',
];
module.exports = (config) => {
  const plugins = [
    ...config.plugins,
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/index.html`,
      filename: `index.html`,
      chunks: ['index', 'polyfill'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/_callback/index.html`,
      filename: `_callback/index.html`,
      chunks: ['index,', 'polyfill'],
    }),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}/index.html`,
          filename: `${page}/index.html`,
          chunks: ['index,', 'polyfill'],
        }),
    ),
    new webpack.WatchIgnorePlugin({ paths: [/bundles|docs|lib|lib-esm|samples/] }),
    new webpack.BannerPlugin({ banner }),
    {
      apply: (compiler) => {
        // Copy built files
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          const cmds = [
            'npx copyfiles -u 1 "bundles/index.js*" ../../e2e/javascript-sdk-app/src/',
            'npx copyfiles -u 1 "bundles/index.js*" /_static/js/',
          ];
          for (const cmd of cmds) {
            exec(cmd, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }

              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
          }
        });
      },
    },
  ];
  return {
    ...config,
    entry: {
      ...pages.reduce((config, page) => {
        config[page] = {
          import: `./src/${page}/autoscript.ts`,
          filename: `./${page}/autoscript.js`,
        };
        return config;
      }, {}),
      index: {
        import: './src/index.ts',
        filename: `./index.js`,
      },
      polyfill: {
        import: './src/_polyfills/fast-text-encoder.js',
        filename: './_pollyfills/fast-text-encoder.js',
      },
    },
    output: {
      library: 'forgerock',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, './bundles'),
      publicPath: 'https://sdkapp.example.com:8443/',
      umdNamedDefine: true,
    },
    devServer: {
      ...config.devServer,
      host: 'sdkapp.example.com',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Headers': 'x-authorize-middleware',
      },
      server: 'https',
      compress: true,
      client: {
        logging: 'none',
        overlay: false,
      },
      port: 8443,
    },
    plugins,
    watch: config.watch,
    mode: config.watch ? 'development' : 'production',
  };
};
