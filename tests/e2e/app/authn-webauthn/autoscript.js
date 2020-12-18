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
  const un = url.searchParams.get('un') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const pw = url.searchParams.get('pw') || 'ieH034K&-zlwqh3V_';
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

  console.log('Initiate first step with `undefined`');
  rxjs
    .from(forgerock.FRAuth.next())
    .pipe(
      rxMergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('NameCallback').setName(un);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Choose Passwordless login');
        const cb = step.getCallbackOfType('ChoiceCallback');
        cb.setChoiceIndex(0);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          const webAuthnStep = forgerock.FRWebAuthn.getWebAuthnStepType(step);
          if (webAuthnStep === 2) {
            console.log('WebAuthn step is registration');
          } else {
            throw new Error('WebAuthn step is incorrectly identified');
          }
          console.log('Handle WebAuthn Registration');
          return forgerock.FRWebAuthn.register(step);
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Send WebAuthn Credentials');
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Check for Display Recovery Codes step');
        const isDisplayStep = forgerock.FRRecoveryCodes.isDisplayStep(step);
        const recoveryCodes = forgerock.FRRecoveryCodes.getCodes(step);
        console.log(isDisplayStep ? 'Display recovery codes' : 'Missing recovery codes');
        console.log(recoveryCodes.length === 10 ? 'Parsed all codes' : 'Unable to parse all codes');
        return forgerock.FRAuth.next(step);
      }),
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
      rxMergeMap(() => {
        console.log('Log back in with WebAuthn');
        return forgerock.FRAuth.next();
      }),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        step.getCallbackOfType('NameCallback').setName(un);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          const webAuthnStep = forgerock.FRWebAuthn.getWebAuthnStepType(step);
          if (webAuthnStep === 1) {
            console.log('WebAuthn step is authentication');
          } else {
            throw new Error('WebAuthn step is incorrectly identified');
          }
          console.log('Handle WebAuthn Authenticate');
          return forgerock.FRWebAuthn.authenticate(step);
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        console.log('Send WebAuthn Credentials');
        return forgerock.FRAuth.next(step);
      }),
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
