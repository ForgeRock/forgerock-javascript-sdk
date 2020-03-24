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
npm run certs:make

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
sudo npm run certs:trust
```

You **must** restart Chrome for the change to take effect.

#### Firefox

Import the certificate to Firefox:

1. Go to **Preferences > Privacy & Security > Certificates > View Certificates...**
1. On the **Authorities** tab, click **Import...**
1. Select `certs/ca.crt` and enable option to "Trust this CA to identify websites"
1. Restart Firefox

## Tests

This project is configured for multiple forms of tests: unit, integration, and e2e. Compilation and linting occurs as a pre-commit hook, and all tests are run as a pre-push hook.

Some tests require an OpenAM instance with a public OAuth client configured. Specify your environment details in an `.env` file:

| Variable    | Purpose                                                |
| ----------- | ------------------------------------------------------ |
| `AM_URL`    | Full URL to your OpenAM instance                       |
| `BASE_URL`  | Base URL for your application                          |
| `CLIENT_ID` | Your OAuth client ID                                   |
| `SCOPE`     | The scopes to request when getting access tokens       |
| `TREE`      | The authentication tree name to use for authentication |
| `USERNAME`  | The username to use when authenticating                |
| `PASSWORD`  | The password to use when authenticating                |

### Troubleshooting

**DOMException: Blocked a frame with origin "{url}" from accessing a cross-origin frame** (in browser console)

This occurs when OpenAM returns the authorization code, but the `redirect_uri` doesn't match what's configured for the OAuth client. Tests use a path of `/callback`, so your OAuth client should be configured with a `redirect_uri` of `{BASE_URL}/callback` (e.g. https://forgerock-sdk-samples.com:3000/callback).

**Manually view test site**

To replicate the e2e environment for troubleshooting, run:

```bash
npm run server:e2e
```

Now browse to the following URL, replacing relevant tokens with values from your `.env` file:

```
{BASE_URL}?amUrl={AM_URL}&clientId={CLIENT_ID}&scope={SCOPE}&un={USERNAME}&pw={PASSWORD}
```

## Version History

[Our version history can be viewed by visiting our CHANGELOG.md](https://github.com/ForgeRock/forgerock-javascript-sdk/blob/master/CHANGELOG.md).

## License

[MIT](http://opensource.org/licenses/MIT)
