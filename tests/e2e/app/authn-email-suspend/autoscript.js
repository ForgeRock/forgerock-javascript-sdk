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
  const tree = url.searchParams.get('tree') || 'LoginWithEmail';
  const un = url.searchParams.get('un') || 'sdkuser';

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
    rxjs
      .from(forgerock.FRAuth.next())
      .pipe(
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Set values on Platform Username callback');
          step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMap((step) => {
          console.log('Get message from SuspendedTextOutputCallback callback');
          const msg = step.getCallbackOfType('SuspendedTextOutputCallback').getMessage();
          console.log(msg);
          if (msg.length) {
            return null;
          } else {
            throw new Error('SuspendedTextOutputCallback did not return message');
          }
        }),
        rxjs.operators.delay(delay),
        rxMergeMap(() => {
          console.log('Collect Suspended ID');
          // Tester can add a predefined/mock suspendedId to the URL
          // Or, tester can add a real suspendedId from AM using the prompt element
          if (window.location.href.includes('suspendedId')) {
            return forgerock.FRAuth.resume(window.location.href, {
              realmPath: realmPath,
            });
          } else {
            const id = window.prompt('What is your suspended ID?');
            return forgerock.FRAuth.next(null, {
              query: {
                suspendedId: id,
              },
              realmPath: realmPath,
            });
          }
        }),
        rxjs.operators.delay(delay),
        rxMap(
          (step) => {
            if (step.payload.code === 401) {
              throw new Error('Auth_Error');
            } else if (step.payload.tokenId) {
              console.log('Login with email successful');
              document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
            } else {
              throw new Error('Something went wrong.');
            }
          },
          (step) => step,
        ),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          return forgerock.SessionManager.logout();
        }),
        rxMap((response) => {
          if (response.ok) {
            console.log('Logout successful');
            document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
          } else {
            throw new Error('Logout_Error');
          }
        }),
        rxTap(
          () => {},
          (err) => {
            console.log(`Error: ${err.message}`);
            document.body.innerHTML = `<p class='${err.message}'>${err.message}</p>`;
          },
          () => {},
        ),
      )
      .subscribe(
        (data) => {},
        (err) => {},
        () => {
          console.log('Test script complete');
          document.body.innerHTML = `<p class='Test_Complete'>Test script complete</p>`;
        },
      );
  }, 250);
})();
