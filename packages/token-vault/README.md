# Token Vault

Token Vault is a feature by ForgeRock that provides an additional layer of security for storing OAuth/OIDC tokens in a JavaScript application (SPA). This is useful for applications that need a higher level of security or have third-party code execution in their application that is not fully trusted. Once configured and setup, you can build your app, [use the Ping SDKs](https://docs.pingidentity.com/sdks/latest/sdks/index.html), and interact with protected resources as you normally would. Token Vault is entirely framework and library agnostic.

Token Vault is a plugin to our [JavaScript SDK](https://www.npmjs.com/package/@forgerock/javascript-sdk). It is developed around the idea of "Origin Isolation", which you can [read more about in this article](https://github.com/ForgeRock/appAuthHelper/blob/master/origin_isolation.md). To accomplish this, it uses both a Service Worker to intercept allowlisted URLs from emitted `fetch` requests (what we will call an Interceptor) and an `iframe` hosted on a different origin that acts as a proxy and OAuth/OIDC token management layer (what we'll call the Proxy.

It's important to note that we consider this an _advanced_ usage of the ForgeRock JavaScript SDK and not a standard use case. Implementing this feature into your web application is inherently complicated, so we don't recommend this during the prototyping or proof-of-concept stage of development. Only implement this when you have established a core understanding of the ForgeRock system and the ForgeRock JavaScript SDK.

## Overall Design

There are three main entities involved in a normal implementation of a ForgeRock SDK protected web application (JavaScript, Single-Page Application or SPA to be precise):

1. Your JavaScript application (a SPA)
2. The ForgeRock JavaScript SDK (an npm package)
3. The ForgeRock server (Identity Cloud or a stand-alone Access Manager)

To implement the Token Vault into your application for increased token security, you'll need one more npm package: the Token Vault. This new package provides a few more items to your overall system:

1. The Token Vault Client, a JavaScript SDK plugin
2. The Token Vault Interceptor (the Service Worker)
3. The Token Vault Proxy (the iframe)

It's not important to know exactly how all of these are wired together, but loosely understanding the major components is important. The JavaScript SDK and the Token Vault are both npm packages and are designed to work together to provide a seamless developer experience.

## How it Works

We won't go into too much detail here, so let's start with the basics. The end result of implementing the Token Vault plugin is a system that resembles this:

1. **Main App**: JavaScript SPA using the ForgeRock SDK and the Token Vault Client, running on `https://app.example.com`
2. **Token Vault Interceptor**: a Service Worker registered on Main App, running on `https://app.example.com`
3. **Token Vault Proxy**: an `iframe` app injected into Main App, running on `https://proxy.example.com`

### Browser Storage

Whether it's Web Storage API or IndexedDB, any data stored within the browser is restricted by the web app's origin (aka. scheme, domain and port), which is [known as the Same-Origin Policy](https://www.w3.org/Security/wiki/Same_Origin_Policy). We will be leveraging this "same-origin" restriction to store the OAuth/OIDC Tokens (just "tokens" from here on out) we collect using the [Authorization Code Flow](https://docs.pingidentity.com/pingam/7.5/oauth2-guide/oauth2-authz-grant-pkce.html) and keep them out of reach from malicious actors.

### Iframe (aka the Proxy)

Though rarely used in modern web applications, we will be taking advantage of the fact that [iframes (aka inline frames)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) can be embedded within web applications and form a parent-child relationship. As long as the two frames (main app and the child iframe) share the same parent domain, what's called a first-party context, they can communicate with one another without restriction.

As you'll see shortly, it will be important for the two frames to differ by origin _but_ share a parent domain. This special relationship will allow us to store tokens out of reach from code running in the main app, but allow the main app to "proxy" requests through this iframe in order for the Access Token to be attached to the outbound call. This allows tokens to go into the Proxy, but not come out.

### Service Worker (aka the Interceptor)

[Service workers are a complex feature provided by modern browsers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), but our use of them is quite simple: to intercept a restricted list of URL when a `fetch` request is emitted from the main app. This request is then forwarded to the iframe acting as the proxy.

This restricted list of URLs are the configured endpoints that need _interception_ as they require authorization to succeed. Since the main application does not have access to the stored tokens, they must be "proxied" through the iframe in order for the Access Token to be attached to the outbound call.

### The Sequence, Simplified

When your application requests tokens from the ForgeRock server (Authorization Server) using the SDK, it will use the [Authorization Code Flow with PKCE](https://docs.pingidentity.com/pingam/7.5/oauth2-guide/oauth2-authz-grant-pkce.html). The last request in this flow is a call to the `/access_token` endpoint. This request is intercepted and forwarded to the Proxy. When the Proxy receives the tokens in the response, it will store them within its origin, which should be different than the main app.

Before it returns the response to the main app, it redacts the token values from the response body. This ensures the main app never receives or stores the tokens. The Proxy then stores the tokens on behalf of the main app and will be available as a proxy to be used for any future "protected calls" that require the Access Token to be attached to the request.

When any request is made by the main app that is configured for authorization the Interceptor will forward it to the Proxy. This includes the usual requests made from the SDK, like requesting user info or revoking tokens. The Proxy will attach the Access Token to the outbound request, and then return the response to the main app with it resolves. If the tokens have expired or become invalid, the main app will receive a 400 response from the proxy.

## Server Setup

Configuration is the key to success with this setup, so take extra care to ensure it's correct and consistent throughout your setup.

### CORS

First, configure your [server's CORS settings](https://docs.pingidentity.com/sdks/latest/sdks/tutorials/javascript/00_before-you-begin.html#server_configuration) (if using ForgeRock's Identity Cloud product, there's a [preset JavaScript SDK CORS configuration](https://docs.pingidentity.com/pingoneaic/latest/tenants/configure-cors.html) that can be used as a starter):

1. **Accepted origins**: these should be the origins (scheme, domain and port) for your app AND proxy
2. **Accepted methods**: `GET` and `POST` are enough
3. **Accepted headers**: `authorization` `accept-api-version` `x-requested-with` `content-type` `accept`
4. **Allow credentials**: checked/enabled

An example or your origins can be `http://localhost:5173` and `http://localhost:5174` for your local development computer or `https://app.example.com` and `https://proxy.example.com` for production.

### OAuth

Configure your [OAuth client](https://docs.pingidentity.com/sdks/latest/sdks/tutorials/javascript/00_before-you-begin.html#server_configuration):

1. **Client ID**: Any alphanumeric string can be used here to identity this client
2. **Client secret**: keep this blank
3. **Sign-in URLs**: This URLs should be fully qualified URLs that you want ForgeRock to redirect to provide the Authorization Code for you to collect tokens; if you're using a dynamic value like `location.href`, make sure to pay close attention to trailing slashes
4. **Grant types**: `Authorization Code` and `Refresh Token`
5. **Scopes**: `openid` `email` `profile` and any others you need for your app
6. **Response types**: `code` `token` `id_token` `refresh_token`
7. **Token endpoint authentication method**: `none`
8. **Client type**: `Public`
9. **Implied consent**: this needs to be _enabled_ if you are using Embedded Login (if you are using Centralized Login, you can leave this disabled)

#### Refresh Tokens

In a typical web application using the ForgeRock SDK, we would _not_ recommend the use of Refresh Tokens. But, Token Vault increases the level of token security to allow its use for automatically refreshing Access Tokens without any intervention. To enable this, ensure the use of `Refresh Token` grant is set in the OAuth client and `refresh_token` as a response type within your ForgeRock server.

## Application Setup

In a "normal" setup, a web app usually requires a few things:

1. A dependency/package manager (npm, Yarn, etc)
2. An application framework (React, Angular, etc)
3. Some kind of module bundler (Webpack, Vite, etc)
4. Some kind of web server (Node, Nginx, Apache, etc)

In the most modern web applications, the last two are often the same technology. For Angular, it can often be the last three. Vite can be both the module bundler/resolver and the web server. Webpack, another bundler, has the `webpack-dev-server`.

To build an app that implements Token Vault, we will need to adjust the last two in the list above: module bundler and web server. Because of this, you'll want to be familiar with configuring these two layers of technology.

### Module Bundler

The change involved with your module bundler is required because the Interceptor, a Service Worker, needs to be built differently from your main application's bundle. This is due to browser inconsistency with supported language features, and therefore we recommend the Interceptor be unified and "down-leveled" into a single output file for cross-browser compatibility.

You'll want to create a separate bundler config file dedicated to your interceptor. It should be configured to produce a single file without ES Module syntax. Webpack (v5 or earlier), will do this be default. The configuration file dedicated to your main application can be the default configuration or your own, preferred configuration.

Finally, the Proxy should also have its own module bundler as it's technically a different application from your main app. Though, for this, the default configuration should work without issue.

### Web Server

The change involved with your web server is due to the Proxy, an "iframed" application, that needs to be served from a different origin from your main application. This is what necessitates the need for a dedicated server for just the Proxy itself.

The important thing to note here is that the server for the Proxy needs to be running on a different port for `localhost` or a different sub-domain for production.

Lastly, the web server for the main application needs to avoid rewriting incoming URLs as there's a redirection back to your application from the ForgeRock server, and its query parameters need to be preserved and read by the SDK. If you're seeing timeout issues related to the `/authorize` request, even thought it succeeds and redirects back to your app with the `code` and `state` query parameters (and the request to `/access_token` isn't made). This is likely your server rewriting the URL to `/`, stripping the query parameters from the request and not allowing it to resolve correctly.

### Codebase Structure (recommended)

You are free to structure your code in whatever way makes sense to you and for your application, but here's a recommendation that helps us manage the different pieces. If you use Vite, this structure may look familiar.

```txt
--root
  |--.env <-- store the shared config here
  |--package.json <-- We use npm workspaces
  |--app/ <-- Directory for your main application
     |--public/
	    |--<static files>
     |--src/
        |--main.js
        |--<app files>
	 |--interceptor/ <-- Interceptor should be separate from app code
	    |--interceptor.js
     |--index.html
     |--package.json
     |--vite.config.js <-- Builds the main app
	 |--vite.interceptor.config.js <-- Dedicated build for Interceptor
  |--proxy/ <-- Dedicated directory for the Proxy
     |--src/
        |--proxy.js
     |--index.html
     |--package.json
     |--vite.config.js <-- Builds the Proxy app
```

Let's take a look at some of the more important files.

First, `app/src/index.html`:

```html
<!doctype html>
<html lang="en">
  <head></head>

  <body>
    <!-- Root div for mounting React app -->
    <div id="root"></div>

    <!-- Root div for mounting Token Vault Proxy (iframe) -->
    <div id="token-vault"></div>

    <!-- Import React app -->
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

Next, `app/src/main.js`:

```js
import { Config, TokenManager } from '@forgerock/javascript-sdk';
import { client } from '@forgerock/token-vault';

const register = client({
  /* global config */
});

register.interceptor();
register.proxy(document.getElementById('token-vault'));

const tokenVaultStore = register.store();

Config.set({
  /* ForgeRock SDK config */
});
```

Now, let's look at `app/interceptor/interceptor.js`:

```js
import { interceptor } from '@forgerock/token-vault';

interceptor({
  /* config */
});
```

Lastly, let's look at `proxy/src/proxy.js`:

```js
import { proxy } from '@forgerock/token-vault';

proxy({
  /* config */
});
```

### Application Configuration

As you can see in the above example files, there's a good amount of duplicated configuration that needs to happen within all these entities at build-time, so we recommend having a central, single place for this configuration to be stored in your codebase. Each entity being configured independently is to ensure the highest level of security. Passing around configuration at runtime between entities in the system could be a potential vector, so we don't have a mechanism to do this.

We frequently make use of `.env` files, which can be picked up by module bundlers like Vite or dedicated npm modules like `dotenv`. The example code below will uses literal values for clarity, but this increases human error as it's too easy to make a typo, so we don't recommend this in your actual implementation.

There are three locations that need to be properly configured:

#### The Main App

This configuration should be within your app's `index` or `main` file. First, let's initialize the Token Vault Client as you saw above:

```js
// app/src/main.js
import { Config, TokenManager } from '@forgerock/javascript-sdk';
import { client } from '@forgerock/token-vault';

/**
 * This factory function takes in a config object and returns
 * the necessary methods to setup the iframe ("proxy"), the
 * service worker ("interceptor"), and the token store replacement
 * API	("store").
 */
const register = client({
  app: {
    origin: 'http://localhost:5173',
  },
  interceptor: {
    file: '/interceptor.js',
  },
  proxy: {
    origin: 'http://localhost:5175',
  },
});

/**
 * Sets up the service worker for intercepting fetch requests
 */
register.interceptor({
  /* optional interceptor worker config */
});

/**
 * Injects the iframe into the DOM to setup the proxy
 * Make sure to pass in the required, real DOM element as the zeroeth argument
 */
register.proxy(document.getElementById('token-vault'), {
  /* optional proxy config */
});

/**
 * Creates the store replacement for the SDK
 */
const tokenVaultStore = register.store({
  /* optional store config */
});
```

Then, within the same file, you must configure the SDK. Here's the minimum configuration for the SDK:

```js
// app/src/main.js
// ...
// Configuring the SDK (values should be your own)
Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: location.href,
  scope: 'openid email profile',
  serverConfig: {
    baseUrl: 'https//auth.example.com/am/',
    timeout: 5000,
  },
  realmPath: 'alpha',
  // Replace the default token store with Token Vault's store
  tokenStore: tokenVaultStore,
});
```

#### The Interceptor

This configuration should be within the Service Worker's entry file, which is separate from your main application code. This is also the file to which your `client()` method config object property of `interceptor.file` method references. The minimum configuration is the following:

```js
// app/interceptor/inteceptor.js
import { interceptor } from '@forgerock/token-vault';

interceptor({
  interceptor: {
    // Only fully qualified URLs can be used here, or
    // a single, ending glob can be used
    urls: [
      /* Your protected endpoint URLs */
    ],
  },
  forgerock: {
    // The below MUST match what you configured in your main app
    serverConfig: {
      baseUrl: 'https//auth.example.com/am/',
      timeout: 5000,
    },
    realmPath: 'alpha',
  },
});
```

Note: The `interceptor.urls` array is a required property and will also be shared with the upcoming Proxy configuration, so it's best to store this array as a global, build-time value in the project. If not provided, your Interceptor will throw an error of "Config: `config.interceptor.urls` is required".

These urls can accept a `/*` ending to match any request from a particular root domain and path without having to declare each and every unique endpoint that's used in your app. Please note that this isn't a full glob-pattern feature, but just a single ending `*` (wildcard).

#### The Proxy

This configuration should be within your Proxy's entry file. The minimum configuration is the following:

```js
// proxy/src/proxy.js
import { proxy } from '@forgerock/token-vault';

proxy({
  app: {
    // This MUST match the origin on which your main app runs
    origin: 'https://app.example.com',
  },
  forgerock: {
    // The below MUST match what you configured in your main app and interceptor
    clientId: 'WebOAuthClient',
    redirectUri: location.href,
    scope: 'openid email profile',
    serverConfig: {
      baseUrl: 'https//auth.example.com/am/',
      timeout: 5000,
    },
    realmPath: 'alpha',
  },
  proxy: {
    urls: [
      /* Your protected endpoints; should be identical to `interceptor.urls` */
    ],
  },
});
```

Note: the `proxy.urls`, which is shared with `interceptor.urls` from the Interceptor configuration, is a required property for security. If not provided, your Proxy will `throw` an error or "Config: `config.proxy.urls` is required".

## Building the Code

Token Vault requires a bit more building/bundling configuration than a "normal" JavaScript app with the SDK. This is because Token Vault requires 3 different bundles:

1. Your main application
2. Your Token Vault Interceptor (Service Worker)
3. Your Token Vault Proxy (`iframe`)

The configuration for the main application and the Proxy can usually be left as default using any of the popular bundlers (Webpack, Vite, etc.), or any configuration you deem best for you and your project. The Interceptor, on the other hand, does require a specific configuration for bundling, which we'll cover next.

### Bundling the Interceptor

To provide the best cross-browser support, the Interceptor requires a dedicated bundle configuration to ensure it results in a _single-file_ output, down-leveled to at least ES2020 without _any_ ES Module syntax. We recommend using a separate `vite.interceptor.config.js` or `webpack.interceptor.config.js` for the Interceptor, and a separate command that consumes this separate configuration file.

Note: for Vite users, we've had the best results with bundling into an IIFE. Webpack's defaults, on the other hand, tend to work quite well.

## Using the Token Vault

Once the Token Vault is properly setup, you can use the JavaScript SDK and any HTTP/fetch library to request protected resources. With the exception of using Refresh Tokens and the token storage mechanism, the remainder of the [documentation for the Ping SDK for JavaScript](https://docs.pingidentity.com/sdks/latest/sdks/index.html) will remain consistent. The Token Vault will manage your token's lifecycle automatically and, if Refresh Token is enabled in your OAuth client, automatic Access Token refreshing will be handled by the Token Vault as well.

### Requesting & Using Tokens

You can request tokens and have them safely stored within the Token Vault Proxy using the usual `TokenManager` class from the SDK:

```js
import { TokenManager } from '@forgerock/javascript-sdk';

const tokens = TokenManager.getTokens();

console.log(tokens); // Refresh & Access Token values will be redacted
```

After successfully requesting tokens, you should notice within your browser's developer tools that the tokens are stored under the proxy's origin, not your app's origin. You may also notice that the response your app, and therefore the SDK itself, contains redacted values. This is expected behavior and for additional security.

For example:

```json
{
  "accessToken": "REDACTED",
  "idToken": "eyJ0eXAiOiJKV1QiLCJra…7r8soMCk8A7QdQpg",
  "refreshToken": "REDACTED",
  "tokenExpiry": 1690712227226
}
```

### Revoking Tokens

To remove tokens and log the user out, use the `FRUser` class:

```js
import { FRUser } from '@forgerock/javascript-sdk';

FRUser.logout();
```

This will destroy the user's session, revoke tokens on the server and remove tokens from the browser.

### Validating Tokens

### Convenience Methods

There are a few convenience functions that can be found on the `tokenVaultStore`. These methods are introduced since the main application will not have direct access to the tokens.

#### The `has` Method

This is a way of asking the Token Vault if it has the tokens. It only returns an object with a `hasTokens` prop and a boolean value. It does _not_ return the tokens.

```js
const tokenVaultStore = register.store();

const { hasTokens } = tokenVaultStore.has();

console.log(hasTokens); // logs `true` or `false`
```

It's worth noting that this method doesn't validate the tokens, but just reflects the presence of tokens. If you want to validate the tokens, it's best to use the `UserManager.getCurrentUser` method. If that method returns user data, then the tokens are validated by the Authorization Server.

#### The `refresh` Method

This is a method to manually ask the Token Vault to refresh its tokens. The Token Vault will attempt to refresh tokens automatically for you, but this will force a refresh of the tokens, if needed. This method will return an object with a `refreshTokens` property with a boolean value.

```js
const tokenVaultStore = register.store();

const { refreshTokens } = tokenVaultStore.refresh();

console.log(refreshTokens); // logs `true` or `false`
```

#### Making Requests

You are free to use the native `fetch` API or any any HTTP request library that emits a `fetch` event. There's also the `HttpClient` module that is available for use from the JavaScript SDK.

## FAQs

### Q: How Do I Fix CORS Errors?

Make sure your CORS configuration in your ForgeRock server allows/accepts origins from both the origin of your app, but also your Token Vault Proxy. These two origins should be unique from one another, and there both need to be configured in your ForgeRock server.

### Q: Why Am I Getting an Iframe Error?

This is likely an error coming from the `/authorize` request to collect OAuth/OIDC tokens. First, make sure you're using version 4 of the SDK. If you are using version 4, then the quickest way to diagnose the issue is to copy the full URL from the network tab in your dev tools and paste it into your browser's URL field to directly visit it.

A `400` error coming from the `/authorize` endpoint is likely a misconfiguration. If a consent page is rendering, then ensure you enable implied consent both within your OAuth Provider and OAuth client.

Lastly, make sure you don't have third-party cookies disabled. Chromium browser's Incognito/Private mode as well as Safari disable third-party cookies by default.

### Q: Why Are the Tokens Not Being Stored?

If you are receiving tokens from the `/access_token` endpoint, but they are not getting stored, this is likely to happen if you've setup Token Vault within your application, but the Interceptor is not catching your request and forwarding it to the Proxy. Only the Proxy can store tokens when Token Vault is enabled.

To fix this, ensure your config is identical between your main app's SDK config found in `Config.set()` and the config found in your Interceptor file. This is why we recommend using using environment variables, rather than hardcoding the values directly in all the modules.

### Q: Why Does the Interceptor (Service Worker) Not work/error in Firefox or Safari?

You're Interceptor bundler is likely not bundling to a single file, and language features are present in the bundle that the browser doesn't support in a Service Worker context. Ensure that your bundler (eg. Vite or Webpack) configuration is creating a single file output and down-leveled to `ES2020`. This is why we recommend a dedicated bundle config for your Interceptor file/module, separate from your application bundle.

### Q: Why Am I Getting `400 Proxy Error`?

These errors often occur when the Proxy itself is encountering an error, and not an HTTP error response from the server. If you inspect the network tab in your dev tools, there should be an error message in the response to help further debug the issue.
