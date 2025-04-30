/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';

const _UserInfoSchema = Schema.Struct({
  sub: Schema.String,
  preferred_username: Schema.String,
  given_name: Schema.String,
  updated_at: Schema.Number,
  family_name: Schema.String,
  email: Schema.String,
  env: Schema.String,
  org: Schema.String,
  'p1.region': Schema.String,
});

interface UserInfo extends Schema.Schema.Type<typeof _UserInfoSchema> {}

const UserInfoSchema: Schema.Schema<UserInfo, UserInfo> = _UserInfoSchema;

export { UserInfoSchema, UserInfo };
