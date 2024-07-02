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

You should add your error respones to the response folder [here]('./src/responses');

Then in the [fetch]('./src/repository/fetch.ts') repository, you will want to return your error. This will depend on the type of error you want to return. `effect-http` uses `HttpError` class to respond with errors. An example would be if you want to return an Error that is a 401 unauthorized error.

```ts
Effect.catchTag('MyErrorName', (err) => HttpError.unauthorizedError(MyErrorResponseObject));
```

At this stage, you will may likely see an error that your error object does not match the schema. The Error object needs to be defined in the [spec.ts]('./src/spec.ts') file. You can use `ApiResponse.addResponse` if the response does not exist.

If the response type exists, but your schema does not match, you will need to create a union of the existing schema, and the new schema.
