export interface OpenIdResponse {
  issuer: string;
  authorization_endpoint: string;
  pushed_authorization_request_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
  end_session_endpoint: string;
  check_session_iframe: string;
  introspection_endpoint: string;
  revocation_endpoint: string;
  device_authorization_endpoint: string;
  claims_parameter_supported: string;
  request_parameter_supported: string;
  request_uri_parameter_supported: string;
  require_pushed_authorization_requests: string;
  scopes_supported: string[];
  response_types_supported: string[];
  response_modes_supported: string[];
  grant_types_supported: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  userinfo_signing_alg_values_supported: string[];
  request_object_signing_alg_values_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  claim_types_supported: string[];
  claims_supported: string[];
  code_challenge_methods_supported: string[];
}

export interface Endpoints {
  authorize: string;
  issuer: string;
  introspection: string;
  tokens: string;
  userinfo: string;
}
