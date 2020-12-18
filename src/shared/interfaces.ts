/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

interface StringDict<T> {
  [name: string]: T;
}

interface Tokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

export { StringDict, Tokens };
