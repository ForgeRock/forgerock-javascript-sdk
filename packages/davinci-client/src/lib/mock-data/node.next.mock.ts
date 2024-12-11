export const nodeNext0 = {
  cache: { key: '1234' },
  client: {
    action: 'SIGNON',
    description: '',
    collectors: [
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'username-0',
        name: 'username',
        input: { key: 'username', value: '', type: 'TEXT' },
        output: { key: 'username', label: 'Username', type: 'TEXT', value: '' },
      },
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'PasswordCollector',
        id: 'password-1',
        name: 'password',
        input: { key: 'password', value: '', type: 'PASSWORD' },
        output: { key: 'password', label: 'Password', type: 'PASSWORD' },
      },
      {
        category: 'ActionCollector',
        error: null,
        type: 'SubmitCollector',
        id: 'SIGNON-2',
        name: 'SIGNON',
        output: {
          key: 'SIGNON',
          label: 'Sign On',
          type: 'SUBMIT_BUTTON',
        },
      },
      {
        category: 'ActionCollector',
        error: null,
        type: 'SubmitCollector',
        id: 'TROUBLE-3',
        name: 'TROUBLE',
        output: {
          key: 'TROUBLE',
          label: 'Having trouble signing on?',
          type: 'SUBMIT_BUTTON',
        },
      },
      {
        category: 'ActionCollector',
        error: null,
        type: 'SubmitCollector',
        id: 'REGISTER-4',
        name: 'REGISTER',
        output: {
          key: 'REGISTER',
          label: 'No account? Register now!',
          type: 'SUBMIT_BUTTON',
        },
      },
    ],
    name: 'Username/Password Form',
    status: 'continue',
  },
  error: null,
  server: {
    _links: {
      next: {
        href: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHTMLTemplate',
      },
    },
    id: 'cq77vwelou',
    interactionId: '17f7bb13-1b03-4203-acb4-ccd4afaec908',
    interactionToken:
      '222f461a945b158b3ad63d75d24d3d1a6122938c600d6681bb33fc4b07abf59c69d65e2c1aadf00958df463aaf2ac483b63250d301a6ea92f07423ab39bbde8fb9ba5bc2e4dfbc9e3d03525a4ba954a119f11de0d614b090e7a5798fb3330194af6d967c1456d2c9429d8c72dee86f4ba5fd5bafc954df0d53b54a7ceb8ef404',
    eventName: 'continue',
    status: 'continue',
  },
  status: 'continue',
  httpStatus: 200,
};
