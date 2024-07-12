import { Schema } from '@effect/schema';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize.schema';
import { PingOneRequestQuery } from '../schemas/custom-html-template/custom-html-template-request.schema';

type QueryTypes =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>
  | null;

type HeaderTypes = Schema.Schema.Type<typeof DavinciAuthorizeHeaders> | null;
export { QueryTypes, HeaderTypes };
