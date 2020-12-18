/*
 * @forgerock/javascript-sdk
 *
 * text-output-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to display a message.
 */
class TextOutputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the message content.
   */
  public getMessage(): string {
    return this.getOutputByName<string>('message', '');
  }

  /**
   * Gets the message type.
   */
  public getMessageType(): string {
    return this.getOutputByName<string>('messageType', '');
  }
}

export default TextOutputCallback;
