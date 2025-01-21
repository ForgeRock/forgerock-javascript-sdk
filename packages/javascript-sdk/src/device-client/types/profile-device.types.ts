export interface ProfileDeviceResponse {
  result: [
    {
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
    },
  ];
  resultCount: number;
  pagedResultsCookie: string | null;
  totalPagedResultsPolicy: string;
  totalPagedResults: number;
  remainingPagedResults: number;
}

export interface ProfileDeviceQuery {
  realm: string;
  userId: string;
  uuid?: string;
  device: ProfileDevice;
}
export interface ProfileDevice {
  deviceId: string;
  deviceName: string; //alias
  metadata: string;
  lastSelectedDate: number;
}
