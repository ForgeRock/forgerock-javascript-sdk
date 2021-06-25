/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

(function () {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const igUrl = url.searchParams.get('igUrl'); // only use when testing against IG on different host
  const resourceOrigin =
    url.searchParams.get('resourceOrigin') || 'https://api.example.com:9443/resource';
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
            if (
              action.payload.type === 'composite_advice' &&
              typeof action.payload.tree === 'string'
            ) {
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
  rxjs
    .from(forgerock.FRAuth.next())
    .pipe(
      rxMergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('NameCallback').setName(un);
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMap((step) => {
        if (step.payload.code === 401) {
          throw new Error('Auth_Error');
        } else if (step.payload.tokenId) {
          console.log('Basic login successful.');
          document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
          return step;
        } else {
          throw new Error('Something went wrong.');
        }
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Retrieve the protected resource');
          return forgerock.HttpClient.request({
            url: `${igUrl ? igUrl : resourceOrigin + '/ig/authz-by-tree'}`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
            authorization: {
              handleStep: async (step) => {
                console.log('IG resource requires additional authorization');
                step.getCallbackOfType('PasswordCallback').setPassword(pw);
                return Promise.resolve(step);
              },
            },
          });
        },
        (step, response) => {
          if (response.ok) {
            console.log('Request to IG resource successfully responded');
          } else {
            throw new Error('IG Transactional Authorization was not successful');
          }
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Logout before calling next resource');
        return forgerock.SessionManager.logout();
      }),
      rxMergeMap(() => {
        console.log('Re-authenticating to call next resource');
        return forgerock.FRAuth.next();
      }),
      rxMergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('NameCallback').setName(un);
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Retrieve the protected resource');
          return forgerock.HttpClient.request({
            url: `${resourceOrigin}/rest/authz-by-tree`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
            authorization: {
              handleStep: async (step) => {
                console.log('Rest resource requires additional authorization');
                step.getCallbackOfType('PasswordCallback').setPassword(pw);
                return Promise.resolve(step);
              },
            },
          });
        },
        async (step, response) => {
          const jsonResponse = await response.json();
          if (jsonResponse.message === 'Successfully retrieved resource!') {
            console.log('Request to REST resource successfully responded');
          } else {
            throw new Error('REST Transactional Authorization was not successful');
          }
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        return forgerock.SessionManager.logout();
      }),
      rxMap((response) => {
        if (response.ok) {
          console.log('Logout successful.');
          document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
        } else {
          throw new Error('Logout_Error');
        }
      }),
      rxjs.operators.delay(delay),
      rxTap(
        () => {},
        (err) => {
          console.log(`Error: ${err.message}`);
          document.body.innerHTML = `<p class="${err.message}">${err.message}</p>`;
        },
        () => {},
      ),
    )
    .subscribe(
      (data) => {},
      (err) => {},
      () => {
        console.log('Test script complete');
        document.body.innerHTML = `<p class="Test_Complete">Test script complete</p>`;
      },
    );
})();
