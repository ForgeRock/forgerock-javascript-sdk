module.exports = {
  displayName: 'lib-update-cors-cloud',
  preset: '../../jest.preset.ts',
  setupFiles: ['./test/setup-env.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/lib/update-cors-cloud',
};
