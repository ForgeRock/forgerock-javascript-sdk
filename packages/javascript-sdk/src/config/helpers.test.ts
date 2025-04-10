import { convertWellKnown } from './helpers';
import { frWellKnown, newPiWellKnown, piWellKnown } from './well-known.mock';

describe('Test config helpers', () => {
  it('should test wellknown response conversion ForgeRock', () => {
    const result = convertWellKnown(frWellKnown);
    const expected = {
      baseUrl: 'https://openam-spetrov.forgeblocks.com',
      paths: {
        accessToken: '/am/oauth2/alpha/access_token',
        authenticate: '/am/json/alpha/authenticate',
        authorize: '/am/oauth2/alpha/authorize',
        endSession: '/am/oauth2/alpha/connect/endSession',
        revoke: '/am/oauth2/alpha/token/revoke',
        sessions: '/am/json/alpha/sessions',
        userInfo: '/am/oauth2/alpha/userinfo',
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('should test wellknown response conversion from Ping', () => {
    const result = convertWellKnown(piWellKnown);
    const expected = {
      baseUrl: 'https://auth.pingone.ca',
      paths: {
        accessToken: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/token',
        authorize: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/authorize',
        endSession: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/signoff',
        revoke: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/revoke',
        userInfo: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/userinfo',
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('should test the new wellknown response conversion from Ping', () => {
    const result = convertWellKnown(newPiWellKnown);
    const expected = {
      baseUrl: 'https://auth.pingone.ca',
      paths: {
        accessToken: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/token',
        authorize: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/authorize',
        endSession: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/idpSignoff',
        revoke: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/revoke',
        userInfo: '/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/userinfo',
      },
    };
    expect(result).toStrictEqual(expected);
  });
});
