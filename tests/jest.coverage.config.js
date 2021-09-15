/*
 * @forgerock/javascript-sdk
 *
 * jest.coverage.config.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
const basicConfig = require('./jest.basic.config');

module.exports = {
  ...basicConfig,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: `../reports/${Date.now()}`,
        suiteNameTemplate: '{filename}',
        classNameTemplate: '{filename}',
        includeConsoleOutput: true,
      },
    ],
  ],
};
