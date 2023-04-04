/*
 * @forgerock/javascript-sdk
 *
 * local-storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Tokens } from '../shared/interfaces';
import { DB_NAME } from './constants';

/**
 * Provides wrapper for tokens with localStorage.
 */
abstract class LocalStorageWrapper {
  /**
   * Retrieve tokens.
   */
  public static async get(clientId: string): Promise<Tokens> {
    const tokenString = localStorage.getItem(`${DB_NAME}-${clientId}`);

    try {
      return Promise.resolve(JSON.parse(tokenString || ''));
    } catch (err) {
      console.warn(
        'Could not parse token from localStorage. This could be due to accessing a removed token',
      );
      // Original behavior had an untyped return of undefined for no token
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return undefined;
    }
  }

  /**
   * Saves tokens.
   */
  public static async set(clientId: string, tokens: Tokens): Promise<void> {
    const tokenString = JSON.stringify(tokens);
    localStorage.setItem(`${DB_NAME}-${clientId}`, tokenString);
  }

  /**
   * Removes stored tokens.
   */
  public static async remove(clientId: string): Promise<void> {
    localStorage.removeItem(`${DB_NAME}-${clientId}`);
  }
}

export default LocalStorageWrapper;
