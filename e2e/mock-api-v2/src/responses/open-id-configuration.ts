/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

const openidConfigurationResponse = {
  issuer: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as',
  authorization_endpoint: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/authorize',
  pushed_authorization_request_endpoint:
    'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/par',
  token_endpoint: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/token',
  userinfo_endpoint: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/userinfo',
  jwks_uri: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/jwks',
  end_session_endpoint: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/signoff',
  check_session_iframe:
    'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/checksession',
  introspection_endpoint:
    'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/introspect',
  revocation_endpoint: 'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/revoke',
  device_authorization_endpoint:
    'http://localhost:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/device_authorization',
  claims_parameter_supported: false,
  request_parameter_supported: true,
  request_uri_parameter_supported: false,
  require_pushed_authorization_requests: false,
  scopes_supported: ['openid', 'profile', 'email', 'address', 'phone'],
  response_types_supported: [
    'code',
    'id_token',
    'token id_token',
    'code id_token',
    'code token',
    'code token id_token',
  ],
  response_modes_supported: ['pi.flow', 'query', 'fragment', 'form_post'],
  grant_types_supported: [
    'authorization_code',
    'implicit',
    'client_credentials',
    'refresh_token',
    'urn:ietf:params:oauth:grant-type:device_code',
  ],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
  userinfo_signing_alg_values_supported: ['none'],
  request_object_signing_alg_values_supported: [
    'none',
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  token_endpoint_auth_methods_supported: [
    'client_secret_basic',
    'client_secret_post',
    'client_secret_jwt',
    'private_key_jwt',
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  claim_types_supported: ['normal'],
  claims_supported: [
    'sub',
    'iss',
    'auth_time',
    'acr',
    'name',
    'given_name',
    'family_name',
    'middle_name',
    'preferred_username',
    'profile',
    'picture',
    'zoneinfo',
    'phone_number',
    'updated_at',
    'address',
    'email',
    'locale',
  ],
  code_challenge_methods_supported: ['plain', 'S256'],
};

export { openidConfigurationResponse };
