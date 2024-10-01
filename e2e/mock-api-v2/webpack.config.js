const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.app.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      'utf-8-validate': require.resolve('utf-8-validate/'),
    },
  },
  node: {
    __dirname: false, // Keep the default Node behavior
    __filename: false,
  },
  output: {
    filename: 'bundle.js', // output bundle name
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map', // enables source mapping for easier debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // serve files from dist
    },
    compress: true,
    port: 9444,
    hot: true, // enable hot module replacement
    historyApiFallback: true, // for single page applications
  },
};
