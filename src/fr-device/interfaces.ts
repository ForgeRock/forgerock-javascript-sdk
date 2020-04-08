type Category = 'fontNames' | 'displayProps' | 'browserProps' | 'hardwareProps' | 'platformProps';

interface CollectParameters {
  location: boolean;
  metadata: boolean;
}

interface DeviceProfileData {
  identifier: string;
  metadata?: {
    hardware: {
      display: {
        [key: string]: string | number | null;
      };
      [key: string]: any;
    };
    browser: {
      [key: string]: string | number | null;
    };
    platform: {
      [key: string]: string | number | null;
    };
  };
  location?: Geolocation | {};
}

interface Geolocation {
  latitude: number;
  longitude: number;
}

interface BaseProfileConfig {
  fontNames: string[];
  devicePlatforms: {
    mac: string[];
    windows: string[];
    ios: string[];
  };
  displayProps: string[];
  browserProps: string[];
  hardwareProps: string[];
  platformProps: string[];
}

interface ProfileConfigOptions {
  [key: string]: string[];
}

export {
  BaseProfileConfig,
  Category,
  CollectParameters,
  DeviceProfileData,
  Geolocation,
  ProfileConfigOptions,
};
