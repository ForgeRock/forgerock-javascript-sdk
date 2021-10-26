const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = () => {
  // Pull the local .env configuration, if present
  const localEnv = dotenv.config().parsed || {};

  // Use process environment variables for prod, but fallback to local .env for dev
  const AM_URL = process.env.AM_URL || localEnv.AM_URL;
  const APP_URL = process.env.APP_URL || localEnv.APP_URL;
  const API_URL = process.env.API_URL || localEnv.API_URL;
  const DEBUGGER_OFF = process.env.DEBUGGER_OFF || localEnv.DEBUGGER_OFF;
  const DEVELOPMENT = process.env.DEVELOPMENT || localEnv.DEVELOPMENT;
  const JOURNEY_LOGIN = process.env.JOURNEY_LOGIN || localEnv.JOURNEY_LOGIN;
  const JOURNEY_REGISTER = process.env.JOURNEY_REGISTER || localEnv.JOURNEY_REGISTER;
  const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT || localEnv.WEB_OAUTH_CLIENT;
  const REALM_PATH = process.env.REALM_PATH || localEnv.REALM_PATH;

  return {
    // Point to the top level source file
    entry: {
      app: './client/index.js',
    },
    // This helps provide better debugging in browsers
    devtool: 'source-map',
    // The location of where the built files are placed
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].js',
    },
    // Dictates some behavior in Webpack, "development" is a bit quicker
    mode: DEVELOPMENT === 'true' ? 'development' : 'production',
    // Modules are essentially plugins that can extend/modify Webpack
    // Here, we are using it to transpile React's JSX to ordinary functions
    module: {
      rules: [
        {
          // If JavaScript file ...
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            // Babel is a JavaScript transpiler (kind of like a compiler)
            // It converts unsupported features to something browser's can use
            loader: 'babel-loader',
            options: {
              presets: [
                // Transforms for browsers that support ESModules (e.g. modern browsers)
                // and include standard React transformations
                ['@babel/preset-env', { targets: { esmodules: true } }],
                ['@babel/preset-react'],
              ],
            },
          },
        },
        {
          // If SCSS file ...
          test: /\.(scss)$/,
          use: [
            // Injects CSS into DOM
            'style-loader',
            // Extracts CSS imported into project into separate output
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            // Allows for the loading of CSS via "import"
            'css-loader',
            // Allows for post-processing of CSS
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: () => [require('autoprefixer')],
                },
              },
            },
            // Processes SCSS into CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        // Inject all the environment variable into the Webpack build
        'process.env.AM_URL': JSON.stringify(AM_URL),
        'process.env.APP_URL': JSON.stringify(APP_URL),
        'process.env.API_URL': JSON.stringify(API_URL),
        'process.env.DEBUGGER_OFF': JSON.stringify(DEBUGGER_OFF),
        'process.env.JOURNEY_LOGIN': JSON.stringify(JOURNEY_LOGIN),
        'process.env.JOURNEY_REGISTER': JSON.stringify(JOURNEY_REGISTER),
        'process.env.WEB_OAUTH_CLIENT': JSON.stringify(WEB_OAUTH_CLIENT),
        'process.env.REALM_PATH': JSON.stringify(REALM_PATH),
      }),
    ],
  };
};
