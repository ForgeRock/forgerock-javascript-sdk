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
  const tree = url.searchParams.get('tree') || 'UsernamePassword';

  console.log('Configure the SDK');
  forgerock.Config.set({
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'START_AUTHENTICATE':
          case 'AUTHENTICATE':
            console.log('Adding "noSession" query param to URL');
            req.url.searchParams.append('noSession', 'true');
        }
        next();
      },
    ],
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
          console.log('Set values on auth tree callbacks');
          step.getCallbackOfType('NameCallback').setName(un);
          step.getCallbackOfType('PasswordCallback').setPassword(pw);
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        map((step) => {
          if (step.payload.status === 401) {
            throw new Error('Auth_Error');
          } else if (step.payload.ok) {
            console.log('Basic login with "noSession" completed successfully');
            document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
          } else {
            throw new Error('Something went wrong.');
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
