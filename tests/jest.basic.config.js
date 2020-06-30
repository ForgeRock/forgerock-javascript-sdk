module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  rootDir: '../',
  setupFiles: ['jest-canvas-mock'],
};
