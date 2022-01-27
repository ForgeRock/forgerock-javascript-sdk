/*
 * @forgerock/javascript-sdk
 *
 * timeout.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { DEFAULT_TIMEOUT } from '../config';

/**
 * @module
 * @ignore
 * These are private utility functions
 */
function withTimeout<T>(promise: Promise<T>, timeout: number = DEFAULT_TIMEOUT): Promise<T> {
  const effectiveTimeout = timeout || DEFAULT_TIMEOUT;
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      window.setTimeout(() => reject(new Error('Timeout')), effectiveTimeout),
    ),
  ]);
}

export { withTimeout };
