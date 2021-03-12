const { exec } = require('child_process');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const cmds = [
            'cpy ./tests/e2e/env.config.ts ./tests/e2e/server --rename=env.config.copy.mjs',
            'copyfiles -u 1 "./bundles/index.js*" ./tests/e2e/app/',
            'copyfiles -u 1 "./bundles/index.js*" ./samples/_static/js/',
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
    entry: './src/index.ts',
    mode: isDev ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
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
      path: path.resolve('./bundles'),
      umdNamedDefine: true,
    },
    plugins,
    resolve: {
      extensions: ['.js', '.ts'],
      plugins: [new TsConfigPathsPlugin()],
    },
    watch: isDev,
  };
};
