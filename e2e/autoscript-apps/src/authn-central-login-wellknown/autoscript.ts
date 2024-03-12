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

async function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const code = url.searchParams.get('code') || '';
  const error = url.searchParams.get('error') || '';
  const state = url.searchParams.get('state') || '';
  // in central login we use an auth query param for the return of our mock 401 request
  // this is to prevent the evaluation of the page before we have technically authenticated
  const auth = url.searchParams.get('auth') || false;
  const acr_values = url.searchParams.get('acr') || 'SpecificTree';

  let clientId = url.searchParams.get('clientId') || 'CentralLoginOAuthClient';
  let realmPath = url.searchParams.get('realmPath') || 'root';
  // The `revoke` scope is required for PingOne support
  let scope = url.searchParams.get('scope') || 'openid profile me.read revoke';
  let wellKnownUrl =
    url.searchParams.get('wellKnownUrl') ||
    'https://auth.example.com:9443/am/.well-known/oidc-configuration';

  console.log('Configure the SDK');

  if (wellKnownUrl) {
    localStorage.setItem('wellknown', wellKnownUrl);
    localStorage.setItem('clientId', clientId);
    localStorage.setItem('realmPath', realmPath);
    localStorage.setItem('scope', scope);
  } else {
    wellKnownUrl = localStorage.getItem('wellknown');
    clientId = localStorage.getItem('clientId');
    realmPath = localStorage.getItem('realmPath');
    scope = localStorage.getItem('scope');
  }
  await forgerock.Config.setAsync({
    clientId,
    realmPath,
    redirectUri: `${url.origin}/authn-central-login-wellknown/`,
    scope,
    serverConfig: {
      wellknown: wellKnownUrl,
    },
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
        mergeMap(() => {
          let tokens;
          // detect when in iframe as to not call `/authorize` needlessly
          if (window.self !== window.top) {
            return;
          } else if (code && state) {
            tokens = forgerock.TokenManager.getTokens({
              login: 'redirect',
              query: { code, state },
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
          // You have to allow specific origins to CORS for OAuth client
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
          localStorage.removeItem('wellknown');
          localStorage.removeItem('clientId');
          localStorage.removeItem('realmPath');
          localStorage.removeItem('scope');
        },
      });
  }, 250);
}

autoscript();
export default autoscript;
