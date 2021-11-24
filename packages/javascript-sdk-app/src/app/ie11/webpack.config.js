const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: './tests/e2e/app/ie11/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  targets: {
                    ie: '11',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  output: {
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports ECMAScript Module syntax (import ... from '...').
      module: false,
    },
    filename: 'ie-bundle.js',
    path: path.resolve(__dirname, ''),
  },
};
