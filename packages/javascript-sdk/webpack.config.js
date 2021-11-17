const { exec } = require('child_process');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const banner = `
@forgerock/javascript-sdk

index.js

Copyright (c) ${new Date().getFullYear()} ForgeRock. All rights reserved.
This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details.
`;

module.exports = (env) => {
  const isDev = env.DEV === 'yes';
  const plugins = [
    new webpack.WatchIgnorePlugin({ paths: [/bundles|docs|lib|lib\-esm|samples/] }),
    new webpack.BannerPlugin({ banner }),
    new CopyPlugin({
      // Copy and rename non-built config files
      patterns: [
        {
          from: '../javascript-sdk-e2e/src/e2e/env.config.ts',
          to: '../../javascript-sdk-e2e/src/e2e/server/env.config.copy.mjs',
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
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const cmds = [
            'copyfiles -u 1 "./bundles/index.js*" ../javascript-sdk-e2e/src/e2e/app/',
            'copyfiles -u 1 "./bundles/index.js*" ../../samples/_static/js/',
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
    devtool: isDev ? 'inline-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src/index.ts'),
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
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    output: {
      filename: 'index.js',
      library: 'forgerock',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, './bundles'),
      umdNamedDefine: true,
    },
    plugins,
    resolve: {
      extensions: ['.js', '.ts'],
    },
    watch: isDev,
  };
};
