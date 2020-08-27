/*
 * @forgerock/javascript-sdk
 *
 * response.registration.mjs
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export default {
  authId: 'foo',
  callbacks: [
    {
      type: 'ValidatedCreateUsernameCallback',
      output: [
        {
          name: 'policies',
          value: [
            { policyId: 'unique' },
            { policyId: 'no-internal-user-conflict' },
            { policyId: 'cannot-contain-characters', params: { forbiddenChars: ['/'] } },
          ],
        },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'prompt', value: 'Username' },
      ],
      input: [
        { name: 'IDToken1', value: '' },
        { name: 'IDToken1validateOnly', value: false },
      ],
      _id: 0,
    },
    {
      type: 'StringAttributeInputCallback',
      output: [
        { name: 'name', value: 'givenName' },
        { name: 'prompt', value: 'First Name' },
        { name: 'required', value: true },
        { name: 'policies', value: [] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: '' },
      ],
      input: [
        { name: 'IDToken2', value: '' },
        { name: 'IDToken2validateOnly', value: false },
      ],
      _id: 1,
    },
    {
      type: 'StringAttributeInputCallback',
      output: [
        { name: 'name', value: 'sn' },
        { name: 'prompt', value: 'Last Name' },
        { name: 'required', value: true },
        { name: 'policies', value: [] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: '' },
      ],
      input: [
        { name: 'IDToken3', value: '' },
        { name: 'IDToken3validateOnly', value: false },
      ],
      _id: 2,
    },
    // {
    //   type: 'NumberAttributeInputCallback',
    //   input: [
    //     { name: 'IDToken4', value: null },
    //     { name: 'IDToken4validateOnly', value: false },
    //   ],
    //   output: [
    //     { name: 'name', value: 'age' },
    //     { name: 'prompt', value: 'Age' },
    //     { name: 'required', value: true },
    //     {
    //       name: 'policies',
    //       value: {
    //         policyRequirements: ['VALID_TYPE'],
    //         fallbackPolicies: null,
    //         name: 'age',
    //         policies: [
    //           {
    //             policyRequirements: ['VALID_TYPE'],
    //             policyId: 'valid-type',
    //             params: { types: ['number'] },
    //           },
    //         ],
    //         conditionalPolicies: null,
    //       },
    //     },
    //     { name: 'failedPolicies', value: [] },
    //     { name: 'validateOnly', value: false },
    //     { name: 'value', value: null },
    //   ],
    // },
    {
      type: 'StringAttributeInputCallback',
      output: [
        { name: 'name', value: 'mail' },
        { name: 'prompt', value: 'Email Address' },
        { name: 'required', value: true },
        { name: 'policies', value: [{ policyId: 'valid-email-address-format' }] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: '' },
      ],
      input: [
        { name: 'IDToken4', value: '' },
        { name: 'IDToken4validateOnly', value: false },
      ],
      _id: 3,
    },
    {
      type: 'BooleanAttributeInputCallback',
      output: [
        { name: 'name', value: 'preferences/marketing' },
        { name: 'prompt', value: 'Send me special offers and services' },
        { name: 'required', value: true },
        { name: 'policies', value: [] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: false },
      ],
      input: [
        { name: 'IDToken5', value: false },
        { name: 'IDToken5validateOnly', value: false },
      ],
      _id: 4,
    },
    {
      type: 'BooleanAttributeInputCallback',
      output: [
        { name: 'name', value: 'preferences/updates' },
        { name: 'prompt', value: 'Send me news and updates' },
        { name: 'required', value: true },
        { name: 'policies', value: [] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: false },
      ],
      input: [
        { name: 'IDToken6', value: false },
        { name: 'IDToken6validateOnly', value: false },
      ],
      _id: 5,
    },
    {
      type: 'ValidatedCreatePasswordCallback',
      output: [
        { name: 'echoOn', value: false },
        {
          name: 'policies',
          value: [
            { policyId: 'at-least-X-capitals', params: { numCaps: 1 } },
            { policyId: 'at-least-X-numbers', params: { numNums: 1 } },
            {
              policyId: 'cannot-contain-others',
              params: { disallowedFields: ['userName', 'givenName', 'sn'] },
            },
          ],
        },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'prompt', value: 'Password' },
      ],
      input: [
        { name: 'IDToken7', value: '' },
        { name: 'IDToken7validateOnly', value: false },
      ],
      _id: 6,
    },
    {
      type: 'KbaCreateCallback',
      output: [
        { name: 'prompt', value: 'Select a security question' },
        {
          name: 'predefinedQuestions',
          value: [`What's your favorite color?`, 'Who was your first employer?'],
        },
      ],
      input: [
        { name: 'IDToken8question', value: '' },
        { name: 'IDToken8answer', value: '' },
      ],
      _id: 7,
    },
    {
      type: 'KbaCreateCallback',
      output: [
        { name: 'prompt', value: 'Select a security question' },
        {
          name: 'predefinedQuestions',
          value: [`What's your favorite color?`, 'Who was your first employer?'],
        },
      ],
      input: [
        { name: 'IDToken9question', value: '' },
        { name: 'IDToken9answer', value: '' },
      ],
      _id: 8,
    },
    {
      type: 'TermsAndConditionsCallback',
      output: [
        { name: 'version', value: '0.0' },
        {
          name: 'terms',
          // eslint-disable-next-line
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        { name: 'createDate', value: '2019-10-28T04:20:11.320Z' },
      ],
      input: [{ name: 'IDToken10', value: false }],
      _id: 9,
    },
  ],
  header: 'Sign Up',
  description: 'Already have an account? <a href="#/service/Login">Sign In</a>',
};
