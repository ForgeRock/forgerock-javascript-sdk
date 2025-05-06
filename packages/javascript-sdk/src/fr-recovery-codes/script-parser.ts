/*
 * @forgerock/javascript-sdk
 *
 * script-parser.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
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

/**
 *
 * @param text
 * @returns string
 */
function parseDeviceNameText(text: string): string {
  /**
   * We default the device name to 'New Security Key'
   * If the user has a device name, it will be wrapped in <em> tags
   * e.g. ` ... <em>My Security Key</em> ... `
   * We want to remove the <em> tags and just return the device name
   * e.g. ` ... My Security Key ... `
   */
  const displayName =
    text
      ?.match(/<em\s*.*>\s*.*<\/em>/g)?.[0]
      ?.replace('<em>', '')
      ?.replace('</em>', '') ?? 'New Security Key';
  return displayName;
}
export { parseDeviceNameText, parseDisplayRecoveryCodesText };
