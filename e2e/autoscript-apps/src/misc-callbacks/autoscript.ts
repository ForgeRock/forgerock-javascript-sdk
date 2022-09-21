/*
 * @forgerock/javascript-sdk
 *
 * autoscript.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
// @ts-nocheck
import * as forgerock from '@forgerock/javascript-sdk';
import { delay as rxDelay, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

function autoscript() {
  const delay = 0;

  const url = new URL(window.location.href);
  const amUrl = url.searchParams.get('amUrl') || 'https://auth.example.com:9443/am';
  const realmPath = url.searchParams.get('realmPath') || 'root';
  const un = url.searchParams.get('un') || 'sdkuser';
  const pw = url.searchParams.get('pw') || 'password';
  const tree = url.searchParams.get('tree') || 'MiscCallbacks';

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
    from(forgerock.FRAuth.next())
      .pipe(
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Handle Username Callback');
          const cb = step.getCallbackOfType('NameCallback');
          console.log(`Prompt from NameCallback is ${cb.getPrompt()}`);
          cb.setName(un);
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Handle Text Input Callback');
          const cb = step.getCallbackOfType('TextInputCallback');
          console.log(`Prompt from TextInputCallback is ${cb.getPrompt()}`);
          cb.setInput('Text Input String');
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Handle Password Callback');
          const cb = step.getCallbackOfType('PasswordCallback');
          console.log(`Prompt from PasswordCallback is ${cb.getPrompt()}`);
          cb.setPassword(pw);
          return forgerock.FRAuth.next(step);
        }),
        mergeMap((step) => {
          console.log('Handle Choice Callback');
          const cb = step.getCallbackOfType('ChoiceCallback');
          const prompt = cb.getPrompt();
          console.log(prompt);
          const defaultChoice = cb.getDefaultChoice();
          console.log(defaultChoice);
          const choices = cb.getChoices();
          console.log(choices);
          cb.setChoiceIndex(2);
          cb.setChoiceValue('green');
          console.log('Value of "green" is set');
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Handle Confirmation Callback');
          const confirmCB = step.getCallbackOfType('ConfirmationCallback');
          const textCB = step.getCallbackOfType('TextOutputCallback');
          const message = textCB.getMessage();
          console.log(`Message for confirmation is: ${message}`);
          const options = confirmCB.getOptions();
          confirmCB.setOptionValue(options[1]);
          confirmCB.setOptionIndex(0);
          console.log('Setting value to "Yes"');
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          console.log('Handle Polling Callback');
          const cb = step.getCallbackOfType('PollingWaitCallback');
          const message = cb.getMessage();
          console.log(message);
          const waitTime = cb.getWaitTime();
          console.log(`Wait time is ${waitTime} milliseconds`);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(step);
            }, waitTime + 1000);
          });
        }),
        rxDelay(delay),
        mergeMap((step) => {
          return forgerock.FRAuth.next(step);
        }),
        rxDelay(delay),
        mergeMap((step) => {
          return forgerock.SessionManager.logout();
        }),
        map((response) => {
          if (response.ok) {
            console.log('Logout successful');
            document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
          } else {
            throw new Error('Logout_Error');
          }
        }),
      )
      .subscribe({
        error: (err) => {
          console.log(`Error: ${err.message}`);
          document.body.innerHTML = `<p class="Test_Complete">${err.message}</p>`;
        },
        complete: () => {
          console.log('Test script complete');
          document.body.innerHTML = `<p class="Test_Complete">Test script complete</p>`;
        },
      });
  }, 250);
}

autoscript();
export default autoscript;
