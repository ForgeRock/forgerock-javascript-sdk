/*
 * @forgerock/javascript-sdk
 *
 * script-parser.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

function parseDisplayRecoveryCodesText(text: string): string[] {
  /**
   * e.g. ` ...
   *    "<div class=\"text-center\">\n" +
   *    "iZmEtxvQ00\n" +
   *    "</div>\n" +
   * ... `
   */
  const recoveryCodesMatches = text.match(/\s[\w\W]"([\w]*)\\/g);
  const recoveryCodes =
    Array.isArray(recoveryCodesMatches) &&
    recoveryCodesMatches.map((substr: string) => {
      // e.g. `"iZmEtxvQ00\`
      const arr = substr.match(/"([\w]*)\\/);
      return Array.isArray(arr) ? arr[1] : '';
    });
  return recoveryCodes || [];
}

export { parseDisplayRecoveryCodesText };
