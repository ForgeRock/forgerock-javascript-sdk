/*
 * @forgerock/javascript-sdk
 *
 * fr-policy.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRPolicy from '.';
import { PolicyKey } from './enums';

describe('The IDM error handling', () => {
  const property = 'userName';

  it('returns a human readable error message', () => {
    const test = {
      expectedString: `${property} must be unique`,
      policy: {
        policyRequirement: 'UNIQUE',
      },
    };
    const message = FRPolicy.parsePolicyRequirement(property, test.policy);
    expect(message).toBe(test.expectedString);
  });

  it('returns a human readable error message with param data', () => {
    const test = {
      expectedString: `${property} must be at least 6 characters`,
      policy: {
        params: {
          minLength: 6,
        },
        policyRequirement: 'MIN_LENGTH',
      },
    };
    const message = FRPolicy.parsePolicyRequirement(property, test.policy);
    expect(message).toBe(test.expectedString);
  });

  it('returns a human readable generic message for unknown error', () => {
    const test = {
      expectedString: `${property}: Unknown policy requirement "SOME_UNKNOWN_POLICY"`,
      policy: {
        params: {
          unknownParam: 6,
        },
        policyRequirement: 'SOME_UNKNOWN_POLICY',
      },
    };
    const message = FRPolicy.parsePolicyRequirement(property, test.policy);
    expect(message).toBe(test.expectedString);
  });

  it('error handling is extensible by customer', () => {
    const test = {
      customMessage: {
        CUSTOM_POLICY: (property: string, params: { policyRequirement: string }): string =>
          `this is a custom message for "${params.policyRequirement}" policy of ${property}`,
      },
      expectedString: `this is a custom message for "CUSTOM_POLICY" policy of ${property}`,
      policy: {
        policyRequirement: 'CUSTOM_POLICY',
      },
    };
    const message = FRPolicy.parsePolicyRequirement(property, test.policy, test.customMessage);
    expect(message).toBe(test.expectedString);
  });

  it('error handling is overwritable by customer', () => {
    const test = {
      customMessage: {
        [PolicyKey.Unique]: (property: string): string =>
          `this is a custom message for "UNIQUE" policy of ${property}`,
      },
      expectedString: `this is a custom message for "UNIQUE" policy of ${property}`,
      policy: {
        policyRequirement: 'UNIQUE',
      },
    };
    const message = FRPolicy.parsePolicyRequirement(property, test.policy, test.customMessage);
    expect(message).toBe(test.expectedString);
  });

  it('groups failed policies for one property', () => {
    const policy = {
      policyRequirements: [
        {
          policyRequirement: 'UNIQUE',
        },
        {
          params: {
            minLength: 6,
          },
          policyRequirement: 'MIN_LENGTH',
        },
      ],
      property: 'userName',
    };

    const messageArray = FRPolicy.parseFailedPolicyRequirement(policy);
    expect(messageArray).toEqual([
      'userName must be unique',
      'userName must be at least 6 characters',
    ]);
  });

  it('returns an object array with a human readable error and the server error', () => {
    const errorResponse = {
      code: 403,
      reason: 'Forbidden',
      message: 'Policy validation failed',
      detail: {
        failedPolicyRequirements: [
          {
            policyRequirements: [
              {
                policyRequirement: 'UNIQUE',
              },
              {
                params: {
                  minLength: 6,
                },
                policyRequirement: 'MIN_LENGTH',
              },
              {
                policyRequirement: 'CUSTOM_POLICY',
              },
            ],
            property: 'userName',
          },
          {
            policyRequirements: [
              {
                params: {
                  numCaps: 1,
                },
                policyRequirement: 'AT_LEAST_X_CAPITAL_LETTERS',
              },
              {
                params: {
                  minLength: 6,
                },
                policyRequirement: 'MIN_LENGTH',
              },
            ],
            property: 'password',
          },
        ],
        result: false,
      },
    };
    const customMessage = {
      [PolicyKey.Unique]: (property: string): string =>
        `this is a custom message for "UNIQUE" policy of ${property}`,
      CUSTOM_POLICY: (property: string, params: { policyRequirement: string }): string =>
        `this is a custom message for "${params.policyRequirement}" policy of ${property}`,
    };
    const expected = [
      {
        messages: [
          'this is a custom message for "UNIQUE" policy of userName',
          'userName must be at least 6 characters',
          'this is a custom message for "CUSTOM_POLICY" policy of userName',
        ],
        detail: {
          policyRequirements: [
            { policyRequirement: 'UNIQUE' },
            { params: { minLength: 6 }, policyRequirement: 'MIN_LENGTH' },
            { policyRequirement: 'CUSTOM_POLICY' },
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
