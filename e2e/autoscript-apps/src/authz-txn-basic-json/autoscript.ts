/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
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
  const amUrl = url.searchParams.get('amUrl') || 'http://localhost:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const igUrl = url.searchParams.get('igUrl'); // only use when testing against IG on different host
  const resourceOrigin = url.searchParams.get('resourceOrigin') || 'http://localhost:9443/resource';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'UsernamePassword';

  console.log('Configure the SDK');
  forgerock.Config.set({
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'START_AUTHENTICATE':
            if (
              action.payload.type === 'composite_advice' &&
              typeof action.payload.tree === 'string'
            ) {
              console.log('Starting authentication with composite advice');
            }
            break;
          case 'AUTHENTICATE':
            if (action.payload.tree === '') {
              console.log('Continuing authentication with composite advice');
            }
            break;
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
        } else if (step.payload.tokenId) {
          console.log('Basic login successful.');
          document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
          return step;
        } else {
          throw new Error('Something went wrong.');
        }
      }),
      rxDelay(delay),
      mergeMap(
        (step) => {
          console.log('Retrieve the protected resource');
          return forgerock.HttpClient.request({
            url: `${igUrl ? igUrl : resourceOrigin + '/ig/authz-by-txn'}`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
            authorization: {
              handleStep: async (step) => {
                console.log('IG resource requires additional authorization');
                step.getCallbackOfType('PasswordCallback').setPassword(pw);
                return step;
              },
            },
          });
        },
        async (step, response) => {
          if (response.ok) {
            console.log('Request to IG resource successfully responded');
          } else {
            throw new Error('IG Transactional Authorization was not successful');
          }
          return step;
        },
      ),
      rxDelay(delay),
      mergeMap((step) => {
        return forgerock.SessionManager.logout();
      }),
      map((response) => {
        if (response.ok) {
          console.log('Logout successful.');
          document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
        } else {
          throw new Error('Logout_Error');
        }
      }),
      rxDelay(delay),
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
}

autoscript();
export default autoscript;
