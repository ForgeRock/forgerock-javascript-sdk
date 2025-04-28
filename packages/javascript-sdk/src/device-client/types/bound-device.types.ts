/*
 * @forgerock/javascript-sdk
 *
 * bound-device.types.ts
 *
 * Copyright (c) 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export type GetBoundDevicesQuery = {
  userId: string;
  realm?: string;
};
export type BoundDeviceQuery = GetBoundDevicesQuery & { device: Device };

export type DeviceResponse = {
  result: Device[];
  resultCount: number;
  pagedResultsCookie: null;
  totalPagedResultsPolicy: string;
  totalPagedResults: -1;
  remainingPagedResults: -1;
};

export type Device = {
  _id: string;
  _rev: string;
  createdDate: number;
  lastAccessDate: number;
  deviceId: string;
  deviceName: string;
  uuid: string;
  recoveryCodes: string[];
  key: {
    kty: string;
    kid: string;
    use: string;
    alg: string;
    n: string;
    e: string;
  };
  deviceManagementStatus: boolean;
};
