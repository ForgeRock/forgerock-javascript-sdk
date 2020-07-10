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
          value: 'Lorem ipsum dolor sit amet ...',
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
