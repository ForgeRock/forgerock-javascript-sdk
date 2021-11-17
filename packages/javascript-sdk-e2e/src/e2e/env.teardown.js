/*
 * @forgerock/javascript-sdk
 *
 * env.teardown.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const { teardown: teardownDevServer } = require('jest-dev-server');

module.exports = async () => {
  await teardownDevServer();
};
