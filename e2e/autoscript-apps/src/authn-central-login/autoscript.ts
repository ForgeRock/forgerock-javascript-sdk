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
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const preAuthenticated = url.searchParams.get('preAuthenticated') || 'true';
  const code = url.searchParams.get('code') || '';
  const clientId = url.searchParams.get('clientId') || 'CentralLoginOAuthClient';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const state = url.searchParams.get('state') || '';
  const support = url.searchParams.get('support') || 'legacy';
  const acr_values = url.searchParams.get('acr') || 'SpecificTree';
  // in central login we use an auth query param for the return of our mock 401 request
  // this is to prevent the evaluation of the page before we have technically authenticated
  const auth = url.searchParams.get('auth') || false;

  console.log('Configure the SDK');
  forgerock.Config.set({
    clientId,
    realmPath,
    redirectUri: `${url.origin}/${
      preAuthenticated === 'false' ? 'authn-central-login' : '_callback'
    }/`,
    scope,
    serverConfig: {
      baseUrl: amUrl,
    },
    support,
  });

  try {
    forgerock.SessionManager.logout();
  } catch (err) {
    // Do nothing
  }

  console.log('Initiate first step with `undefined`');

  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(() => {
    from([1])
      .pipe(
        map(() => {
          if (preAuthenticated === 'true') {
            console.log('Set mock cookie to represent existing session');
            document.cookie = 'iPlanetDirectoryPro=abcd1234; domain=example.com; path=/';
            if (code && state) {
              window.sessionStorage.setItem(
                `FR-SDK-${clientId}`,
                JSON.stringify({ responseType: 'code', state, verifier: '1234' }),
              );
            }
          }
          return;
        }),
        rxDelay(delay),
        mergeMap((step) => {
          let tokens;
          if (code && state) {
            tokens = forgerock.TokenManager.getTokens({
              login: 'redirect',
              query: { code, state, acr_values },
            });
          } else {
            tokens = forgerock.TokenManager.getTokens({
              login: 'redirect',
              query: { acr_values },
            });
          }
          return tokens;
        }),
        map((tokens) => {
          if (tokens.accessToken) {
            console.log('OAuth authorization successful');
            document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
          } else {
            throw new Error('Session_Error');
          }
        }),
        rxDelay(delay),
        mergeMap(() => {
          console.log('Remove cookie');
          document.cookie = '';
          console.log('Initiate logout');
          return forgerock.FRUser.logout();
        }),
      )
      .subscribe({
        error: (err) => {
          /*
           * We added this because Playwright was too fast for the dom element.
           * When we make a request to central login we have to force a 401 page to mimick the real life scenario of the page being requested
           * If we do this, we append a query param of auth to make sure we don't complete the flow until we are redirected from that page
           * By saying we have !auth query param value, we are essentially mimicking the idea that we are waiting for the central login redirect
           * to complete the redirect.
           */
          if (!auth) {
            return;
          }
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
