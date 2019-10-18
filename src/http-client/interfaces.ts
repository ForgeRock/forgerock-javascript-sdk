/**
 * A function that determines whether a new token is required based on a HTTP response.
 */
type RequiresNewTokenFn = (res: Response) => boolean;

/**
 * Options to use when making an HTTP call.
 */
interface HttpClientRequestOptions {
  bypassAuthentication?: boolean;
  init: RequestInit;
  requiresNewToken?: RequiresNewTokenFn;
  timeout: number;
  url: string;
}

export { HttpClientRequestOptions, RequiresNewTokenFn };
