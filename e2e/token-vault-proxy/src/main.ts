import { proxy } from '@forgerock/token-vault';

// Initialize the token vault proxy
proxy({
  app: {
    origin: 'http://localhost:5823',
  },
  forgerock: {
    clientId: 'CentralLoginOAuthClient',
    oauthThreshold: 5000,
    scope: 'openid profile me.read',
    serverConfig: {
      baseUrl: import.meta.env.VITE_AM_URL,
      timeout: 5000,
    },
    realmPath: import.meta.env.VITE_AM_REALM,
  },
  proxy: {
    urls: ['https://jsonplaceholder.typicode.com/*'],
  },
});
