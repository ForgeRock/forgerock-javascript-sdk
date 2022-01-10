/*
 * @forgerock/javascript-sdk
 *
 * authn-social-login-idm
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import * as forgerock from '@forgerock/javascript-sdk';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am/';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const tree = url.searchParams.get('tree') || 'AMSocialLogin';
  const provider = url.searchParams.get('provider') || 'google';
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  console.log('Initiate first step with `undefined`');
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    if (code && state) {
      // Below three lines are needed for automation only
      const returnParamsString = window.localStorage.getItem('returnParams');
      window.localStorage.removeItem('returnParams');
      const { amUrl, realmPath, tree } = JSON.parse(returnParamsString as string);

      forgerock.Config.set({
        realmPath,
        serverConfig: {
          baseUrl: amUrl,
          timeout: 5000,
        },
        tree,
      });

      console.log('Returning from provider');

      from(forgerock.FRAuth.resume(window.location.href))
        .pipe(
          map((step) => {
            if (step.payload.status === 401) {
              throw new Error('Auth_Error');
            } else if (step.payload.tokenId) {
              console.log('Social Login successful');
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
    } else {
      console.log('Configure the SDK');
      forgerock.Config.set({
        realmPath,
        serverConfig: {
          baseUrl: amUrl,
          timeout: 5000,
        },
        tree,
      });

      try {
        forgerock.SessionManager.logout();
      } catch (err) {
        // Do nothing
      }
      from(forgerock.FRAuth.next())
        .pipe(
          mergeMap((step) => {
            console.log('Set provider on SelectIdPCallback');
            (step as any).getCallbackOfType('ChoiceCallback' as any).setChoiceValue(provider);
            return forgerock.FRAuth.next(step as any);
          }),
          rxDelay(delay),
          map((step) => {
            if (!(step as any).getCallbackOfType('RedirectCallback')) {
              throw new Error('Expected callback of RedirectCallback not received');
            }

            // The returnParams are needed for just this test automation
            const returnParams = {
              amUrl,
              provider,
              realmPath,
              tree,
            };
            window.localStorage.setItem('returnParams', JSON.stringify(returnParams));

            console.log('Redirect to ID Provider');
            forgerock.FRAuth.redirect(step as any);
          }),
        )
        .subscribe({
          error: (err) => {
            console.log(`Error: ${err.message}`);
            document.body.innerHTML = `<p class="Test_Complete">${err.message}</p>`;
          },
          complete: () => {
            console.log('Test script complete');
            document.body.innerHTML = `<p class="Test_Continued">Redirection starting ...</p>`;
          },
        });
    }
  }, 250);
}

autoscript();
export default autoscript;
