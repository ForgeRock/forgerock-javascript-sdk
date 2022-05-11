import jestBasic from './jest.basic.config';

export default {
  ...jestBasic,
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
};
