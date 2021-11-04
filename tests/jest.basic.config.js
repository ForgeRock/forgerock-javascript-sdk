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
  collectCoverage: false,
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  rootDir: '../',
  setupFiles: ['jest-canvas-mock'],
};
