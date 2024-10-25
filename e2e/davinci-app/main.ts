import './style.css';

import { Config, FRUser, TokenManager } from '@forgerock/javascript-sdk';
import davinci from '@forgerock/davinci-client';

import usernameComponent from './components/text.js';
import passwordComponent from './components/password.js';
import submitButtonComponent from './components/submit-button.js';
import protect from './components/protect.js';
import flowLinkComponent from './components/flow-link.js';
import socialLoginButtonComponent from './components/social-login-button.js';

const config = {
  // clientId: '7544ef78-5c01-48c4-a9a5-6338c10c7f87',
  clientId: '724ec718-c41c-4d51-98b0-84a583f450f9', // Luis' tenant
  redirectUri: window.location.href,
  scope: 'openid profile email name revoke',
  serverConfig: {
    // baseUrl: 'https://auth.pingone.com/c2a669c0-c396-4544-994d-9c6eb3fb1602/',
    baseUrl: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/', // Luis' tenant
    wellknown:
      'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/.well-known/openid-configuration',
  },
};

(async () => {
  const davinciClient = await davinci({ config });
  const formEl = document.getElementById('form') as HTMLFormElement;

  await Config.setAsync(config);

  function renderComplete() {
    const clientInfo = davinciClient.getClientInfo();
    const serverInfo = davinciClient.getServerInfo();

    let code = '';
    let session = '';
    let state = '';

    if (clientInfo?.status === 'success') {
      code = clientInfo.authorization?.code || '';
      state = clientInfo.authorization?.state || '';
    }

    if (serverInfo && serverInfo.status === 'success') {
      session = serverInfo.session || '';
    }

    let tokens;

    formEl.innerHTML = `
      <h2>Complete</h2>
      <pre>Session: ${session}</pre>
      <pre>Authorization: ${code}</pre>
      <pre>Access Token:</pre>
      <pre
        id="accessToken"
        style="display: block; max-width: 400px; text-wrap: wrap; overflow-wrap: anywhere;"
      >
        --
      </pre>
      <button type="button" id="tokensButton">Get Tokens</button><br />
      <button type="button" id="logoutButton">Logout</button>
    `;

    const tokenBtn = document.getElementById('tokensButton') as HTMLButtonElement;
    tokenBtn.addEventListener('click', async () => {
      tokens = await TokenManager.getTokens({ query: { code, state } });

      console.log(tokens);

      const tokenPreEl = document.getElementById('accessToken') as HTMLPreElement;
      tokenPreEl.innerText = tokens?.accessToken || '';
    });

    const loginBtn = document.getElementById('logoutButton') as HTMLButtonElement;
    loginBtn.addEventListener('click', async () => {
      await FRUser.logout({ logoutRedirectUri: window.location.href });

      window.location.reload();
    });
  }

  function renderError() {
    const error = davinciClient.getError();

    formEl.innerHTML = `
      <h2>Error</h2>
      <pre>${error?.message}</pre>
    `;
  }

  // Represents the main render function for app
  async function renderForm() {
    formEl.innerHTML = '';

    const clientInfo = davinciClient.getClientInfo();
    // const clientInfo = node.client;

    let formName = '';

    if (clientInfo?.status === 'next') {
      formName = clientInfo.name || '';
    }

    const header = document.createElement('h2');
    header.innerText = formName || '';
    formEl.appendChild(header);

    const collectors = davinciClient.getCollectors();
    collectors.forEach((collector) => {
      if (collector.type === 'TextCollector' && collector.name === 'protectsdk') {
        protect(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          davinciClient.update(collector), // Returns an update function for this collector
        );
      } else if (collector.type === 'TextCollector') {
        usernameComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          davinciClient.update(collector), // Returns an update function for this collector
        );
      } else if (collector.type === 'PasswordCollector') {
        passwordComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          davinciClient.update(collector), // Returns an update function for this collector
        );
      } else if (collector.type === 'SubmitCollector') {
        submitButtonComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
        );
      } else if (collector.type === 'SocialLoginCollector') {
        socialLoginButtonComponent(formEl, collector);
      } else if (collector.type === 'FlowCollector') {
        flowLinkComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          davinciClient.flow({
            // Returns a function to call the flow from within component
            action: collector.output.key,
          }),
          renderForm, // Ignore this; it's just for re-rendering the form
        );
      }
    });

    if (davinciClient.getCollectors().find((collector) => collector.name === 'protectsdk')) {
      const newNode = await davinciClient.next();

      if (newNode.status === 'next') {
        renderForm();
      } else if (newNode.status === 'success') {
        renderComplete();
      } else if (newNode.status === 'error') {
        renderError();
      } else {
        console.error('Unknown node status', newNode);
      }
    }
  }

  /**
   * Optionally subscribe to the store to listen for all store updates
   * This is useful for debugging and logging
   * It returns an unsubscribe function that you can call to stop listening
   */
  davinciClient.subscribe(() => {
    const node = davinciClient.getClientInfo();
    console.log('Event emitted from store:', node);
  });

  const node = await davinciClient.start();

  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    /**
     * We can just call `next` here and not worry about passing any arguments
     */
    const newNode = await davinciClient.next();

    /**
     * Recursively render the form with the new state
     */
    if (newNode.status === 'next') {
      renderForm();
    } else if (newNode.status === 'success') {
      renderComplete();
    } else if (newNode.status === 'error') {
      renderError();
    } else {
      console.error('Unknown node status', newNode);
    }
  });

  if (node.status !== 'success') {
    renderForm();
  } else {
    renderComplete();
  }
})();
