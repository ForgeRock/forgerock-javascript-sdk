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
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'PlatformUsernamePasswordTest';

  console.log('Configure the SDK');
  forgerock.Config.set({
    realmPath,
    tree,
    serverConfig: {
      baseUrl: amUrl,
    },
  });

  try {
    forgerock.SessionManager.logout();
  } catch (err) {
    // Do nothing
  }

  console.log('Initiate first step with `undefined`');
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    from(forgerock.FRAuth.next())
      .pipe(
        mergeMap((step) => {
          console.log('Set values on auth tree callbacks for validation only');
          const unCb = step.getCallbackOfType('ValidatedCreateUsernameCallback');
          // In order to pass validation (with existing username in AM),
          // the valid-username policy needs to be removed from the IDM managed user object
          unCb.setName(un);
          unCb.setValidateOnly(true);

          const pwCb = step.getCallbackOfType('ValidatedCreatePasswordCallback');
          pwCb.setPassword(pw);
          pwCb.setValidateOnly(true);

          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Set values on auth tree callbacks for submission');
          const unCb = step.getCallbackOfType('ValidatedCreateUsernameCallback');
          unCb.setName(un);
          unCb.setValidateOnly(false);

          const pwCb = step.getCallbackOfType('ValidatedCreatePasswordCallback');
          pwCb.setPassword(pw);
          pwCb.setValidateOnly(false);

          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        map(
          (step) => {
            if (step.payload.status === 401) {
              throw new Error('Auth_Error');
            } else if (step.payload.tokenId) {
              console.log('Basic login with platform nodes successful');
              document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
            } else {
              throw new Error('Something went wrong.');
            }
          },
          (step) => step,
        ),
        rxDelay(delay),
        mergeMap((step) => {
          return forgerock.SessionManager.logout();
        }),
        map((response) => {
          if (response.ok) {
            console.log('Logout successful');
            document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
          } else {
            throw new Error('Logout_Error');
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
