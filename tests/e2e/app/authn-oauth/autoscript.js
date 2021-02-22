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
  const clientId = url.searchParams.get('clientId') || 'WebOAuthClient';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'UsernamePassword';

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
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        if (step.payload.code === 401) {
          throw new Error('Auth_Error');
        }
        console.log('Auth tree successfully completed');
        console.log('Get OAuth tokens');
        const tokens = forgerock.TokenManager.getTokens();
        return tokens;
      }),
      rxjs.operators.delay(delay),
      rxMap((tokens) => {
        if (tokens.accessToken) {
          console.log('OAuth login successful');
          document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
        } else {
          throw new Error('Session_Error');
        }
        return tokens;
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (tokens) => {
          console.log('Get user info from OAuth endpoint');
          const user = forgerock.UserManager.getCurrentUser();
          return user;
        },
        (tokens, user) => {
          console.log(`User's given name: ${user.family_name}`);
          return tokens;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (tokens) => {
          console.log('Force renew OAuth tokens');
          return forgerock.TokenManager.getTokens({ forceRenew: true });
        },
        (oldTokens, newTokens) => {
          if (oldTokens.accessToken !== newTokens.accessToken) {
            console.log('New OAuth tokens retrieved');
          } else {
            throw new Error('Force_Renew_Error');
          }
          return newTokens;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(() => {
        console.log('Initiate logout');
        return forgerock.FRUser.logout();
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
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
      rxjs.operators.delay(delay),
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
