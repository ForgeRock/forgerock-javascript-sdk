/*
 * @forgerock/javascript-sdk
 *
 * hidden-value-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRCallback, Callback } from '@forgerock/libs/fr-callback';

/**
 * Represents a callback used to collect information indirectly from the user.
 */
class HiddenValueCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }
}

export { HiddenValueCallback };
