import OAuth2Client from '../../src/oauth2-client';
import PKCE from '../../src/util/pkce';
import { ResponseType } from '../../src/oauth2-client';

jest.mock('../../src/config', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get() {
      return {
        redirectUrl: 'https://sdkapp.example.com/',
        clientId: 'OAuth2ClientID',
        scope: 'openid email profile',
        serverConfig: {
          baseUrl: 'https://openam.example.com/am/',
          timeout: '3000',
        },
        support: 'modern',
        realmPath: '/alpha',
      };
    },
  };
});
jest.mock('../../src/util/pkce', () => {
  return {
    createVerifier(): string {
      return 'abcd';
    },
    createState(): string {
      return '1234';
    },
    createChallenge(): string {
      return 'wxyz';
    },
  };
});

describe('Test OAuth2Client methods', () => {
  it('should construct proper authorization URL', async (done) => {
    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();
    const authorizeUrlOptions = { responseType: ResponseType.Code, state, verifier };
    const authorizeUrl = await OAuth2Client.createAuthorizeUrl(authorizeUrlOptions);
    console.log(authorizeUrl);
    // eslint-disable-next-line
    expect(authorizeUrl).toBe('https://openam.example.com/am/oauth2/realms/root/realms/alpha/authorize?client_id=OAuth2ClientID&response_type=code&scope=openid%20email%20profile&state=1234&code_challenge=wxyz&code_challenge_method=S256');
    done();
  });
});
