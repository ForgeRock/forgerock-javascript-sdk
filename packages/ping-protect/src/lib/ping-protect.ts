import {
  CallbackType,
  FRStep,
  HiddenValueCallback,
  MetadataCallback,
  PingOneProtectEvaluationCallback,
  PingOneProtectInitializeCallback,
} from '@forgerock/javascript-sdk';
import { ProtectEvaluationConfig, ProtectInitializeConfig } from './ping-protect.types';

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
  /** ***********************************************************************************************
   * The following methods are methods for the interacting with PingOne Signals SDK
   */

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

  /** ***********************************************************************************************
   * Required when using the Ping Protect Marketplace nodes, which has generic callbacks
   * But, can be used for native nodes and/or either callback type
   */

  public static getPauseBehavioralData(step: FRStep): boolean {
    // Check for native callback first
    try {
      const nativeCallback = step.getCallbackOfType<PingOneProtectEvaluationCallback>(
        CallbackType.PingOneProtectEvaluationCallback,
      );

      const shouldPause = nativeCallback?.getPauseBehavioralData();
      return shouldPause || false;
    } catch (err) {
      // Do nothing
    }

    // If we are here, we are dealing with Marketplace nodes
    const cbs = step.getCallbacksOfType<MetadataCallback>(CallbackType.MetadataCallback);

    if (!cbs.length) {
      return false;
    }

    const protectMetadataCb = cbs.find((metadataCallback) => {
      const data = metadataCallback.getData() as { _type: string; _action: string };
      return data._type === 'PingOneProtect';
    });

    if (!protectMetadataCb) {
      return false;
    }

    const data: ProtectInitializeConfig | ProtectEvaluationConfig = (
      protectMetadataCb as MetadataCallback
    ).getData();

    if (data._action === 'protect_risk_evaluation') {
      return false;
    } else {
      return !!(data as ProtectInitializeConfig).behavioralDataCollection;
    }
  }

  public static getNodeConfig(step: FRStep): ProtectInitializeConfig | undefined {
    // Check for native callback first
    try {
      const nativeCallback = step.getCallbackOfType<PingOneProtectInitializeCallback>(
        CallbackType.PingOneProtectInitializeCallback,
      );

      const config = nativeCallback?.getConfig() as ProtectInitializeConfig;
      return config;
    } catch (err) {
      // Do nothing
    }

    const cbs = step.getCallbacksOfType<MetadataCallback>(CallbackType.MetadataCallback);

    if (!cbs.length) {
      return undefined;
    }

    const protectMetadataCb = cbs.find((metadataCallback) => {
      const data = metadataCallback.getData() as { _type: string; _action: string };
      return data._action === 'protect_initialize';
    });

    if (!protectMetadataCb) {
      return undefined;
    }

    const data = (protectMetadataCb as MetadataCallback).getData() as ProtectInitializeConfig;

    return data;
  }

  public static getPingProtectType(step: FRStep): 'initialize' | 'evaluate' | 'none' {
    const cbs = step.getCallbacksOfType(CallbackType.MetadataCallback);

    if (!cbs.length) {
      return 'none';
    }

    const protectMetadataCb = cbs.find((cb) => {
      const metadataCallback = cb as MetadataCallback;
      const data = metadataCallback.getData() as { _type: string; _action: string };
      return data._type === 'PingOneProtect';
    });

    if (!protectMetadataCb) {
      return 'none';
    }

    const data = (protectMetadataCb as MetadataCallback).getData() as ProtectInitializeConfig;

    return data._action === 'protect_initialize' ? 'initialize' : 'evaluate';
  }

  public static setNodeClientError(step: FRStep, value: string): void {
    // Check for native callback first
    const nativeEvaluationCallback = step.getCallbacksOfType<PingOneProtectEvaluationCallback>(
      CallbackType.PingOneProtectEvaluationCallback,
    );
    const nativeInitializeCallback = step.getCallbacksOfType<PingOneProtectInitializeCallback>(
      CallbackType.PingOneProtectInitializeCallback,
    );
    const arr = [...nativeEvaluationCallback, ...nativeInitializeCallback];

    if (arr.length) {
      const cb = arr[0];
      cb.setClientError(value);
      return;
    }

    // If we are here, we are dealing with Marketplace nodes
    const cbs = step.getCallbacksOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback);

    if (!cbs.length) {
      return;
    }

    const clientErrorCb = cbs.find((hiddenValueCallback) => {
      const output = hiddenValueCallback.getOutputByName<string>('id', '');
      return output === 'clientError';
    });

    if (!clientErrorCb) {
      return;
    }

    clientErrorCb.setInputValue(value);
  }

  public static setNodeInputValue(step: FRStep, value: string): void {
    // Check for native callback first
    try {
      const nativeCallback = step.getCallbackOfType<PingOneProtectEvaluationCallback>(
        CallbackType.PingOneProtectEvaluationCallback,
      );

      nativeCallback?.setData(value);
      return;
    } catch (err) {
      // Do nothing
    }

    // If we are here, we are dealing with Marketplace nodes
    const cbs = step.getCallbacksOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback);

    if (!cbs.length) {
      return;
    }

    const inputCb = cbs.find((hiddenValueCallback) => {
      const output = hiddenValueCallback.getOutputByName<string>('id', '');
      return output === 'pingone_risk_evaluation_signals';
    });

    if (!inputCb) {
      return;
    }

    inputCb.setInputValue(value);
  }
}
