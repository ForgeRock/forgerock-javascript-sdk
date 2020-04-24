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
      // eslint-disable-next-line
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0',
      appCodeName: 'Mozilla',
      // eslint-disable-next-line
      appVersion: '4.0',
      appMinorVersion: null,
      buildID: null,
      product: 'Gecko',
      productSub: '20030107',
      vendor: 'Apple Computer, Inc.',
      vendorSub: '',
      browserLanguage: null,
      // eslint-disable-next-line
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
      // eslint-disable-next-line
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0',
      appCodeName: 'Mozilla',
      // eslint-disable-next-line
      appVersion: '4.0',
      appMinorVersion: null,
      buildID: null,
      product: 'Gecko',
      productSub: '20030107',
      vendor: 'Apple Computer, Inc.',
      vendorSub: '',
      browserLanguage: null,
      // eslint-disable-next-line
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
      // eslint-disable-next-line
      userAgent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0',
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
