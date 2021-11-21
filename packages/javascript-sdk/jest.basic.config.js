/*
 * @forgerock/javascript-sdk
 *
 * jest.basic.config.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
const config = require('./jest.config');

module.exports = {
  ...config,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  rootDir: './',
  setupFiles: ['jest-canvas-mock'],
};
