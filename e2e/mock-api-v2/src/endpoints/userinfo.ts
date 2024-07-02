import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api, ApiResponse, Security } from 'effect-http';
import { UserInfoSchema } from '../schemas/userinfo/userinfo';

const userInfo = Api.addEndpoint(
  pipe(
    Api.get('UserInfo', '/:envid/as/userinfo').pipe(
      Api.setRequestPath(Schema.Struct({ envid: Schema.String })),
      Api.setSecurity(Security.bearer({})),
      Api.setResponseStatus(200),
      Api.setResponseBody(UserInfoSchema),
      Api.addResponse(ApiResponse.make(401, Schema.String)),
    ),
  ),
);

export { userInfo };
