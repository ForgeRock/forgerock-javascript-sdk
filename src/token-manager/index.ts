import { parse as parseUrl } from 'url';
import { ConfigOptions } from '../config';
import OAuth2Client, { OAuth2Tokens, ResponseType } from '../oauth2-client';
import { Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import nonce from '../util/nonce';
import { createVerifier } from '../util/pkce';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
}

abstract class TokenManager {
  public static async getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens> {
    let tokens: Tokens;

    // Try to use stored tokens, if possible
    if (!options || !options.forceRenew) {
      try {
        tokens = await TokenStorage.get();
        if (tokens) {
          return tokens;
        }
      } catch (error) {
        console.error('Failed to retrieve stored tokens', error);
      }
    }

    const verifier = createVerifier();
    const state = nonce()().toString();
    const authorizeUrlOptions = { ...options, responseType: ResponseType.Code, state, verifier };
    const authorizeUrl = await OAuth2Client.getAuthorizeUrl(authorizeUrlOptions);

    const parsedAuthorizeUrl = parseUrl(authorizeUrl, true);
    if (parsedAuthorizeUrl.query.state !== state) {
      throw new Error('State mismatch');
    }
    if (!parsedAuthorizeUrl.query.code || Array.isArray(parsedAuthorizeUrl.query.code)) {
      throw new Error('Failed to acquire authorization code');
    }

    const authorizationCode = parsedAuthorizeUrl.query.code;
    const getTokensOptions = { ...options, authorizationCode, verifier };
    tokens = await OAuth2Client.getOAuth2Tokens(getTokensOptions);

    try {
      await TokenStorage.set(tokens);
    } catch (error) {
      console.error('Failed to store tokens', error);
    }

    return tokens;
  }

  public static async deleteTokens() {
    await TokenStorage.remove();
  }
}

export default TokenManager;
export { GetTokensOptions };
