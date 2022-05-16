const fs = require('fs');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8'),
);

module.exports = {
  displayName: 'libs-fr-webauthn',
  preset: '../../jest.preset.js',
  testEnvironment: './jest.env.config.js',
  setupFiles: ['jest-canvas-mock'],
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/fr-webauthn',
};
