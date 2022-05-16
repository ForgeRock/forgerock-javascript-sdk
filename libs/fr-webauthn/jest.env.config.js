/*
 * @forgerock/javascript-sdk
 *
 * jest.env.config.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import * as Environment from 'jest-environment-jsdom';

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = await import('util');
      this.global.TextEncoder = TextEncoder;
    }
  }
}

module.exports = CustomTestEnvironment;
