import { Console, Option, pipe } from 'effect';
import { Schema } from '@effect/schema';
import { DavinciAuthorizeHeaders } from '../schemas/authorize';
import { Cookies } from '@effect/platform';
import { ResponseMapKeys, responseMap } from '../responses';
import { FetchError } from '../errors';

const parseCookieHeaderForIndex = (headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>) => {
  console.log(headers);
  return pipe(
    Option.fromNullable(headers.cookie),
    (v) => {
      console.log('as headers', v);
      return v;
    },
    Option.map(Cookies.parseHeader),
    (v) => {
      console.log(v);
      return v;
    },
    Option.flatMap((record) => Option.fromNullable(record['stepIndex'])),
  );
};

const incrementCookieHeader = (headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>) =>
  pipe(
    parseCookieHeaderForIndex(headers),
    (v) => {
      console.log('headers', v);
      return v;
    },
    Option.map(parseInt),
    Option.map((num) => num + 1),
    Option.map((num) => num.toString()),
    Option.getOrElse(() => '1'),
  );

/**
 * Read the cookie for where we are in the DavinciFlow
 * Then return the next item
 */

const getElementFromCookie = (
  arr: (typeof responseMap)[ResponseMapKeys],
  headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>,
) =>
  pipe(
    parseCookieHeaderForIndex(headers),
    Option.map(parseInt),
    Option.map((number) => arr[number]),
    (v) => {
      console.log('the element', v);
      return v;
    },
    Option.getOrThrowWith(() => new FetchError()),
  );

export { incrementCookieHeader, parseCookieHeaderForIndex, getElementFromCookie };
