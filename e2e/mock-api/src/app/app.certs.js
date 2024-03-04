/*
 * @forgerock/javascript-sdk
 *
 * app.certs.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { createCA, createCert } from 'mkcert';

const ca = await createCA({
  organization: 'Hello CA',
  countryCode: 'NP',
  state: 'Bagmati',
  locality: 'Kathmandu',
  validity: 365,
});

const { cert, key } = await createCert({
  ca: { key: ca.key, cert: ca.cert },
  domains: ['127.0.0.1', 'localhost', 'api.example.com', 'user.example.com', 'auth.example.com'],
  validity: 365,
});

export { cert, key };
