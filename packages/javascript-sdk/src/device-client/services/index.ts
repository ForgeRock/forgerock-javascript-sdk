import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
  DeletedOAthDevice,
  DeleteOathQuery,
  OathDevice,
  OAthResponse,
  RetrieveOathQuery,
} from '../types/oath.types.js';
import {
  DeleteDeviceQuery,
  PushDevice,
  PushDeviceQuery,
  PushDevicesResponse,
} from '../types/push-device.types.js';
import { BindingDeviceQuery, Device, DeviceResponse } from '../types/binding-device.types.js';

import {
  UpdatedWebAuthnDevice,
  WebAuthnBody,
  WebAuthnDevice,
  WebAuthnDevicesResponse,
  WebAuthnQuery,
  WebAuthnQueryWithUUID,
} from '../types/webauthn.types.js';
import { ProfileDeviceQuery, ProfileDeviceResponse } from '../types/profile-device.types.js';

export const deviceService = ({ baseUrl, realmPath }: { baseUrl: string; realmPath: string }) =>
  createApi({
    reducerPath: 'deviceClient',
    baseQuery: fetchBaseQuery({
      credentials: 'include',
      prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('x-requested-with', 'forgerock-sdk');
        headers.set('x-requested-platform', 'javascript');
        return headers;
      },
      baseUrl,
    }),
    endpoints: (builder) => ({
      // oath endpoints
      getOAthDevices: builder.query<OAthResponse, RetrieveOathQuery>({
        query: ({ realm = realmPath, userId }) =>
          `json/realms/${realm}/users/${userId}/devices/2fa/oath?_queryFilter=true`,
      }),

      deleteOathDevice: builder.mutation<DeletedOAthDevice, DeleteOathQuery & OathDevice>({
        query: ({ realm = realmPath, userId, uuid, ...body }) => ({
          method: 'DELETE',
          url: `json/realms/${realm}/users/${userId}/devices/2fa/oath/${uuid}`,
          body: { uuid, ...body },
        }),
      }),

      // push device
      getPushDevices: builder.query<PushDevicesResponse, PushDeviceQuery>({
        query: ({ realm = realmPath, userId }) =>
          `/json/realms/${realm}/users/${userId}/devices/2fa/push?_queryFilter=true`,
      }),

      deletePushDevice: builder.mutation<PushDevice, DeleteDeviceQuery>({
        query: ({ realm = realmPath, userId, uuid }) => ({
          url: `/json/realms/${realm}/users/${userId}/devices/2fa/push/${uuid}`,
          method: 'DELETE',
          body: {},
        }),
      }),

      // webauthn devices
      getWebAuthnDevices: builder.query<WebAuthnDevicesResponse, WebAuthnQuery>({
        query: ({ realm = realmPath, userId }) =>
          `/json/realms/${realm}/users/${userId}/devices/2fa/webauthn?_queryFilter=true`,
      }),
      updateWebAuthnDeviceName: builder.mutation<
        UpdatedWebAuthnDevice,
        WebAuthnQueryWithUUID & WebAuthnBody
      >({
        query: ({ realm = realmPath, userId, ...device }) => ({
          url: `/json/realms/${realm}/users/${userId}/devices/2fa/webauthn/${device.uuid}`,
          method: 'PUT',
          body: device satisfies WebAuthnBody,
        }),
      }),
      deleteWebAuthnDeviceName: builder.mutation<
        WebAuthnDevice,
        WebAuthnQueryWithUUID & WebAuthnBody
      >({
        query: ({ realm = realmPath, userId, ...device }) => ({
          url: `/json/realms/${realm}/users/${userId}/devices/2fa/webauthn/${device.uuid}`,
          method: 'DELETE',
          body: device satisfies WebAuthnBody,
        }),
      }),
      getBoundDevices: builder.mutation<DeviceResponse, BindingDeviceQuery>({
        query: ({ realm = realmPath, userId }) =>
          `/json/realms/${realm}/users/${userId}/devices/2fa/binding?_queryFilter=true`,
      }),
      updateBindingDeviceName: builder.mutation<Device, BindingDeviceQuery>({
        query: ({ realm = realmPath, userId, ...device }) => ({
          url: `/json/realms/root/realms/${realm}/users/${userId}/devices/2fa/binding/${device.uuid}`,
          method: 'PUT',
          body: device satisfies Device,
        }),
      }),
      deleteBindingDevice: builder.mutation<Device, BindingDeviceQuery>({
        query: ({ realm = realmPath, userId, ...device }) => ({
          url: `/json/realms/root/realms/${realm}/users/${userId}/devices/2fa/binding/${device.uuid}`,
          method: 'DELETE',
          body: device satisfies Device,
        }),
      }),
      getDeviceProfile: builder.query<ProfileDeviceResponse, ProfileDeviceQuery>({
        query: ({ realm = realmPath, userId }) =>
          `json/realms/${realm}/users/${userId}/devices/profile?queryFilter=true`,
      }),
      updateDeviceProfile: builder.mutation<
        ProfileDeviceResponse,
        Omit<ProfileDeviceQuery, 'uuid'>
      >({
        query: ({ realm = realmPath, userId, device }) => ({
          url: `json/realms/${realm}/users/${userId}/devices/profile?queryFilter=true`,
          method: 'PUT',
          body: device,
        }),
      }),
      deleteDeviceProfile: builder.mutation<ProfileDeviceResponse, ProfileDeviceQuery>({
        query: ({ realm = realmPath, userId, uuid, device }) => ({
          url: `json/realms/${realm}/users/${userId}/devices/profile/${uuid}`,
          method: 'DELETE',
          body: device,
        }),
      }),
    }),
  });
