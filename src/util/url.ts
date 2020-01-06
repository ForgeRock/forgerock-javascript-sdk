import { NameValue } from '../shared/interfaces';

function resolve(baseUrl: string, path: string): string {
  const url = new URL(baseUrl);
  if (path.startsWith('/')) {
    return `${url.protocol}//${url.hostname}${path}`;
  }

  const basePath = url.pathname.split('/');
  const destPath = path.split('/').filter((x) => !!x);
  const newPath = [...basePath.slice(0, -1), ...destPath].join('/');

  return `${url.protocol}//${url.hostname}${newPath}`;
}

function parseQuery(fullUrl: string): NameValue<string> {
  const url = new URL(fullUrl);
  const query: NameValue<string> = {};
  url.searchParams.forEach((v, k) => (query[k] = v));
  return query;
}

function stringify(data: NameValue<string | undefined>): string {
  const pairs = [];
  for (const k in data) {
    if (data[k]) {
      pairs.push(k + '=' + encodeURIComponent(data[k] as string));
    }
  }
  return pairs.join('&');
}

export { parseQuery, resolve, stringify };
