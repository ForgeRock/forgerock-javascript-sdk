export default {
  displayName: 'javascript-sdk',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  setupFiles: ['jest-canvas-mock'],
  rootDir: './',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: './jest.env.config.ts',
  coverageDirectory: '../../coverage/packages/javascript-sdk',
};
