(function () {
  const rxMergeMap = rxjs.operators.mergeMap;
  const rxTap = rxjs.operators.tap;

  const delay = 0;

  const url = new URL(window.location.href);

  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const tree = url.searchParams.get('tree') || 'Registration';
  const un = url.searchParams.get('un') || 'f9022889-4452-48a0-aa94-182436645551';
  const pw = url.searchParams.get('pw') || 'ieH034K&-zlwqh3V_';

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
  // Wrapping in setTimeout to give the test time to bind listener to console.log
  setTimeout(function () {
    rxjs
      .from(forgerock.FRAuth.next())
      .pipe(
        rxjs.operators.delay(delay),
        rxMergeMap((step) => {
          console.log('Handle ValidatedCreatePasswordCallback');
          const unCb = step.getCallbackOfType('ValidatedCreateUsernameCallback');
          console.log(`Prompt from UsernameCallback is ${unCb.getPrompt()}`);
          unCb.setName(un);

          console.log('Handle ValidatedCreatePasswordCallback');
          const pwCb = step.getCallbackOfType('ValidatedCreatePasswordCallback');
          console.log(`Prompt from PasswordCallback is ${pwCb.getPrompt()}`);
          pwCb.setPassword(pw);

          const [saCb1, saCb2, saCb3] = step.getCallbacksOfType('StringAttributeInputCallback');

          console.log(`Prompt 1: ${saCb1.getPrompt()}`);
          console.log(`Prompt 2: ${saCb2.getPrompt()}`);
          console.log(`Prompt 3: ${saCb3.getPrompt()}`);

          saCb1.setInputValue('Sally');
          saCb2.setInputValue('Tester');
          saCb3.setInputValue('sally.tester@me.com');

          const [baCb1, baCb2] = step.getCallbacksOfType('BooleanAttributeInputCallback');

          console.log(`Prompt 4: ${baCb1.getPrompt()}`);
          console.log(`Prompt 5: ${baCb2.getPrompt()}`);

          baCb1.setInputValue(false);
          baCb2.setInputValue(false);

          console.log('Handle KbaCreateCallback');
          const [kbCb1, kbCb2] = step.getCallbacksOfType('KbaCreateCallback');

          console.log(`Prompt 1: ${kbCb1.getPrompt()}`);
          console.log(`Prompt 2: ${kbCb2.getPrompt()}`);

          const [pdq1, pdq2] = kbCb1.getPredefinedQuestions();
          console.log(`Predefined Question1: ${pdq1}`);
          console.log(`Predefined Question 2: ${pdq2}`);

          kbCb1.setQuestion('What is your favorite color?');
          kbCb1.setAnswer('Red');

          kbCb2.setQuestion('Who was your first employer?');
          kbCb2.setAnswer('AAA Engineering');

          console.log('Handle TermsAndConditionsCallback');
          const tcCb = step.getCallbackOfType('TermsAndConditionsCallback');

          console.log(`Terms version: ${tcCb.getVersion()}`);
          console.log(`Terms text: ${tcCb.getTerms()}`);

          tcCb.setAccepted();

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
