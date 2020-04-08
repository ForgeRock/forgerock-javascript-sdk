(function() {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl');
  const clientId = url.searchParams.get('clientId') || 'AccountHolderOAuth2';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const un = url.searchParams.get('un') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const pw = url.searchParams.get('pw') || 'Password1!';
  const tree = url.searchParams.get('tree') || 'LoginWithDeviceProfile';

  console.log('Configure the SDK');
  forgerock.Config.set({
    clientId,
    redirectUri: `${url.origin}/callback`,
    realmPath,
    scope,
    tree,
    serverConfig: {
      baseUrl: amUrl,
    },
  });

  console.log('Initiate first step with `undefined`');
  rxjs
    .from(forgerock.FRAuth.next())
    .pipe(
      rxMergeMap((step) => {
        console.log('Set values on auth tree callbacks');
        step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
        step.getCallbackOfType('ValidatedCreatePasswordCallback').setPassword(pw);
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
            document.body.innerHTML = `<p class="Logged_In">Login successful</p>`;
            return step;
          }
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
      },
    );
})();
