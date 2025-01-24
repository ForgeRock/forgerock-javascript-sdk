export interface GetProfileDevices {
  realm: string;
  userId: string;
}

export interface ProfileDevicesQuery extends GetProfileDevices {
  device: ProfileDevice;
}

export type ProfileDevice = {
  _id: string;
  _rev: string;
  identifier: string;
  metadata: {
    platform: {
      platform: string;
      version: number;
      device: string;
      deviceName: string;
      model: string;
      brand: string;
      locale: string;
      timeZone: string;
      jailBreakScore: number;
    };
    hardware: {
      hardware: string;
      manufacturer: string;
      storage: number;
      memory: number;
      cpu: number;
      display: {
        width: number;
        height: number;
        orientation: number;
      };
      camera: {
        numberOfCameras: number;
      };
    };
    browser: {
      userAgent: string;
    };
    bluetooth: {
      supported: boolean;
    };
    network: {
      connected: boolean;
    };
    telephony: {
      networkCountryIso: string;
      carrierName: string;
    };
  };
  lastSelectedDate: number;
  alias: string;
  recoveryCodes: string[];
};
