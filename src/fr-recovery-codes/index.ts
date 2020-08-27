/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../auth/enums';
import TextOutputCallback from '../fr-auth/callbacks/text-output-callback';
import FRStep from '../fr-auth/fr-step';
import { parseDisplayRecoveryCodesText } from './script-parser';

/**
 * Utility for handling recovery code nodes.
 *
 * Example:
 *
 * ```js
 * // Determine if step is Display Recovery Codes step
 * const isDisplayRecoveryCodesStep = FRRecoveryCodes.isDisplayStep(step);
 * if (isDisplayRecoveryCodesStep) {
 *   const recoveryCodes = FRRecoveryCodes.getCodes(step);
 *   // Do the UI needful
 * }
 * ```
 */
abstract class FRRecoveryCodes {
  /**
   * Retrieves the recovery codes by parsing the JavaScript message text in callback.
   *
   * @param step The step to evaluate
   * @return Recovery Code values in array
   */
  public static getCodes(step: FRStep): string[] {
    const text = this.getDisplayCallback(step)?.getOutputByName('message', '');
    return parseDisplayRecoveryCodesText(text || '');
  }

  /**
   * Determines if the given step is a Display Recovery Codes step.
   *
   * @param step The step to evaluate
   * @return Is this step a Display Recovery Codes step
   */
  public static isDisplayStep(step: FRStep): boolean {
    return !!this.getDisplayCallback(step);
  }

  /**
   * Gets the recovery codes step.
   *
   * @param step The step to evaluate
   * @return gets the Display Recovery Codes' callback
   */
  private static getDisplayCallback(step: FRStep): TextOutputCallback | undefined {
    return step
      .getCallbacksOfType<TextOutputCallback>(CallbackType.TextOutputCallback)
      .find((x) => {
        const cb = x.getOutputByName<string | undefined>('message', undefined);
        return cb && (cb.includes('Recovery Codes') || cb.includes('recovery codes'));
      });
  }
}

export default FRRecoveryCodes;
