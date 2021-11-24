const { exec } = require('child_process');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const banner = `
@forgerock/javascript-sdk

index.js

Copyright (c) ${new Date().getFullYear()} ForgeRock. All rights reserved.
This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details.
`;

module.exports = (config, context) => {
  const isDev = context.configuration === 'development';
  const plugins = [
    ...config.plugins,
    new webpack.WatchIgnorePlugin({ paths: [/bundles|docs|lib|lib-esm|samples/] }),
    new webpack.BannerPlugin({ banner }),
    new CopyPlugin({
      // Copy and rename non-built config files
      patterns: [
        {
          from: path.resolve(__dirname, '../javascript-sdk-app-e2e/src/env.config.ts'),
          to: path.resolve(__dirname, '../javascript-sdk-app-e2e/src/server/env.config.copy.mjs'),
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
            'npx copyfiles -u 1 "../javascript-sdk/bundles/index.js*" ../javascript-sdk-app/src/app/',
            'npx copyfiles -u 1 "../javascript-sdk/bundles/index.js*" ../../samples/_static/js/',
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
    devtool: isDev ? 'inline-source-map' : 'source-map',
    mode: isDev ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.lib.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins,
    watch: isDev,
  };
};
