/*
 * @forgerock/javascript-sdk
 *
 * script-parser.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { parseDisplayRecoveryCodesText } from './script-parser';
import { displayRecoveryCodes, expectedRecoveryCodes } from './script-text.mock.data';

describe('Parsing of the Display Recovery Codes script text', () => {
  it('should parse the Display Recovery Codes Text', () => {
    const result = parseDisplayRecoveryCodesText(displayRecoveryCodes);
    expect(result).toStrictEqual(expectedRecoveryCodes);
  });
});
