const path = require('path');

module.exports = {
  entry: './tests/e2e/server/index.js',
  mode: 'development',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../test-site'),
  },
};
