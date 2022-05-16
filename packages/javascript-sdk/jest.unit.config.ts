import jestBasic from './jest.basic.config';

export default {
  ...jestBasic,
  testEnvironment: './jest.env.config.js',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
