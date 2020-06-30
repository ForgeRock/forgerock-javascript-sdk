module.exports = {
  globalSetup: './tests/e2e/env.setup.js',
  globalTeardown: './tests/e2e/env.teardown.js',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  testTimeout: 30000,
  rootDir: '../',
};
