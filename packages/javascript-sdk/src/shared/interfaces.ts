/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
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
  tokenExpiry?: number;
}

export type { StringDict, Tokens };
