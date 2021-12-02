module.exports = {
  displayName: 'javascript-sdk-app-e2e',
  preset: '../../jest.preset.js',
  globalSetup: './src/env.setup.ts',
  globalTeardown: './src/env.teardown.ts',
  testTimeout: 60 * 1000, // 60 seconds (must be more than the setup-and-go.ts timeout)
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
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
