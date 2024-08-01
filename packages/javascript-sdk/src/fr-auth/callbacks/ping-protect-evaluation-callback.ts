/*
 * @forgerock/javascript-sdk
 *
 * ping-protect-evaluation-callback.ts
 *
 * Copyright (c) 2024 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import type { Callback } from '../../auth/interfaces';
import HiddenValueCallback from './hidden-value-callback';

/**
 * @class - Represents a callback used to complete and package up device and behavioral data.
 */
class PingOneProtectEvaluationCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's pauseBehavioralData value.
   * @returns {boolean}
   */
  public getPauseBehavioralData(): boolean {
    return this.getOutputByName<boolean>('pauseBehavioralData', false);
  }

  /**
   * @method setData - Set the result of data collection
   * @param {string} data - Data from calling pingProtect.get()
   * @returns {void}
   */
  public setData(data: string): void {
    this.setInputValue(data, /signals/);
  }

  /**
   * @method setClientError - Set the client error message
   * @param {string} errorMessage - Error message
   * @returns {void}
   */
  public setClientError(errorMessage: string, callback?: HiddenValueCallback): void {
    if (callback) {
      callback.setInputValue(errorMessage, /clientError/);
    }
    this.setInputValue(errorMessage, /clientError/);
  }

  setHiddenCallbackValue(callback: HiddenValueCallback, value: string): void {
    return callback.setInputValue(value, /pingone_risk_evaluation_signals/);
  }
}

export default PingOneProtectEvaluationCallback;

/**
  * Example of callback:
{
  "type": "PingOneProtectEvaluationCallback",
  "output": [
    {
      "name": "pauseBehavioralData",
      "value": true
    }
  ],
  "input": [
    {
      "name": "IDToken1signals",
      "value": ""
    },
    {
      "name": "IDToken1clientError",
      "value": ""
    }
  ]
}
*/
