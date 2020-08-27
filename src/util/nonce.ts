/*
 * @forgerock/javascript-sdk
 *
 * nonce.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Returns a factory function to produce numbers intended for one-time use.
 *
 * @param length The number of digits to generate
 */
function nonce(length = 15): () => number {
  console.warn('Deprecation warning: the `nonce` method will be removed in v3.');

  let last = -1;
  let repeat = 0;

  if (length < 4 || length > 15) {
    throw new Error('Invalid nonce length');
  }

  return (): number => {
    const now = Math.pow(10, 2) * +new Date();

    if (now === last) {
      repeat++;
    } else {
      repeat = 0;
      last = now;
    }

    const s = (now + repeat).toString();
    return +s.substr(s.length - length);
  };
}

export default nonce;
