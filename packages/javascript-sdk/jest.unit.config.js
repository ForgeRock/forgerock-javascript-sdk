const jestBasic = require("./jest.basic.config");


module.exports = {
  ...jestBasic,
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};