/*
 * @forgerock/javascript-sdk
 *
 * jest.e2e.config.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

module.exports = {
  globalSetup: './tests/e2e/env.setup.js',
  globalTeardown: './tests/e2e/env.teardown.js',
  globals: {
    browsers: ['chromium', 'webkit', 'firefox'],
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: `reports/${Date.now()}`,
        suiteNameTemplate: '{filename}',
        classNameTemplate: '{filename}',
        includeConsoleOutput: true,
      },
    ],
  ],
  testTimeout: 60 * 1000, // 60 seconds (must be more than the setup-and-go.ts timeout)
  rootDir: '../',
};
