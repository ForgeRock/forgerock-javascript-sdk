/*
 * @forgerock/javascript-sdk
 *
 * index.mock.data.ts
 *
 * Copyright (c) 2024 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../auth/enums';

export const otpQRCodeStep = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
  callbacks: [
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            'Scan the QR code image below with the ForgeRock Authenticator app to register your ' +
            'device with your login.',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            `window.QRCodeReader.createCode({\n    id: 'callback_0',\n    text: 'otpauth\\x3A\\x` +
            `2F\\x2Ftotp\\x2FForgeRock\\x3Ajlowery\\x3Fperiod\\x3D30\\x26b\\x3D032b75\\x26` +
            `digits\\x3D6\\x26secret\\QITSTC234FRIU8DD987DW3VPICFY\\x3D\\x3D\\x3D\\x3D\\x3` +
            `D\\x',\n  3D\\x26issuer\\x3DForgeRock  version: '20',\n    code: 'L'\n});`,
        },
        {
          name: 'messageType',
          value: '4',
        },
      ],
    },
    {
      type: CallbackType.HiddenValueCallback,
      output: [
        {
          name: 'value',
          value:
            'otpauth://totp/ForgeRock:jlowery?secret=QITSTC234FRIU8DD987DW3VPICFY======&issue' +
            'r=ForgeRock&period=30&digits=6&b=032b75',
        },
        {
          name: 'id',
          value: 'mfaDeviceRegistration',
        },
      ],
      input: [
        {
          name: 'IDToken3',
          value: 'mfaDeviceRegistration',
        },
      ],
    },
    {
      type: CallbackType.ConfirmationCallback,
      output: [
        {
          name: 'prompt',
          value: '',
        },
        {
          name: 'messageType',
          value: 0,
        },
        {
          name: 'options',
          value: ['Next'],
        },
        {
          name: 'optionType',
          value: -1,
        },
        {
          name: 'defaultOption',
          value: 0,
        },
      ],
      input: [
        {
          name: 'IDToken4',
          value: 0,
        },
      ],
    },
  ],
};

export const pushQRCodeStep = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
  callbacks: [
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            'Scan the QR code image below with the ForgeRock Authenticator app to register ' +
            'your device with your login.',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            `window.QRCodeReader.createCode({\n    id: 'callback_0',\n    text: 'pushauth\\x` +
            `3A\\x2F\\x2Fpush\\x2Fforgerock\\x3AJustin\\x2520Lowery\\x3Fa\\x3DaHR0cHM6Ly9vc` +
            `GVuYW0tZm9yZ2Vycm9jay1zZGtzLmZvcmdlYmxvY2tzLmNvbTo0NDMvYW0vanNvbi9hbHBoYS9wdXN` +
            `oL3Nucy9tZXNzYWdlP19hY3Rpb249YXV0aGVudGljYXRl\\x26r\\x3DaHR0cHM6Ly9vcGVuYW0tZm` +
            `9yZ2Vycm9jay1zZGtzLmZvcmdlYmxvY2tzLmNvbTo0NDMvYW0vanNvbi9hbHBoYS9wdXNoL3Nucy9t` +
            `ZXNzYWdlP19hY3Rpb249cmVnaXN0ZXI\\x26b\\x3D032b75\\x26s\\x3DFoxEr5uAzrys1yBmuyg` +
            `PbxrVjysElmzsmqifi6eO_AI\\x26c\\x3DXD\\x2DMxsK2sRGa7sUw7kinSKoUDf_eNYMZUV2f0z5` +
            `kjgw\\x26l\\x3DYW1sYmNvb2tpZT0wMQ\\x26m\\x3DREGISTER\\x3A53b85112\\x2D8ba9\\x2` +
            `D4b7e\\x2D9107\\x2Decbca2d65f7b1695151603616\\x26issuer\\x3DRm9yZ2VSb2Nr',\n  ` +
            `  version: '20',\n    code: 'L'\n});`,
        },
        {
          name: 'messageType',
          value: '4',
        },
      ],
    },
    {
      type: CallbackType.HiddenValueCallback,
      output: [
        {
          name: 'value',
          value:
            'pushauth://push/forgerock:Justin%20Lowery?l=YW1sYmNvb2tpZT0wMQ&issuer=Rm9yZ2VSb' +
            '2Nr&m=REGISTER:53b85112-8ba9-4b7e-9107-ecbca2d65f7b1695151603616&s=FoxEr5uAzrys' +
            '1yBmuygPbxrVjysElmzsmqifi6eO_AI&c=XD-MxsK2sRGa7sUw7kinSKoUDf_eNYMZUV2f0z5kjgw&r' +
            '=aHR0cHM6Ly9vcGVuYW0tZm9yZ2Vycm9jay1zZGtzLmZvcmdlYmxvY2tzLmNvbTo0NDMvYW0vanNvbi' +
            '9hbHBoYS9wdXNoL3Nucy9tZXNzYWdlP19hY3Rpb249cmVnaXN0ZXI&a=aHR0cHM6Ly9vcGVuYW0tZm9' +
            'yZ2Vycm9jay1zZGtzLmZvcmdlYmxvY2tzLmNvbTo0NDMvYW0vanNvbi9hbHBoYS9wdXNoL3Nucy9tZ' +
            'XNzYWdlP19hY3Rpb249YXV0aGVudGljYXRl&b=032b75',
        },
        {
          name: 'id',
          value: 'mfaDeviceRegistration',
        },
      ],
      input: [
        {
          name: 'IDToken3',
          value: 'mfaDeviceRegistration',
        },
      ],
    },
    {
      type: CallbackType.PollingWaitCallback,
      output: [
        {
          name: 'waitTime',
          value: '5000',
        },
        {
          name: 'message',
          value: 'Waiting for response...',
        },
      ],
    },
  ],
};
