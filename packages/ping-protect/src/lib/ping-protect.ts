import {
  CallbackType,
  FRStep,
  MetadataCallback,
  PingOneProtectEvaluationCallback,
  PingOneProtectInitializeCallback,
} from '@forgerock/javascript-sdk';

export interface Identifiers {
  [key: string]: string;
}

type Metadata =
  | {
      _type: 'PingOneProtect';
      _action: 'protect_risk_evaluation';
      envId: string;
      pauseBehavioralData: string;
    }
  | {
      _type: 'PingOneProtect';
      _action: 'protect_initialize';
      consoleLogEnabled: boolean;
      deviceAttributesToIgnore: string[];
      customHost: string;
      lazyMetadata: boolean;
      behavioralDataCollection: boolean;
      deviceKeyRsyncIntervals: number;
      enableTrust: boolean;
      disableTags: boolean;
      disableHub: boolean;
    };
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
    try {
      /*
       * Load the Ping Signals SDK
       * this automatically pollutes the window
       * there are no exports of this module
       */
      await import('./ping-signals-sdk.js' as string);
    } catch (err) {
      console.error('error loading ping signals', err);
    }
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

  public static hasInitializeCallback(step: FRStep) {
    const { payload } = step.getCallbackOfType(CallbackType.MetadataCallback) as MetadataCallback;

    const output = payload.output;
    for (let i = 0; i < output.length; i++) {
      const obj = output[i] as unknown as Record<string, Metadata>;
      const value = obj.value;
      if (value._type && value._type === 'PingOneProtect') {
        if (value._action && value._action === 'protect_initialize') return true;
        return true;
      }
    }
    return false;
  }

  public static hasEvaluationCallback(step: FRStep) {
    const { payload } = step.getCallbackOfType(CallbackType.MetadataCallback) as MetadataCallback;

    const output = payload.output;
    for (let i = 0; i < output.length; i++) {
      const obj = output[i] as unknown as Record<string, Metadata>;
      const value = obj.value;
      if (value._type && value._type === 'PingOneProtect') {
        if (value._action && value._action === 'protect_risk_evaluation') return true;
        return true;
      }
    }
    return false;
  }
  /**
   * Will parse the given callback from initialization
   * and either return the metadata provided
   * or will try to return the ping protect initialization
   * or a protect evaluation callback
   */
  public static getDerivedCallback(
    step: FRStep,
  ): MetadataCallback | PingOneProtectEvaluationCallback | PingOneProtectInitializeCallback {
    try {
      /*
       * We need to determine what types of callbacks we have in the metadata callback
       */
      const hasInitializeCallback = PIProtect.hasInitializeCallback(step);
      const hasEvaluationCallback = PIProtect.hasEvaluationCallback(step);

      const frCallback = step.getCallbackOfType(CallbackType.MetadataCallback);

      if (hasInitializeCallback) {
        /***
         * Because we have determined this is a protect callback, we should convert it
         * based on the type of callback it is
         ***/
        return new PingOneProtectInitializeCallback(frCallback.payload);
      } else if (hasEvaluationCallback) {
        return new PingOneProtectEvaluationCallback(frCallback.payload);
      } else {
        /**
         * if we don't havea  protect initialize or evaluation
         * type we just return the metadata
         */
        return new MetadataCallback(frCallback.payload);
      }
    } catch (err) {
      throw new Error(`failed to parse callback, ${err}`);
    }
  }
}
