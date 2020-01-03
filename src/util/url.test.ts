import { parseQuery, resolve, stringify } from './url';

describe('The URL utility', () => {
  const querystrings = {
    '': {},
    'foo=bar': { foo: 'bar' },
    'foo=bar&goo=baz': { foo: 'bar', goo: 'baz' },
    'foo=b%20r': { foo: 'b r' },
  };

  it('correctly resolves paths', () => {
    const baseUrl = 'http://domain.com';
    const basePath = '/a/b/c';
    const tests = [
      ['', `${baseUrl}/a/b`],
      ['foo', `${baseUrl}/a/b/foo`],
      ['/foo', `${baseUrl}/foo`],
      ['foo/baz', `${baseUrl}/a/b/foo/baz`],
      ['/foo/baz', `${baseUrl}/foo/baz`],
    ];

    tests.forEach((x) => {
      const actual = resolve(baseUrl + basePath, x[0]);
      expect(actual).toBe(x[1]);
    });
  });

  it('correctly parses a querystring', () => {
    const baseUrl = 'http://domain.com?';
    for (const t in querystrings) {
      const actual = parseQuery(baseUrl + t);
      expect(actual).toStrictEqual(querystrings[t]);
    }
  });

  it('correctly serializes a querystring', () => {
    for (const t in querystrings) {
      const actual = stringify(querystrings[t]);
      expect(actual).toStrictEqual(t);
    }
  });
});
