import type { RequestHeaders, ResponseHeaders } from '@forgerock/shared-types';

export function getResponseHeaders(response: Response) {
  return Array.from(response.headers.keys()).reduce<ResponseHeaders>(
    (acc, key) => {
      acc[key] = response.headers.get(key);
      return acc;
    },
    {}
  );
}

export function getRequestHeaders(request: Request) {
  return Array.from(request.headers.keys()).reduce<RequestHeaders>(
    (acc, key) => {
      acc[key] = request.headers.get(key);
      return acc;
    },
    {}
  );
}
