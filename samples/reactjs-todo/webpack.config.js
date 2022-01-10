const webpack = require('webpack');

module.exports = (config) => {
  const AM_URL = process.env.AM_URL;
  const APP_URL = process.env.APP_URL;
  const API_URL = process.env.API_URL;
  const DEBUGGER_OFF = process.env.DEBUGGER_OFF;
  const DEVELOPMENT = process.env.DEVELOPMENT;
  const JOURNEY_LOGIN = process.env.JOURNEY_LOGIN;
  const JOURNEY_REGISTER = process.env.JOURNEY_REGISTER;
  const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT;
  const REALM_PATH = process.env.REALM_PATH;
  config.plugins.push(
    new webpack.DefinePlugin({
      // Inject all the environment variable into the Webpack build
      'process.env.AM_URL': JSON.stringify(AM_URL),
      'process.env.APP_URL': JSON.stringify(APP_URL),
      'process.env.API_URL': JSON.stringify(API_URL),
      'process.env.DEVELOPMENT': JSON.stringify(DEVELOPMENT),
      'process.env.DEBUGGER_OFF': JSON.stringify(DEBUGGER_OFF),
      'process.env.JOURNEY_LOGIN': JSON.stringify(JOURNEY_LOGIN),
      'process.env.JOURNEY_REGISTER': JSON.stringify(JOURNEY_REGISTER),
      'process.env.WEB_OAUTH_CLIENT': JSON.stringify(WEB_OAUTH_CLIENT),
      'process.env.REALM_PATH': JSON.stringify(REALM_PATH),
    }),
  );
  return {
    ...config,
    devtool: 'source-map',
    devServer: {
      ...config.devServer,
      host: 'react.example.com',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
      },
      server: 'https',
      compress: true,
      client: {
        logging: 'none',
        overlay: false,
      },
      port: 8443,
    },
  };
};
