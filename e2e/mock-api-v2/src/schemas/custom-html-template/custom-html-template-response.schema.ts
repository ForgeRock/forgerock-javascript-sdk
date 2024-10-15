import { Schema } from '@effect/schema';

const PingOnePathParams = Schema.Struct({ envid: Schema.String, connectionid: Schema.String });

const ProtectSDKRequestFormData = Schema.Struct({
  value: Schema.Struct({
    protectsdk: Schema.String,
  }),
});

const UsernamePasswordFormData = Schema.Struct({
  value: Schema.Struct({
    username: Schema.String,
    password: Schema.String,
  }),
});

const PossibleFormDatas = Schema.Union(ProtectSDKRequestFormData, UsernamePasswordFormData);

const _PingOneCustomHtmlResponseBody = Schema.Struct({
  interactionId: Schema.String,
  interactionToken: Schema.String,
  _links: Schema.Struct({
    next: Schema.Struct({
      href: Schema.String,
    }),
  }),
  eventName: Schema.String,
  isResponseCompatibleWithMobileAndWebSdks: Schema.Boolean,
  id: Schema.String,
  companyId: Schema.String,
  flowId: Schema.String,
  connectionId: Schema.String,
  capabilityName: Schema.String,
  formData: PossibleFormDatas,
  form: Schema.Struct({
    name: Schema.String,
    description: Schema.String,
    category: Schema.String,
    components: Schema.Struct({
      fields: Schema.Array(
        Schema.Struct({
          type: Schema.String,
          key: Schema.String,
          label: Schema.String,
        }),
      ),
    }),
  }),
});
interface PingOneCustomHtmlResponseBody
  extends Schema.Schema.Type<typeof _PingOneCustomHtmlResponseBody> {}
const PingOneCustomHtmlResponseBody: Schema.Schema<
  PingOneCustomHtmlResponseBody,
  PingOneCustomHtmlResponseBody
> = _PingOneCustomHtmlResponseBody;

const _PingOneCustomHtmlResponseErrorBody = Schema.Struct({
  interactionId: Schema.String,
  companyId: Schema.String,
  connectionId: Schema.String,
  connectorId: Schema.String,
  id: Schema.String,
  capabilityName: Schema.String,
  errorCategory: Schema.String,
  code: Schema.String,
  cause: Schema.NullOr(Schema.String),
  expected: Schema.Boolean,
  message: Schema.String,
  httpResponseCode: Schema.Number,
  details: Schema.Array(
    Schema.Struct({
      rawResponse: Schema.Struct({
        id: Schema.String,
        code: Schema.String,
        message: Schema.String,
        details: Schema.Array(
          Schema.Struct({
            code: Schema.String,
            target: Schema.String,
            message: Schema.String,
            innerError: Schema.Struct({
              failuresRemaining: Schema.Number,
            }),
          }),
        ),
      }),
      statusCode: Schema.Number,
    }),
  ),
  isResponseCompatibleWithMobileAndWebSdks: Schema.Boolean,
});

interface PingOneCustomHtmlResponseErrorBody
  extends Schema.Schema.Type<typeof _PingOneCustomHtmlResponseErrorBody> {}
const PingOneCustomHtmlResponseErrorBody: Schema.Schema<
  PingOneCustomHtmlResponseErrorBody,
  PingOneCustomHtmlResponseErrorBody
> = _PingOneCustomHtmlResponseErrorBody;

export { PingOnePathParams, PingOneCustomHtmlResponseBody, PingOneCustomHtmlResponseErrorBody };
