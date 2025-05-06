/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Cookies } from '@effect/platform';
import { Effect, Option, pipe } from 'effect';

import { ResponseMapKeys, responseMap } from '../responses/index.js';
import { returnSuccessResponseRedirect } from '../responses/return-success-redirect.js';

import { HeaderTypes } from '../types/index.js';

/**
 *
 * This will parse the `headers.cookie` into an `Option`
 * If there is no headers.cookie, it will be a `None`
 * When we have a headers.cookie value, it will turn
 * it into a Record of cookieName => value
 * Then it specifically will grab the `stepIndex` value.
 * If it doesn't exist, it will be a `None`
 * If it exists, we will have a `Some(value: number)`
 */
const parseCookieHeaderForIndex = (headers: HeaderTypes) => {
  return pipe(
    /*
     * We create an Option from the headers.cookie
     * As long as we have some headers, this will be a `Some`
     */
    Option.fromNullable(headers?.cookie),

    Option.map(Cookies.parseHeader),

    /**
     * We try to get the `stepIndex` key from the record
     * of headers that we created.
     */
    Option.flatMapNullable((record) => record['stepIndex']),
  );
};

/**
 * Increment the cookie header
 * This will parses the cookie header first, and turn it
 * into a record of cookie name and value
 * then will incremement the stepIndex header by parsing the
 * string into a number and adding 1 to it.
 */
const incrementCookieHeader = (headers: HeaderTypes) =>
  pipe(
    parseCookieHeaderForIndex(headers),
    Option.map(parseInt),
    Option.map((num) => num + 1),
    Option.map((num) => num.toString()),
    Option.getOrElse(() => '1'),
  );

/**
 * Read the cookie for where we are in the flow
 * Then return the next item
 */

const getElementFromCookie = (arr: (typeof responseMap)[ResponseMapKeys], headers: HeaderTypes) =>
  pipe(
    parseCookieHeaderForIndex(headers),
    Option.map(parseInt),
    Effect.flatMap((number) =>
      Effect.if(number <= arr.length - 1, {
        onTrue: () => Effect.succeed(arr[number]),
        onFalse: () => Effect.succeed(returnSuccessResponseRedirect),
      }),
    ),
  );

export { incrementCookieHeader, parseCookieHeaderForIndex, getElementFromCookie };
