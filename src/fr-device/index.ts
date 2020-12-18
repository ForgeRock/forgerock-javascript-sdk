/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import {
  browserProps,
  configurableCategories,
  delay,
  devicePlatforms,
  displayProps,
  fontNames,
  hardwareProps,
  platformProps,
} from './defaults';
import {
  BaseProfileConfig,
  Category,
  CollectParameters,
  DeviceProfileData,
  Geolocation,
  ProfileConfigOptions,
} from './interfaces';
import Collector from './collector';

/**
 * @class FRDevice - Collects user device metadata
 *
 * Example:
 *
 * ```js
 * // Instantiate new device object (w/optional config, if needed)
 * const device = new forgerock.FRDevice(
 *   // optional configuration
 * );
 * // override any instance methods, if needed
 * // e.g.: device.getDisplayMeta = () => {};
 *
 * // Call getProfile with required argument obj of boolean properties
 * // of location and metadata
 * const profile = await device.getProfile({
 *   location: isLocationRequired,
 *   metadata: isMetadataRequired,
 * });
 * ```
 */
class FRDevice extends Collector {
  config: BaseProfileConfig = {
    fontNames,
    devicePlatforms,
    displayProps,
    browserProps,
    hardwareProps,
    platformProps,
  };

  constructor(config?: ProfileConfigOptions) {
    super();
    if (config) {
      Object.keys(config).forEach((key: string) => {
        if (!configurableCategories.includes(key)) {
          throw new Error('Device profile configuration category does not exist.');
        }
        this.config[key as Category] = config[key as Category];
      });
    }
  }

  getBrowserMeta(): { [key: string]: string } {
    if (!navigator) {
      console.warn('Cannot collect browser metadata. navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.browserProps, navigator);
  }

  getBrowserPluginsNames(): string {
    if (!(navigator && navigator.plugins)) {
      console.warn('Cannot collect browser plugin information. navigator.plugins is not defined.');
      return '';
    }
    return this.reduceToString(Object.keys(navigator.plugins), navigator.plugins);
  }

  getDeviceName(): string {
    if (!navigator) {
      console.warn('Cannot collect device name. navigator is not defined.');
      return '';
    }
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    switch (true) {
      case this.config.devicePlatforms.mac.includes(platform):
        return 'Mac (Browser)';
      case this.config.devicePlatforms.ios.includes(platform):
        return `${platform} (Browser)`;
      case this.config.devicePlatforms.windows.includes(platform):
        return 'Windows (Browser)';
      case /Android/.test(platform) || /Android/.test(userAgent):
        return 'Android (Browser)';
      case /CrOS/.test(userAgent) || /Chromebook/.test(userAgent):
        return 'Chrome OS (Browser)';
      case /Linux/.test(platform):
        return 'Linux (Browser)';
      default:
        return `${platform || 'Unknown'} (Browser)`;
    }
  }

  getDisplayMeta(): { [key: string]: string | number | null } {
    if (!screen) {
      console.warn('Cannot collect screen information. screen is not defined.');
    }
    return this.reduceToObject(this.config.displayProps, screen);
  }

  getHardwareMeta(): { [key: string]: string } {
    if (!navigator) {
      console.warn('Cannot collect OS metadata. Navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.hardwareProps, navigator);
  }

  getIdentifier(): string {
    if (!(window.crypto && window.crypto.getRandomValues)) {
      console.warn('Cannot generate profile ID. Crypto and/or getRandomValues is not supported.');
      return '';
    }
    if (!localStorage) {
      console.warn('Cannot store profile ID. localStorage is not supported.');
      return '';
    }
    let id = localStorage.getItem('profile-id');
    if (!id) {
      // generate ID, 3 sections of random numbers: "714524572-2799534390-3707617532"
      id = window.crypto.getRandomValues(new Uint32Array(3)).join('-');
      localStorage.setItem('profile-id', id);
    }
    return id;
  }

  getInstalledFonts(): string {
    const canvas = document.createElement('canvas');
    if (!canvas) {
      console.warn('Cannot collect font data. Browser does not support canvas element');
      return '';
    }
    const context = canvas.getContext && canvas.getContext('2d');

    if (!context) {
      console.warn('Cannot collect font data. Browser does not support 2d canvas context');
      return '';
    }
    const text = 'abcdefghi0123456789';
    context.font = '72px Comic Sans';
    const baseWidth = context.measureText(text).width;

    const installedFonts = this.config.fontNames.reduce((prev, curr) => {
      context.font = `72px ${curr}, Comic Sans`;
      const newWidth = context.measureText(text).width;

      if (newWidth !== baseWidth) {
        prev = `${prev}${curr};`;
      }
      return prev;
    }, '');

    return installedFonts;
  }

  async getLocationCoordinates(): Promise<Geolocation | Record<string, unknown>> {
    if (!(navigator && navigator.geolocation)) {
      console.warn('Cannot collect geolocation information. navigator.geolocation is not defined.');
      return Promise.resolve({});
    }
    return new Promise(async (resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => {
          console.warn(
            'Cannot collect geolocation information. ' + error.code + ': ' + error.message,
          );
          resolve({});
        },
        {
          enableHighAccuracy: true,
          timeout: delay,
          maximumAge: 0,
        },
      );
    });
  }

  getOSMeta(): { [key: string]: string } {
    if (!navigator) {
      console.warn('Cannot collect OS metadata. navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.platformProps, navigator);
  }

  async getProfile({ location, metadata }: CollectParameters): Promise<DeviceProfileData> {
    const profile: DeviceProfileData = {
      identifier: this.getIdentifier(),
    };

    if (metadata) {
      profile.metadata = {
        hardware: {
          ...this.getHardwareMeta(),
          display: this.getDisplayMeta(),
        },
        browser: {
          ...this.getBrowserMeta(),
          plugins: this.getBrowserPluginsNames(),
        },
        platform: {
          ...this.getOSMeta(),
          deviceName: this.getDeviceName(),
          fonts: this.getInstalledFonts(),
          timezone: this.getTimezoneOffset(),
        },
      };
    }
    if (location) {
      profile.location = await this.getLocationCoordinates();
    }
    return profile;
  }

  getTimezoneOffset(): number | null {
    try {
      return new Date().getTimezoneOffset();
    } catch (err) {
      console.warn('Cannot collect timezone information. getTimezoneOffset is not defined.');
      return null;
    }
  }
}

export default FRDevice;
