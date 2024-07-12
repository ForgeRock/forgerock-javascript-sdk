import { Schema } from '@effect/schema';

/**
 * Schemas of what FormData may look like in a Ping Request
 *
 */
const FormDataResponseUsernamePassword = Schema.Struct({
  username: Schema.String,
  password: Schema.String,
});
const PingProtectSDKResponse = Schema.Struct({ pingprotectsdk: Schema.String });

const PossibleFormDatas = Schema.Struct({
  value: Schema.Union(FormDataResponseUsernamePassword, PingProtectSDKResponse),
});

/**
 * Shape of the query parameters in a PingOne request
 */
const PingOneRequestQuery = Schema.Struct({
  acr_values: Schema.String,
});

/**
 *
 * The body, composed with the `PossibleFormDatas`
 * for a PingOneRequest
 */
const PingOneCustomHtmlRequestBody = Schema.Struct({
  id: Schema.String,
  eventName: Schema.String,
  interactionId: Schema.String,
  parameters: Schema.Struct({
    eventType: Schema.String,
    data: Schema.Struct({
      actionKey: Schema.String,
      formData: PossibleFormDatas,
    }),
  }),
});

export { PingOneCustomHtmlRequestBody, PingOneRequestQuery };
