## DaVinci Client

This is the DaVinci Client module for interacting with PingOne Application policies mapped to DaVinci flows. This module helps enable developers to write their own UI and UX for supporting DaVinci Flows within JavaScript "SPA" applications.

### Install and import

The DaVinci Client can be installed via npm:

```sh
npm install @forgerock/davinci-client
```

Then, import the `davinci` module as a named import:

```ts
import { davinci } from '@forgerock/davinci-client';
```

### Create & configure your DaVinci Client

Configure DaVinci Client with the following minimum, required properties:

1. `clientId`
2. `wellknown`

```ts
// Demo with example values
import { davinci } from '@forgerock/davinci';

const davinciClient = await davinci({
  config: {
    clientId: '726b47438-c41c-4d51-98b0-84a6b474350f9',
    serverConfig: {
      wellknown:
        'https://auth.pingone.ca/02f919edfe-189a-4bc7-9d6c-a46b474347/as/.well-known/openid-configuration',
    },
  },
});
```

If you have a need for more than one client, say you need to use two or more different PingOne OIDC Applications, you can create two clients, but this should be a rare need.

```ts
// Demo with example values
import { davinci } from '@forgerock/davinci';

const firstDavinciClient = await davinci(/** config 1 **/);
const secondDavinciClient = await davinci(/** config 2 **/);
```

Here's a full configuration interface:

```ts
// Demo with optional properties and example values
interface DaVinciConfig {
  clientId: string; // required
  responseType?: string; // optional; default value: 'code'
  scope?: string; // optional; default value: 'openid'
  serverConfig: {
    timeout?: number; // optional; default value: ?? (NOT IMPLEMENTED)
    wellknown: string; // required
  };
}
```

### Start a DaVinci flow

Call the `start` method on the returned client API:

```ts
let node = await davinciClient.start();
```

If the user is not authenticated, this will return a **normalized** `node` object from the initial response from DaVinci. The node will be one of four types:

1. `ContinueNode`
2. `SuccessNode`
3. `ErrorNode`
4. `FailureNode`

Below is a brief look at the "interface" or schema of this node object (some properties removed or abbreviated for brevity):

```ts
interface NodeState {
  cache: {
    key: string;
  };
  client: {
    action: string;
    description?: string;
    name?: string;
    collectors?: (SingleValueCollector | ActionCollector)[];
    status: string;
  };
  error: null | {
    code: string | number;
    message?: string;
    status: string;
  };
  httpStatus: number;
  server: {
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    eventName?: string;
    session?: string;
    status: string;
  };
  status: string;
}
```

The `node` data is organized for clearer intention. Each response from DaVinci is saved in a cache, so the `cache.key` is to lookup the exact response from which this node was generated (more on this later).

The `server` prop just has the items necessary for building the request for the subsequent call to DaVinci, which should rarely be used by the application layer.

The `client` property is what the application developers will be using for their rendering instructions and data collection needs and status.

To detect the node type after receiving a response, it's best to have a `switch` or `if` condition checking the `status` property:

```ts
let node = await davinciClient.start();

switch (node.status) {
  case 'continue':
    return renderContinue();
  case 'success':
    return renderSuccess();
  case 'error':
    return renderError();
  default: // Handle failure type
    return renderFailure();
}
```

### Rendering the Collectors

When receiving a `ContinueNode`, it will contain an object called a `collector`. These are instruction to request information from a user or browser environment. There are two types of collectors: `SingleValueCollector` and `ActionCollector`. Their interface looks like this:

```ts
// This covers collectors, like username or password, that require a single value
export interface SingleValueCollector {
  category: 'SingleValueCollector';
  type: SingleValueCollectorTypes;
  id: string;
  name: string;
  input: {
    key: string;
    value: string | number | boolean;
    type: string;
  };
  output: {
    key: string;
    label: string;
    type: string;
    value: string;
  };
}
// This is a collector that is associated with an "action" (aka button), like submit or
// initiating another flow, i.e. forgot password or register
export interface ActionCollector {
  category: 'ActionCollector';
  type: ActionCollectorTypes;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
    url?: string;
  };
}
```

Although you can access the collectors via object "dot notation", we recommend using a dedicated method for getting the collectors specifically. This provides better typing and `undefined`/`null` handling.

To dynamically render the collectors as UI, the intention is to have a component for each collector type. When receiving a `node` from DaVinci, you will iterate through the array of collectors.

#### SingleValueCollector

Upon each collector in the array, some will need an `updater`, like the collectors in the category of `SingleValueCollector`:

```ts
// Example SingleValueCollector using the TextCollector
const collectors = davinci.collectors();
collectors.map((collector) => {
  if (collector.type === 'TextCollector') {
    renderTextCollector(collector, davinci.update(collector));
  }
});
```

Here, you can see the passing of the collector object along with its `update` method and the current `collector` as its argument.

Then, in the collector component, you would have something like this:

```ts
function renderTextCollector(collector, updater) {
  // ... component logic

  function onClick(event) {
    updater(event.target.value);
  }

  // render code
}
```

It's worth noting that directly mutating the `node` object, `collectors` or any other properties will not alter the DaVinci Client's internal state. Internal data stored in the client is immutable and can only be updated using the provided APIs, not through property assignment.

#### SubmitCollector

The `SubmitCollector` is associated with the submission of the current node and its collected values, requesting the next step in the flow. This collector does not have an update-like function. The collector is just for rendering a button.

```ts
// Example SubmitCollector mapping
const collectors = davinci.collectors();
collectors.map((collector) => {
  if (collector.type === 'SubmitCollector') {
    renderSubmitCollector(
      collector, // This is the only argument you will need to pass
    );
  }
});
```

We will cover the associated action related to this collector in the next section: Continuing a DaVinci Flow below.

#### FlowCollector (Changing a DaVinci flow)

If a user selects an alternative flow button, like Reset Password or Registration. This action is associated with a `FlowCollector`, which instructs the application to change from the current flow and start a new, different flow.

To do this, you call the `flow` method on the `davinciClient` passing the `key` property to identify the new flow. This returns a function you can call when the user interacts with it.

```ts
// Example FlowCollector mapping
const collectors = davinci.collectors();
collectors.map((collector) => {
  if (collector.type === 'FlowCollector') {
    renderFlowCollector(collector, davinciClient.flow(collector));
  }
});
```

```ts
// Example FlowCollector Component
function renderFlowCollector(collector, startFlow) {
  // ... component logic

  function onClick(event) {
    startFlow();
  }

  // render code
}
```

### Continuing a DaVinci flow

After collecting the needed data, you proceed to the next node in the DaVinci flow by calling the `.next()` method on the same `davinci` client object. This can be the result of a user clicking on the button rendered from the `SubmitCollector`, from the "submit" event of the HTML form itself, or from programmatically triggering the submission in the application layer.

```ts
let nextStep = davinci.next();
```

Note: There's no need to pass anything into the `next` method as the DaVinci Client internally stores the updated object needed for the server.

Once the server responds, you will receive the same "node" that will be one of the four types discussed above. You will want to do the same conditional checks to render the appropriate UI.

#### Handling an error

An "error" in the DaVinci Client is caused by data that can be fixed and resubmitted. A few examples are an email value with an invalid format or a new password that is too short. This is different than a `failure`, which cannot be resubmitted; the flow has to be restarted (this will be covered later in this document).

When an error is received, hold on to the reference of the previous `node` as you'll need it to re-render the form. Use the previous `node` to render the form, and the `error` information on the new `ErrorNode`. Once the data has been revised, call `.next()` as you did before.

### A completed DaVinci Flow

Once a flow is complete, it is of type `success` or `failure` and cannot be continued. Success means you have completed the flow and have received or updated a session and, usually, you have received an Authorization Code to complete an OAuth flow to collect an Access Token.

#### Handling success

When you receive a success node, you will likely want to use the Authorization Code and other client data in order to complete an OAuth flow. To do this, you can pick the Authorization Code and State out of the client object and use them to call the `TokenManager.getTokens()` method from the JavaScript SDK.

Here's a brief sample of what that might look like in pseudocode:

```ts
// ... other imports

import { Config, TokenManager } from '@forgerock/javascript-sdk';

// ... other config or initialization code

// This Config.set accepts the same config schema as the davinci function
Config.set(config);

const node = await davinciClient.next();

if (node.status === 'success') {
  const clientInfo = davinciClient.getClient();

  const code = clientInfo.authorization?.code || '';
  const state = clientInfo.authorization?.state || '';

  const tokens = await TokenManager.getTokens({ query: { code, state } });
  // user now has session and OIDC tokens
}
```

#### Handling a failure

If you receive a `FailureNode`, you will not be able to continue and must restart a new DaVinci flow. Some examples of failures are DaVinci flow timeouts due to inactivity or server failures like a `5xx` type server error.

Here's what this looks like in code:

```ts
const node = await davinciClient.next();

if (node.status === 'failure') {
  const error = davinciClient.getError();
  renderError(error);

  // ... user clicks button to restart flow
  const freshNode = davinciClient.start();
}
```

### Contributing guidelines

If you'd like to contribute to this project, below are the internal dependencies, conventions and patterns used in the project. Please familiarize yourself with these guidelines and reach out if you have any questions.

#### Runtime dependencies

The only runtime-dependency within this project is [Redux Toolkit (aka RTK)](https://redux-toolkit.js.org/introduction/getting-started) and its optional package [RTK Query](https://redux-toolkit.js.org/rtk-query/overview). These libraries act as the core to the library's network request, caching and state management functionality. Redux Toolkit's only dependency is `immer`, which is what provides the immutability feature without loss of ergonomics.

Regardless of the use of RTK, this implementation detail is to not leak out into the Public API used by the customer. This public API will be a thin abstraction that sits between the customer and the RTK implementation.

We use RTK in the following ways:

1. Network query management: RTK Query
2. Cache management: RTK Query
3. Transformation logic: RTK Slice & Reducers
4. Object access and type narrowing: RTK Selectors
5. Immutable state management: Immer from within RTK

#### Developer dependency

The most important "compile-time" dependency is [TypeScript](typescriptlang.org). This assists in static code analysis and enforces types to help with code insights, autocomplete and assisted refactoring.

#### Conventions and patterns

1. "Query API": this pattern is responsible for network requests to an API; handle error, success and failures; as well as cache the original response.
2. "Slice": state slices represent "normalized" data that simplifies responses and derived data.
3. "Reducers": these are simple functions that are specific to the Redex "pattern", used to transform or "map" one source of data to a target source.
4. "Utils": these are pure functions that are library agnostic, side-effect free.
