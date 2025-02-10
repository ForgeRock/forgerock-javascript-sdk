import { Schema } from '@effect/schema';
import { Effect, Context } from 'effect';
import { HttpError } from 'effect-http';

import { userInfoResponse } from '../responses/userinfo/userinfo.js';
import { UserInfoSchema } from '../schemas/userinfo/userinfo.schema.js';

/***
 * This file should be converted to a Layer that uses Request
 */

type UserInfoResponse = Schema.Schema.Type<typeof UserInfoSchema>;

function live<Headers = object>(bearerToken: string, headers: Headers) {
  return Effect.tryPromise({
    try: (signal) =>
      fetch('/userinfo', {
        signal,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ...headers,
        },
      }),
    catch: () => HttpError.unauthorized('failure to get userinfo'),
  }).pipe(
    Effect.tryMapPromise({
      try: (response) => response.json() as PromiseLike<UserInfoResponse>,
      catch: () => HttpError.internalServerError('failure to parse the response body of user info'),
    }),
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mock<Headers = object>(bearerToken: string, headers: Headers) {
  return Effect.tryPromise({
    try: () => Promise.resolve(userInfoResponse),
    catch: () => HttpError.unauthorized('failure to get user info'),
  });
}
class UserInfo extends Context.Tag('@services/userinfo')<
  UserInfo,
  { getUserInfo: typeof live }
>() {}

const userInfoLive = UserInfo.of({
  getUserInfo: live,
});

const userInfoMock = UserInfo.of({
  getUserInfo: mock,
});

export { UserInfo, userInfoLive, userInfoMock };
