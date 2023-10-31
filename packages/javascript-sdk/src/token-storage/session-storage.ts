/*
 * @forgerock/javascript-sdk
 *
 * session-storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { Tokens } from '../shared/interfaces';
import Config from '../config';

/**
 * Provides wrapper for tokens with sessionStorage.
 */
abstract class SessionStorageWrapper {
  /**
   * Retrieve tokens.
   */
  public static async get(clientId: string): Promise<Tokens | void> {
    const tokenString = sessionStorage.getItem(`${Config.get().prefix}-${clientId}`);

    // If there is no stored token, or the token is not an object, return null
    if (!tokenString) {
      // This is a normal state, so resolve with undefined
      return;
    }

    try {
      return JSON.parse(tokenString || '');
    } catch (err) {
      // This is an error state, so reject
      throw new Error('Could not parse token from sessionStorage');
    }
  }

  /**
   * Saves tokens.
   */
  public static async set(clientId: string, tokens: Tokens): Promise<void> {
    const tokenString = JSON.stringify(tokens);
    sessionStorage.setItem(`${Config.get().prefix}-${clientId}`, tokenString);
  }

  /**
   * Removes stored tokens.
   */
  public static async remove(clientId: string): Promise<void> {
    sessionStorage.removeItem(`${Config.get().prefix}-${clientId}`);
  }
}

export default SessionStorageWrapper;
