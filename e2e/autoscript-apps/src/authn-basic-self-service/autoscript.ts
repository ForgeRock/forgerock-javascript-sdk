/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import * as forgerock from '@forgerock/javascript-sdk';
import { deviceClient } from '@forgerock/javascript-sdk/device-client';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import type {
  Device,
  DeviceResponse,
  OAthResponse,
  WebAuthnDevicesResponse,
} from '@forgerock/javascript-sdk/device-client/types';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://openam-sdks.forgeblocks.com/am';
  const realmPath = url.searchParams.get('realmPath') || 'alpha';
  const un = url.searchParams.get('un') || 'spetrov';
  const platformHeader = url.searchParams.get('platformHeader') === 'true' ? true : false;
  const pw = url.searchParams.get('pw') || '1111';
  const tree = url.searchParams.get('tree') || 'selfservice';

  console.log('Configure the SDK');
  forgerock.Config.set({
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'START_AUTHENTICATE':
            if (action.payload.type === 'service' && typeof action.payload.tree === 'string') {
              console.log('Starting authentication with service');
            }
            break;
          case 'AUTHENTICATE':
            if (action.payload.type === 'service' && typeof action.payload.tree === 'string') {
              console.log('Continuing authentication with service');
            }
            break;
        }
        next();
      },
    ],
    platformHeader,
    realmPath,
    tree,
    clientId: 'WebOAuthClient',
    scope: 'profile email me.read openid',
    redirectUri: `${window.location.origin}/src/_callback/index.html`,
    serverConfig: {
      baseUrl: amUrl,
      timeout: 3000,
    },
  });

  console.log(`${window.location.origin}/_callback/index.html`);
  try {
    forgerock.SessionManager.logout();
  } catch (err) {
    // Do nothing
  }

  console.log('Initiate first step with `undefined`');
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    from(forgerock.FRAuth.start())
      .pipe(
        mergeMap((step) => {
          console.log('Set values on auth tree callbacks');
          step.getCallbackOfType('NameCallback').setName(un);
          step.getCallbackOfType('PasswordCallback').setPassword(pw);
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap(async (step) => {
          try {
            const tokens = await forgerock.TokenManager.getTokens();
            console.log('here', tokens);
            return tokens;
          } catch (err) {
            console.log(err);
          }
          return false;
        }),
        rxDelay(delay),
        mergeMap(async () => {
          const client = deviceClient({
            realmPath,
            tree,
            clientId: 'WebOAuthClient',
            scope: 'profile email me.read openid',
            serverConfig: {
              baseUrl: amUrl,
              timeout: 3000,
            },
          });

          try {
            const user = await forgerock.UserManager.getCurrentUser();

            const query = { userId: user.sub, realm: 'alpha' };

            const boundArr = await client.bound.get(query);
            console.log('BOUND GET', boundArr);
            if (Array.isArray(boundArr)) {
              const [bound] = boundArr;
              console.log('updated bound', bound);
              const updatedBound = await client.bound.update({
                ...query,
                device: { ...bound, deviceName: 'BoundDeviceRyan' },
              });
              console.log('updated', updatedBound);

              if ('error' in updatedBound) return;

              const deletedBound = await client.bound.delete({
                ...query,
                device: updatedBound,
              });
              console.log(updatedBound);
            }
          } catch (err) {
            console.log('failed', err);
          }
        }),
      )
      .subscribe({
        error: (err) => {
          console.log(`Error: ${err.message}`);
          document.body.innerHTML = `<p class="Test_Complete">${err.message}</p>`;
        },
        complete: () => {
          console.log('Test script complete');
          document.body.innerHTML = `<p class="Test_Complete">Test script complete</p>`;
        },
      });
  }, 250);
}
autoscript();

export default autoscript;
