/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize.schema.js';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/custom-html-template/custom-html-template-request.schema.js';
import { PingOneCustomHtmlResponseBody } from '../schemas/custom-html-template/custom-html-template-response.schema.js';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema.js';

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
