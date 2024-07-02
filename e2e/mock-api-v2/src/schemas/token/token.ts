import { Schema } from '@effect/schema';

const TokenRequestBody = Schema.Struct({
  client_id: Schema.String,
  code: Schema.String,
  grant_type: Schema.Union(Schema.Literal('authorization_code')),
  redirect_uri: Schema.String,
  code_verifier: Schema.String,
});

const TokenResponseBody = Schema.Struct({
  access_token: Schema.String,
  token_type: Schema.String, //Schema.Union(Schema.Literal('Bearer')),
  expires_in: Schema.Number,
  refresh_token: Schema.String,
  scope: Schema.String,
  id_token: Schema.String,
});
export { TokenRequestBody, TokenResponseBody };
