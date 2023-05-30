import { interceptor } from '@forgerock/token-vault';

// Initialize the token vault interceptor
interceptor({
  interceptor: {
    urls: ['jsonplaceholder.typicode.com'],
  },
  forgerock: {
    serverConfig: {
      baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
    },
    realmPath: 'alpha',
  },
});
