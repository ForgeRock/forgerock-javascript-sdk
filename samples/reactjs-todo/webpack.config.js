const webpack = require('webpack');

module.exports = (config) => {
  const AM_URL = process.env.AM_URL;
  const API_URL = process.env.API_URL;
  const DEBUGGER_OFF = process.env.DEBUGGER_OFF;
  const JOURNEY_LOGIN = process.env.JOURNEY_LOGIN;
  const JOURNEY_REGISTER = process.env.JOURNEY_REGISTER;
  const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT;
  const REALM_PATH = process.env.REALM_PATH;
  console.log({
    AM_URL,
    API_URL,
    DEBUGGER_OFF,
    JOURNEY_LOGIN,
    JOURNEY_REGISTER,
    WEB_OAUTH_CLIENT,
    REALM_PATH,
  });
  config.plugins.push(
    new webpack.DefinePlugin({
      // Inject all the environment variable into the Webpack build
      'process.env.AM_URL': JSON.stringify(AM_URL),
      'process.env.API_URL': JSON.stringify(API_URL),
      'process.env.DEBUGGER_OFF': JSON.stringify(DEBUGGER_OFF),
      'process.env.JOURNEY_LOGIN': JSON.stringify(JOURNEY_LOGIN),
      'process.env.JOURNEY_REGISTER': JSON.stringify(JOURNEY_REGISTER),
      'process.env.WEB_OAUTH_CLIENT': JSON.stringify(WEB_OAUTH_CLIENT),
      'process.env.REALM_PATH': JSON.stringify(REALM_PATH),
    }),
  );
  const conf = {
    ...config,
    devServer: {
      ...config.devServer,
      client: {
        logging: 'none',
        overlay: false,
      },
      compress: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
      },
      server: 'https',
    },
    devtool: 'source-map',
    plugins: config.plugins.slice(1),
  };
  return conf;
};
