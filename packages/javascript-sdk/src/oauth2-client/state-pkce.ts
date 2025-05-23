/*
 * @forgerock/javascript-sdk
 *
 * state-pkce.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import PKCE from '../util/pkce';
import { GetAuthorizationUrlOptions } from './interfaces';

function getStorageKey(clientId: string, prefix?: string) {
  return `${prefix || 'FR-SDK'}-authflow-${clientId}`;
}

/**
 * Generate and store PKCE values for later use
 * @param { string } storageKey - Key to store authorization options in sessionStorage
 * @param {GenerateAndStoreAuthUrlValues} options - Options for generating PKCE values
 * @returns { state: string, verifier: string, GetAuthorizationUrlOptions }
 */
interface GenerateAndStoreAuthUrlValues extends GetAuthorizationUrlOptions {
  clientId: string;
  login?: 'redirect' | 'embedded';
  prefix?: string;
}

export function generateAndStoreAuthUrlValues(options: GenerateAndStoreAuthUrlValues) {
  const verifier = PKCE.createVerifier();
  const state = PKCE.createState();
  const storageKey = getStorageKey(options.clientId, options.prefix);

  const authorizeUrlOptions = {
    ...options,
    state,
    verifier,
  };

  return [
    authorizeUrlOptions,
    () => sessionStorage.setItem(storageKey, JSON.stringify(authorizeUrlOptions)),
  ] as const;
}

/**
 * @function getStoredAuthUrlValues - Retrieve stored authorization options from sessionStorage
 * @param { string } storageKey - Key to retrieve stored values from sessionStorage
 * @returns { GetAuthorizationUrlOptions }
 */
export function getStoredAuthUrlValues(
  clientId: string,
  prefix?: string,
): GetAuthorizationUrlOptions {
  const storageKey = getStorageKey(clientId, prefix);
  const storedString = sessionStorage.getItem(storageKey);
  sessionStorage.removeItem(storageKey);

  try {
    return JSON.parse(storedString as string);
  } catch (error) {
    throw new Error('Stored values for Auth URL could not be parsed');
  }
}
