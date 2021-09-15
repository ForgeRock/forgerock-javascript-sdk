# React JS Todo Sample App

## Disclaimers

This sample code is provided "as is" and is not a supported product of ForgeRock. It's purpose is solely to demonstrate how the ForgeRock JavaScript SDK can be implemented within a React application. Also, this is not a demonstration of React itself or instructional for _how_ to build a React app. There are many aspects to routing, state management, tooling and other aspects to building a React app that are outside of the scope of this project. For information about creating a React app, [visit React's official documentation](https://reactjs.org/docs/create-a-new-react-app.html).

## Requirements

1. An instance of ForgeRock's Access Manager (AM), either within a ForgeRock's Identity Cloud tenant, your own private installation or locally installed on your computer
2. Node >= 14.2.0 (recommended: install via [official package installer](https://nodejs.org/en/))
3. Knowledge of using the Terminal/Command Line
4. Ability to generate security certs (recommended: mkcert ([installation instructions here](https://github.com/FiloSottile/mkcert#installation))
5. This project "cloned" to your computer

## Setup

Once you have the 5 requirements above met, we can build the project.

### Security Certificates

This project requires HTTPS (secure protocol) which means security (SSL/TLS) certificates are necessary. For local development, it's common to generate your own self-signed certificates. You're free to use any method to do this, but if you need assistance in generating your own certs, the following can be helpful:

- Using [this utility (`mkcert`) can help simplify the process of creating trusted certs](https://github.com/FiloSottile/mkcert)
- After following `mkcert`'s installation guide and simple example of creating certs, you should have two files: `example.com+5.pem` & `example.com+5-key.pem`

  (Ensure these two files are at the root of this project; you can name them whatever you want since you configure them in your `.env` file)

> **WARNING: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production.**

### Setup Your AM Instance

#### Configure CORS

1. Allowed origins: `https://react.example.com:8443`
2. Allowed methods: `GET` `POST`
3. Allowed headers: `Content-Type` `X-Requested-With` `Accept-API-Version` `Authorization`
4. Allow credentials: enable

#### Create Your OAuth Clients

1. Create a public (SPA) OAuth client for the web app: no secret, scopes of `openid profile email`, implicit consent enabled, and no "token authentication endpoint method".
2. Create a confidential (Node.js) OAuth client for the API server: with a secret, default scope of `am-introspect-all-tokens`, and `client_secret_basic` as the "token authentication endpoint method".

#### Create your Authentication Journeys/Trees

1. Login
2. Register

Note: The sample app currently supports the following callbacks only:

- NameCallback
- PasswordCallback
- ChoiceCallback
- ValidatedCreateUsernameCallback
- ValidatedCreatePasswordCallback
- StringAttributeInputCallback
- BooleanAttributeInputCallback
- KbaCreateCallback
- TermsAndConditionsCallback

### Configure Your `.env` File

Change the name of `.env.example` to `.env` and replace the bracketed values (e.g. `<<<helper-text>>>`) with your values.

Example with annotations:

```text
AM_URL=https://example-am-instance.forgerock.com/am (include the /am)
APP_URL=https://react.example.com:8443 (your SPA's URL)
API_URL=https://api.example.com:9443 (your resource API server's URL)
DEBUGGER_OFF=false
DEVELOPMENT=true
JOURNEY_LOGIN=Login (name of journey/tree for Login)
JOURNEY_REGISTER=Registration (name of journey/tree for Register)
SEC_KEY_FILE=key-file.pem
SEC_CERT_FILE=cer-filet.pem
REALM_PATH=alpha
REST_OAUTH_CLIENT=sample-app-server (name of private OAuth 2.0 client/application)
REST_OAUTH_SECRET=secret (the secret for the private OAuth 2.0 client/application)
WEB_OAUTH_CLIENT=example-react-app (the name of the public OAuth 2.0 client/application)
```

### Installing Dependencies and Run Build

**Run from root of repo**: since this sample app uses npm's workspaces, we recommend running the npm commands from the root of the repo. You can run this sample app's scripts from the root with the `-w` option to specify this sample app.

```sh
# Install all dependencies (no need to pass the -w option)
npm install

# Build this sample app project
npm run build -w reactjs-todos
```

### Update Your `/etc/hosts` File

Now you'll need to update your `hosts` (`/etc/hosts` if on a Mac) to allow for domain aliases:

```sh
sudo vim /etc/hosts
```

```text
# hosts file aliases
127.0.0.1 react.example.com api.example.com
```

### Run the Servers

Now, run the below commands to start the processes needed for building the application and running the servers for both client and API server:

```sh
# In one terminal window, run the following watch command
# This "watches" the client source files for changes and rebuilds when needed
npm run watch -w reactjs-todos
```

```sh
# In another terminal window, run the dev servers for both client and server
npm run servers -w reactjs-todos
```

Now, you should be able to visit `https://react.example.com:8443`, which is your web app or client (the Relying Party in OAuth terms). This client will make requests to your AM instance, (the Authorization Server in OAuth terms), which will be running on whatever domain you set, and `https://api.example.com:9443` as the REST API for your todos (the Resource Server).

### Accept Cert Exceptions

You will likely have to accept the security certificate exceptions for both your React app and the Node.js server. To accept the cert form the Node.js server, you can visit `https://api.example.com:9443/healthcheck` in your browser. Once you receive "OK", your Node.js server is running on the correct domain and port, and the cert is accepted.

## Learn About Integration Touchpoints

This project has a debugging statements that can be activated which causes the app to pause execution at each SDK integration point. It will have a comment above the `debugger` statement explaining the purpose of the integration.

If you'd like to use this feature as a learning tool, [open the live app](https://fr-react-todos.crbrl.io/) and then open the developer tools of your browser. Rerun the app with the developer tools open, and it will automatically pause at these points of integration.

For local development, if you want to turn these debuggers off, you can set the environment variable of `DEBUGGER_OFF` to true.

## Modifying This Project

### React Client

To modify the client portion of this project, you'll need to be familiar with the following React patterns:

1. [Functional components and composition](https://reactjs.org/docs/components-and-props.html)
2. [Hooks (including custom hooks)](https://reactjs.org/docs/hooks-intro.html)
3. [Context API](https://reactjs.org/docs/hooks-reference.html#usecontext)
4. [React Router](https://reactrouter.com/)

You'll also want a [basic understanding of Webpack](https://webpack.js.org/concepts/) and the following:

1. [Babel transformation for React](https://webpack.js.org/loaders/babel-loader/#root)
2. [Plugins for Sass-to-CSS processing](https://webpack.js.org/loaders/sass-loader/#root)

#### Styling and CSS

We heavily leveraged [Twitter Bootstrap](https://getbootstrap.com/) and [it's utility classes](https://getbootstrap.com/docs/5.0/utilities/api/), but you will see classes with the prefix `cstm_`. These are custom classes, hence the `cstm` shorthand, and they are explicitly used to denote an additional style application on top of Bootstrap's styling.

### REST API Server

To modify the API server, you'll need a [basic understanding of Node](https://nodejs.org/en/about/) as well as the following things:

1. [Express](https://expressjs.com/)
2. [PouchDB](https://pouchdb.com/)
3. [Superagent](https://www.npmjs.com/package/superagent)

## TypeScript?

The ForgeRock Javascript SDK is developed with TypeScript, so type definitions are available. This sample application does not utilize TypeScript, but if you'd like to see a version of this written in TypeScript, let us know.
