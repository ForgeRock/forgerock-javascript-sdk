const jestBasic = require('./jest.basic.config');

module.exports = {
  ...jestBasic,
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
};
