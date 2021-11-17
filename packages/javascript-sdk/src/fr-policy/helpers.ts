/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

function getProp<T>(obj: { [key: string]: unknown } | undefined, prop: string, defaultValue: T): T {
  if (!obj || obj[prop] === undefined) {
    return defaultValue;
  }
  return obj[prop] as T;
}

export { getProp };
