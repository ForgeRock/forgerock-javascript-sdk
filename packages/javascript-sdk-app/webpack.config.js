const { exec } = require('child_process');
const { readFileSync } = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const cert = readFileSync(path.resolve(__dirname, '../../node_modules/lws/ssl/lws-cert.pem'));
const key = readFileSync(path.resolve(__dirname, '../../node_modules/lws/ssl/private-key.pem'));

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
      chunks: ['index', 'polyfill'],
    }),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}/index.html`,
          filename: `${page}/index.html`,
          chunks: ['index', 'polyfill'],
        }),
    ),
    new webpack.WatchIgnorePlugin({ paths: [/bundles|docs|lib|lib-esm|samples/] }),
    new webpack.BannerPlugin({ banner }),
    new CopyPlugin({
      // Copy and rename non-built config files
      patterns: [
        {
          from: '../javascript-sdk-app-e2e/src/env.config.ts',
          to: '../../javascript-sdk-app-e2e/src/server/env.config.copy.mjs',
          force: true,
          toType: 'file',
          // minimized with value true doesn't minimize; yup, you read that right
          info: { minimized: true },
        },
      ],
    }),
    {
      apply: (compiler) => {
        // Copy built files
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          const cmds = [
            'npx copyfiles -u 1 "bundles/index.js*" ../../javascript-sdk-app-e2e/src/',
            'npx copyfiles -u 1 "bundles/index.js*" ../../../samples/_static/js/',
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
      umdNamedDefine: true,
    },
    devServer: {
      ...(config.devServer || {}),
      server: {
        type: 'https',
        options: {
          key, //: path.resolve(__dirname, '../../node_modules/lws/example.com+5-key.pem'),
          cert, //: path.resolve(__dirname, '../../example.com+5.pem'),
        },
      },
      port: 4200,
      allowedHosts: ['.example.com', 'user.example.com'],
    },
    plugins,
    watch: config.watch,
    mode: config.watch ? 'development' : 'production',
  };
};
