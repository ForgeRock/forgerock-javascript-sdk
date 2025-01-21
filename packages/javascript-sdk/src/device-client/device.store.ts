import { type ConfigOptions } from '../config/interfaces';

import { configureStore } from '@reduxjs/toolkit';
import { deviceService } from './services/index.js';
import { DeleteOathQuery, OathDevice, RetrieveOathQuery } from './types/oath.types.js';
import { DeleteDeviceQuery, PushDeviceQuery } from './types/push-device.types.js';
import { WebAuthnBody, WebAuthnQuery, WebAuthnQueryWithUUID } from './types/webauthn.types.js';
import { BindingDeviceQuery } from './types/binding-device.types.js';
import { ProfileDeviceQuery } from './types/profile-device.types.js';

export const deviceClient = (config: ConfigOptions) => {
  const { middleware, reducerPath, reducer, endpoints } = deviceService({
    baseUrl: config.serverConfig?.baseUrl ?? '',
    realmPath: config?.realmPath ?? '',
  });

  const store = configureStore({
    reducer: {
      [reducerPath]: reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  });

  /**
   * Device management object containing methods for handling various device types.
   *
   * @type {DeviceManagement}
   */
  return {
    /**
     * Oath device management methods.
     *
     * @type {OathManagement}
     */
    oath: {
      /**
       * Retrieves Oath devices based on the specified query.
       *
       * @async
       * @function get
       * @param {RetrieveOathQuery} query - The query used to retrieve Oath devices.
       * @returns {Promise<OAthResponse>} - A promise that resolves to the retrieved data or undefined if the response is not valid.
       */
      get: async function (query: RetrieveOathQuery) {
        const response = await store.dispatch(endpoints.getOAthDevices.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Deletes an Oath device based on the provided query and device information.
       *
       * @async
       * @function delete
       * @param {DeleteOathQuery & OathDevice} query - The query and device information used to delete the Oath device.
       * @returns {Promise<DeletedOAthDevice>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      delete: async function (query: DeleteOathQuery & OathDevice) {
        const response = await store.dispatch(endpoints.deleteOathDevice.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
    },

    /**
     * Push device management methods.
     *
     * @type {PushManagement}
     */
    push: {
      /**
       * Retrieves Push devices based on the specified query.
       *
       * @async
       * @function get
       * @param {PushDeviceQuery} query - The query used to retrieve Push devices.
       * @returns {Promise<PushDevicesResponse | undefined>} - A promise that resolves to the retrieved data or undefined if the response is not valid.
       */
      get: async function (query: PushDeviceQuery) {
        const response = await store.dispatch(endpoints.getPushDevices.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Deletes a Push device based on the provided query.
       *
       * @async
       * @function delete
       * @param {DeleteDeviceQuery} query - The query used to delete the Push device.
       * @returns {Promise<PushDevice>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      delete: async function (query: DeleteDeviceQuery) {
        const response = await store.dispatch(endpoints.deletePushDevice.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
    },

    /**
     * WebAuthn device management methods.
     *
     * @type {WebAuthnManagement}
     */
    webAuthn: {
      /**
       * Retrieves WebAuthn devices based on the specified query.
       *
       * @async
       * @function get
       * @param {WebAuthnQuery} query - The query used to retrieve WebAuthn devices.
       * @returns {Promise<WebAuthnDevicesResponse>} - A promise that resolves to the retrieved data or undefined if the response is not valid.
       */
      get: async function (query: WebAuthnQuery) {
        const response = await store.dispatch(endpoints.getWebAuthnDevices.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Updates the name of a WebAuthn device based on the provided query and body.
       *
       * @async
       * @function update
       * @param {WebAuthnQueryWithUUID & WebAuthnBody} query - The query and body used to update the WebAuthn device name.
       * @returns {Promise<UpdatedWebAuthnDevice | undefined>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      update: async function (query: WebAuthnQueryWithUUID & WebAuthnBody) {
        const response = await store.dispatch(endpoints.updateWebAuthnDeviceName.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Deletes a WebAuthn device based on the provided query and body.
       *
       * @async
       * @function delete
       * @param {WebAuthnQueryWithUUID & WebAuthnBody} query - The query and body used to delete the WebAuthn device.
       * @returns {Promise<WebAuthnDevice | undefined>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      delete: async function (query: WebAuthnQueryWithUUID & WebAuthnBody) {
        const response = await store.dispatch(endpoints.deleteWebAuthnDeviceName.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
    },

    /**
     * Bound devices management methods.
     *
     * @type {BoundDevicesManagement}
     */
    bound: {
      /**
       * Retrieves bound devices based on the specified query.
       *
       * @async
       * @function get
       * @param {BindingDeviceQuery} query - The query used to retrieve bound devices.
       * @returns {Promise<DeviceResponse | undefined>} - A promise that resolves to the retrieved data or undefined if the response is not valid.
       */
      get: async function (query: BindingDeviceQuery) {
        const response = await store.dispatch(endpoints.getBoundDevices.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Deletes a bound device based on the provided query.
       *
       * @async
       * @function delete
       * @param {BindingDeviceQuery} query - The query used to delete the bound device.
       * @returns {Promise<Device | undefined>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      delete: async function (query: BindingDeviceQuery) {
        const response = await store.dispatch(endpoints.deleteBindingDevice.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },

      /**
       * Updates the name of a bound device based on the provided query.
       *
       * @async
       * @function update
       * @param {BindingDeviceQuery} query - The query used to update the bound device name.
       * @returns {Promise<Device | undefined>} - A promise that resolves to the response data or undefined if the response is not valid.
       */
      update: async function (query: BindingDeviceQuery) {
        const response = await store.dispatch(endpoints.updateBindingDeviceName.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
    },
    profile: {
      get: async function (query: ProfileDeviceQuery) {
        const response = await store.dispatch(endpoints.getDeviceProfile.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
      update: async function (query: ProfileDeviceQuery) {
        const response = await store.dispatch(endpoints.updateDeviceProfile.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
      delete: async function (query: ProfileDeviceQuery) {
        const response = await store.dispatch(endpoints.deleteDeviceProfile.initiate(query));

        if (!response || !response.data) {
          return undefined;
        }

        return response.data;
      },
    },
  };
};
