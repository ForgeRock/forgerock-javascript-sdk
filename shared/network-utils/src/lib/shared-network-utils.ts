import {
  ConfigurablePaths,
  CustomPathConfig,
} from '@forgerock/javascript-sdk/src/config/interfaces';
import { ForgeRockConfig, ResponseClone } from '@forgerock/shared-types';
import { getResponseHeaders } from '@forgerock/sw-utils';

export function checkForMissingSlash(url: string) {
  if (url && url.charAt(url.length - 1) !== '/') {
    return url + '/';
  }
  return url;
}

export async function cloneResponse(
  response: Response
): Promise<ResponseClone> {
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

export function createErrorResponse(
  type: 'fetch_error' | 'no_tokens',
  error: unknown
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

export function evaluateUrlForInterception(url: string, urls: string[]) {
  return urls?.includes(url);
}

export function generateUrls(forgerockConfig: ForgeRockConfig) {
  const baseUrl = checkForMissingSlash(forgerockConfig.serverConfig.baseUrl);
  const realmPath = forgerockConfig?.realmPath || 'root';

  return {
    revoke: `${resolve(baseUrl, getEndpointPath('revoke', realmPath))}`,
    userInfo: `${resolve(baseUrl, getEndpointPath('userInfo', realmPath))}`,
    accessToken: `${resolve(
      baseUrl,
      getEndpointPath('accessToken', realmPath)
    )}`,
  };
}

/**
 * Returns the base URL including protocol, hostname and any non-standard port.
 * The returned URL does not include a trailing slash.
 */
export function getBaseUrl(url: URL) {
  const isNonStandardPort =
    (url.protocol === 'http:' && ['', '80'].indexOf(url.port) === -1) ||
    (url.protocol === 'https:' && ['', '443'].indexOf(url.port) === -1);
  const port = isNonStandardPort ? `:${url.port}` : '';
  const baseUrl = `${url.protocol}//${url.hostname}${port}`;
  return baseUrl;
}

export async function getResponseBodyBlob(response: Response) {
  const blob = await response.clone().blob();

  if (blob && blob.size) {
    return blob;
  }
  return;
}

export async function getRequestBodyBlob(
  request: Request
): Promise<undefined | Blob> {
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

export async function getBodyJsonOrText(response: Response) {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') > -1) {
    return await response.json();
  }
  return await response.text();
}

export function getEndpointPath(
  endpoint: ConfigurablePaths,
  realmPath?: string,
  customPaths?: CustomPathConfig
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

export function parseQuery(fullUrl: string) {
  const url = new URL(fullUrl);
  const query: Record<string, string> = {};
  url.searchParams.forEach((v, k) => (query[k] = v));
  return query;
}

export function resolve(baseUrl: string, path: string) {
  const url = new URL(baseUrl);

  if (path.startsWith('/')) {
    return `${getBaseUrl(url)}${path}`;
  }

  const basePath = url.pathname.split('/');
  const destPath = path.split('/').filter((x) => !!x);
  const newPath = [...basePath.slice(0, -1), ...destPath].join('/');

  return `${getBaseUrl(url)}${newPath}`;
}

export function stringify(data: Record<string, string>) {
  const pairs: string[] = [];
  for (const k in data) {
    if (data[k]) {
      pairs.push(k + '=' + encodeURIComponent(data[k]));
    }
  }
  return pairs.join('&');
}
