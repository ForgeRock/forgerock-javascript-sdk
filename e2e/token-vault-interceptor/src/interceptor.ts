/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

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
