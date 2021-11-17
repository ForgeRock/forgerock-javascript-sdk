/*
 * @forgerock/javascript-sdk
 *
 * recaptcha-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to integrate reCAPTCHA.
 */
class ReCaptchaCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the reCAPTCHA site key.
   */
  public getSiteKey(): string {
    return this.getOutputByName<string>('recaptchaSiteKey', '');
  }

  /**
   * Sets the reCAPTCHA result.
   */
  public setResult(result: string): void {
    this.setInputValue(result);
  }
}

export default ReCaptchaCallback;
