/*
 * @forgerock/javascript-sdk
 *
 * redirect-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect an answer to a choice.
 */
class RedirectCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the redirect URL.
   */
  public getRedirectUrl(): string {
    return this.getOutputByName<string>('redirectUrl', '');
  }
}

export default RedirectCallback;
