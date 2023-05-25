# Service Worker & Iframe Proxy with Alternative Origin Token Store

This is a prototype to explore the idea of using a Service Worker for intercepting `fetch` requests and rerouting them through an [iframe with an alternative origin (Origin Isolation)](https://github.com/ForgeRock/appAuthHelper/blob/master/origin_isolation.md). By leveraging an iframe on an alternative origin, we are able to store the tokens using the standard Web Storage API while also keeping them completely inaccessible to the main application.

There are 3 main entities involved in the front-end architecture:

1. **Main app**: Standard JavaScript app (e.g. `https://app.example.com`)
2. **Service Worker**: Registered by the Main App (accessible on `https://app.example.com`)
3. **Iframe**: Alternative origin `frame` (e.g. `https://proxy.example.com`) with a document that contains just private token store and request forwarding script

It's worth noting that this is heavily inspired by [AppAuthHelper](https://github.com/ForgeRock/appAuthHelper). This project is intended to provide a solution that integrates the functionality of AppAuthHelper with an application that uses the [ForgeRock JavaScript SDK](https://github.com/ForgeRock/forgerock-javascript-sdk).

## Main App

There's no real change to the structure or design of the main application. This app can use the SDK and make HTTP requests in any way that "emits" the `fetch` event. Most standard HTTP libraries will do this.

The below is the most simple or reduced implementation. The actual implementation will be more abstracted and automated, but the below makes it more understandable:

1. Register the Service Worker.

   ```js
   // Registers the Service Worker to origin of Main App: `https://app.example.com`
   const registerServiceWorker = async () => {
     if ('serviceWorker' in navigator) {
       try {
         navigator.serviceWorker.register('sw.js', { type: 'module' });
       } catch (error) {
         console.error(`SW registration failed with ${error}`);
       }
     }
   };

   registerServiceWorker();
   ```

2. Include or inject the alt. origin `frame` in the HTML pointing to the token store & request forwarding document. This alt. origin cannot be a third-party domain; meaning, the alt. origin can only differ by subdomain, not root domain.

   ```html
   <!-- Calls a separately running server on a **different** domain -->
   <iframe
     id="identityProxyFrame"
     src="http://proxy.example.com"
     style="display: none;"
   ></iframe>
   ```

3. Configure the SDK as usual, with the addition of a custom token store object.

   ```js
   Config.set({
     // Using SDK configuration ...
     tokenStore: {
       get(clientId) {
         // The iframe has no API for getting tokens out
         // Currently, we need to return an empty object so SDK methods don't crash
         return Promise.resolve({});
       },
       remove(clientId) {
         const proxyChannel = new MessageChannel();

         // Sends message to iframe to delete tokens
         return new Promise((resolve, reject) => {
           identityProxyFrame.contentWindow.postMessage(
             { type: 'REMOVE_TOKENS', clientId },
             '*',
             [proxyChannel.port2]
           );
           proxyChannel.port1.onmessage = (event) => {
             resolve(event.data);
           };
         });
       },
       set(clientId, tokens) {
         const proxyChannel = new MessageChannel();

         // Sends the token to the iframe for storage
         return new Promise((resolve, reject) => {
           identityProxyFrame.contentWindow.postMessage(
             { type: 'SET_TOKENS', clientId, tokens },
             '*',
             [proxyChannel.port2]
           );
           proxyChannel.port1.onmessage = (event) => {
             resolve(event.data);
           };
         });
       },
     },
   });
   ```

   Using this technique prevents the SDK from using its own storage and integrates the private token store from the alt. origin `frame`. This essentially converts the storage methods into a messaging scheme for communicating with the `frame`.

## Service Worker (SW)

The purpose of the Service Worker (SW) is to intercept `fetch` request from the main app and convert the request into a `postMessage` that is, eventually, passed to the alternative origin `frame` that makes the request to the protected Resource Server. The service worker also passes a reference to a message channel for use when the `fetch` request receives a response.

This SW just installs, activates and then listens for the `fetch` event. It will only intercept a `fetch` request that contains domain that have been configured for interception. When a `fetch` is received with a domain to be intercepted, it creates a `MessageChannel` pair: one for sending a message and one for receiving a message. The channel for sending eventually gets passed to the `frame`.

The original request gets converted into a passable message. When ready, it posts a message to the main app, with a few things:

- The message type
- The prepared request
- The message channel for sending a message back

## Iframe

The purpose of this `frame` on an alternative origin is to store tokens on an inaccessible location separate from the Main App's origin. This `frame` is responsible for a few things:

- Listen for "token" events
- Store, manage tokens
- Listen for "fetch" request event
- Attach Access Token to requests
- Complete request to resource server
- Use the message channel to send response back to SW

## Sequence diagram

![Sequence diagram for service worker and iframe](/diagrams/sw-iframe-sequence-diagram.jpg)

## What this prototype does

1. Enables Centralized Login
2. Stores tokens in alt. origin `frame`
3. Make a real, protected request to the `/userinfo` endpoint
4. Make a cross domain, request to a mock data endpoint
5. Logout/revoke tokens

## Notes

### This was implemented with no modification of the SDK

This implementation uses a "plugin" like architecture, rather than building the feature directly in the SDK. This is not necessary as much of it _could_ be written into the SDK, but this reduces the work necessary to achieve the functionality as well as reduces risk.

### Main App still requests and receives the OAuth tokens

This is to reduce complexity. If the only security measure is related to token storage, then this fulfils this requirement. But, if we don't want the Main App or SW to even receive the token through the response, we could have the `frame` remove the token from the response before forwarding it to the SW.

### Additional APIs would be added to Iframe

Due to the tokens being inaccessible from the Main App, the intention would be to provide an API for asking the `frame` questions about the tokens, without actually providing the actual token values. Question like, "Do I have tokens?" or "Are the tokens valid?", could be provided.

### Flag of `forceRenew` is required for `getTokens`

Due to the SDK expecting to be able to directly manage tokens, there are some thrown errors in certain flows. To overcome this, the `get` method of the token store object needs to return an empty object. The only known side-effect of this is when calling `TokenManager.getTokens()`, `forceRenew` is required as it needs to ignore the fact that `get` returns an object without error.

### Firefox's Private Mode

Service Workers are unfortunately disabled when in Firefox's Private Mode, which breaks this solution. Can we provide some kind of fallback? At this time, I don't know. Bug ticket for Firefox here (from 6 years ago): https://bugzilla.mozilla.org/show_bug.cgi?id=1320796.

### This has zero error or edge case handling

Since this is a prototype, error and edge cases are not covered and should not be expected. Only narrow, happy path is covered.

### I would recommend using Refresh Tokens

Refresh tokens could be added as they would provide a seamless and simple way of refreshing the Access Token without involving the Main App or its SW. The `frame` could easily and securely store the Refresh Token and use it to request a new Access Token when a time threshold is met or a 401 is returned. If both the Refresh and Access Token are invalid, then the `frame` would respond to the Main App with the need to request a new set of tokens through the Authorization Code Flow.

## Quick Start

1. `cd app` and then run `python -m SimpleHTTPServer 8000`. This will run the server for your app
2. In separate terminal window, `cd proxy` and run `python -m SimpleHTTPServer 9000`. This will be the server for your proxy.
3. Access the app on `http://localhost:8000` and everything is hardcoded to [my ID Clout tenant](https://openam-crbrl-01.forgeblocks.com)
4. Click login, and you should be redirected to Platform Login; OAuth tokens can be seen in the localStorage under the alternative origin: `http://localhost:9000`
5. Once you return back to the app, you can click on _Fetch Real User_; user info will be logged to console.
6. You can also click _Logout_ – there will be some errors, but the tokens are removed locally and revoked on server
