### Mock Api

## Docs

you can run the server and visit `http://localhost:9443/docs#` to visit the swagger docs
The swagger docs are automatically created (with effect-http) by way of the schemas that are defined in the [spec file]('./src/spec.ts')

## Creating an endpoint in the Api specification

To create an endpoint, visit the [spec]('./src/spec.ts') file and add your endpoint. For organization and cleanliness, endpoints can be abstracted into the [endpoints]('./src/endpoints/') folder.

When an endpoint is made, you can add it to the [`spec`]('./src/spec.ts') `pipe`.

## Handling your new endpoint

When you have created an endpoint in the specification, you need to now handle the endpoint. This is the actual code implementation of your endpoint.

handlers are saved in the [handlers]('./src/handlers/') folder.

You use RouterBuilder.handler, passing in the [api spec]('./src/spec.ts') and the name of the route, and then an Effect returning function (`Effect.gen` is the simplest form of this).

The request arguments, you define in your endpoint specification, (query params, path params, request bodies, etc) are the arguments passed to the callback function of `RouterBuilder.handler`.

Ensure that you also add your `handler` to the RouterBuilder.handle [here]('./src/main.ts');

## Adding a journey / flow to the response map

If you are adding a flow to the response map the first thing to do is open up [responseMap]('./src/responses/index.ts')

This file is a `map` of Names -> Array<Step> where a Step is the response you want to return (in order). Order is key here.

If the Response you want to return is not already defined as a schema, you will have to define a new Schema and add the response.

A schema is defined in the schemas folder [here]('./src/schemas/');
A response is defined in the responses folder [here]('./src/responses/')

This is still a work in progress in terms of making it more scalable.

## Validating your code in Test

After adding a journey/flow to the response map and defining a schema, you next want to have some validation on the submitted request. You can do this by adding it to the `validator` function [here]('./src/helpers/match.ts');

This functions job is to `match` the type passed in, and validate based on the condition provided. If it passes, a boolean is returned, if it fails, a new Error should be returned.

## Services

To make it so types line up easier, each route, has a service dedicated to itself. The service under the hood, uses the `Requester` service. The `Requester` service is to mimic a call to the authorization server.

Let's look at the `Authorize` service. This service is the workhorse of the `authorize` handler.

`Authorize`, the service, uses `Requester` which will fetch a response from the authorization server.

After retrieving the response, the service will catch any errors that may be thrown, and mold them into HttpErrors to respond back to the client.

In a mock environment, rather than fetching from the client, authorization service will grab the next response from the `responseMap`.

In a live environment, it will forward a request to the Fetch service, and return that response.

## Creating Errors

If you want to create an error, it is simple. This is the skeleton of how to create an Error in `Effect`

```
class MyErrorName {
  readonly _tag  = 'MyErrorName'
}
```

The `_tag` is important as this is the name of the error, and how we can `catchTags` in our error handling. For simplicity, you can name is the same as your error class.

## Handling Errors

We want to return our errors back to the client, but typically we need an error response body that informs the client of the issue.

You should add your error responses to the response folder [here]('./src/responses');

In the service where you want to handle your error, you will see a `catchTags` function.

Let's pause here to understand the `Effect` type.

```ts
Effect<Success, Error, Requirements>;
```

When reading an Effect type, the first generic, is what is returned if the effect is successful.

The second argument is what is returned if the effect is unsuccessful.

The third argument is any services (or layers) that are required to run this effect.

So if we have an `effect` like this `Effect<Users, HttpError.HttpError | NoSuchElementException, never>`

This tells us the `effect` returns `users`, and can error two ways, `NoSuchElementException`, and with an `HttpError`.

We would rather handle this `NoSuchElementException` and send back to the client an HttpError informing them of the error that occurred.

We can do something like this now

```ts
Effect.catchTag('NoSuchElementException', () =>
  HttpError.unauthorizedError('no such element found'),
);
```

This will return a 401 with that message.

When handling errors, we try to keep the handler always returning an `HttpError`, so we should handle any other errors we have deeper in the call stack, to return HttpError unless there is a valid reason to allow the error to bubble up.

If you have a shape of an error that you want to return from a handler, that does not match the current schema, you can add it to the `api spec`.
