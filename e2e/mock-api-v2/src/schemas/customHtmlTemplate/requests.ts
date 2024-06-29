import { Schema } from '@effect/schema';

const FormDataResponseUsernamePassword = Schema.Struct({
  username: Schema.String,
  password: Schema.String,
});
const PingProtectSDKResponse = Schema.Struct({ pingprotectsdk: Schema.String });

const PingOneRequestQuery = Schema.Struct({
  acr_values: Schema.String,
});

const PossibleFormDatas = Schema.Union(FormDataResponseUsernamePassword, PingProtectSDKResponse);

const PingOneCustomHtmlRequestBody = Schema.Struct({
  id: Schema.String,
  eventName: Schema.String,
  interactionId: Schema.String,
  parameters: Schema.Struct({
    eventType: Schema.String,
    data: Schema.Struct({
      actionKey: Schema.String,
      formData: Schema.Struct({
        value: PossibleFormDatas,
      }),
    }),
  }),
});

export { PingOneCustomHtmlRequestBody, PingOneRequestQuery };
