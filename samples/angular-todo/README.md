# Angular Todo Sample App

## Disclaimers

This sample code is provided "as is" and is not a supported product of ForgeRock. It's purpose is solely to demonstrate how the ForgeRock JavaScript SDK can be implemented within an Angular application. Also, this is not a demonstration of Angular itself or instructional for _how_ to build an Angular app. There are many aspects to routing, state management, tooling and other aspects to building an Angular app that are outside of the scope of this project. For information about creating an Angular app, [visit Angular's official documentation](https://angular.io/cli).

## Requirements

1. An instance of ForgeRock Access Management (AM), either within a ForgeRock's Identity Cloud tenant, your own private installation or locally installed on your computer
2. Node >= 14.2.0 (recommended: install via [official package installer](https://nodejs.org/en/))
3. Knowledge of using the Terminal/Command Line
4. Ability to generate security certs (recommended: mkcert ([installation instructions here](https://github.com/FiloSottile/mkcert#installation))
5. This project "cloned" to your computer

## Setup

Once you have the 5 requirements above met, we can build the project.

### Setup Your AM Instance

#### Configure CORS

- **Allowed Origins**: `https://angular.example.com:8443`
- **Allowed Methods**: `GET` `POST`
- **Allowed headers**: `accept-api-version` `authorization` `content-type` `x-requested-with`
- **Allow credentials**: enable

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

### Configure Your `.env` Files

First, in the main directory of the SDK repo, create a file named `.env` by copying the file `.env.example` and adding your relevant values. This new file provides all the important configuration settings to your applications.

Here’s a hypothetical example; your values may vary:

```text
AM_URL=https://auth.forgerock.com/am
APP_URL=https://angular.example.com:8443 # in develop we do not use this url for dynamic deployment reasons
API_URL=http://localhost:9443
DEBUGGER_OFF=true
JOURNEY_LOGIN=Login
JOURNEY_REGISTER=Register
REALM_PATH=alpha
WEB_OAUTH_CLIENT=WebOAuthClient
```

Now, do the same in the `samples/todos-api` directory based on its `.env.example` file. This file will allow the sample's backend to interact with your AM instance to protect the Todos.

As before, here is a hypothetical example; your values may vary:

```text
AM_URL=https://auth.forgerock.com/am
DEVELOPMENT=true
PORT=9443
REALM_PATH=alpha
REST_OAUTH_SECRET=changeit!
REST_OAUTH_CLIENT=RestOAuthClient
```

### Installing Dependencies

**Run from root of repo**: since this sample app uses npm's workspaces, we recommend running the npm commands from the root of the repo.

```sh
# Install all dependencies (no need to pass the -w option)
npm install

# (optional) build sample app project
# only if you want to see the app build; later on when you run the start command this will be done for you
npm run build:angular-todo
```

### Update Your `/etc/hosts` File

Now you'll need to update your `hosts` (`/etc/hosts` if on a Mac) to allow for domain aliases:

```sh
sudo vim /etc/hosts
```

```text
# hosts file aliases
127.0.0.1 angular.example.com
```

### Run the App and API

Run the below commands to start the processes needed for building the application and running the servers for both client and API server:

```sh
# In one terminal window, run the following watch command
npm run start:angular-todo
```

Now, you should be able to visit `https://angular.example.com:8443`, which is your web app or client (the Relying Party in OAuth terms). This client will make requests to your AM instance, (the Authorization Server in OAuth terms), which will be running on whatever domain you set, and `http://localhost:9443` as the REST API for your todos (the Resource Server).

### Accept Cert Exceptions

You will likely have to accept the security certificate exceptions for both your Angular app and the Node.js server. To accept the cert form the Node.js server, you can visit `http://localhost:9443/healthcheck` in your browser. Once you receive "OK", your Node.js server is running on the correct domain and port, and the cert is accepted.

## Learn About Integration Touchpoints

This project has a debugging statements that can be activated which causes the app to pause execution at each SDK integration point. It will have a comment above the `debugger` statement explaining the purpose of the integration.

For local development, if you want to turn these debuggers off, you can set the environment variable of `DEBUGGER_OFF` to true.

## Modifying This Project

### Angular Client

To modify the client portion of this project, you'll need to be familiar with the following Angular patterns:

1. [Components](https://angular.io/guide/architecture-components)
2. [Modules](https://angular.io/guide/architecture-modules)
3. [Services and Dependency Injection](https://angular.io/guide/architecture-services)
4. [Event Binding](https://angular.io/guide/event-binding-concepts)

You'll also want a [basic understanding of Webpack](https://webpack.js.org/concepts/) and the following:

1. [Plugins for Sass-to-CSS processing](https://webpack.js.org/loaders/sass-loader/#root)
2. [Angular CLI (used to create this app)](https://angular.io/cli)

#### Styling and CSS

We heavily leveraged [Twitter Bootstrap](https://getbootstrap.com/) and [it's utility classes](https://getbootstrap.com/docs/5.0/utilities/api/), but you will see classes with the prefix `cstm_`. These are custom classes, hence the `cstm` shorthand, and they are explicitly used to denote an additional style application on top of Bootstrap's styling.

### REST API Server

To modify the API server, you'll need a [basic understanding of Node](https://nodejs.org/en/about/) as well as the following things:

1. [Express](https://expressjs.com/)
2. [PouchDB](https://pouchdb.com/)
3. [Superagent](https://www.npmjs.com/package/superagent)
