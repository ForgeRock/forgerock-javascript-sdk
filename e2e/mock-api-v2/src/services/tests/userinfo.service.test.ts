import { expect, it } from '@effect/vitest';
import { UserInfo, userInfoMock } from '../userinfo.service';
import { userInfoResponse } from '../../responses/userinfo/userinfo';
import { Effect } from 'effect';

it.effect('should get userinfo', () =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* UserInfo;

    const result = yield* getUserInfo('mytoken', {});

    expect(result).toEqual(userInfoResponse);
  }).pipe(Effect.provideService(UserInfo, userInfoMock)),
);
