import { Schema } from '@effect/schema';

const AuthorizePath = Schema.Struct({ envid: Schema.String });

const DavinciAuthorizeResponseHeaders = Schema.Struct({
  'Set-Cookie': Schema.String,
});

const DavinciAuthorizeHeaders = Schema.Struct({
  cookie: Schema.optional(Schema.String),
});

const DavinciAuthorizeQuery = Schema.Struct({
  response_mode: Schema.String,
  client_id: Schema.String,
  redirect_uri: Schema.String,
  response_type: Schema.String,
  scope: Schema.String,
  state: Schema.String,
  code: Schema.String,
  code_challenge: Schema.String,
  code_challenge_method: Schema.String,
  acr_values: Schema.String, // this should be optional
});

const DavinciAuthorizeFailure = Schema.Struct({
  error: Schema.String,
  error_description: Schema.String,
});

export {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeQuery,
  DavinciAuthorizeFailure,
  DavinciAuthorizeResponseHeaders,
};
