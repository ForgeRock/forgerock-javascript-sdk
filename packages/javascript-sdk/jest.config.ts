export default {
  displayName: 'javascript-sdk',
  preset: '../../jest.preset.js',
  globals: {},
  setupFiles: ['jest-canvas-mock'],
  rootDir: './',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: './jest.env.config.ts',
  coverageDirectory: '../../coverage/packages/javascript-sdk',
};
