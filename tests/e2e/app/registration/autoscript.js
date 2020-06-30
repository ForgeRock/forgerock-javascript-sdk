(function () {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxMap = rxjs.operators.map;
  const rxTap = rxjs.operators.tap;
​
  const delay = 0;
​
  const url = new URL(window.location.href);

  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || 'ieH034K&-zlwqh3V_';
  const pw = url.searchParams.get('pw') || '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
  const tree = url.searchParams.get('tree') || 'Registration';
​
  console.log('Configure the SDK');
  forgerock.Config.set({
    middleware: [
      (req, action, next) => {
        switch (action.type) {
          case 'START_AUTHENTICATE':
            if (action.payload.type === 'service' && typeof action.payload.tree === 'string') {
              console.log('Starting authentication with service');
            }
            break;
          case 'AUTHENTICATE':
            if (action.payload.type === 'service' && typeof action.payload.tree === 'string') {
              console.log('Continuing authentication with service');
            }
            break;
          default:
            console.log('Action type is: ${action.type}');
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
​
  try {
    forgerock.SessionManager.logout();
  } catch (err) {
    // Do nothing
  }
​
  console.log('Initiate first step with `undefined`');
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    rxjs
      .from(forgerock.FRAuth.next())
      .pipe(
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle ValidatedCreateUsernameCallback');
          const cb = step.getCallbackOfType('ValidatedCreateUsernameCallback');
          console.log(`Prompt from ValidatedCreateUsernameCallback is ${cb.getPrompt()}`);
          cb.setName(un);
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle ValidatedCreatePasswordCallback');
          const cb = step.getCallbackOfType('ValidatedCreatePasswordCallback');
          console.log(`Prompt from ValidatedCreatePasswordCallback is ${cb.getPrompt()}`);
          cb.setPassword(pw);
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle StringAttributeInputCallback');
          const stringInputCallbacks = step.getCallbacksOfType('StringAttributeInputCallback');
          const cb1 = stringInputCallbacks[0];
          const cb2 = stringInputCallbacks[1];
          const cb3 = stringInputCallbacks[2];
          const prompt1 = cb1.getPrompt();
          const prompt2 = cb2.getPrompt();
          const prompt3 = cb3.getPrompt();
          console.log(prompt1);
          console.log(prompt2);
          console.log(prompt3);
          stringInputCallbacks[0].setInputValue('Petrov');
          stringInputCallbacks[1].setInputValue('Stoyan');
          stringInputCallbacks[2].setInputValue('stoyan@petrov.ca');
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle KbaCreateCallback');
          const kbaCreateCallbacks = step.getCallbacksOfType('KbaCreateCallback');
          const cb1 = kbaCreateCallbacks[0];
          const cb2 = kbaCreateCallbacks[1];
          const prompt1 = cb1.getPrompt();
          const prompt2 = cb2.getPrompt();
          console.log(prompt1);
          console.log(prompt2);
​
          const predefinedQuestions = kbaCreateCallbacks[0].getPredefinedQuestions();
          console.log(predefinedQuestions);
​
          kbaCreateCallbacks[0].setQuestion('What's your favorite color?');
          kbaCreateCallbacks[0].setAnswer('Yellow');
​
          kbaCreateCallbacks[1].setQuestion('Who was your first employer?');
          kbaCreateCallbacks[1].setAnswer('Prosyst');
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle TermsAndConditionsCallback');
          const cb = step.getCallbackOfType('TermsAndConditionsCallback');
          const version = cb.getVersion();
          const terms  = cb.getTerms();
          console.log(version);
          console.log(terms);
          cb.setAccepted();
          return forgerock.FRAuth.next(step);
        }),
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          return forgerock.FRAuth.next(step);
        }),
        rxTap(
          () => {},
          (err) => {
            console.log(`Error: ${err.message}`);
            document.body.innerHTML = `<p class='${err.message}'>${err.message}</p>`;
          },
          () => {},
        ),
      )
      .subscribe(
        (data) => {},
        (err) => {},
        () => {
          console.log('Test script complete');
          document.body.innerHTML = `<p class='Test_Complete'>Test script complete</p>`;
        },
      );
  }, 250);
})();
