import type {
  OAthResponse,
  DeletedOAthDevice,
  PushDevicesResponse,
  DeviceResponse,
  WebAuthnDevicesResponse,
} from '../types/index.js';
import { ProfileDeviceResponse } from '../types/profile-device.types.js';

// Mock data
export const MOCK_OATH_DEVICES: OAthResponse = [
  {
    _id: 'oath-1',
    _rev: '1-oath',
    createdDate: 1705555555555,
    lastAccessDate: 1705555555555,
    deviceName: 'Test OATH Device',
    uuid: 'oath-uuid-1',
    deviceManagementStatus: true,
  },
];

export const MOCK_DELETED_OATH_DEVICE: DeletedOAthDevice = {
  _id: 'oath-1',
  _rev: '1-oath',
  uuid: 'oath-uuid-1',
  recoveryCodes: ['code1', 'code2'],
  createdDate: 1705555555555,
  lastAccessDate: 1705555555555,
  sharedSecret: 'secret123',
  deviceName: 'Test OATH Device',
  lastLogin: 1705555555555,
  counter: 0,
  checksumDigit: true,
  truncationOffset: 0,
  clockDriftSeconds: 0,
};

export const MOCK_PUSH_DEVICES: PushDevicesResponse = [
  {
    _id: 'push-1',
    _rev: '1-push',
    createdDate: 1705555555555,
    lastAccessDate: 1705555555555,
    deviceName: 'Test Push Device',
    uuid: 'push-uuid-1',
    deviceManagementStatus: true,
  },
];

export const MOCK_WEBAUTHN_DEVICES: WebAuthnDevicesResponse = {
  result: [
    {
      _id: 'webauthn-1',
      _rev: '1-webauthn',
      createdDate: 1705555555555,
      lastAccessDate: 1705555555555,
      credentialId: 'credential-1',
      deviceName: 'Test WebAuthn Device',
      uuid: 'webauthn-uuid-1',
      deviceManagementStatus: true,
    },
  ],
  resultCount: 1,
  pagedResultsCookie: null,
  totalPagedResultsPolicy: 'NONE',
  totalPagedResults: -1,
  remainingPagedResults: -1,
};

export const MOCK_BINDING_DEVICES: DeviceResponse = {
  result: [
    {
      _id: 'binding-1',
      _rev: '1-binding',
      createdDate: 1705555555555,
      lastAccessDate: 1705555555555,
      deviceId: 'device-1',
      deviceName: 'Test Binding Device',
      uuid: 'binding-uuid-1',
      key: {
        kty: 'RSA',
        kid: 'key-1',
        use: 'sig',
        alg: 'RS256',
        n: 'mock-n',
        e: 'mock-e',
      },
      deviceManagementStatus: true,
    },
  ],
  resultCount: 1,
  pagedResultsCookie: null,
  totalPagedResultsPolicy: 'NONE',
  totalPagedResults: -1,
  remainingPagedResults: -1,
};

export const MOCK_DEVICE_PROFILE_SUCCESS: ProfileDeviceResponse = {
  result: [
    {
      _id: 'ce0677ca57da8b38-5bfaa23e9a8ddc7899638da7cccbfe6a8879b6cf',
      _rev: '755317638',
      identifier: 'ce0677ca57da8b38-5bfaa23e9a8ddc7899638da7cccbfe6a8879b6cf',
      metadata: {
        platform: {
          platform: 'Android',
          version: 34,
          device: 'emu64a',
          deviceName: 'sdk_gphone64_arm64',
          model: 'sdk_gphone64_arm64',
          brand: 'google',
          locale: 'en_US',
          timeZone: 'America/Vancouver',
          jailBreakScore: 0,
        },
        hardware: {
          hardware: 'ranchu',
          manufacturer: 'Google',
          storage: 5939,
          memory: 2981,
          cpu: 4,
          display: {
            width: 1440,
            height: 2678,
            orientation: 1,
          },
          camera: {
            numberOfCameras: 2,
          },
        },
        browser: {
          userAgent:
            'Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64 Build/UPB4.230623.005; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0.6613.127 Mobile Safari/537.36',
        },
        bluetooth: {
          supported: true,
        },
        network: {
          connected: true,
        },
        telephony: {
          networkCountryIso: 'us',
          carrierName: 'T-Mobile',
        },
      },
      lastSelectedDate: 1727110785783,
      alias: 'test',
      recoveryCodes: [],
    },
  ],
  resultCount: 1,
  pagedResultsCookie: null,
  totalPagedResultsPolicy: 'NONE',
  totalPagedResults: -1,
  remainingPagedResults: -1,
};
