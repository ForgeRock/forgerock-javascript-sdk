import { Schema } from '@effect/schema';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize';
import { PingOneRequestQuery } from '../schemas/customHtmlTemplate/requests';

type QueryTypes =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>
  | null;

type HeaderTypes = Schema.Schema.Type<typeof DavinciAuthorizeHeaders> | null;
export { QueryTypes, HeaderTypes };
