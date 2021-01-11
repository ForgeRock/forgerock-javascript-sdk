/*
 * @forgerock/javascript-sdk
 *
 * jest.basic.config.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  reporters: ['default', ['jest-junit', { outputDirectory: `reports/${Date.now()}`, suiteNameTemplate: "{filename}", classNameTemplate: "{filename}", includeConsoleOutput: true} ]],
  rootDir: '../',
  setupFiles: ['jest-canvas-mock'],
};
