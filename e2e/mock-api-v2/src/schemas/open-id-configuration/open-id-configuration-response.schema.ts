/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';

const _openIdConfigurationResponseSchema = Schema.Struct({
  issuer: Schema.String,
  authorization_endpoint: Schema.String,
  pushed_authorization_request_endpoint: Schema.String,
  token_endpoint: Schema.String,
  userinfo_endpoint: Schema.String,
  jwks_uri: Schema.String,
  end_session_endpoint: Schema.String,
  check_session_iframe: Schema.String,
  introspection_endpoint: Schema.String,
  revocation_endpoint: Schema.String,
  device_authorization_endpoint: Schema.String,
  claims_parameter_supported: Schema.Boolean,
  request_parameter_supported: Schema.Boolean,
  request_uri_parameter_supported: Schema.Boolean,
  require_pushed_authorization_requests: Schema.Boolean,
  scopes_supported: Schema.Array(Schema.String),
  response_types_supported: Schema.Array(Schema.String),
  response_modes_supported: Schema.Array(Schema.String),
  grant_types_supported: Schema.Array(Schema.String),
  subject_types_supported: Schema.Array(Schema.String),
  id_token_signing_alg_values_supported: Schema.Array(Schema.String),
  userinfo_signing_alg_values_supported: Schema.Array(Schema.String),
  request_object_signing_alg_values_supported: Schema.Array(Schema.String),
  token_endpoint_auth_methods_supported: Schema.Array(Schema.String),
  token_endpoint_auth_signing_alg_values_supported: Schema.Array(Schema.String),
  claim_types_supported: Schema.Array(Schema.String),
  claims_supported: Schema.Array(Schema.String),
  code_challenge_methods_supported: Schema.Array(Schema.String),
});

interface openIdConfigurationResponseSchema
  extends Schema.Schema.Type<typeof _openIdConfigurationResponseSchema> {}

const openIdConfigurationResponseSchema: Schema.Schema<
  openIdConfigurationResponseSchema,
  openIdConfigurationResponseSchema
> = _openIdConfigurationResponseSchema;

export { openIdConfigurationResponseSchema };
