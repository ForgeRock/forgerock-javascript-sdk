/*
 * @forgerock/javascript-sdk
 *
 * terms-and-conditions-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect acceptance of terms and conditions.
 */
class TermsAndConditionsCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the terms and conditions content.
   */
  public getTerms(): string {
    return this.getOutputByName<string>('terms', '');
  }

  /**
   * Gets the version of the terms and conditions.
   */
  public getVersion(): string {
    return this.getOutputByName<string>('version', '');
  }

  /**
   * Gets the date of the terms and conditions.
   */
  public getCreateDate(): Date {
    const date = this.getOutputByName<string>('createDate', '');
    return new Date(date);
  }

  /**
   * Sets the callback's acceptance.
   */
  public setAccepted(accepted = true): void {
    this.setInputValue(accepted);
  }
}

export default TermsAndConditionsCallback;
