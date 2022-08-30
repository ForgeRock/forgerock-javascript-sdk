/*
 * @forgerock/javascript-sdk
 *
 * jest.env.config.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { TestEnvironment } from 'jest-environment-jsdom';
import { TextEncoder } from 'util';

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
class CustomTestEnvironment extends TestEnvironment {
  constructor(config, ctx) {
    super(config, ctx);
  }

  async setup() {
    await super.setup();
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
  }
}

export default CustomTestEnvironment;
