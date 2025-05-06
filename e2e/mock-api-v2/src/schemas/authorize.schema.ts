/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';

const AuthorizePath = Schema.Struct({ envid: Schema.String });

const DavinciAuthorizeResponseHeaders = Schema.Struct({
  'Set-Cookie': Schema.String,
});

const DavinciAuthorizeHeaders = Schema.Struct({
  cookie: Schema.optional(Schema.String),
});

const _DavinciAuthorizeQuery = Schema.Struct({
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
interface DavinciAuthorizeQuery extends Schema.Schema.Type<typeof _DavinciAuthorizeQuery> {}
const DavinciAuthorizeQuery: Schema.Schema<DavinciAuthorizeQuery, DavinciAuthorizeQuery> =
  _DavinciAuthorizeQuery;

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
