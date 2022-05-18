/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
// @ts-nocheck
import * as forgerock from '@forgerock/javascript-sdk/bundles/index.umd.js';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);

  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const tree = url.searchParams.get('tree') || 'Registration';

  console.log('Configure the SDK');
  try {
    forgerock.Config.set({
      realmPath,
      tree,
      serverConfig: {
        baseUrl: amUrl,
      },
    });

    console.log('Config was loaded');
    document.body.innerHTML = `<p class='Test_Complete'>Test Complete</p>`;
  } catch (err) {
    document.body.innerHTML = `<p class='Test_Complete'>${err.message}</p>`;
  }
  // Wrapping in setTimeout to give the test time to bind listener to console.log
}

autoscript();
export default autoscript;
