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
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'DeviceProfileCallbackTest';

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
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          const deviceCollectorCb = step.getCallbackOfType('DeviceProfileCallback');

          const message = deviceCollectorCb.getMessage();
          console.log(message);
          document.body.innerHTML = `<p class="profileStatus">${message}</p>`;
          const isLocationRequired = deviceCollectorCb.isLocationRequired();
          const isMetadataRequired = deviceCollectorCb.isMetadataRequired();

          const device = new forgerock.FRDevice();
          return device.getProfile({
            location: isLocationRequired,
            metadata: isMetadataRequired,
          });
        },
        (step, profile) => {
          console.log(profile);
          return { step, profile };
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
        ({ step, profile }) => {
          console.log('Profile collected.');
          step.getCallbackOfType('DeviceProfileCallback').setProfile(profile);
          return forgerock.FRAuth.next(step);
        },
        (step, response) => {
          if (response.type === 'LoginFailure') {
            throw new Error('No profile match.');
          } else {
            console.log('Login with profile successful.');
            document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
            return step;
          }
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        return forgerock.SessionManager.logout();
      }),
      rxMap((response) => {
        if (response.ok) {
          console.log('Logout successful');
          document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
        } else {
          throw new Error('Logout_Error');
        }
      }),
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
