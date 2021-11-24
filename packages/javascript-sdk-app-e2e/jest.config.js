module.exports = {
  displayName: 'javascript-sdk-app-e2e',
  preset: '../../jest.preset.js',
  globalSetup: './src/env.setup.ts',
  globalTeardown: './src/env.teardown.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    browsers: ['chromium', 'webkit', 'firefox'],
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/javascript-sdk-e2e',
  testPathIgnorePatterns: ['node_modules', 'dist'],
};
