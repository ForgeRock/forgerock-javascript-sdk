import { interceptor } from '@forgerock/token-vault';

// Initialize the token vault interceptor
interceptor({
  interceptor: {
    urls: ['https://jsonplaceholder.typicode.com/*'],
  },
  forgerock: {
    serverConfig: {
      baseUrl: 'https://auth.example.com:9443/am',
    },
    realmPath: 'root',
  },
});
