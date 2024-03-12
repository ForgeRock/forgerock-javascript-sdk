# Ping Protect

The Ping Protect module is intended to be used along with the ForgeRock JavaScript SDK to provide the Ping Protect feature to our existing ForgeRock SDK customers.

## Overall Design

There are two components on the server side and two components on the client side to enable this feature. You'll need to have the following:

1. ForgeRock Identity Cloud (aka ID Cloud) platform or an up-to-date ForgeRock Access Management (aka AM)
2. PingOne tenant with Protect enabled
3. A Ping Protect Service configured in ID Cloud or AM
4. A journey/tree with the appropriate Protect Nodes
5. A client application with the `@forgerock/javascript-sdk` and `@forgerock/ping-protect` modules installed

## Quick Start for Client Application

Install both modules and their latest versions:

```sh
npm install @forgerock/javascript-sdk @forgerock/ping-protect
```

The two main responsibilities of the Ping Protect module is the initialization of the profiling and data collection and the completion and preparation of the collected data for the server. You can find the two methods on the `PIProtect` module found within the `@forgerock/ping-protect` module.

- `PIProtect.start()`
- `PIProtect.getData()`

The `start` method can be called at application startup, or when you receive the `PingOneProtectInitializeCallback` callback from the server. We recommend you call `start` as soon as you can to collect as much data as possible for higher accuracy.

When calling `start`, you have many different options to configure what and how the data is collected. The most important and required of these settings is the `envId`. All other settings are optional.

```js
import { PIProtect } from '@forgerock/ping-protect';

// Call early in your application startup
PIProtect.start({ envId: '02fb1243-189a-4bc7-9d6c-a919edf6447' });
```

Alternatively, you can delay the initialization until you receive the instruction from the server by way of the special callback: `PingOneProtectInitializeCallback`. To do this, you would call the `start` method when the callback is present in the journey.

```js
import { PIProtect } from '@forgerock/ping-protect';

if (step.getCallbacksOfType('PingOneProtectInitializeCallback')) {
  try {
    // Asynchronous call
    await PIProtect.start({ envId: '02fb1243-189a-4bc7-9d6c-a919edf6447' });
  } catch (err) {
    // handle error
  }
}
```

You then call the `FRAuth.next` method after initialization to move the user forward in the journey.

```js
FRAuth.next(step);
```

At some point in the journey, and as late as possible in order to collect as much data as you can, you will come across the `PingOneProtectEvaluationCallback`. This is when you call the `getData` method to package what's been collected for the server to evaluate.

```js
import { PIProtect } from '@forgerock/ping-protect';

let data;

if (step.getCallbacksOfType('PingOneProtectEvaluationCallback')) {
  try {
    // Asynchronous call
    data = await PIProtect.getData();
  } catch (err) {
    // handle error
  }
}
```

Now that we have the data, set it on the callback in order to send it to the server when we call `next`.

```js
callback.setData(data);

FRAuth.next(step);
```

## Error Handling

When you encounter an error during initialization or evaluation, set the error message on the callback using the `setClientError` method. Setting the message on the callback is how it gets sent to the server on the `FRAuth.next` method call.

```js
if (step.getCallbacksOfType('PingOneProtectInitializeCallback')) {
  const callback = step.getCallbackOfType('PingOneProtectInitializeCallback');
  try {
    // Asynchronous call
    await PIProtect.start({ envId: '02fb1243-189a-4bc7-9d6c-a919edf6447' });
  } catch (err) {
    callback.setClientError(err.message);
  }
}
```

A similar process is used for the evaluation step.

```js
let data;

if (step.getCallbacksOfType('PingOneProtectEvaluationCallback')) {
  const callback = step.getCallbackOfType('PingOneProtectEvaluationCallback');
  try {
    // Asynchronous call
    data = await PIProtect.getData();
  } catch (err) {
    callback.setClientError(err.message);
  }
}
```

## Full API

```js
// PIProtect class methods
PIProtect.start();
PIProtect.getData();
PIProtect.pauseBehavioralData();
PIProtect.resumeBehavioralData();
```

```js
// PingOneProtectInitializeCallback class methods
callback.getConfig();
callback.setClientError();
```

```js
// PingOneProtectEvaluationCallback class methods
callback.setData();
callback.setClientError();
callback.getPauseBehavioralData();
```
