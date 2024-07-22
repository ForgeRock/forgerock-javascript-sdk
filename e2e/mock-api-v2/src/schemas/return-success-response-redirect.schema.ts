import { Schema } from '@effect/schema';

const _SuccessResponseRedirect = Schema.Struct({
  interactionId: Schema.String,
  companyId: Schema.String,
  connectionId: Schema.String,
  connectorId: Schema.String,
  id: Schema.String,
  capabilityName: Schema.String,
  environment: Schema.Struct({
    id: Schema.String,
  }),
  session: Schema.Struct({
    id: Schema.String,
  }),
  status: Schema.String, // maybe we can make this Literals?
  authorizeResponse: Schema.Struct({
    code: Schema.String,
    state: Schema.String,
  }),
  isResponseCompatibleWithMobileAndWebSdks: Schema.Boolean,
  success: Schema.Boolean,
  resetCookie: Schema.Boolean,
  interactionToken: Schema.String,
  subFlowSettings: Schema.Struct({
    reactSkUrl: Schema.String,
    cssUrl: Schema.NullOr(Schema.String),
    cssLinks: Schema.Array(Schema.String),
    jsLinks: Schema.Array(Schema.String),
    loadingScreenSettings: Schema.String,
  }),
  _links: Schema.Struct({
    next: Schema.Struct({
      href: Schema.String,
    }),
  }),
});

interface SuccessResponseRedirect extends Schema.Schema.Type<typeof _SuccessResponseRedirect> {}
const SuccessResponseRedirect: Schema.Schema<SuccessResponseRedirect, SuccessResponseRedirect> =
  _SuccessResponseRedirect;
export { SuccessResponseRedirect };
