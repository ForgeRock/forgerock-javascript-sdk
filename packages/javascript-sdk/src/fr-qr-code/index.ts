/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2024 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../auth/enums';
import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import TextOutputCallback from '../fr-auth/callbacks/text-output-callback';
import FRStep from '../fr-auth/fr-step';

export type QRCodeData = {
  message: string;
  use: string;
  uri: string;
};

/**
 * @class FRQRCode - A utility class for handling QR Code steps
 *
 * Example:
 *
 * ```js
 * const isQRCodeStep = FRQRCode.isQRCodeStep(step);
 * let qrCodeData;
 * if (isQRCodeStep) {
 *   qrCodeData = FRQRCode.getQRCodeData(step);
 * }
 * ```
 */
abstract class FRQRCode {
  /**
   * @method isQRCodeStep - determines if step contains QR Code callbacks
   * @param {FRStep} step - step object from AM response
   * @returns {boolean}
   */
  public static isQRCodeStep(step: FRStep): boolean {
    const hiddenValueCb = step.getCallbacksOfType(CallbackType.HiddenValueCallback);

    // QR Codes step should have at least one HiddenValueCallback
    if (hiddenValueCb.length === 0) {
      return false;
    }
    return !!this.getQRCodeURICb(hiddenValueCb);
  }

  /**
   * @method getQRCodeData - gets the necessary information from the QR Code callbacks
   * @param {FRStep} step - step object from AM response
   * @returns {QRCodeData}
   */
  public static getQRCodeData(step: FRStep): QRCodeData {
    const hiddenValueCb = step.getCallbacksOfType(CallbackType.HiddenValueCallback);

    // QR Codes step should have at least one HiddenValueCallback
    if (hiddenValueCb.length === 0) {
      throw new Error(
        'QR Code step must contain a HiddenValueCallback. Use `FRQRCode.isQRCodeStep` to guard.',
      );
    }
    const qrCodeURICb = this.getQRCodeURICb(hiddenValueCb) as HiddenValueCallback;
    const outputValue = qrCodeURICb ? qrCodeURICb.getOutputValue('value') : '';
    const qrCodeUse =
      typeof outputValue === 'string' && outputValue.includes('otpauth://') ? 'otp' : 'push';

    const messageCbs = step.getCallbacksOfType(CallbackType.TextOutputCallback);
    const displayMessageCb = messageCbs.find((cb) => {
      const textOutputCallback = cb as TextOutputCallback;
      return textOutputCallback.getMessageType() !== '4';
    }) as TextOutputCallback | null;

    return {
      message: displayMessageCb ? displayMessageCb.getMessage() : '',
      use: qrCodeUse,
      uri: typeof outputValue === 'string' ? outputValue : '',
    };
  }

  private static getQRCodeURICb(hiddenValueCbs: HiddenValueCallback[]) {
    // Look for a HiddenValueCallback with an OTP URI
    return hiddenValueCbs.find((cb) => {
      const outputValue = cb.getOutputValue('value');

      if (typeof outputValue === 'string') {
        return outputValue?.includes('otpauth://') || outputValue?.includes('pushauth://');
      }
      return false;
    });
  }
}

export default FRQRCode;
