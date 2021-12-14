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
  const clientId = url.searchParams.get('clientId') || 'WebOAuthClient';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'UsernamePassword';

  console.log('Configure the SDK');
  forgerock.Config.set({
    clientId,
    redirectUri: `${url.origin}/_callback/`,
    realmPath,
    scope,
    tree,
    serverConfig: {
      baseUrl: amUrl,
      paths: {
        authenticate: 'auth/authenticate',
        authorize: 'auth/authorize',
        accessToken: 'auth/tokenExchange',
        endSession: 'auth/endSession',
        userInfo: 'auth/userInfo',
        revoke: 'auth/revoke',
        sessions: 'auth/sessions',
      },
    },
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
      mergeMap(
        (step) => {
          if (step.payload.status === 401) {
            throw new Error('Auth_Error');
          }
          console.log('Auth tree successfully completed');
          console.log('Get OAuth tokens');
          const tokens = forgerock.TokenManager.getTokens({ forceRenew: true });
          return tokens;
        },
        (step) => step,
      ),
      rxDelay(delay),
      map((step) => {
        if (step.getSessionToken()) {
          console.log('OAuth login successful');
          document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
        } else {
          throw new Error('Session_Error');
        }
      }),
      rxDelay(delay),
      mergeMap(
        (step) => {
          console.log('Get user info from OAuth endpoint');
          const user = forgerock.UserManager.getCurrentUser();
          return user;
        },
        (step, user) => {
          console.log(`User's given name: ${user.family_name}`);
          return step;
        },
      ),
      rxDelay(delay),
      mergeMap(
        (step) => {
          console.log('Initiate logout');
          return forgerock.FRUser.logout();
        },
        (step) => step,
      ),
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
