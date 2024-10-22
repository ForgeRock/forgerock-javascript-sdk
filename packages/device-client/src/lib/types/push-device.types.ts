export type PushDeviceQuery = {
  realm?: string;
  userId: string;
};

export type PushDeviceBody = {
  id: string;
  deviceName: string;
  uuid: string;
  createdDate: string;
  lastAccessDate: string;
};

export type DeleteDeviceQuery = {
  realm?: string;
  userId: string;
  uuid: string;
};

export type DeviceInfoResponse = {
  result: DeviceInfo[];
  resultCount: number;
  pagedResultsCookie: null;
  totalPagedResultsPolicy: string;
  totalPagedResults: -1;
  remainingPagedResults: -1;
};

export type DeviceInfo = {
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

export type PushDevicesResponse = PushDevice[];

export type PushDevice = {
  _id: string;
  _rev: string;
  createdDate: number;
  lastAccessDate: number;
  deviceName: string;
  uuid: string;
  deviceManagementStatus: boolean;
};
