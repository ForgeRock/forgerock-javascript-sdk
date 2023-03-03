# ForgeRock Web Login Framework

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: conventional](https://img.shields.io/badge/semantic--release-conventional-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## WARNING: VAPORWARE

**This is a prototype of a development framework for generating a ForgeRock Login App for self-hosting or JavaScript Widget into an existing self-hosted SPA (React, Vue, Angular, etc.). This project is not officially supported and is not recommended for any project development. If you use this, you accept all the risks that come with completely unsupported software.**

## Table of Contents

- [Overview](#overview)
- [Quick Start: Using the Widget in Your App](#quick-start-using-the-widget-in-your-app)
  - [Adding the Widget's CSS](#adding-the-widgets-css)
  - [Using the Modal component](#using-the-modal-component)
  - [Using the Inline component](#using-the-inline-component)
- [Complete Widget API](#complete-widget-api)
  - [Widget](#widget)
  - [Journey](#journey)
  - [User](#user)
  - [Request](#request)
  - [Modal](#modal)
  - [Inline](#inline)
  - [Styling API](#styling-api)
- [Future APIs (not implemented)](#future-apis-not-implemented)
  - [Currently unsupported](#currently-unsupported)
  - [Widget customization (future)](#widget-customization-future)
  - [Additional modal events (future)](#additional-modal-events-future)
- [Quick Start: Internal Login Framework Development](#quick-start-internal-login-framework-development)
  - [Technical requirements](#technical-requirements)
  - [Knowledge requirements](#knowledge-requirements)
  - [Instal, build & run](#instal-build--run)
- [Disclaimer](#disclaimer)
- [License](#license)

## Overview

The Login Widget produced by this framework is intended to be an all-inclusive, UI component that can be used within any modern JavaScript app for handling the default login, registration and related user flows. It can be used within a React, Vue, Angular or any other modern JavaScript framework (does not currently support Node.js or server-rendering (SSR)).

This Widget uses the ForgeRock JavaScript SDK internally. It adds a UI rendering layer on top of the SDK to help eliminate the need to develop and maintain the UI components necessary for providing complex authentication flows. Although this rendering layer is developed with Svelte and Tailwind, it is "compiled away" and has no runtime dependencies. It is library and framework agnostic.

This Widget can be used in two different ways (or "form factors"):

1. **Modal** component: this renders the form elements inside a modal dialog that can be opened and closed. This component is mounted outside of your app's controlled DOM.
2. **Inline** component: this is just the form elements themselves, no container. This component is intended to be rendered inside your app's controlled DOM.

Both components provide the same authentication, token and user features. The only difference is how the component is rendered within your app.

The Modal component is recommended as it provides the quickest development experience for providing login and registration flows into your app with the least disruption to your codebase. The Modal will be controlled within your app, but rendered in its own DOM root node and visual layer.

For example:

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="react-root">
      <!--
        Contents of this div are controlled by React or Vue via the Virtual DOM
      -->
    </div>
    <!--
      Outside of React or Vue's controlled DOM
    -->
    <div id="widget-root"></div>
  </body>
</html>
```

The Inline component, on the other hand, allows you to render the resulting form within your app's controlled DOM and visual layer (rather than on top of it) in whatever way is best for you, but there are some caveats to understand.

For example:

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="react-root">
      <!--
        Contents of this div are controlled by React or Vue via the Virtual DOM

        Widget's root will need to be _mounted_ inside this "controlled" div by
        React or Vue **before** instantiating Widget
      -->
    </div>
  </body>
</html>
```

More details will be discussed below in the [Inline section](#using-the-inline-component).

## Quick Start: Using the Widget in Your App

Note: This project is currently in Beta, so this is not available via public npm. Because of this, it's worth noting what's not [currently supported](#currently-unsupported).

1. `git clone https://github.com/cerebrl/forgerock-web-login-framework`
2. `cd forgerock-web-login-framework`
3. `npm install` (or simply `npm i`)
4. `npm run build:widget`
5. Copy the built `package/` directory with its contents and paste (or drag-n-drop) it into your project
6. Import the Widget by directory reference, since it's local to your project; e.g. `import Widget from '../path/to/package/modal';`

### Adding the Widget's CSS

There are a few ways to add the Widget's CSS to your product:

1. Import it into your JavaScript project as a module
2. Import it using a CSS preprocessor, like Sass, Less or PostCSS
3. Copy and paste the CSS file from the Widget and link it into your HTML

If you decide to import the CSS into your JavaScript, make sure your bundler knows how to import and process the CSS as a module. If using a CSS preprocessor, ensure you configure your preprocessor to access files from within your `package/` directory.

Copying the file and pasting it into your project for linking in the HTML is the easiest.

Importing into your JavaScript:

```js
import '../path/to/package/widget.css';
```

Importing into your CSS:

```css
@import '../path/to/package/widget.css';
```

Linking CSS in HTML example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="/path/to/package/widget.css" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

#### Controlling the CSS cascade

To ensure the proper CSS cascade, you can use `@layer` to ensure the browser applies the CSS in the way you intend regardless of the order you import or declare the CSS in your project. You can [read more about this new browser feature in the Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

Steps recommended:

1. Wrap your current CSS in a layer called `app`:

   ```css
   @layer app {
     /* Your app's CSS */
   }
   ```

   Widget layers are already declared within the Widget's CSS.

2. Declare the order of layers in your index HTML file before any CSS is loaded:

   ```html
   <style type="text/css">
     @layer app;
     /* List the Widget layers last */
     @layer 'fr-widget.base';
     @layer 'fr-widget.utilities';
     @layer 'fr-widget.components';
     @layer 'fr-widget.variants';
   </style>
   ```

   It's important to note that none of the CSS imported for the Widget will overwrite any of your app's CSS. It's all namespaced to ensure there are no collisions. Unless, that is, you use the exact same selector naming convention we use.

### Using the Modal component

#### Add element to your HTML file

We recommend you add a new element on which you will mount the Widget to your static HTML file. For most SPAs (Single Page Applications), this will be your `index.html`. This new element should be a direct child element of the body, and not without the element you mount your SPA.

Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- Root element for main app -->
    <div id="root"></div>
    <!-- Root element for Widget -->
    <div id="widget-root"></div>
    <!-- scripts ... -->
  </body>
</html>
```

NOTE: We do not recommend injecting the element on which you will mount the widget within your main application. This can cause Virtual DOM issues, so manually adding it within your static HTML file is best.

#### Instantiate the Widget (Modal)

Now, you can import the Widget into your app wherever you would like as a modal dialog (aka "lightbox"), or as an embedded component. Once the Widget is imported, you will need to instantiate it.

```js
// As modal dialog
import Widget from 'forgerock-web-login-widget/modal';

// ...

new Widget({
  target: document.getElementById('widget-root'), // Any existing element from static HTML file
  props: {
    config: {}, // Your JS SDK configuration; see below
  },
});
```

This mounts your Widget into the DOM. If you choose the modal version, it will be hidden at first.

Note: [See additional documentation about configuring the JS SDK](https://backstage.forgerock.com/docs/sdks/3.3/javascript/configuring/configuring-forgerock-sdk-settings-for-your-javascript-app.html).

#### Starting a journey (Modal)

The Widget will be mounted to the DOM, but it will not display the first step of the journey. To render the first step, you'll need to import the `journey` object and call the `journey.start` method. This makes the initial request to the ForgeRock server for the initial step.

```js
import Widget, { journey } from 'forgerock-web-login-widget/modal';

new Widget({
  target: document.getElementById('login-widget'), // Any existing element in the DOM
  props: {
    config: {}, // Your JS SDK configuration; see below
  },
});

// Be sure to call after instantiating the Widget
journey.start();

// OR, call on button click
buttonElement.addEventListener('click', (event) => {
  journey.start();
});
```

This `journey.start` method can be called anywhere in your application, or anytime as long as it's _after_ the Widget being mounted to the DOM.

#### Listening for journey completion (Modal)

Use the `journey.onSuccess` method to know when a user has completed their journey. Pass a callback function into this method to run when the journey successfully completes.

```js
journey.onSuccess((response) => {
  console.log(response);
});
```

And, that's it. You now can mount, display, and authenticate users through the ForgeRock Login Widget. There are addition features documented below for a more complete implementation. For more about Widget events, [see the Widget Events section](#widget-events).

#### Controlling the modal dialog

To show the modal, you will need to import the `modal` object, and use the `modal.open` method. It's common to execute this within a button's click handler.

```js
import Widget, { modal } from 'forgerock-web-login-widget/modal';

// ...

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
  modal.open();
});
```

Opening the modal will display the Widget in a "Lightbox" or modal dialog and make a request to your ID Cloud (or AM) instance. When the Widget gets the response, it will display the required fields for authenticating the user. When the user successfully authenticates, the modal will close itself. If you'd like to close the widget programmatically, you can call the `modal.close` method.

### Using the Inline component

#### Element for mounting

The Widget requires a real DOM element on which to mount. Since the Inline component will be mounted within your application's controlled DOM, it's important to understand the lifecycle of how your framework mounts elements to the DOM.

React, for example, uses the Virtual DOM, and the Inline component cannot mount to a Virtual DOM element. So, you will need to wait until the element has been property mounted to the real DOM before instantiating the Widget.

#### Instantiate the Widget (Inline)

Now, import the Widget where you'd like to mount it. In whatever way your framework requires, provide a reference to the element mounted in the actual DOM as the target of the Widget instantiation.

```js
// As inline
import Widget from 'forgerock-web-login-widget/inline';

// ...

new Widget({
  target: mountedDomElement, // ensure this is a reference to a real DOM element
  props: {
    config: {}, // Your JS SDK configuration; see below
  },
});
```

This mounts your Widget into the DOM. If you choose the modal version, it will be hidden at first.

Note: [See additional documentation about configuring the JS SDK](https://backstage.forgerock.com/docs/sdks/3.3/javascript/configuring/configuring-forgerock-sdk-settings-for-your-javascript-app.html).

#### Starting a journey (Inline)

The Widget will be mounted to the DOM, but it will not display the first step of the journey. To render the first step, you'll need to import the `journey` object and call the `journey.start` method. This makes the initial request to the ForgeRock server for the initial step.

```js
import Widget, { journey } from 'forgerock-web-login-widget/inline';

// Call after instantiating the Widget
new Widget({
  target: actualDomElement, // ensure this is a reference to a real DOM element
  props: {
    config: {}, // Your JS SDK configuration; see below
  },
});
journey.start();

// OR, call on button click
buttonElement.addEventListener('click', (event) => {
  journey.start();
});
```

This `journey.start` method can be called anywhere in your application, or anytime as long as it's _after_ the Widget being mounted to the DOM.

#### Listening for journey completion (Inline)

Use the `journey.onSuccess` method to know when a user has completed their journey. Pass a callback function into this method to run when the journey successfully completes.

```js
journey.onSuccess((response) => {
  console.log(response);
});
```

And, that's it. You now can mount, display, and authenticate users through the ForgeRock Login Widget. There are addition features documented below for a more complete implementation. For more about Widget events, [see the Widget Events section](#widget-events).

## Complete Widget API

The Widget comes with methods and event handlers used to control the lifecycle of user journeys/authentication.

### Widget

```js
// As modal dialog
import Widget from 'forgerock-web-login-widget/modal';

// OR, as embedded
import Widget from 'forgerock-web-login-widget/inline';

// Instantiate Widget
const widget = new Widget({
  target: document.getElementById('widget-root'), // REQUIRED; Element available in DOM
  props: {
    /**
     * REQUIRED; SDK configuration object
     */
    config: {
      serverConfig: {
        baseUrl: 'https://customer.forgeblocks.com/am', // REQUIRED; URL to ForgeRock AM
      },

      /**
       * OPTIONAL, *BUT ENCOURAGED*, CONFIGURATION
       * Remaining config is optional with fallback values shown
       */
      clientId: 'WebLoginWidgetClient', // OPTIONAL; Uses 'WebLoginWidgetClient', if not provided
      realmPath: 'alpha', // OPTIONAL; Uses 'alpha', if not provided
      redirectUri: window.location.href, // OPTIONAL; falls back to `window.location.href`
      scope: 'openid email', // OPTIONAL; falls back to minimal 'openid email'
      tree: 'Login', // OPTIONAL; falls back to default Login journey provided in ForgeRock
    },

    /**
     * OPTIONAL; See below for the content object schema
     */
    content: {},

    /**
     * OPTIONAL; See below for Styling section
     */
    style: {},
  },
});

// OPTIONAL; Remove widget from DOM and destroy all listeners
widget.$destroy();
```

NOTE: For more SDK configuration options, please [see our SDK's configuration document](https://backstage.forgerock.com/docs/sdks/3.3/javascript/configuring/configuring-forgerock-sdk-settings-for-your-javascript-app.html), or you can [see our API docs for more developer detail](https://backstage.forgerock.com/docs/sdks/3.3/_attachments/javascript/api-reference-core/interfaces/configoptions.html).

NOTE: For content schema, please [use the example en-US locale file](/src/locales/us/en/index.ts).

### Journey

The `journey` object:

```js
import { journey } from 'forgerock-web-login-widget/modal';
// OR, import { journey } from 'forgerock-web-login-widget/inline';

// Call to start the journey
// Optional config can be passed in, see below for more details
journey.start();

// Listeners for journey events
// See below for more details on `response`
journey.onSuccess((response) => {
  /* Run anything you want */
});
journey.onFailure((error) => {
  /* Run anything you want */
});
```

NOTE: Optional `start` config:

```js
journey.start({
  config: undefined, // OPTIONAL; defaults to undefined, mechanism to override base SDK config object
  oauth: true, // OPTIONAL; defaults to true and uses OAuth flow for acquiring tokens
  user: true, // OPTIONAL; default to true and returns user information from `userinfo` endpoint
});
```

NOTE: Schema for `response`

```js
// response
{
  journey: {
    completed: false, // boolean
    error: null, // null or object with `code`, `message` and `step` that failed
    loading: false, // boolean
    step: null, // null or object with the last step object from ForgeRock AM
    successful: false, // boolean
    response: null, // null or object, if successful, it will contain the success response from AM
  },
  oauth: {
    completed: false, // boolean
    error: null, // null or object with `code` and `message` properties
    loading: false, // boolean
    successful: false, // boolean
    response: null, // null or object with OAuth/OIDC tokens
  },
  user: {
    completed: false, // boolean
    error: null, // null or object with `code` and `message` properties
    loading: false, // boolean
    successful: false, // boolean
    response: null, // null or object with user information driven by OAuth scope config
  },
}
```

### User

The `user` object:

```js
import { user } from 'forgerock-web-login-widget/modal';
// OR, import { user } from 'forgerock-web-login-widget/inline';

// Is user currently authorized
await user.authorized(); // do they have OAuth tokens (local)?
await user.authorized({ remote: true }); // do we have valid tokens (remote)?

// Get user information
await user.info(); // what we have locally in-memory
await user.info({ remote: true }); // request user info from server

// Log user out
await user.logout();
```

### Request

The Widget has an alias to the JavaScript SDK's `HttpClient.request`, which is a convenience wrapper around the native `fetch`. All this does is auto-inject the Access Token into the `Authorization` header and manage some of the lifecycle around the token.

```js
import { request } from 'forgerock-web-login-widget/modal';
// OR, import { request } from 'forgerock-web-login-widget/inline';

// See below for more details on the options
request({ init: { method: 'GET' }, url: 'https://protected.resource.com' });
```

The full `options` object:

```js
{
  bypassAuthentication: false, // Boolean; if true, Access Token is not injected into Authorization header
  init: {
    // Options object for `fetch` API: https://developer.mozilla.org/en-US/docs/Web/API/fetch
  },
  timeout: 3000, // Fetch timeout in milliseconds
  url: 'https://protected.resource.com', // String; the URL of the resource

  // Unsupported properties
  authorization: {},
  requiresNewToken: () => {},
}
```

For the full type definition of this, please [view our SDK API documentation](https://backstage.forgerock.com/docs/sdks/3.3/_attachments/javascript/api-reference-core/interfaces/httpclientrequestoptions.html).

### Modal

The named `modal` import provides controls of the modal component.

```js
import { modal } from 'forgerock-web-login-widget/modal';

// Know when the modal auto-closes, not when the modal is
// The property `reason` will be either "auto", "external", or "user" (see below)
modal.onClose(({ reason }) => {
  /* Run anything you want */
});
// Know when the modal has mounted
modal.onMount((dialogElement, formElement) => {
  /* Run anything you want */
});

// "Open" the modal (this implicitly calls `journey.start()`)
modal.open();

// "Close" the modal
modal.close();
```

It's worth noting that if the Widget has already mounted before the `onMount` statement, it will never run. It won't retroactively run the callback function.

`onClose` and the `reason` value:

1. `"user"`: user closed the dialog via UI
2. `"auto"`: the modal was closed because user successfully authenticated
3. `"external"`: the application itself called the `modal.close` function

### Inline

The named `form` import provides a simple `onMount` event.

```js
import { form } from 'forgerock-web-login-widget/inline';

// Know when the inline form has mounted
form.onMount((formElement) => {
  /* Run anything you want */
});
```

It's worth noting that if the Widget has already mounted before the `onMount` statement, it will never run. It won't retroactively run the callback function.

### Styling API

The Widget can be configured for styling purposes via the JavaScript API. This allows you to choose the type of labels used or providing a logo for the modal.

Example:

```js
const widget = new Widget({
  target: document.getElementById('widget-root'),
  props: {
    config: {
      /* ... */
    },
    content: {
      /* ... */
    },
    /**
     * OPTIONAL
     */
    style: {
      checksAndRadios: 'animated', // OPTIONAL; choices are 'animated' or 'standard'
      labels: 'floating', // OPTIONAL; choices are 'floating' or 'stacked'
      logo: {
        // OPTIONAL; only used with modal form factor
        dark: 'https://example.com/img/white-logo.png', // OPTIONAL; used if theme has a dark variant
        light: 'https://example.com/img/black-logo.png', // REQUIRED if logo property is provided; full URL
        height: '300px', // OPTIONAL; provides additional controls to logo display
        width: '400px', // OPTIONAL; provides additional controls to logo display
      },
      sections: {
        // OPTIONAL; only used with modal form factor
        header: false, // OPTIONAL; uses a modal "header" section that displays logo
      },
      stage: {
        icon: true, // OPTIONAL; displays generic icons for the provided stages
      },
    },
  },
});
```

Note that the `logo` and `section` property only apply to the "modal" form factor, and not the "inline".

## Future APIs (not implemented)

### Currently **unsupported**

1. WebAuthn
2. Push Authentication
3. Recaptcha
4. QR Code display
5. TextOutputCallback with scripts
6. Device Profile
7. Email Suspend (Forgot Password/Username flows)
8. Social Login
9. Central Login
10. SAML

### Widget customization (future)

```js
new Widget({
  // ... previous config properties ...

  // All optional; default value is assigned below
  customization: {
    labels: 'floating', // "floating" or "stacked"
    modalBackdrop: true, // boolean; display modal backdrop
    modalAutoClose: true, // boolean; automatically close modal on success
  },
});
```

### Additional modal events (future)

```js
modal.onClose((event) => {
  /* anything you want */
});
```

## Quick Start: Internal Login Framework Development

### Technical requirements

1. Node.js v16
2. npm v8

### Knowledge requirements

1. JavaScript & TypeScript
2. Svelte
3. Tailwind
4. ES Modules

### Install, build & run

1. `npm install` (or simply `npm i`)
2. `npm run build`
3. `npm run dev` (leave running)

This will install all the necessary dependencies, build the project and run it in `dev` mode, providing you with Hot Module Reloading. This will also produce the Widget package for use in external applications.

## Notes

### Re-syncing with Chromatic

Rebuilds and syncs with Chromatic:

```sh
npx chromatic --project-token=e10acf0c74f9 --patch-build=<current-branch>...main
```

Make sure upstream is set on all branches:

```sh
git push -u origin <branch>
```

## Disclaimer

> **This code is provided by ForgeRock on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not represent or warrant or make any guarantee regarding the use of this code or the accuracy, timeliness or completeness of any data or information relating to this code, and ForgeRock hereby disclaims all warranties whether express, or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and any warranty of non-infringement. ForgeRock shall not have any liability arising out of or related to any use, implementation or configuration of this code, including but not limited to use for any commercial purpose. Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein ForgeRock resides or in which ForgeRock conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

<!---------------------------------------------------------------------------------------------------------->
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

&copy; Copyright 2020 ForgeRock AS. All Rights Reserved.

[forgerock-logo]: https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg 'ForgeRock Logo'
