const mergeDeepRight = require('ramda/src/mergeDeepRight');
const tsPreset = require('ts-jest/jest-preset');
const puppeteerPreset = require('jest-puppeteer/jest-preset');
const { collectCoverageFrom, globals } = require('./tests-basic.config');

module.exports = mergeDeepRight(
  // Merge presets together
 mergeDeepRight(
    tsPreset,
    puppeteerPreset,
  ),
  // Merge presets with local config
  {
    collectCoverageFrom: collectCoverageFrom,
    globals: globals,
    testMatch: [
      "<rootDir>/src/**/*.test.ts",
      "<rootDir>/tests/**/*.test.ts",
    ],
  },
);
