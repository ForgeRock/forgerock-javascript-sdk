(function() {
  const rxFlatMap = rxjs.operators.flatMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl');
  const clientId = url.searchParams.get('clientId');
  const realmPath = url.searchParams.get('realmPath');
  const resourceUrl = url.searchParams.get('resourceUrl');
  const scope = url.searchParams.get('scope');
  const un = url.searchParams.get('un');
  const pw = url.searchParams.get('pw');

  const tree = 'UsernamePassword';

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

  rxjs
    .from(forgerock.FRAuth.next())
    .pipe(
      rxFlatMap((step) => {
        console.log('Initiate first step with `undefined`');
        step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
        step.getCallbackOfType('ValidatedCreatePasswordCallback').setPassword(pw);
        return forgerock.FRAuth.next(step);
      }),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) => {
          if (step.payload.code === 401) {
            throw new Error('Auth_Error');
          }
          return forgerock.TokenManager.getTokens({ forceRenew: true });
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMap((step) => {
        const myStep = step;
        if (step.getSessionToken()) {
          console.log('Login successful');
          document.body.innerHTML = `<p class="Logged_In">Login successful</p>`;
        } else {
          throw new Error('Session_Error');
        }
      }),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) => forgerock.UserManager.getCurrentUser(),
        (step, user) => {
          console.log(`User given name: ${user.given_name}`);
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) =>
          forgerock.HttpClient.request({
            url: `${resourceUrl}/balance`,
            init: {
              method: 'GET',
            },
          }),
        async (step, response) => {
          const body = await response.json();
          console.log(`Balance is: ${body.balance}`);
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) =>
          forgerock.HttpClient.request({
            init: {
              method: 'POST',
            },
            txnAuth: {
              init: true,
            },
            timeout: 0,
            url: `${resourceUrl}/withdraw`,
          }),
        async (step, response) => {
          const body = await response.json();
          console.log(`Auth stage: ${body.stage}`);
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) => {
          console.log('Initiate logout');
          return forgerock.FRUser.logout();
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxFlatMap(
        (step) => {
          return forgerock.TokenStorage.get();
        },
        (step, tokens) => {
          if (!tokens) {
            console.log('Logout successful');
            document.body.innerHTML = `<p class="Logged_Out">Logout successful</p>`;
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
      },
    );
})();
