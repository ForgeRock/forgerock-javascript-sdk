## DaVinci Client

### Developer Facing API

(Not everything below is implemented at time of this writing)

Configure client with `baseUrl`, `clientId` and `redirectUrl`.

```ts
import { davinciClient } from '@forgerock/davinci';

const davinci = await davinciClient({
  config: (getDefaultConfig) => {
    return getDefaultConfig({
      baseUrl: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/',
      // baseUrl: 'https://auth.test-one-pingone.com/0c6851ed-0f12-4c9a-a174-9b1bf8b438ae/',
      clientId: '724ec718-c41c-4d51-98b0-84a583f450f9',
      // clientId: '8d3948bc-de0c-4b85-88c4-35b750f2ce47',
      redirectUri: 'http://localhost:5173/callback.html',
    });
  },
});
```

Call the returned `davinci`'s start method.

```ts
let step = await davinci.start();
```

This will return a **normalized** `step` object from the initial response from DaVinci. The "interface" or schema of this object looks like this (some properties removed for brevity):

```ts
export interface NodeState {
  cache: {
    key: string;
  };
  client: {
    description?: string;
    name?: string;
    collectors?: (SingleValueCollector | ActionCollector)[];
  };
  server: {
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    eventName?: string;
  };
  status: string;
}
```

The step data is organized for clearer intention. Each response from DaVinci is saved in a cache, so the `cache.key` is to lookup the exact response from which this step was generated. The `server` prop just has the items necessary for building the request for the subsequent call to DaVinci.

The `client` property is what the application developers will be using for their rendering instructions and data collection needs. Currently, there are two types: `SingleValueCollector` and `ActionCollector`. Their interface looks like this:

```ts
// This covers collectors, like username or password, that require a single value
// Multi-value collectors can be added later, but the plan is that the input and
// output properties will be arrays with objects for collecting more than one input value
export interface SingleValueCollector {
  type: 'SingleValueCollector';
  id: string; // Used for collector lookup for updating values
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
  type: 'ActionCollector';
  id: string;
  input: {
    action: string;
  };
  output: {
    key: string;
    label: string;
    type: string;
  };
}
```

As you can see, they utilize a similar structure to an AM callback. This is designed to normalize the data between DaVinci and AM, and allow for a greater expansion of functionality without having to reintroduce changes to our developer-facing APIs.

When you want to update a collector's data, you call the `davinci.update` method passing in the `id` of the collector that will eventually need to be updated:

```ts
const updater = davinci.update(collector.id); // Returns an updated for the specific collector
updater(value); // Will update the store with the value passed in
```

Normally, you'll use `davinci.collectors()` and it will return all the collectors for that step:

```ts
const collectors = davinci.collectors();
collectors.map((collector) => {
  component(collector, davinci.update(collector.id));
});
```

If, at anytime, the dev needs the full state object, they can call the below:

```ts
const fullState = davinci.getState();
```

The interface of the full state object looks like this:

```ts
interface Store {
  config: {
    baseUrl: string;
    clientId: string;
    redirectUri?: string;
    responseType?: string;
    scope?: string;
  };
  davinci: ReduxToolkitQueryInterface; // This is created by Redux and is the cache for DaVinci responses
  step: StepState; // Step interface from above
}
```

It's worth noting that mutating this object does affect what's in the store. Data stored in the store is immutable and can only be updated using the provided APIs.

Calling "next" to proceed with the DaVinci flow, the `.next()` method is used on the same `davinci` client object.

```ts
let step = davinci.next();
```

It's worth mentioning that we no longer require the "step" object to be passed into the method, we will use the internal store to grab the data needed to construct the request object.

When the flow is complete, and a session is provided or failure, there will be a success object or failure object returned.
