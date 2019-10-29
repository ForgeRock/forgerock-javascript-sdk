# ForgeRock JavaScript SDK

The ForgeRock JavaScript SDK is a toolkit that allows web developers to easily integrate intelligent authentication using ForgeRock OpenAM and/or ForgeRock Identity Cloud.

## Installation

```bash
npm install @forgerock/javascript-sdk
```

## Sample Usage

In most real-world scenarios, you will want to have full control over the UI. In these cases, you can use `FRAuth` to obtain typed callback instances from authentication trees and render the UI in whatever way makes sense for your application.

In the following example, a simple React app iteratively calls `FRAuth.next()` until either an error occurs or a session token is obtained. The custom React component `<UsernamePassword />` is defined to handle an authentication step named "UsernamePassword".

```js
import { FRAuth, Config } from '@forgerock/javascript-sdk';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Initialize application state
    this.state = {
      error: undefined,
      ssoToken: undefined,
      step: undefined,
    };
  }

  componentDidMount() {
    // Set configuration defaults
    Config.set({
      clientId: 'my_client_id',
      redirectUri: 'https://myapp.domain.com/callback',
      scope: 'openid profile me.read',
      serverConfig: { baseUrl: 'https://mytenant.forgeblocks.local/am/' },
      tree: 'UsernamePassword',
    });

    // Start the authentication flow
    this.nextStep();
  }

  nextStep = async (step) => {
    // Get the next step in this authentication tree
    step = await FRAuth.next(step).catch(this.onError);

    // Update application state based on the response
    let ssoToken, error;
    if (step.type === 'LoginSuccess') {
      ssoToken = step.getSessionToken();
    } else if (step.type === 'LoginFailure') {
      error = step.getCode();
    }
    this.setState({ step, ssoToken, error });
  };

  onError = (error) => {
    this.setState({ error });
  };

  render() {
    // Handle init/success/failure states
    if (!this.state.step) {
      return <p>Loading...</p>;
    } else if (this.state.ssoToken) {
      return <p>Authenticated!</p>;
    } else if (this.state.error) {
      return <p>Error: {this.state.error}</p>;
    }

    // Otherwise, select the correct component for this step
    const stage = this.state.step.getStage();
    return (
      <>
        <h1>Sign In</h1>
        {stage === 'UsernamePassword' && (
          <UsernamePassword step={this.state.step} onSubmit={this.nextStep} />
        )}
        {/* Create similar components for other stages */}
      </>
    );
  }
}

// Custom UI for rendering the "UsernamePassword" step
function UsernamePassword(props) {
  const setUsername = (e) => {
    const cb = props.step.getCallbackOfType('NameCallback');
    cb.setName(e.target.value);
  };

  const setPassword = (e) => {
    const cb = props.step.getCallbackOfType('PasswordCallback');
    cb.setPassword(e.target.value);
  };

  const onSubmit = () => {
    props.onSubmit(props.step);
  };

  return (
    <>
      <input type="text" placeholder="Username" onChange={setUsername} />
      <input type="password" placeholder="Password" onChange={setPassword} />
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}

export default App;
```

## Samples

Prerequisites:

- [OpenSSL](https://www.openssl.org/) is installed
- **samples/js/config.js** is updated to specify your SDK configuration

```bash
# Add host
echo '127.0.0.1 forgerock-sdk-samples.com' | sudo tee -a /etc/hosts

# Install dependencies
npm i

# Generate CA and self-signed certificate
# (Pick any passphrase and use it whenever prompted)
npm run make_certs

# Build the SDK and watch for changes
npm start

# Start the sample webserver
npm run server:samples

# Follow the next section to trust certificate
```

Access the samples at https://forgerock-sdk-samples.com:3000

### Trusting the Certificate

Trusting the certificate is required to avoid browser warnings and for WebAuthn to work correctly.

#### Chrome

Add the certificate to your keychain:

```bash
# MacOS
sudo npm run trust_certs
```

You **must** restart Chrome for the change to take effect.

#### Firefox

Import the certificate to Firefox:

1. Go to **Preferences > Privacy & Security > Certificates > View Certificates...**
1. On the **Authorities** tab, click **Import...**
1. Select `certs/ca.crt` and enable option to "Trust this CA to identify websites"
1. Restart Firefox

## E2E Tests

Preliminary E2E tests are implemented with [Puppeteer](https://github.com/GoogleChrome/puppeteer). They utilize an HTML page that allows configuration of the SDK via querystring parameters at the beginning of each test scenario.

```bash
# Start the test web server
npm run e2e_server

# Run test scenarios
npm run e2e_tests
```

## License

[MIT](http://opensource.org/licenses/MIT)
