import './ping-signals-sdk.js';

export interface Identifiers {
  [key: string]: string;
}

/**
 * InitParams - Interface for the init method parameters
 * envId: string - Required; the environment id from your PingOne tenant
 * * - All other parameters are optional
 */
export interface InitParams {
  envId: string; // environment id
  consoleLogEnabled?: boolean; // true to enable SDK logs in the developer console. default is false
  waitForWindowLoad?: boolean; // true to init the SDK on load event, instead of DOMContentLoaded event. default is true
  hubUrl?: string; // iframe url for cross-storage device ID
  disableHub?: boolean; // when true, the SDK store the deviceId to the localStorage only and won't use an iframe (hub). default is false
  deviceAttributesToIgnore?: string[]; // metadata blacklist
  lazyMetadata?: boolean; // true to calculate the metadata only on getData invocation, otherwise do it automatically on init. default is false
  behavioralDataCollection?: boolean; // true to collect behavioral data. default is true
  disableTags?: boolean; // true to skip tag collection. default is false,
  externalIdentifiers?: Identifiers; // optional customer external identifiers that should be reflected on a device entity
  deviceKeyRsyncIntervals?: number; // number of days used to window the next time the device attestation should use the device fallback key. default is 14 days
  enableTrust?: boolean; // tie the device payload to a non-extractable crypto key stored on the browser for content authenticity verification
}

// Add Signals SDK namespace to the window object
declare global {
  interface Window {
    _pingOneSignals: {
      init: (initParams?: InitParams) => Promise<void>;
      getData: () => Promise<string>;
      pauseBehavioralData: () => void;
      resumeBehavioralData: () => void;
    };
  }
}

/**
 * @class PIProtect - Class to interact with the underlying PingOne Signals SDK
 */
export abstract class PIProtect {
  /**
   * @method getData - Method to get the device data
   * @returns {Promise<string>} - Returns the device data
   */
  public static async getData(): Promise<string> {
    return await window._pingOneSignals.getData();
  }

  /**
   * @method start - Method to initialize and start the PingOne Signals SDK
   * @param {InitParams} options - The init parameters
   * @returns {Promise<void>} - Returns a promise
   */
  public static async start(options: InitParams): Promise<void> {
    await window._pingOneSignals.init(options);

    if (options.behavioralDataCollection === true) {
      window._pingOneSignals.resumeBehavioralData();
    }
  }

  /**
   * @method pauseBehavioralData - Method to pause the behavioral data collection
   * @returns {void}
   * @description Pause the behavioral data collection only; device profile data will still be collected
   */
  public static pauseBehavioralData(): void {
    window._pingOneSignals.pauseBehavioralData();
  }

  /**
   * @method resumeBehavioralData - Method to resume the behavioral data collection
   * @returns {void}
   * @description Resume the behavioral data collection
   */
  public static resumeBehavioralData(): void {
    window._pingOneSignals.resumeBehavioralData();
  }
}
