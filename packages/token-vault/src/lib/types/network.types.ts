/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

export type ResponseClone = {
  body: unknown;
  headers: Record<string, string | null>;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
};

export type ResponseHeaders = Record<string, string | null>;

export type RequestHeaders = Record<string, string | null>;
