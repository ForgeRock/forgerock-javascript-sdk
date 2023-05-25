import { proxy } from '@forgerock/token-vault';

// Initialize the token vault proxy
proxy({
  app: {
    origin: 'http://localhost:8000',
    url: 'http://localhost:8000',
  },
  forgerock: {
    clientId: 'WebOAuthClient',
    serverConfig: {
      baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
      timeout: 3000,
    },
    realmPath: 'alpha',
    scope: 'openid profile me.read',
  },
});
