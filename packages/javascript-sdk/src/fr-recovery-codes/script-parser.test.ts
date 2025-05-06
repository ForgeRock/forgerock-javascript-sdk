/*
 * @forgerock/javascript-sdk
 *
 * script-parser.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { parseDeviceNameText, parseDisplayRecoveryCodesText } from './script-parser';
import {
  displayRecoveryCodes,
  expectedRecoveryCodes,
  securityKeyCustomNameResponse,
  securityKeyResponse,
} from './script-text.mock.data';

describe('Parsing of the Display Recovery Codes script text', () => {
  it('should parse the Display Recovery Codes Text', () => {
    const result = parseDisplayRecoveryCodesText(displayRecoveryCodes);
    expect(result).toStrictEqual(expectedRecoveryCodes);
  });
  it('should parse the display name from recovery codes script', () => {
    const text = securityKeyResponse;
    const result = parseDeviceNameText(text);
    expect(result).toStrictEqual('New Security Key');
  });
  it('should parse a custom name out of the recovery text', () => {
    const text = securityKeyCustomNameResponse;
    const result = parseDeviceNameText(text);
    expect(result).toStrictEqual('My Custom Device Name');
  });
});
