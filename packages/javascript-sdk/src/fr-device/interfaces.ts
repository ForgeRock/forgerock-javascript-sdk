/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
    browser: {
      [key: string]: string | number | null;
    };
    platform: {
      [key: string]: string | number | null;
    };
  };
  location?: Geolocation | Record<string, unknown>;
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
