import { parseDisplayRecoveryCodesText } from './script-parser';
import { displayRecoveryCodes, expectedRecoveryCodes } from './script-text.mock.data';

describe('Parsing of the Display Recovery Codes script text', () => {
  it('should parse the Display Recovery Codes Text', () => {
    const result = parseDisplayRecoveryCodesText(displayRecoveryCodes);
    expect(result).toStrictEqual(expectedRecoveryCodes);
  });
});
