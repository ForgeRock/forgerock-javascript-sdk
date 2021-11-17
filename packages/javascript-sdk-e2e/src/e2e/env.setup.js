/*
 * @forgerock/javascript-sdk
 *
 * env.setup.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const { setup: setupDevServer } = require('jest-dev-server');
const liveServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
  {
    command: 'npm run start:server:live',
    port: 9443,
  },
];
const mockServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
  {
    command: 'npm run start:server',
    port: 9443,
  },
];
const servers = process.env.LIVE === 'true' ? liveServers : mockServers;

module.exports = async () => {
  await setupDevServer(servers);
};
