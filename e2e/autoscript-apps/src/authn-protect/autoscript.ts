/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2024 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
// @ts-nocheck
import * as forgerock from '@forgerock/javascript-sdk';
import { PIProtect } from '@forgerock/ping-protect';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'http://localhost:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const pauseBehaviorData = url.searchParams.get('pauseBehaviorData') || 'true';
  const tree = url.searchParams.get('tree') || 'TEST_LoginPingProtect';

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
    from(forgerock.FRAuth.start())
      .pipe(
        mergeMap(
          (step) => {
            if (step.getCallbacksOfType('PingOneProtectInitializeCallback')) {
              const cb = step.getCallbackOfType('PingOneProtectInitializeCallback');
              const config = cb.getConfig();

              console.log(JSON.stringify(config));

              try {
                return PIProtect.start(config);
              } catch (err) {
                cb.setClientError(err.message);
              }
            }
          },
          (step) => {
            return step;
          },
        ),
        mergeMap((step) => {
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Set values on auth tree callbacks');
          step.getCallbackOfType('NameCallback').setName(un);
          step.getCallbackOfType('PasswordCallback').setPassword(pw);

          return forgerock.FRAuth.next(step);
        }),
        mergeMap(
          (step) => {
            if (step.getCallbacksOfType('PingOneProtectEvaluationCallback')) {
              const cb = step.getCallbackOfType('PingOneProtectEvaluationCallback');

              try {
                // Asynchronous call
                return PIProtect.getData();
              } catch (err) {
                return err;
              }
            }
          },
          (step, data) => {
            return { step, data };
          },
        ),
        mergeMap(({ step, data }) => {
          const cb = step.getCallbackOfType('PingOneProtectEvaluationCallback');
          let pauseFlag = pauseBehaviorData === 'true' ? true : false;
          let shouldPause = false;

          if (pauseFlag) {
            shouldPause = cb.getPauseBehavioralData();
          }

          console.log(`getPauseBehavioralData: ${shouldPause}`);

          if (shouldPause) {
            PIProtect.pauseBehavioralData();
          }

          if (typeof data === 'string') {
            cb.setData(data);
          } else {
            cb.setClientError(data.message);
          }

          return forgerock.FRAuth.next(step);
        }),
        map((step) => {
          if (step.payload.status === 401) {
            throw new Error('Auth_Error');
          } else if (step.payload.tokenId) {
            console.log('Basic login with Protect successful');
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
