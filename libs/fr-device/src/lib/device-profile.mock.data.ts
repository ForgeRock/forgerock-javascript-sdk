/*
 * @forgerock/javascript-sdk
 *
 * device-profile.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const expectedJsdom = {
  identifier: '',
  metadata: {
    hardware: {
      display: {
        width: 0,
        height: 0,
        pixelDepth: 24,
        angle: '',
      },
      cpuClass: null,
      deviceMemory: null,
      hardwareConcurrency: 16,
      maxTouchPoints: null,
      oscpu: null,
    },
    browser: {
      appName: 'Netscape',
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.2.2',
      appCodeName: 'Mozilla',
      appVersion: '4.0',
      appMinorVersion: null,
      buildID: null,
      product: 'Gecko',
      productSub: '20030107',
      vendor: 'Apple Computer, Inc.',
      vendorSub: '',
      browserLanguage: null,
      plugins: '',
    },
    platform: {
      deviceName: 'Unknown (Browser)',
      fonts: '',
      language: 'en-US',
      platform: '',
      userLanguage: null,
      systemLanguage: null,
      timezone: 300,
    },
  },
};

const expectedJsdomWithoutDisplay = {
  identifier: '',
  metadata: {
    hardware: {
      display: {},
      cpuClass: null,
      deviceMemory: null,
      hardwareConcurrency: 16,
      maxTouchPoints: null,
      oscpu: null,
    },
    browser: {
      appName: 'Netscape',
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.2.2',
      appCodeName: 'Mozilla',
      appVersion: '4.0',
      appMinorVersion: null,
      buildID: null,
      product: 'Gecko',
      productSub: '20030107',
      vendor: 'Apple Computer, Inc.',
      vendorSub: '',
      browserLanguage: null,
      plugins: '',
    },
    platform: {
      deviceName: 'Unknown (Browser)',
      fonts: '',
      language: 'en-US',
      platform: '',
      userLanguage: null,
      systemLanguage: null,
      timezone: 300,
    },
  },
};

const expectedJsdomWithNarrowedBrowserProps = {
  identifier: '',
  metadata: {
    hardware: {
      display: {
        width: 0,
        height: 0,
        pixelDepth: 24,
        angle: '',
      },
      cpuClass: null,
      deviceMemory: null,
      hardwareConcurrency: 16,
      maxTouchPoints: null,
      oscpu: null,
    },
    browser: {
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.2.2',
      plugins: '',
    },
    platform: {
      deviceName: 'Unknown (Browser)',
      fonts: '',
      language: 'en-US',
      platform: '',
      userLanguage: null,
      systemLanguage: null,
      timezone: 300,
    },
  },
};

export { expectedJsdom, expectedJsdomWithoutDisplay, expectedJsdomWithNarrowedBrowserProps };
