import {
  createErrorResponse,
  evaluateUrlForInterception,
  extractOrigins,
  generateAmUrls,
  getBaseUrl,
  getEndpointPath,
  getRealmUrlPath,
  parseQuery,
  resolveUrl,
  stringifyQueryParams,
} from './network.utilities.js';

describe('Test network utility functions', () => {
  // Test evaluateUrlForInterception with matching URL
  it('evaluateUrlForInterception should return true for matching URLs', () => {
    const urls = ['https://example.com', 'https://example.com/*'];
    const url = 'https://example.com';
    expect(evaluateUrlForInterception(url, urls)).toBe(true);
  });

  // Test evaluateUrlForInterception with non-matching URL
  it('evaluateUrlForInterception should return false for non-matching URLs', () => {
    const urls = ['https://example.com', 'https://example.com/*'];
    const url = 'https://example.org';
    expect(evaluateUrlForInterception(url, urls)).toBe(false);
  });

  // Test evaluateUrlForInterception with matching URL containing blob
  it('evaluateUrlForInterception should return true for matching URLs with blob', () => {
    const urls = ['https://example.com', 'https://example.com/*'];
    const url = 'blob:https://example.com/1234';
    expect(evaluateUrlForInterception(url, urls)).toBe(true);
  });

  // Test extractOrigins
  it('extractOrigins should return an array of unique origins from array of URLs', () => {
    const expected = [
      'https://example.com',
      'http://example.com',
      'https://example.com:8443',
      'https://my.forgeblocks.com',
    ];
    const urls = [
      'https://example.com/a',
      'http://example.com/b',
      'https://example.com:8443/c',
      'https://example.com/d',
      'http://example.com/e',
      'https://my.forgeblocks.com/am',
    ];
    expect(extractOrigins(urls)).toStrictEqual(expected);
  });

  // Test createErrorResponse with `fetch_error` type
  it('createErrorResponse should return error response', () => {
    const error = new Error('Test error');
    const response = createErrorResponse('fetch_error', error);
    expect(response).toEqual({
      body: {
        error: 'fetch_error',
        message: 'Test error',
      },
      headers: { 'content-type': 'application/json' },
      ok: false,
      redirected: false,
      type: 'error',
      status: 400,
      statusText: 'Token Vault Proxy Error',
    });
  });
  // Test createErrorResponse with `no_tokens` type
  it('createErrorResponse should return error response', () => {
    const response = createErrorResponse('no_tokens', null);
    expect(response).toEqual({
      body: {
        error: 'no_tokens',
        message: 'Unknown error',
      },
      headers: { 'content-type': 'application/json' },
      ok: false,
      redirected: false,
      type: 'error',
      status: 400,
      statusText: 'Token Vault Proxy Error',
    });
  });

  // Test generateUrls with missing slash
  it('generateUrls should return URLs with missing slash', () => {
    const forgerockConfig = {
      serverConfig: {
        baseUrl: 'https://example.com/am',
      },
      realmPath: 'root',
    };
    const urls = generateAmUrls(forgerockConfig);
    expect(urls).toEqual({
      accessToken: 'https://example.com/am/oauth2/realms/root/access_token',
      revoke: 'https://example.com/am/oauth2/realms/root/token/revoke',
      session: 'https://example.com/am/oauth2/realms/root/connect/endSession?',
      userInfo: 'https://example.com/am/oauth2/realms/root/userinfo',
    });
  });
  // Test generateUrls with ending slash and /alpha realm
  it('generateUrls should return URLs with ending slash and /alpha realm', () => {
    const forgerockConfig = {
      serverConfig: {
        baseUrl: 'https://example.com/am/',
      },
      realmPath: 'alpha',
    };
    const urls = generateAmUrls(forgerockConfig);
    expect(urls).toEqual({
      accessToken: 'https://example.com/am/oauth2/realms/root/realms/alpha/access_token',
      revoke: 'https://example.com/am/oauth2/realms/root/realms/alpha/token/revoke',
      session: 'https://example.com/am/oauth2/realms/root/realms/alpha/connect/endSession?',
      userInfo: 'https://example.com/am/oauth2/realms/root/realms/alpha/userinfo',
    });
  });

  // Test getBaseUrl
  it('getBaseUrl should return base URL', () => {
    const url = new URL('https://example.com');

    const baseUrl = getBaseUrl(url);
    expect(baseUrl).toBe('https://example.com');
  });

  // Test getEndpointPath
  it('getEndpointPath should return endpoint path', () => {
    const endpointPath = getEndpointPath('authenticate');
    expect(endpointPath).toBe('json/realms/root/authenticate');
  });
  // Test getEndpointPath with /alpha realm
  it('getEndpointPath should return endpoint path with alpha realm', () => {
    const endpointPath = getEndpointPath('authenticate', 'alpha');
    expect(endpointPath).toBe('json/realms/root/realms/alpha/authenticate');
  });
  // Test getEndpointPath with /alpha realm starting with slash
  it('getEndpointPath should return endpoint path with /alpha realm', () => {
    const endpointPath = getEndpointPath('authenticate', '/alpha');
    expect(endpointPath).toBe('json/realms/root/realms/alpha/authenticate');
  });
  // Test getEndpointPath with /alpha for authorize endpoint
  it('getEndpointPath should return endpoint path with /alpha for authorize endpoint', () => {
    const endpointPath = getEndpointPath('authorize', '/alpha');
    expect(endpointPath).toBe('oauth2/realms/root/realms/alpha/authorize');
  });

  // Test getRealmUrlPath
  it('getRealmUrlPath should return realm URL path', () => {
    const realmUrlPath = getRealmUrlPath('root');
    expect(realmUrlPath).toBe('realms/root');
  });
  // Test getRealmUrlPath with /alpha realm
  it('getRealmUrlPath should return realm URL path with alpha realm', () => {
    const realmUrlPath = getRealmUrlPath('alpha');
    expect(realmUrlPath).toBe('realms/root/realms/alpha');
  });
  // test getRealmUrlPath with /alpha realm starting with slash
  it('getRealmUrlPath should return realm URL path with /alpha realm', () => {
    const realmUrlPath = getRealmUrlPath('/alpha');
    expect(realmUrlPath).toBe('realms/root/realms/alpha');
  });
  // Test getRealmUrlPath with /alpha with trailing slash
  it('getRealmUrlPath should return realm URL path w/o being affected by trailing slash', () => {
    const realmUrlPath = getRealmUrlPath('alpha/');
    expect(realmUrlPath).toBe('realms/root/realms/alpha');
  });

  // Test parseQuery
  it('parseQuery should return query object', () => {
    const query = parseQuery('https://example.com?test=1&test2=2');
    expect(query).toEqual({ test: '1', test2: '2' });
  });
  // Test parseQuery with empty query
  it('parseQuery should return empty object', () => {
    const query = parseQuery('https://example.com');
    expect(query).toEqual({});
  });

  // Test resolve function
  it('resolveUrl should return a full URL with path', () => {
    const url = resolveUrl('https://example.com', 'test');
    expect(url).toBe('https://example.com/test');
  });
  // Test resolve function with path starting with slash
  it('resolveUrl should return a full URL with path starting with slash', () => {
    const url = resolveUrl('https://example.com', '/test');
    expect(url).toBe('https://example.com/test');
  });
  // Test resolve function with path starting with slash and base URL ending with slash
  it('resolveUrl should return a full URL with path starting and ending with slashes', () => {
    const url = resolveUrl('https://example.com/', '/test/');
    expect(url).toBe('https://example.com/test/');
  });

  // Test stringifyQueryParams with basic record
  it('stringifyQueryParams should return query string', () => {
    const query = stringifyQueryParams({ test: '1', test2: '2' });
    expect(query).toBe('test=1&test2=2');
  });
  // Test stringifyQueryParams with empty record
  it('stringifyQueryParams should return empty string', () => {
    const query = stringifyQueryParams({});
    expect(query).toBe('');
  });
});
