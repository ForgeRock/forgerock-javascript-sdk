/*
 * @forgerock/javascript-sdk
 *
 * select-idp-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

interface IdPValue {
  provider: string;
  uiConfig: {
    [key: string]: string;
  };
}

/**
 * Represents a callback used to collect an answer to a choice.
 */
class SelectIdPCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the available providers.
   */
  public getProviders(): IdPValue[] {
    return this.getOutputByName<IdPValue[]>('providers', []);
  }

  /**
   * Sets the provider by name.
   */
  public setProvider(value: string): void {
    const item = this.getProviders().find((item) => item.provider === value);
    if (!item) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(item.provider);
  }
}

export default SelectIdPCallback;

export { IdPValue };
