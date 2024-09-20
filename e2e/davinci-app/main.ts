import './style.css';

import { Config, FRUser, TokenManager } from '@forgerock/javascript-sdk';

import davinci from '@forgerock/davinci-client';
import usernameComponent from './components/text.js';
import passwordComponent from './components/password.js';
import submitButtonComponent from './components/submit-button.js';
import protect from './components/protect.js';
import flowLinkComponent from './components/flow-link.js';
import socialLoginButtonComponent from './components/social-login-button.js';

/**
 * Import types for the DaVinci client
 */
import type {
  SingleValueCollector,
  ActionCollector,
  NextNode,
  ErrorNode,
  SuccessNode,
} from '@forgerock/davinci-client/types';

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
  const client = await davinci({ config });
  const formEl = document.getElementById('form') as HTMLFormElement;

  await Config.setAsync(config);

  // Represents the main render function for app
  async function renderForm(nextNode: NextNode) {
    formEl!.innerHTML = '';

    const header = document.createElement('h2');
    header.innerText = nextNode.client?.name || '';
    formEl!.appendChild(header);

    const collectors = client.collectors();
    collectors.forEach((collector: SingleValueCollector | ActionCollector) => {
      if (collector.type === 'TextCollector' && collector.name === 'protectsdk') {
        protect(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          client.update(collector), // Returns an update function for this collector
        );
      } else if (collector.type === 'TextCollector') {
        usernameComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          client.update(collector), // Returns an update function for this collector
        );
      } else if (collector.type === 'PasswordCollector') {
        passwordComponent(
          formEl, // You can ignore this; it's just for rendering
          collector, // This is the plain object of the collector
          client.update(collector), // Returns an update function for this collector
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
          client.flow({
            // Returns a function to call the flow from within component
            action: collector.output.key,
          }),
          renderForm, // Ignore this; it's just for re-rendering the form
        );
      }
    });

    if (
      client
        .collectors()
        .find(
          (collector: SingleValueCollector | ActionCollector) => collector.name === 'protectsdk',
        )
    ) {
      const newNode = await client.next();

      if (newNode.status === 'next') {
        return renderForm(newNode);
      } else if (newNode.status === 'success') {
        return renderComplete(newNode);
      } else if (newNode.status === 'error') {
        return renderError(newNode);
      } else {
        console.error('Unknown node status', newNode);
      }
    }
  }

  function renderComplete(successNode: SuccessNode) {
    const code = successNode.client?.authorization?.code || '';
    const state = successNode.client?.authorization?.state || '';
    let tokens;

    formEl!.innerHTML = `
      <h2>Complete</h2>
      <pre>Session: ${successNode.server.session}</pre>
      <pre>Authorization: ${successNode.client?.authorization?.code}</pre>
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

    document.getElementById('tokensButton')!.addEventListener('click', async () => {
      tokens = await TokenManager.getTokens({ query: { code, state } });

      console.log(tokens);

      document.getElementById('accessToken')!.innerText = tokens?.accessToken || '';
    });

    document.getElementById('logoutButton')!.addEventListener('click', async () => {
      await FRUser.logout({ logoutRedirectUri: window.location.href });

      window.location.reload();
    });
  }

  function renderError(errorNode: ErrorNode) {
    formEl!.innerHTML = `
      <h2>Error</h2>
      <pre>${errorNode.error.message}</pre>
    `;
  }

  /**
   * Optionally subscribe to the store to listen for all store updates
   * This is useful for debugging and logging
   * It returns an unsubscribe function that you can call to stop listening
   */
  client.subscribe(() => {
    const state = client.getState();
    console.log('Event emitted from store:', state);
  });

  const node = await client.start();

  formEl!.addEventListener('submit', async (event) => {
    event.preventDefault();

    /**
     * We can just call `next` here and not worry about passing any arguments
     */
    const newNode = await client.next();

    /**
     * Recursively render the form with the new state
     */
    if (newNode.status === 'next') {
      renderForm(newNode);
    } else if (newNode.status === 'success') {
      return renderComplete(newNode);
    } else if (newNode.status === 'error') {
      return renderError(newNode);
    } else {
      console.error('Unknown node status', newNode);
    }
  });

  if (node.status !== 'success') {
    renderForm(node as NextNode);
  } else {
    renderComplete(node);
  }
})();
