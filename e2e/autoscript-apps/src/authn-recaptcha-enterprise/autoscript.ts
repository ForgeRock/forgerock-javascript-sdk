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
  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'http://localhost:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const tree = url.searchParams.get('tree') || 'RecaptchaEnterprise'; // the specific tree for the mock api

  console.log('here we are');
  forgerock.Config.set({
    realmPath,
    clientId: 'WebAuth',
    serverConfig: {
      baseUrl: amUrl,
      timeout: 5000,
    },
    tree,
  });

  return setTimeout(function () {
    from(forgerock.FRAuth.next())
      .pipe(
        mergeMap((step) => {
          console.log('Get username password page node');
          const unCb = step.getCallbackOfType(forgerock.CallbackType.NameCallback);
          const pwCb = step.getCallbackOfType(forgerock.CallbackType.PasswordCallback);
          // In order to pass validation (with existing username in AM),
          // the valid-username policy needs to be removed from the IDM managed user object
          unCb.setName('demo');

          pwCb.setPassword('Password');
          //pwCb.setValidateOnly(true);

          console.log('submitting username step', step);
          return forgerock.FRAuth.next(step);
        }),
        mergeMap((step) => {
          console.log('we are in recaptcha step', step);

          const recaptchaCb = step.getCallbackOfType<forgerock.ReCaptchaEnterpriseCallback>(
            forgerock.CallbackType.ReCaptchaEnterpriseCallback,
          ) as forgerock.ReCaptchaEnterpriseCallback;

          recaptchaCb.setResult('123');
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(1000),
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
      )
      .subscribe({
        error: (err) => {
          console.log(`Error: ${err.message}`);
          document.body.innerHTML = `<p class="Test_Complete">${err.message}</p>`;
        },
        complete: () => {
          console.log('Test script complete');
          document.body.innerHTML = `<p class="Test_Complete">Test Script Complete</p>`;
        },
      });
  });
}

autoscript();
