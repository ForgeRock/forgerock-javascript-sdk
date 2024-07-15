import { Schema } from '@effect/schema';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize.schema';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/custom-html-template/custom-html-template-request.schema';
import { PingOneCustomHtmlResponseBody } from '../schemas/custom-html-template/custom-html-template-response.schema';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema';

type QueryTypes =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>
  | null;

type HeaderTypes = Schema.Schema.Type<typeof DavinciAuthorizeHeaders> | null;

type CustomHtmlResponseBody =
  | Schema.Schema.Type<typeof PingOneCustomHtmlResponseBody>
  | Schema.Schema.Type<typeof SuccessResponseRedirect>;

type CustomHtmlRequestBody = Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>;

export { CustomHtmlRequestBody, CustomHtmlResponseBody, QueryTypes, HeaderTypes };
