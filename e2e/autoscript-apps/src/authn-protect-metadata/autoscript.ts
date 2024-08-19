/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2024 ForgeRock. All rights reserved.
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
  const tree = url.searchParams.get('tree') || 'TEST_MetadataMarketPlace';

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
            const parsed = PIProtect.getDerivedCallback(step);

            try {
              if ('getConfig' in parsed) {
                const config = parsed.getConfig();
                console.log('start protect');
                return PIProtect.start(config);
              }
            } catch (err) {
              const cb = (step as forgerock.Step).getCallbackOfType(
                'MetadataCallback',
              ) as forgerock.MetadataCallback;

              const parsed = cb.getDerivedCallback(
                step,
              ) as forgerock.PingOneProtectInitializeCallback;
              const hiddenCb = (step as forgerock.Step).getCallbackOfType(
                forgerock.CallbackType.HiddenValueCallback,
              );
              console.log('ERROR ');
              parsed.setClientError('we had a failure', hiddenCb);
            }
          },
          (step) => {
            return step;
          },
        ),
        mergeMap((step) => {
          console.log('Submitting ping protect start');
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),

        mergeMap(async (step) => {
          console.warn(step);
          const parsed = PIProtect.getDerivedCallback(
            step,
          ) as forgerock.PingOneProtectEvaluationCallback;

          try {
            console.log('getting data');
            const data = await PIProtect.getData();

            const hiddenCb = (step as forgerock.Step).getCallbacksOfType(
              forgerock.CallbackType.HiddenValueCallback,
            )[0] as forgerock.HiddenValueCallback;

            hiddenCb.setInputValue(data);

            console.log('Submitting ping protect evaluation');
            return forgerock.FRAuth.next(step);
          } catch (err) {
            return err;
          }
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
