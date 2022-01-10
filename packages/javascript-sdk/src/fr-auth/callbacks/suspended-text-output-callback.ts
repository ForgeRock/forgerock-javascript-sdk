/*
 * @forgerock/javascript-sdk
 *
 * suspended-text-output-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import TextOutputCallback from './text-output-callback';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to display a message.
 */
class SuspendedTextOutputCallback extends TextOutputCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }
}

export default SuspendedTextOutputCallback;
