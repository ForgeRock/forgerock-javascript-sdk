const InvalidUsernamePassword = {
  interactionId: '18127a84-2fdb-40c7-8d61-78f9116449a5',
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
        id: '9785a004-3481-4070-9277-5c0497290315',
        code: 'INVALID_DATA',
        message:
          'The request could not be completed. One or more validation errors were in the request.',
        details: [
          {
            code: 'INVALID_VALUE',
            target: 'password',
            message: 'The provided password did not match provisioned password',
            innerError: {
              failuresRemaining: 4,
            },
          },
        ],
      },
      statusCode: 400,
    },
  ],
  isResponseCompatibleWithMobileAndWebSdks: true,
};

export { InvalidUsernamePassword };
