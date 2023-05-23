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
import { fromEvent } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'PasswordlessWebAuthn';
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
  /***
   * Test Device Registration (Not Automated)
   * must create cert because you cannot have a TLS error with webauthn to test manually
   */
  /***
   * Test Device Registration (Not Automated)
   * must create cert because you cannot have a TLS error with webauthn to test manually
   */
  console.log('Click the device registration button!');
  const deviceRegistration = document.querySelector('.device-registration');
  fromEvent(deviceRegistration, 'click')
    .pipe(
      mergeMap(() => {
        console.log('Initiate first step with `undefined`');
        return forgerock.FRAuth.next();
      }),
      rxDelay(delay),
      mergeMap((step) => {
        console.log('Set username on auth tree callback');
        console.log(step);
        step.getCallbackOfType('NameCallback').setName(un);
        return forgerock.FRAuth.next(step);
      }),
      rxDelay(delay),
      mergeMap((step) => {
        console.log('Set password on auth tree callback');
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      mergeMap(async (step) => {
        const webAuthnStep = forgerock.FRWebAuthn.getWebAuthnStepType(step);
        if (webAuthnStep === 2) {
          console.log('WebAuthn step is registration');
        } else {
          throw new Error('WebAuthn step is incorrectly identified');
        }
        console.log('Handle WebAuthn Registration');
        try {
          step = await forgerock.FRWebAuthn.register<'mydevice'>(step, 'mydevice');
          // ensure the step here has the 'mydevice' name at the end of the value. (outcome)
          const deviceValue = step.getCallbacksOfType('HiddenValueCallback')[0].getInputValue();
          if (!deviceValue.includes('mydevice')) {
            throw new Error('Device name is not correct');
          }
        } catch (err) {
          console.log(err);
        }
        return forgerock.FRAuth.next(step);
      }),
      map((step) => {
        console.log('step', step);
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
