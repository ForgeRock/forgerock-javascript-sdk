/*
 * @forgerock/javascript-sdk
 *
 * storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/** @hidden */
class LocalStorage {
  private storage: Storage;
  constructor(persist = false) {
    this.storage = persist ? window.localStorage : window.sessionStorage;
  }

  public get<T>(key: string): T | undefined {
    const value = this.storage.getItem(key);
    if (!value) {
      return undefined;
    }

    return JSON.parse(value);
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }
}

export default LocalStorage;
