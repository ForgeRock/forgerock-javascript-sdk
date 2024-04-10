import { generateUrlsToIntercept } from './worker.utilities.js';

// Test that the generateUrlsToIntercept function returns the expected array of URLs
test('generateUrlsToIntercept returns the expected array of URLs', () => {
  const config = {
    forgerock: {
      serverConfig: {
        baseUrl: 'https://openam.forgerock.com/am',
      },
      realmPath: 'root',
    },
    interceptor: {
      urls: ['https://example.com/path', 'https://alt.example.com/*'],
      scope: '/',
    },
  };
  const expectedUrls = [
    'https://example.com/path',
    'https://alt.example.com/*',
    'https://openam.forgerock.com/am/oauth2/realms/root/access_token',
    'https://openam.forgerock.com/am/oauth2/realms/root/connect/endSession?',
    'https://openam.forgerock.com/am/oauth2/realms/root/token/revoke',
    'https://openam.forgerock.com/am/oauth2/realms/root/userinfo',
  ];

  expect(generateUrlsToIntercept(config)).toEqual(expectedUrls);
});

// Test generateUrlsToIntercept with /alpha as the realmPath
test('generateUrlsToIntercept returns the expected array of URLs with /alpha as the realmPath', () => {
  const config = {
    forgerock: {
      serverConfig: {
        baseUrl: 'https://openam.forgerock.com/am',
      },
      realmPath: '/alpha',
    },
    interceptor: {
      urls: ['https://example.com/path', 'https://alt.example.com/*'],
      scope: '/',
    },
  };
  const expectedUrls = [
    'https://example.com/path',
    'https://alt.example.com/*',
    'https://openam.forgerock.com/am/oauth2/realms/root/realms/alpha/access_token',
    'https://openam.forgerock.com/am/oauth2/realms/root/realms/alpha/connect/endSession?',
    'https://openam.forgerock.com/am/oauth2/realms/root/realms/alpha/token/revoke',
    'https://openam.forgerock.com/am/oauth2/realms/root/realms/alpha/userinfo',
  ];

  expect(generateUrlsToIntercept(config)).toEqual(expectedUrls);
});
