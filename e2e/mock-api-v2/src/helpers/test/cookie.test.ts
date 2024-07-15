import { it, expect } from '@effect/vitest';
import { getElementFromCookie, incrementCookieHeader, parseCookieHeaderForIndex } from '../cookie';
import { HeaderTypes } from '../../types';
import { Effect, Exit } from 'effect';
import { responseMap } from '../../responses';
import { returnSuccessResponseRedirect } from '../../responses/return-success-redirect';

it.effect('should parse a cookie header for an index value', () =>
  Effect.gen(function* () {
    const header: HeaderTypes = {
      cookie: 'stepIndex=1',
    };

    const result = yield* parseCookieHeaderForIndex(header);
    expect(result).toEqual('1');
  }),
);

it.effect('should parse a cookie header for an index value', () =>
  Effect.gen(function* () {
    const header: HeaderTypes = {
      cookie: '',
    };

    const result = yield* parseCookieHeaderForIndex(header).pipe(Effect.exit);
    expect(result).toEqual(Exit.fail('is a none'));
  }),
);

it.effect('should increment the cookie header', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    const headers: HeaderTypes = {
      cookie: 'stepIndex=1',
    };

    const result = incrementCookieHeader(headers);
    expect(result).toEqual('2');
  }),
);

it.effect('should return 1 if no cookie header passed to incrementCookieHeader', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    const headers: HeaderTypes = {};

    const result = incrementCookieHeader(headers);
    expect(result).toEqual('1');
  }),
);

it.effect('should get an element from the response map based off the cookie header', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    const headers: HeaderTypes = {
      cookie: 'stepIndex=1',
    };

    const expected = responseMap['UsernamePassword'][1];
    const result = yield* getElementFromCookie(responseMap['UsernamePassword'], headers);
    expect(expected).toEqual(result);
  }),
);
it.effect('should return responesRedirect when we have exceeded the index for a given flow', () =>
  Effect.gen(function* () {
    const headers: HeaderTypes = {
      cookie: 'stepIndex=4',
    };

    const arr = responseMap['UsernamePassword'];
    const expected = returnSuccessResponseRedirect;
    const result = yield* getElementFromCookie(arr, headers);

    expect(expected).toEqual(result);
  }),
);
