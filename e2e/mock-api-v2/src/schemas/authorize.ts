import { Schema } from '@effect/schema';

const AuthorizePath = Schema.Struct({ envid: Schema.String });

const DavinciAuthorizeResponseHeaders = Schema.Struct({
  'Set-Cookie': Schema.String,
});

const DavinciAuthorizeHeaders = Schema.Struct({
  cookie: Schema.optional(Schema.String),
});

const DavinciAuthorizeQuery = Schema.Struct({
  response_mode: Schema.String,
  client_id: Schema.String,
  redirect_uri: Schema.String,
  response_type: Schema.String,
  scope: Schema.String,
  state: Schema.String,
  code: Schema.String,
  code_challenge: Schema.String,
  code_challenge_method: Schema.String,
  acr_values: Schema.String, // this should be optional
});

const createBrand = (id: string) => Schema.String; //.pipe(Schema.brand(id))

const DavinciAuthorizeFailure = Schema.Struct({
  error: Schema.String,
  error_description: Schema.String,
});

const DavinciFlowNode = Schema.Struct({
  interactionId: createBrand('InteractionId'),
  connectorId: createBrand('ConnectorId'),
  interactionToken: createBrand('interactionToken'),
  success: Schema.Boolean,
  startUiSubFlow: Schema.Boolean,
  _links: Schema.Struct({
    next: Schema.Struct({
      href: createBrand('NextHref'),
    }),
  }),
  eventName: Schema.String,
  isResponseCompatibleWithMobileAndWebSdks: Schema.Boolean,
  id: createBrand('id'),
  companyId: createBrand('companyId'),
  flowId: createBrand('flowId'),
  connectionId: createBrand('connectionId'),
  capabilityName: createBrand('capabilityName'),
  formData: Schema.Struct({
    value: Schema.Struct({
      protectsdk: Schema.String,
    }),
  }),
  form: Schema.Struct({
    name: Schema.String,
    description: Schema.String,
    category: createBrand('formCategory'),
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

export {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeQuery,
  DavinciAuthorizeFailure,
  DavinciFlowNode,
  DavinciAuthorizeResponseHeaders,
};
