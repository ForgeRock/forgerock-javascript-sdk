// eslint-disable-next-line @nx/enforce-module-boundaries
import { interceptor } from '../../packages/token-vault/src/index';

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
