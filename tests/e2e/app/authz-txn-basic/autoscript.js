(function () {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl');
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const igUrl = url.searchParams.get('igUrl'); // only use when testing against IG on a different host
  const restUrl = url.searchParams.get('restUrl') || 'https://api.example.com:9443/resource';
  const un = url.searchParams.get('un') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const pw = url.searchParams.get('pw') || 'Password1!';
  const tree = url.searchParams.get('tree') || 'Login';

  console.log('Configure the SDK');
  forgerock.Config.set({
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'START_AUTHENTICATE':
            if (
              action.payload.type === 'composite_advice' &&
              typeof action.payload.tree === 'string'
            ) {
              console.log('Starting authentication with composite advice');
            }
            break;
          case 'AUTHENTICATE':
            if (
              action.payload.type === 'composite_advice' &&
              typeof action.payload.tree === 'string'
            ) {
              console.log('Continuing authentication with composite advice');
            }
            break;
        }
        next();
      },
    ],
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
      rxMergeMap(
        (step) => {
          console.log('Retrieve the protected resource');
          return forgerock.HttpClient.request({
            url: `${igUrl ? igUrl : restUrl}/ig/authz-by-txn`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
            txnAuth: {
              handleStep: async (step) => {
                console.log('IG resource requires additional authorization');
                step.getCallbackOfType('PasswordCallback').setPassword(pw);
                return Promise.resolve(step);
              },
            },
          });
        },
        async (step, response) => {
          if (response.ok) {
            console.log('Request to IG resource successfully responded');
          } else {
            throw new Error('IG Transactional Authorization was not successful');
          }
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Retrieve the protected resource');
          return forgerock.HttpClient.request({
            url: `${restUrl}/rest/authz-by-txn`,
            init: {
              method: 'GET',
              credentials: 'include',
            },
            txnAuth: {
              handleStep: async (step) => {
                console.log('Rest resource requires additional authorization');
                step.getCallbackOfType('PasswordCallback').setPassword(pw);
                return Promise.resolve(step);
              },
            },
          });
        },
        async (step, response) => {
          if (response.ok) {
            console.log('Request to REST resource successfully responded');
          } else {
            throw new Error('REST Transactional Authorization was not successful');
          }
          return step;
        },
      ),
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
        document.body.innerHTML = `<p class="Test_Complete">Test script complete</p>`;
      },
    );
})();
