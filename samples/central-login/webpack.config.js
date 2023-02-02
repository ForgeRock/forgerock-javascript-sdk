const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (config) => {
  const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT;
  const SCOPE = process.env.SCOPE;
  const AM_URL = process.env.AM_URL;
  const TIMEOUT = process.env.TIMEOUT;
  const REALM_PATH = process.env.REALM_PATH;

  config.plugins.push(
    new webpack.DefinePlugin({
      // Inject all the environment variables into the Webpack build
      'process.env.WEB_OAUTH_CLIENT': JSON.stringify(WEB_OAUTH_CLIENT),
      'process.env.SCOPE': JSON.stringify(SCOPE),
      'process.env.AM_URL': JSON.stringify(AM_URL),
      'process.env.TIMEOUT': JSON.stringify(TIMEOUT),
      'process.env.REALM_PATH': JSON.stringify(REALM_PATH),
    }),
  );
  const conf = {
    ...config,
    output: {
      ...config.output,
      publicPath: '/',
    },
    devServer: {
      ...config.devServer,
      client: {
        ...(config.devServer?.client ?? {}),
        webSocketURL: {
          port: 443,
        },
      },
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
      },
      https: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, './src/callback'),
      },
    },
    optimization: {
      ...config.optimization,
    },
    stats: { warnings: false },
  };
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/callback/index.html',
      filename: './callback/index.html',
    }),
  );
  return conf;
};
