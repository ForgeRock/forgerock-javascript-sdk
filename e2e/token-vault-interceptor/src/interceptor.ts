import { interceptor } from '@forgerock/token-vault';

// Initialize the token vault interceptor
interceptor({
  interceptor: {
    urls: ['https://jsonplaceholder.typicode.com/*'],
  },
  forgerock: {
    serverConfig: {
      baseUrl: import.meta.env.VITE_AM_URL || 'http://localhost:9443/am',
      timeout: 5000,
    },
    realmPath: import.meta.env.VITE_AM_REALM || 'root',
  },
});
