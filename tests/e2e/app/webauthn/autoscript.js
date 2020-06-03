(function () {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl');
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const pw = url.searchParams.get('pw') || 'Password1!';
  const tree = url.searchParams.get('tree') || 'WebAuthnLogin';

  console.log('Configure the SDK');
  forgerock.Config.set({
    realmPath,
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
        step.getCallbackOfType('NameCallback').setName(un);
        step.getCallbackOfType('PasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Handle WebAuthn');
          const type = forgerock.FRWebAuthn.getWebAuthnStepType(step);
          if (type === 2) {
            return forgerock.FRWebAuthn.register(step);
          } else if (type === 1) {
            return forgerock.FRWebAuthn.authenticate(step);
          }
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
