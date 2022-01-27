module.exports = {
  displayName: 'autoscript-suites',
  preset: '../../jest.preset.js',
  globalSetup: './src/env.setup.ts',
  setupFiles: ['./setup-files.ts'],
  globalTeardown: './src/env.teardown.ts',
  testTimeout: 60 * 1000, // 60 seconds (must be more than the setup-and-go.ts timeout)
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
