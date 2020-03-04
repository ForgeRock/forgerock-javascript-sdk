module.exports = {
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  testTimeout: 30000,
};
