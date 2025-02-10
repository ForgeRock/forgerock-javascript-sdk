import { afterEach, afterAll, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { deviceClient } from './device.store';

import {
  MOCK_PUSH_DEVICES,
  MOCK_BINDING_DEVICES,
  MOCK_OATH_DEVICES,
  MOCK_DELETED_OATH_DEVICE,
  MOCK_WEBAUTHN_DEVICES,
  MOCK_DEVICE_PROFILE_SUCCESS,
} from './mock-data/msw-mock-data';

// Create handlers
export const handlers = [
  // OATH Devices
  http.get('*/json/realms/:realm/users/:userId/devices/2fa/oath', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json(MOCK_OATH_DEVICES);
  }),

  http.delete('*/json/realms/:realm/users/:userId/devices/2fa/oath/:uuid', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json(MOCK_DELETED_OATH_DEVICE);
  }),

  // Push Devices
  http.get('*/json/realms/:realm/users/:userId/devices/2fa/push', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({ result: MOCK_PUSH_DEVICES });
  }),

  http.delete('*/json/realms/:realm/users/:userId/devices/2fa/push/:uuid', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    if (params['uuid'] === 'bad-uuid') {
      return HttpResponse.json({ error: 'bad uuid' }, { status: 401 });
    }
    return HttpResponse.json(MOCK_PUSH_DEVICES[0]);
  }),

  // WebAuthn Devices
  http.get('*/json/realms/:realm/users/:userId/devices/2fa/webauthn', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({ result: MOCK_WEBAUTHN_DEVICES });
  }),

  http.put('*/json/realms/:realm/users/:userId/devices/2fa/webauthn/:uuid', ({ params }) => {
    if (params['userId'] === 'bad-uuid') {
      return HttpResponse.json({ error: 'bad uuid' }, { status: 401 });
    }
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({
      ...MOCK_WEBAUTHN_DEVICES.result[0],
      deviceName: 'Updated WebAuthn Device',
    });
  }),

  http.delete('*/json/realms/:realm/users/:userId/devices/2fa/webauthn/:uuid', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    if (params['uuid'] === 'bad-uuid') {
      return HttpResponse.json({ error: 'bad-uuid' }, { status: 401 });
    }
    return HttpResponse.json(MOCK_WEBAUTHN_DEVICES.result[0]);
  }),

  // Binding Devices
  http.get('*/json/realms/:realm/users/:userId/devices/2fa/binding', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({ result: MOCK_BINDING_DEVICES });
  }),

  http.put(
    '*/json/realms/root/realms/:realm/users/:userId/devices/2fa/binding/:uuid',
    ({ params }) => {
      if (params['realm'] === 'fake-realm') {
        return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
      }
      if (params['userId'] === 'bad-user') {
        return HttpResponse.json({ error: 'bad user' }, { status: 401 });
      }
      if (params['userId'] === 'bad-uuid') {
        return HttpResponse.json({ error: 'bad user' }, { status: 401 });
      }
      return HttpResponse.json({
        ...MOCK_BINDING_DEVICES.result[0],
        deviceName: 'Updated Binding Device',
      });
    },
  ),

  http.delete(
    '*/json/realms/root/realms/:realm/users/:userId/devices/2fa/binding/:uuid',
    ({ params }) => {
      if (params['realm'] === 'fake-realm') {
        return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
      }
      if (params['userId'] === 'bad-user') {
        return HttpResponse.json({ error: 'bad user' }, { status: 401 });
      }
      if (params['userId'] === 'bad-uuid') {
        return HttpResponse.json({ error: 'bad uuid' }, { status: 401 });
      }
      return HttpResponse.json({ result: MOCK_BINDING_DEVICES.result[0] });
    },
  ),

  // profile devices
  http.get('*/json/realms/:realm/users/:userId/devices/profile', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({ result: MOCK_DEVICE_PROFILE_SUCCESS });
  }),
  http.put('*/json/realms/:realm/users/:userId/devices/profile/:uuid', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    return HttpResponse.json({
      ...MOCK_DEVICE_PROFILE_SUCCESS.result[0],
      alias: 'new-name',
    });
  }),
  http.delete('*/json/realms/:realm/users/:userId/devices/profile/:uuid', ({ params }) => {
    if (params['realm'] === 'fake-realm') {
      return HttpResponse.json({ error: 'bad realm' }, { status: 401 });
    }
    if (params['userId'] === 'bad-user') {
      return HttpResponse.json({ error: 'bad user' }, { status: 401 });
    }
    if (params['userId'] === 'bad-uuid') {
      return HttpResponse.json({ error: 'bad uuid' }, { status: 401 });
    }
    return HttpResponse.json(MOCK_DEVICE_PROFILE_SUCCESS.result[0]);
  }),
];

export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('Device Client Store', () => {
  const config = {
    serverConfig: {
      baseUrl: 'https://api.example.com',
    },
    realmPath: 'test-realm',
  };

  describe('OATH Device Management', () => {
    const client = deviceClient(config);

    it('should fetch OATH devices', async () => {
      const result = await client.oath.get({
        userId: 'test-user',
      });

      expect(result).toEqual(MOCK_OATH_DEVICES.result);
    });

    it('should delete OATH device', async () => {
      const result = await client.oath.delete({
        userId: 'test-user',
        device: {
          deviceManagementStatus: false,
          _rev: '1221312',
          uuid: 'oath-uuid-1',
          deviceName: 'Test OATH Device',
          _id: 'test-id',
          createdDate: 1705555555555,
          lastAccessDate: 1705555555555,
        },
      });

      expect(result).toEqual(MOCK_DELETED_OATH_DEVICE);
    });
    it('should return error obj if a user does not exist', async () => {
      const badClient = deviceClient(config);
      const result = await badClient.oath.get({
        userId: 'bad-user',
      });
      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });
    it('should return undefined if a realm does not exist', async () => {
      const badConfig = { ...config, realmPath: 'fake-realm' };
      const badClient = deviceClient(badConfig);
      const result = await badClient.oath.get({
        userId: 'test-user',
      });
      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });
  });

  describe('Push Device Management', () => {
    const client = deviceClient(config);

    it('should fetch push devices', async () => {
      const result = await client.push.get({
        userId: 'test-user',
      });

      expect(result).toEqual(MOCK_PUSH_DEVICES);
    });

    it('should delete push device', async () => {
      const result = await client.push.delete({
        userId: 'test-user',
        device: MOCK_PUSH_DEVICES[0],
      });
      expect(result).toEqual(MOCK_PUSH_DEVICES[0]);
    });
    it('should fail with a bad uuid', async () => {
      const client = deviceClient(config);
      const result1 = await client.push.delete({
        userId: 'test-user',
        device: { ...MOCK_PUSH_DEVICES[0], uuid: 'bad-uuid' },
      });

      expect(result1).toStrictEqual({ error: new Error('response did not contain data') });
    });
    it('should fail with a bad userId', async () => {
      const badConfig = { ...config, realmPath: 'bad-realm' };
      const badClient = deviceClient(badConfig);
      const result1 = await badClient.push.delete({
        userId: 'bad-user',
        device: MOCK_PUSH_DEVICES[0],
      });
      const result2 = await badClient.push.get({ userId: 'bad-user' });

      expect(result1).toStrictEqual({ error: new Error('response did not contain data') });
      expect(result2).toStrictEqual({ error: new Error('response did not contain data') });
    });
    it('should return error if a uuid does not exist', async () => {
      const badClient = deviceClient(config);
      const result = await badClient.push.delete({
        userId: 'user',
        device: { ...MOCK_PUSH_DEVICES[0], uuid: 'bad-uuid' },
      });
      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });
    it('should return undefined if a user does not exist', async () => {
      const badClient = deviceClient(config);
      const result = await badClient.push.get({
        userId: 'bad-user',
      });
      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });
    it('should return undefined if a realm does not exist', async () => {
      const badConfig = { ...config, realmPath: 'fake-realm' };
      const badClient = deviceClient(badConfig);
      const result = await badClient.push.get({
        userId: 'test-user',
      });
      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });
  });
  //
  describe('WebAuthn Device Management', () => {
    const client = deviceClient(config);

    it('should fetch webauthn devices', async () => {
      const result = await client.webAuthn.get({
        userId: 'test-user',
      });

      expect(result).toEqual(MOCK_WEBAUTHN_DEVICES);
    });

    it('should update webauthn device name', async () => {
      const mockDevice = MOCK_WEBAUTHN_DEVICES.result[0];
      const result = await client.webAuthn.update({
        userId: 'test-user',
        device: {
          _id: mockDevice._id,
          _rev: mockDevice._rev,
          uuid: mockDevice.uuid,
          deviceName: 'Updated WebAuthn Device',
          credentialId: mockDevice.credentialId,
          createdDate: mockDevice.createdDate,
          lastAccessDate: mockDevice.lastAccessDate,
          deviceManagementStatus: mockDevice.deviceManagementStatus,
        },
      });

      expect(result).toEqual({
        ...mockDevice,
        deviceName: 'Updated WebAuthn Device',
      });
    });
    it('should error when deleting webauthn device with invalid uuid', async () => {
      const mockDevice = MOCK_WEBAUTHN_DEVICES.result[0];
      const result = await client.webAuthn.delete({
        userId: 'test-user',
        device: {
          ...mockDevice,
          uuid: 'bad-uuid',
        },
      });

      expect(result).toStrictEqual({ error: new Error('response did not contain data') });
    });

    it('should delete webauthn device', async () => {
      const mockDevice = MOCK_WEBAUTHN_DEVICES.result[0];
      const result = await client.webAuthn.delete({
        userId: 'test-user',
        device: mockDevice,
      });

      expect(result).toEqual(mockDevice);
    });
  });
  //
  describe('Bound Device Management', () => {
    const client = deviceClient(config);
    const mockDevice = MOCK_BINDING_DEVICES.result[0];

    it('should fetch bound devices', async () => {
      const result = await client.bound.get({
        userId: 'test-user',
        ...mockDevice,
      });

      expect(result).toEqual(MOCK_BINDING_DEVICES);
    });

    it('should update bound device name', async () => {
      const result = await client.bound.update({
        userId: 'test-user',
        device: mockDevice,
      });

      expect(result).toEqual({
        ...mockDevice,
        deviceName: 'Updated Binding Device',
      });
    });

    it('should delete bound device', async () => {
      const result = await client.bound.delete({
        userId: 'test-user',
        device: mockDevice,
      });

      expect(result).toEqual(mockDevice);
    });
  });
  describe('Profile Device', () => {
    const client = deviceClient(config);

    it('should fetch device profiles', async () => {
      const result = await client.profile.get({ userId: 'test-user', realm: 'test-realm' });

      expect(result).toEqual(MOCK_DEVICE_PROFILE_SUCCESS);
    });
    it('should update device profiles', async () => {
      const result = await client.profile.update({
        userId: 'test-user',
        realm: 'test-realm',
        device: MOCK_DEVICE_PROFILE_SUCCESS.result[0],
      });

      expect(result).toEqual({ ...MOCK_DEVICE_PROFILE_SUCCESS.result[0], alias: 'new-name' });
    });
    it('should delete device profiles', async () => {
      const result = await client.profile.delete({
        userId: 'hello',
        realm: 'alpha',
        device: MOCK_DEVICE_PROFILE_SUCCESS.result[0],
      });

      expect(result).toEqual({ ...MOCK_DEVICE_PROFILE_SUCCESS.result[0] });
    });
  });
});
