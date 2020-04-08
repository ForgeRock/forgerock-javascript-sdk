(function() {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl');
  const clientId = url.searchParams.get('clientId') || 'AccountHolderOAuth2';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const resourceUrl =
    url.searchParams.get('resourceUrl') || 'https://bank.example.com:3001/account';
  const scope = url.searchParams.get('scope') || 'openid profile me.read';
  const un = url.searchParams.get('un') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const pw = url.searchParams.get('pw') || 'Password1!';
  const tree = url.searchParams.get('tree') || 'BasicLogin';

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
          if (step.payload.code === 401) {
            throw new Error('Auth_Error');
          }
          console.log('Auth tree successfully completed');
          console.log('Get OAuth tokens');
          const tokens = forgerock.TokenManager.getTokens({ forceRenew: true });
          return tokens;
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMap((step) => {
        if (step.getSessionToken()) {
          console.log('OAuth login successful');
          document.body.innerHTML = `<p class="Logged_In">Login successful</p>`;
        } else {
          throw new Error('Session_Error');
        }
      }),
      rxjs.operators.delay(delay),
      rxMergeMap(
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
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          const token = document.cookie;
          console.log('Retrieve the user balance');
          return forgerock.HttpClient.request({
            url: `${resourceUrl}/balance`,
            init: {
              method: 'GET',
              headers: {
                iPlanetDirectoryPro: token,
              },
            },
          });
        },
        async (step, response) => {
          const body = await response.json();
          console.log(`Balance is: ${body.balance}`);
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Make a $200 withdrawal from account');
          return forgerock.HttpClient.request({
            init: {
              method: 'POST',
              body: JSON.stringify({ amount: '200' }),
            },
            txnAuth: {
              handleStep: async (step) => {
                console.log('Withdraw action requires additional authorization');
                step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
                step.getCallbackOfType('ValidatedCreatePasswordCallback').setPassword(pw);
                return Promise.resolve(step);
              },
            },
            timeout: 0,
            url: `${resourceUrl}/withdraw`,
          });
        },
        async (step, response) => {
          if (response.ok) {
            console.log('Withdrawal of $200 was successful');
            const body = await response.json();
            console.log(`Balance is ${body.balance}`);
          } else {
            console.log('Withdraw authorization failed');
          }
          return step;
        },
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
        (step) => {
          console.log('Initiate logout');
          return forgerock.FRUser.logout();
        },
        (step) => step,
      ),
      rxjs.operators.delay(delay),
      rxMergeMap(
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
