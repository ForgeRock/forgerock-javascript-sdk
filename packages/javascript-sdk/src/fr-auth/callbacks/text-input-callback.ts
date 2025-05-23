/*
 * @forgerock/javascript-sdk
 *
 * text-input-callback.ts
 *
 * Copyright (c) 2022 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import type { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to retrieve input from the user.
 */
class TextInputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Sets the callback's input value.
   */
  public setInput(input: string): void {
    this.setInputValue(input);
  }
}

export default TextInputCallback;
