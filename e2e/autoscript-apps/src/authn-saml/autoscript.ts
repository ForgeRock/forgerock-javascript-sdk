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
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am/';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const tree = url.searchParams.get('tree') || 'SAMLTest'; // the specific tree for the mock api
  const responsekey = url.searchParams.get('responsekey') || '';
  const error = url.searchParams.get('error');
  const errorMessage = url.searchParams.get('errorMessage');
  const errorCode = url.searchParams.get('errorCode') ?? false;

  forgerock.Config.set({
    realmPath,
    serverConfig: {
      baseUrl: amUrl,
      timeout: 5000,
    },
    tree,
  });

  console.log('Initiate first step with `undefined`');
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    if (responsekey || error) {
      from(forgerock.FRAuth.resume(window.location.href))
        .pipe(
          map((step) => {
            console.log('resumed');
            if (error) {
              console.log(errorCode);
              console.log(errorMessage);
              document.body.innerHTML = '<p class="Logged_In">Login Error!</p>';
            } else if (step.payload.ok) {
              console.log('SAML Login successful');
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

      try {
        forgerock.SessionManager.logout();
      } catch (err) {
        // Do nothing
      }
      from(forgerock.FRAuth.next())
        .pipe(
          mergeMap((step) => {
            console.log('init step');
            const nameCallback = step.getCallbackOfType('NameCallback');
            nameCallback.setName('samltest');

            return forgerock.FRAuth.next(step);
          }),
          map((step) => {
            if (!(step as any).getCallbackOfType('RedirectCallback')) {
              throw new Error('Expected callback of RedirectCallback not received');
            }
            console.log('redirecting...');
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
