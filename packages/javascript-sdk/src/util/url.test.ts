/*
 * @forgerock/javascript-sdk
 *
 * url.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { getBaseUrl, parseQuery, resolve, stringify } from './url';

describe('The URL utility', () => {
  const querystrings = {
    '': {},
    'foo=bar': { foo: 'bar' },
    'foo=bar&goo=baz': { foo: 'bar', goo: 'baz' },
    'foo=b%20r': { foo: 'b r' },
  };

  it('correctly determines base URL', () => {
    const tests = [
      ['http://domain.com', 'http://domain.com'],
      ['http://domain.com/', 'http://domain.com'],
      ['http://domain.com:80', 'http://domain.com'],
      ['http://domain.com:80/', 'http://domain.com'],
      ['http://domain.com:81', 'http://domain.com:81'],
      ['http://domain.com:81/', 'http://domain.com:81'],
      ['https://domain.com', 'https://domain.com'],
      ['https://domain.com/', 'https://domain.com'],
      ['https://domain.com:443', 'https://domain.com'],
      ['https://domain.com:443/', 'https://domain.com'],
      ['https://domain.com:8443', 'https://domain.com:8443'],
      ['https://domain.com:8443/', 'https://domain.com:8443'],
    ];

    tests.forEach((x) => {
      const url = new URL(x[0]);
      const actual = getBaseUrl(url);
      expect(actual).toBe(x[1]);
    });
  });

  it('correctly resolves paths', () => {
    const baseUrls = [
      'http://domain.com',
      'http://domain.com/',
      'https://domain.com:8443',
      'https://domain.com:8443/',
    ];
    const basePath = '/a/b/c';

    baseUrls.forEach((baseUrl) => {
      const baseUrlWithoutSlash = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

      const tests = [
        ['', `${baseUrlWithoutSlash}/a/b`],
        ['foo', `${baseUrlWithoutSlash}/a/b/foo`],
        ['/foo', `${baseUrlWithoutSlash}/foo`],
        ['foo/baz', `${baseUrlWithoutSlash}/a/b/foo/baz`],
        ['/foo/baz', `${baseUrlWithoutSlash}/foo/baz`],
      ];

      tests.forEach((x) => {
        const actual = resolve(baseUrlWithoutSlash + basePath, x[0]);
        expect(actual).toBe(x[1]);
      });
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
