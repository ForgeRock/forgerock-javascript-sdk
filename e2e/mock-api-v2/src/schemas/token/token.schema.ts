import { Schema } from '@effect/schema';

const _TokenRequestBody = Schema.Struct({
  client_id: Schema.String,
  code: Schema.String,
  grant_type: Schema.Union(Schema.Literal('authorization_code')),
  redirect_uri: Schema.String,
  code_verifier: Schema.String,
});

interface TokenRequestBody extends Schema.Schema.Type<typeof _TokenRequestBody> {}
const TokenRequestBody: Schema.Schema<TokenRequestBody, TokenRequestBody> = _TokenRequestBody;

const _TokenResponseBody = Schema.Struct({
  access_token: Schema.String,
  token_type: Schema.String, //Schema.Union(Schema.Literal('Bearer')),
  expires_in: Schema.Number,
  refresh_token: Schema.String,
  scope: Schema.String,
  id_token: Schema.String,
});

interface TokenResponseBody extends Schema.Schema.Type<typeof _TokenResponseBody> {}
const TokenResponseBody: Schema.Schema<TokenResponseBody, TokenResponseBody> = _TokenResponseBody;

export { TokenRequestBody, TokenResponseBody };
