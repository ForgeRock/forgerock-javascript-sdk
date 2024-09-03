/**
 * Sample error responses from DaVinci
 */

export const error0a = {
  interactionId: '18d94e62-3625-4c53-bbfe-004a77cc2307',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'cqm26fxq1v',
  capabilityName: 'userLookup',
  errorCategory: 'NotSet',
  code: ' Invalid username and/or password',
  cause: null,
  expected: true,
  message: ' Invalid username and/or password',
  httpResponseCode: 400,
  isResponseCompatibleWithMobileAndWebSdks: true,
};

export const error0b = {
  interactionId: '17f3c003-7105-4955-8a79-db95387ce80b',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'agjdg5vxr2',
  capabilityName: 'createUser',
  errorCategory: 'NotSet',
  code: 400,
  cause: null,
  expected: true,
  message: 'invalidInput "username" - must not be blank',
  httpResponseCode: 400,
  isResponseCompatibleWithMobileAndWebSdks: true,
};

export const error0c = {
  interactionId: '17bf5caf-8296-4805-b0b4-78ecc30a28dc',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '53ab83a4a4ab919d9f2cb02d9e111ac8',
  connectorId: 'errorConnector',
  id: 'ww868uq428',
  capabilityName: 'customErrorMessage',
  errorCategory: 'NotSet',
  code: 'Unexpected value received',
  cause: null,
  expected: true,
  message: 'An unexpected error has occurred',
  httpResponseCode: 400,
  isResponseCompatibleWithMobileAndWebSdks: true,
};

// Bad Password
export const error1a = {
  interactionId: '18bd524d-4afd-4f79-a0b5-a4f16b63bf48',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'dnu7jt3sjz',
  capabilityName: 'checkPassword',
  errorCategory: 'Unexpected',
  code: ' Invalid username and/or password',
  cause: null,
  expected: false,
  message: ' Invalid username and/or password',
  httpResponseCode: 400,
  details: [
    {
      rawResponse: {
        id: '5c72f2de-8eea-46b5-877f-cb61dcae294d',
        code: 'INVALID_DATA',
        message:
          'The request could not be completed. One or more validation errors were in the request.',
        details: [
          {
            code: 'INVALID_VALUE',
            target: 'password',
            message: 'The provided password did not match provisioned password',
            innerError: {
              failuresRemaining: 3,
            },
          },
        ],
      },
      statusCode: 400,
    },
  ],
  isResponseCompatibleWithMobileAndWebSdks: true,
};

export const error1b = {
  interactionId: '1754547c-0ce7-4075-a1c7-23ca17a59830',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: '0c41v9ejkb',
  capabilityName: 'resetPassword',
  errorCategory: 'Unexpected',
  code: 400,
  cause: null,
  expected: false,
  message:
    'newPasswordNotValid newPassword: New password did not satisfy password policy requirements',
  httpResponseCode: 400,
  details: [
    {
      rawResponse: {
        id: '4ddf56dd-03d3-43d0-befa-ed557e27d332',
        code: 'INVALID_DATA',
        message:
          'The request could not be completed. One or more validation errors were in the request.',
        details: [
          {
            code: 'INVALID_VALUE',
            target: 'newPassword',
            message:
              'New password did not satisfy password policy requirements',
            innerError: {
              unsatisfiedRequirements: ['history'],
              history:
                'The provided new password cannot be the same as the current password or any password in the password history.',
            },
          },
        ],
      },
      statusCode: 400,
    },
  ],
  isResponseCompatibleWithMobileAndWebSdks: true,
};

// Bad username
export const error1c = {
  interactionId: '172de989-bb7f-4f05-aa38-a004b1c4cc16',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'cqm26fxq1v',
  capabilityName: 'userLookup',
  errorCategory: 'Expected',
  code: ' Invalid username and/or password',
  cause: null,
  expected: true,
  message: ' Invalid username and/or password',
  httpResponseCode: 400,
  details: [
    {
      rawResponse: {
        _embedded: {
          users: [],
        },
        count: 0,
        size: 0,
        userFilter: '(username eq "sdfsdfsdfsdf")',
      },
      statusCode: 200,
    },
  ],
  isResponseCompatibleWithMobileAndWebSdks: true,
};

// Registration with invalid email
export const error1d = {
  interactionId: '1742de9b-43be-4a26-bace-e0793c88f882',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'agjdg5vxr2',
  capabilityName: 'createUser',
  errorCategory: 'InvalidData',
  code: 400,
  cause: null,
  expected: true,
  message: 'invalidValue email: must be a well-formed email address',
  httpResponseCode: 400,
  details: [
    {
      rawResponse: {
        id: 'cc33f141-18ea-4e94-ad2b-ce031df11b3a',
        code: 'INVALID_DATA',
        message:
          'Validation Error : [email must be a well-formed email address]',
        details: [
          {
            code: 'INVALID_VALUE',
            target: 'email',
            message: 'must be a well-formed email address',
          },
        ],
      },
      statusCode: 400,
    },
  ],
  isResponseCompatibleWithMobileAndWebSdks: true,
};

export const error2 = {
  interactionId: '18bd524d-4afd-4f79-a0b5-a4f16b63bf48',
  code: 'requestTimedOut',
  message: 'Request timed out. Please try again.',
};

export const error3 = {
  cause: null,
  logLevel: 'error',
  serviceName: null,
  message: 'Unauthorized!',
  errorMessage: 'Unauthorized!',
  success: false,
  httpResponseCode: 401,
  code: 1999,
};

// Bad username
export const error4 = {
  interactionId: '175a98ab-5048-434c-8734-d82eb33fe975',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  connectionId: '94141bf2f1b9b59a5f5365ff135e02bb',
  connectorId: 'pingOneSSOConnector',
  id: 'dnu7jt3sjz',
  capabilityName: 'checkPassword',
  isErrorCustomized: true,
  errorCategory: 'NotSet',
  code: 'validationError',
  cause: null,
  metricAttributes: {
    errorCustomization: 'NONE',
  },
  expected: true,
  message: 'Validation Error',
  httpResponseCode: 400,
  details: [
    {
      message: 'identifer must be a uuid',
    },
  ],
  doNotSendToOE: true,
};
