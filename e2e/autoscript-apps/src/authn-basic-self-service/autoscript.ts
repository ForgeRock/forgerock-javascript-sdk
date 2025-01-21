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
import * as forgerock from '@forgerock/javascript-sdk';
import { deviceClient } from '@forgerock/javascript-sdk/device-client';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://openam-sdks.forgeblocks.com/am';
  const realmPath = url.searchParams.get('realmPath') || 'alpha';
  const un = url.searchParams.get('un') || 'demo';
  const platformHeader = url.searchParams.get('platformHeader') === 'true' ? true : false;
  const pw = url.searchParams.get('pw') || 'Demo1234!';
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

            //const { result: deviceArr } = await client.oath.get({
            //  userId: user.sub,
            //  realm: 'alpha',
            //});
            //
            //console.log('retrieveOathDevices', deviceArr);
            //
            //const [{ _id: id, _rev, deviceManagementStatus, ...device }] = deviceArr;

            //const oathDeviceDeleted = await client.oath.delete({ userId: user.sub, id, ...device });

            //console.log(oathDeviceDeleted);

            //const { result: pushDevices } = await client.push.get({
            //  userId: user.sub,
            //  realm: 'alpha',
            //});
            //
            const bindingDevices = await client.boundDevices.get({
              userId: user.sub,
              realm: 'alpha',
            });
            //console.log('bindingDevices', bindingDevices);
            //
            //const webauthnDevices = await client.webauthn.get({
            //  userId: user.sub,
            //  realm: 'alpha',
            //});
            //console.log('webauthn devices', webauthnDevices);
            //const {
            //  _id: userId,
            //  _rev: ignoreThis,
            //  deviceManagementStatus: ignoreDeviceManagementStatus,
            //  ...rest
            //} = webauthnDevices.result[0];
            //
            //const updatedDevice = await client.webauthn.update({
            //  userId: user.sub,
            //  realm: 'alpha',
            //  ...rest,
            //  deviceName: 'RyansDeviceUpdated!!',
            //});
            //console.log('updatedDevice', updatedDevice);
            //
            const bindingDeviceNameUpdated = await client.boundDevices.update({
              userId: user.sub,
              realm: 'alpha',
              ...bindingDevices.result[0],
              deviceName: 'RyanDevice',
            });

            console.log('bindingDeviceNameUpdated', bindingDeviceNameUpdated);

            const removedDevice = await client.boundDevices.delete({
              realm: 'alpha',
              userId: user.sub,
              ...bindingDeviceNameUpdated,
            });
            //console.log('removeDevice', removedDevice);
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
