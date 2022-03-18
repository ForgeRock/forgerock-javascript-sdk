const webpack = require('webpack');
const path = require('path');

module.exports = (config) => {
  const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const SCOPE = process.env.SCOPE;
  const AM_URL = process.env.AM_URL;
  const TIMEOUT = process.env.TIMEOUT;
  const REALM_PATH = process.env.REALM_PATH;
  const TREE = process.env.TREE;

  config.plugins.push(
    new webpack.DefinePlugin({
      // Inject all the environment variable into the Webpack build
      'process.env.WEB_OAUTH_CLIENT': JSON.stringify(WEB_OAUTH_CLIENT),
      'process.env.REDIRECT_URI': JSON.stringify(REDIRECT_URI),
      'process.env.SCOPE': JSON.stringify(SCOPE),
      'process.env.AM_URL': JSON.stringify(AM_URL),
      'process.env.TIMEOUT': JSON.stringify(TIMEOUT),
      'process.env.REALM_PATH': JSON.stringify(REALM_PATH),
      'process.env.TREE': JSON.stringify(TREE),
    }),
  );
  return {
    ...config,
    devServer: {
      ...config.devServer,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
      },
      static: {
        directory: path.join(__dirname, '../../_static'),
      },
      server: 'https',
    },
  };
};
