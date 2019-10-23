import FRPolicy from '..';

describe('The IDM error handling', () => {
  it('returns a human readable error message', () => {

    const property = 'userName';
    const policyRequirementsTests = [
      {
        expectedString: `${property} must be at least 6 characters`,
        policy: {
          params: {
            minLength: 6,
          },
          policyRequirement: 'MIN_LENGTH',
        },
      }, {
        expectedString: `${property} must be unique`,
        policy: {
          policyRequirement: 'UNIQUE',
        },
      }, {
        expectedString: `${property}: Unknown policy requirement "CUSTOM_POLICY"`,
        policy: {
          params: {
            minLowerCase: 6,
          },
          policyRequirement: 'CUSTOM_POLICY',
        },
      }, {
        customMessage: {
          unique: (property: string) => (
            `this is a custom message for unique policy of ${property}`
          ),
        },
        expectedString: `this is a custom message for unique policy of ${property}`,
        policy: {
          policyRequirement: 'UNIQUE',
        },
      }
    ];

    policyRequirementsTests.forEach((test) => {
      const message = FRPolicy.parsePolicyRequirement(property, test.policy, test.customMessage);
      expect(message).toBe(test.expectedString);
    });
  });

  it('groups failed policies for one property', () => {

    const policy = {
      policyRequirements: [
        {
          policyRequirement: 'UNIQUE',
        }, {
          params: {
            minLength: 6,
          },
          policyRequirement: 'MIN_LENGTH',
        },
      ],
      property: 'userName',
    };

    const messageArray = FRPolicy.parseFailedPolicyRequirement(policy);
    expect(messageArray).toEqual(
      ['userName must be unique', 'userName must be at least 6 characters'],
    );
  });

  it('returns an object array with a human readable error and the server error', () => {

    const errorResponse = {
      code: 403,
      reason: 'Forbidden',
      message: 'Policy validation failed',
      detail: {
        failedPolicyRequirements: [
          {
            policyRequirements: [{
              policyRequirement: 'UNIQUE',
            }, {
              params: {
                minLength: 6,
              },
              policyRequirement: 'MIN_LENGTH',
            }],
            property: 'userName',
          },          {
            policyRequirements: [{
              params: {
                numCaps: 1,
              },
              policyRequirement: 'AT_LEAST_X_CAPITAL_LETTERS',
            }, {
              params: {
                minLength: 6,
              },
              policyRequirement: 'MIN_LENGTH',
            }],
            property: 'password',
          },
        ],
        result: false,
      },
    };
    const customMessage = {
      unique: (property: string) => (
        `this is a custom message for unique policy of ${property}`
      ),
    };
    const expected =   [
      {
        messages: [
          'this is a custom message for unique policy of userName',
          'userName must be at least 6 characters',
        ],
        detail: {
          policyRequirements: [
            { policyRequirement: 'UNIQUE' },
            { params: { minLength: 6 }, policyRequirement: 'MIN_LENGTH' },
          ],
          property: 'userName',
        },
      },
      {
        messages: [
          'password must contain at least 1 capital letter',
          'password must be at least 6 characters',
        ],
        detail: {
          policyRequirements: [
            { params: { numCaps: 1 }, policyRequirement: 'AT_LEAST_X_CAPITAL_LETTERS' },
            { params: { minLength: 6 }, policyRequirement: 'MIN_LENGTH' },
          ],
          property: 'password',
        },
      },
    ];

    const errorObjArr = FRPolicy.parseErrors(errorResponse, customMessage);
    expect(errorObjArr).toEqual(expected);
  });
});
