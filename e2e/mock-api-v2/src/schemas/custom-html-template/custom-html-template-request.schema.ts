/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

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
const _PingOneCustomHtmlRequestBody = Schema.Struct({
  id: Schema.String,
  eventName: Schema.String,
  interactionId: Schema.String,
  parameters: Schema.Struct({
    eventType: Schema.String,
    data: Schema.Struct({
      /**
       * Consider making action keys literal values.
       */
      actionKey: Schema.String,
      formData: PossibleFormDatas,
    }),
  }),
});
interface PingOneCustomHtmlRequestBody
  extends Schema.Schema.Type<typeof _PingOneCustomHtmlRequestBody> {}
const PingOneCustomHtmlRequestBody: Schema.Schema<
  PingOneCustomHtmlRequestBody,
  PingOneCustomHtmlRequestBody
> = _PingOneCustomHtmlRequestBody;

export { PingOneCustomHtmlRequestBody, PingOneRequestQuery };
