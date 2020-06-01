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
  const tree = url.searchParams.get('tree') || 'BasicLogin';

  console.log('Configure the SDK');
  forgerock.Config.set({
    clientId,
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'AUTHENTICATE':
            req.url.searchParams.set('auth-middleware', 'authentication');
            req.init.headers['x-auth-middleware'] = 'authentication';
            break;
        }
        next();
      },
      (req, action, next) => {
        switch (action.type) {
          case 'LOGOUT':
            req.url.searchParams.set('logout-middleware', 'logout');
            req.init.headers['x-logout-middleware'] = 'logout';
            break;
        }
        next();
      },
    ],
    redirectUri: `${url.origin}/callback`,
    realmPath,
    scope,
    serverConfig: {
      baseUrl: amUrl,
    },
    tree,
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
      rxMap(
        (step) => {
          if (step.payload.code === 401) {
            throw new Error('Auth_Error');
          } else if (step.payload.code === 406) {
            throw new Error('Middleware_Error');
          } else if (step.payload.tokenId) {
            console.log('Basic login successful');
            document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
          } else {
            throw new Error('Something went wrong');
          }
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMergeMap((step) => {
        return forgerock.SessionManager.logout();
      }),
      rxMap((response) => {
        if (response.status === 406) {
          throw new Error('Middleware_Error');
        } else if (response.ok) {
          console.log('Logout successful');
          document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
        } else {
          throw new Error('Logout_Error');
        }
      }),
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
