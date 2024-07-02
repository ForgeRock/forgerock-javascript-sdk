import { HttpError } from 'effect-http';
import { userInfoResponse } from '../responses/userinfo/userinfo';
import { UserInfoSchema } from '../schemas/userinfo/userinfo';
import { Context, Effect } from 'effect';
import { Schema } from '@effect/schema';
import { Routes } from '../helpers/routeTypes';

class Userinfo extends Context.Tag('userinfo')<
  Userinfo,
  {
    getUserInfo: (
      route: Extract<Routes, '/userinfo'>,
    ) => Effect.Effect<Schema.Schema.Type<typeof UserInfoSchema>, HttpError.HttpError, never>;
  }
>() {}

const userInfoTest = Userinfo.of({
  getUserInfo: () =>
    Effect.tryPromise({
      try: () => Promise.resolve(userInfoResponse),
      catch: () => HttpError.unauthorizedError('unauthorized userinfo call'),
    }),
});

export { Userinfo, userInfoTest };
