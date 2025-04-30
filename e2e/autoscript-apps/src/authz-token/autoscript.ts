/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
// @ts-nocheck
import * as forgerock from '@forgerock/javascript-sdk';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;
  const tokenExpiredDelay = 2000;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'http://localhost:9443/am';
  const clientId = url.searchParams.get('clientId') || 'WebOAuthClient';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'UsernamePassword';
  const oauthThreshold = url.searchParams.get('oauthThreshold');
  const resourceOrigin = url.searchParams.get('resourceOrigin') || 'http://localhost:9443/resource';
  const igUrl = url.searchParams.get('igUrl'); // only use when testing against IG on different host

  console.log('Configure the SDK');
  forgerock.Config.set({
    clientId,
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'AUTHORIZE':
            console.log('Calling authorize endpoint');
            break;
          case 'EXCHANGE_TOKEN':
            console.log('Calling access token exchange endpoint');
            break;
        }
        next();
      },
    ],
    redirectUri: `${url.origin}/_callback/`,
    realmPath,
    scope,
    tree,
    serverConfig: {
      baseUrl: amUrl,
    },
    oauthThreshold: oauthThreshold,
  });

  try {
    forgerock.SessionManager.logout();
  } catch (err) {
    // Do nothing
  }

  console.log('Initiate first step with `undefined`');
  from(forgerock.FRAuth.next())
    .pipe(
      mergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('NameCallback').setName(un);
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxDelay(delay),
      mergeMap((step) => {
        if (step.payload.status === 401) {
          throw new Error('Auth_Error');
        }
        console.log('Auth tree successfully completed');
        console.log('Get OAuth tokens');
        const tokens = forgerock.TokenManager.getTokens();
        return tokens;
      }),
      rxDelay(delay),
      map((tokens) => {
        if (tokens.accessToken) {
          console.log('OAuth login successful');
          document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
        } else {
          throw new Error('Session_Error');
        }
        return tokens;
      }),
      rxDelay(tokenExpiredDelay),
      mergeMap(
        (tokens) => {
          console.log('Proactively refresh tokens if expiring soon');
          return forgerock.TokenManager.getTokens();
        },
        (oldTokens, newTokens) => {
          console.log('tokens', oldTokens.accessToken, newTokens.accessToken);
          if (oldTokens.accessToken === newTokens.accessToken) {
            console.log('OAuth tokens not expiring soon; not refreshed');
          } else {
            console.log('OAuth tokens expiring soon; proactively refreshed');
          }
          return newTokens;
        },
      ),
      rxDelay(delay),
      mergeMap(
        (tokens) => {
          console.log('Retrieve a resource');
          return forgerock.HttpClient.request({
            url: `${igUrl ? igUrl : resourceOrigin + '/reflect-authz-header'}`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
          });
        },
        async (storedTokens, response) => {
          const authorizationHeaderValue = await response.json();
          console.log(
            'authorizationHeaderValue',
            authorizationHeaderValue.message,
            storedTokens.accessToken,
          );
          if (authorizationHeaderValue.message.includes(storedTokens.accessToken)) {
            console.log('OAuth tokens not expiring soon; not refreshed by HttpClient call');
          } else {
            console.log('OAuth tokens expiring soon; proactively refreshed by HttpClient call');
          }
          return storedTokens;
        },
      ),
      rxDelay(delay),
      mergeMap(() => {
        console.log('Initiate logout');
        return forgerock.FRUser.logout();
      }),
      rxDelay(delay),
      mergeMap(
        (step) => {
          return forgerock.TokenStorage.get();
        },
        (step, tokens) => {
          if (!tokens) {
            console.log('Logout successful');
            document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
          } else {
            throw new Error('Logout_Error');
          }
          return step;
        },
      ),
      rxDelay(delay),
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
