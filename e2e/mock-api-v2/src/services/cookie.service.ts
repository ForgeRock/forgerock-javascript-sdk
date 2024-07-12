import * as Cookies from '@effect/platform/Cookies';
import { Effect, Context, Either } from 'effect';

import { incrementCookieHeader } from '../helpers/cookie';
import { HeaderTypes } from '../types';

/*
 * Define the interface for the Cookie Service
 */
interface CookieService {
  writeCookie: (
    headers: HeaderTypes,
    interactionToken?: string,
  ) => Effect.Effect<Cookies.Cookies, Cookies.CookiesError, never>;
}
const CookieService = Context.GenericTag<CookieService>('CookieService');

const cookieOptions: Cookies.Cookie['options'] = {
  httpOnly: true,
  expires: new Date(Date.now() + 36000),
  path: '/',
  maxAge: 36000,
  // sameSite: "none" add this in when we need it.
};
/*
 * Mock out the test servers cookie writing
 */
const cookieServiceTest = CookieService.of({
  writeCookie: (headers, interactionToken?) =>
    Effect.succeed(
      Cookies.setAll(Cookies.empty, [
        ['interactionId', '123', cookieOptions],
        ['interactionToken', interactionToken || '456', cookieOptions],
        ['stepIndex', incrementCookieHeader(headers), cookieOptions],
      ]).pipe(
        /**
         * `setAll` returns an `Either`.
         * Either have two possible values, Left, and Right
         * Left is the error channel, Right is a success channel
         * In this case, I want to unwrap the either, so I use `getOrThrow`
         * if we throw, we failed to make the cookies for some reason
         * otherwise we will return the cookie object
         * This throws a default error of trying to `get` on a Left
         * We can use `getOrThrowWith` to throw our own erroor
         */
        Either.getOrThrow,
      ),
    ),
});

export { CookieService, cookieServiceTest };
