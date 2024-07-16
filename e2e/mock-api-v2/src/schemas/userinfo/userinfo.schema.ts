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

export { UserInfoSchema };
