const { exec } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env) => {
  const isDev = env.DEV === 'yes';

  const plugins = [
    new webpack.WatchIgnorePlugin([/bundles|docs|lib|lib\-esm|samples/]),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const cmds = [
            'cpy ./bundles/index.js ./tests/e2e/test-site',
            'copyup ./bundles/index.js* ./samples/js/',
            'copyup ./src/**/*.{html,scss} lib',
            'copyup ./src/**/*.{html,scss} lib-esm',
          ];
          for (var cmd of cmds) {
            exec(cmd, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }

              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
            console.log('Copied compiled SDK.');
          }
        });
      }
    }
  ];

  return {
    devtool: isDev ? 'eval-source-map' : 'source-map',
    entry: './src/index.ts',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
          query: {
            declaration: false
          }
        },
      ],
    },
    optimization: {
      minimize: !isDev,
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
}
