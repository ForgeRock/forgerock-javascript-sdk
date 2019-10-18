import { ConfigOptions } from '../config';
import { ResponseType } from './enums';

/**
 * Tokens returned after successful authentication.
 */
interface OAuth2Tokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

/**
 * Options used when requesting the authorization URL.
 */
interface GetAuthorizationUrlOptions extends ConfigOptions {
  responseType: ResponseType;
  state?: string;
  verifier?: string;
}

/**
 * Options used when requesting OAuth tokens.
 */
interface GetOAuth2TokensOptions extends ConfigOptions {
  authorizationCode: string;
  verifier?: string;
}

export { GetAuthorizationUrlOptions, GetOAuth2TokensOptions, OAuth2Tokens };
