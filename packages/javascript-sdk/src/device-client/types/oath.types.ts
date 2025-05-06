/*
 * @forgerock/javascript-sdk
 *
 * oath.types.ts
 *
 * Copyright (c) 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export type OathDevice = {
  _id: string;
  deviceManagementStatus: boolean;
  deviceName: string;
  uuid: string;
  createdDate: number;
  lastAccessDate: number;
  _rev: string;
};

export type DeleteOathQuery = {
  realm?: string;
  userId: string;
  uuid: string;
};

export type RetrieveOathQuery = {
  realm?: string;
  userId: string;
};

export type OathResponse = {
  pagedResultsCookie: string | null;
  remainingPagedResults: number;
  resultCount: number;
  totalPagedResults: number;
  totalPagedResultsPolicy: string;
  result: OathDevice[];
};

export type DeletedOathDevice = {
  _id: string;
  _rev: string;
  uuid: string;
  recoveryCodes: string[];
  createdDate: number;
  lastAccessDate: number;
  sharedSecret: string;
  deviceName: string;
  lastLogin: number;
  counter: number;
  checksumDigit: boolean;
  truncationOffset: number;
  clockDriftSeconds: number;
};
