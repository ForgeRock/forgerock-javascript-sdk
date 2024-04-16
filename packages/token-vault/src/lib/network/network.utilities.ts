/// reference libs="WebWorker"
import { ConfigOptions } from '@forgerock/javascript-sdk';
import type {
  ConfigurablePaths,
  CustomPathConfig,
  RequestHeaders,
  ResponseClone,
  ResponseHeaders,
} from '../types/index.js';

/** ****************************************************************
 * @function checkForMissingSlash
 * @param {string} url - The URL to check for a missing slash
 * @returns {string} - The URL with a slash appended to the end if it was missing
 */
export function checkForMissingSlash(url: string) {
  if (url && url.charAt(url.length - 1) !== '/') {
    return url + '/';
  }
  return url;
}

/** ****************************************************************
 * @function cloneResponse - Clone a response
 * @param {Response} response - The response to clone
 * @returns {Promise<ResponseClone>} - The cloned response
 */
export async function cloneResponse(response: Response): Promise<ResponseClone> {
  // Clone and redact the response
  const clone = response.clone();

  let body;
  try {
    body = await getBodyJsonOrText(clone);
  } catch (error) {
    // Leave body undefined
  }

  return {
    // Conditionally set the body property
    ...(body && { body }),
    headers: getResponseHeaders(clone),
    ok: clone.ok,
    redirected: clone.redirected,
    status: clone.status,
    statusText: clone.statusText,
    type: clone.type,
    url: clone.url,
  };
}

/** ****************************************************************
 * @function createErrorResponse - Create an error response
 * @param {string} type - The type of error
 * @param {Error} error - The error object
 * @returns {Object} - An error response object
 */
export function createErrorResponse(
  type: 'fetch_error' | 'no_tokens' | 'refresh_error',
  error: unknown,
) {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return {
    body: {
      error: type,
      message: message,
    },
    headers: { 'content-type': 'application/json' },
    ok: false,
    redirected: false,
    type: 'error',
    /**
     * Using the status code of 0 to indicate an opaque network error
     * error without a server response.
     *
     * https://fetch.spec.whatwg.org/#concept-network-error
     */
    status: 400,
    statusText: 'Token Vault Proxy Error',
  };
}

/** ****************************************************************
 * @function evaluateUrlForInterception - Evaluate a URL to see if it should be intercepted
 * @param {string} url - The URL to evaluate
 * @param {string[]} urls - The URLs to check against
 * @returns {boolean} - Whether or not the URL should be intercepted
 */
export function evaluateUrlForInterception(url: string, urls: string[]) {
  // Loop through the urls and check if the url matches
  for (const u of urls) {
    // If the url ends with a * then check if the url starts with the prefix
    if (u.endsWith('*')) {
      // Remove the * from the end of the url
      const prefix = u.slice(0, -1);
      // Check if the url starts with the prefix
      if (url.startsWith(prefix)) {
        return true;
      }
    }
    // Do full URL matching
    if (url.includes(u)) {
      return true;
    }
  }
  // No match
  return false;
}

/** ****************************************************************
 * @function extractOrigins - Extract a set of origins from URLs
 * @param {string[]} urls - array of urls
 * @returns {string[]} - array of origins
 */
export function extractOrigins(urls: string[]): string[] {
  const origins: Set<string> = new Set();

  urls.forEach((url) => {
    const { origin } = new URL(url);
    origins.add(origin);
  });

  return Array.from(origins);
}

/** ****************************************************************
 * @function generateAmUrls - Generate the URLs for interception
 * @param forgerockConfig - The ForgeRock config object
 * @returns {Object} - An object containing the URLs for interception
 */
export function generateAmUrls(forgerockConfig: ConfigOptions) {
  const baseUrl = checkForMissingSlash(forgerockConfig?.serverConfig?.baseUrl || '');
  const realmPath = forgerockConfig?.realmPath || 'root';

  return {
    accessToken: `${resolveUrl(baseUrl, getEndpointPath('accessToken', realmPath))}`,
    revoke: `${resolveUrl(baseUrl, getEndpointPath('revoke', realmPath))}`,
    session: `${resolveUrl(baseUrl, getEndpointPath('endSession', realmPath))}?`,
    userInfo: `${resolveUrl(baseUrl, getEndpointPath('userInfo', realmPath))}`,
  };
}

/** ****************************************************************
 * @function getBaseUrl - Get the base URL from a URL
 * Returns the base URL including protocol, hostname and any non-standard port.
 * The returned URL does not include a trailing slash.
 * @param {string} url - The URL to get the base URL from
 * @returns {string} - The base URL
 */
export function getBaseUrl(url: URL) {
  const isNonStandardPort =
    (url.protocol === 'http:' && ['', '80'].indexOf(url.port) === -1) ||
    (url.protocol === 'https:' && ['', '443'].indexOf(url.port) === -1);
  const port = isNonStandardPort ? `:${url.port}` : '';
  const baseUrl = `${url.protocol}//${url.hostname}${port}`;
  return baseUrl;
}

/**
 * @function getResponseBodyBlob - Get the response's body blob
 * @param {Response} response - The response to get the body
 * @returns {Promise<undefined | Blob>} - The response body blob
 */
export async function getResponseBodyBlob(response: Response) {
  const blob = await response.clone().blob();

  if (blob && blob.size) {
    return blob;
  }
  return;
}

/**
 * @function getRequestBodyBlob - Get the request's body blob
 * @param {Request} request - The request to get the body blob from
 * @returns {Promise<undefined | Blob>} - The request body blob
 */
export async function getRequestBodyBlob(request: Request): Promise<undefined | Blob> {
  // Return undefined early if GET or HEAD
  if (['GET', 'HEAD'].includes(request.method)) {
    return;
  }

  const blob = await request.clone().blob();

  if (blob && blob.size) {
    return blob;
  }
  return;
}

/** ****************************************************************
 * @function getResponseHeaders - Get the response headers
 * @param {Response} response - The response to get the headers from
 * @returns {ResponseHeaders} - The response headers
 */
export function getResponseHeaders(response: Response) {
  return Array.from(response.headers.keys()).reduce<ResponseHeaders>((acc, key: string) => {
    acc[key] = response.headers.get(key);
    return acc;
  }, {});
}

/**
 * @function getRequestHeaders - Get the request headers
 * @param {Request} request - The request to get the headers from
 * @returns {RequestHeaders} - The request headers
 */
export function getRequestHeaders(request: Request) {
  return Array.from(request.headers.keys()).reduce<RequestHeaders>((acc, key) => {
    acc[key] = request.headers.get(key);
    return acc;
  }, {});
}

/** ****************************************************************
 * @function getBodyJsonOrText - Get the response body as JSON or text
 * @param {Response} response - The response to get the body from
 * @returns {Promise<unknown>} - The response body as JSON or text
 */
export async function getBodyJsonOrText(response: Response) {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') > -1) {
    return await response.json();
  }
  return await response.text();
}

/** ****************************************************************
 * @function getEndpointPath - Get the endpoint path
 * @param {ConfigurablePaths} endpoint - The endpoint to get the path for
 * @param {string} realmPath - The realm path
 * @param {CustomPathConfig} customPaths - The custom paths
 * @returns {string} - The endpoint path
 */
export function getEndpointPath(
  endpoint: ConfigurablePaths,
  realmPath?: string,
  customPaths?: CustomPathConfig,
): string {
  const realmUrlPath = getRealmUrlPath(realmPath);
  const defaultPaths = {
    authenticate: `json/${realmUrlPath}/authenticate`,
    authorize: `oauth2/${realmUrlPath}/authorize`,
    accessToken: `oauth2/${realmUrlPath}/access_token`,
    endSession: `oauth2/${realmUrlPath}/connect/endSession`,
    userInfo: `oauth2/${realmUrlPath}/userinfo`,
    revoke: `oauth2/${realmUrlPath}/token/revoke`,
    sessions: `json/${realmUrlPath}/sessions/`,
  };
  if (customPaths && customPaths[endpoint]) {
    // TypeScript is not correctly reading the condition above
    // It's thinking that customPaths[endpoint] may result in undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return customPaths[endpoint];
  } else {
    return defaultPaths[endpoint];
  }
}

/** ****************************************************************
 * @function getRealmUrlPath - Get the realm URL path
 * @param {string} realmPath - The realm path
 * @returns {string} - The realm URL path
 */
export function getRealmUrlPath(realmPath?: string) {
  // Split the path and scrub segments
  const names = (realmPath || '')
    .split('/')
    .map((x) => x.trim())
    .filter((x) => x !== '');

  // Ensure 'root' is the first realm
  if (names[0] !== 'root') {
    names.unshift('root');
  }

  // Concatenate into a URL path
  const urlPath = names.map((x) => `realms/${x}`).join('/');
  return urlPath;
}

/** ****************************************************************
 * @function parseQuery - Parse a query string into an object
 * @param {string} fullUrl - The full URL to parse
 * @returns {Record<string, string>} - The parsed query string
 */
export function parseQuery(fullUrl: string) {
  const url = new URL(fullUrl);
  const query: Record<string, string> = {};
  url.searchParams.forEach((v, k) => (query[k] = v));
  return query;
}

/** ****************************************************************
 * @function resolveUrl - Resolve a URL
 * @param {string} baseUrl - The base URL
 * @param {string} path - The path to resolve
 * @returns {string} - The resolved URL
 */
export function resolveUrl(baseUrl: string, path: string) {
  const url = new URL(baseUrl);

  if (path.startsWith('/')) {
    return `${getBaseUrl(url)}${path}`;
  }

  const basePath = url.pathname.split('/');
  const destPath = path.split('/').filter((x) => !!x);
  const newPath = [...basePath.slice(0, -1), ...destPath].join('/');

  return `${getBaseUrl(url)}${newPath}`;
}

/** ****************************************************************
 * @function stringifyQueryParams - Stringify query parameters
 * @param {Record<string, string>} data - The query parameters to stringify
 * @returns {string} - The stringified query parameters
 */
export function stringifyQueryParams(data: Record<string, string>) {
  const pairs: string[] = [];
  for (const k in data) {
    if (data[k]) {
      pairs.push(k + '=' + encodeURIComponent(data[k]));
    }
  }
  return pairs.join('&');
}
