/*
 * @forgerock/javascript-sdk
 *
 * metadata-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import type { Callback } from '../../auth/interfaces';
import PingOneProtectEvaluationCallback from './ping-protect-evaluation-callback';
import PingOneProtectInitializeCallback from './ping-protect-initialize-callback';

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
 * Represents a callback used to deliver and collect miscellaneous data.
 */
class MetadataCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Will parse the given callback from initialization
   * and either return the metadata provided
   * or will try to return the ping protect initialization
   * or a protect evaluation callback
   */
  getDerivedCallback(
    index: number,
  ): MetadataCallback | PingOneProtectEvaluationCallback | PingOneProtectInitializeCallback {
    try {
      const payload = this.payload.output[index].value as Metadata;
      /**
       * parse logic begins with an if we have a _type
       * then we should continue to the next logical step
       *
       */
      if (payload._type && payload._type === 'PingOneProtect') {
        /**
         * Next we need to evaluate if the metadata
         * is protect related
         */
        if (payload._action && payload._action === 'protect_initialize') {
          /***
           * Because we have determined this is a protect callback, we should convert it
           * based on the type of callback it is
           ***/
          return new PingOneProtectInitializeCallback(this.payload);
        } else if (payload._action === 'protect_risk_evaluation') {
          return new PingOneProtectEvaluationCallback(this.payload);
        }
      }
      /**
       * if we don't havea  protect initialize or evaluation
       * type we just return the metadata
       */
      return this.getData();
    } catch (err) {
      throw new Error(`failed to parse callback, ${err}`);
    }
  }
  /**
   * Gets the callback's data.
   */
  public getData<T>(): T {
    return this.getOutputByName<T>('data', {} as T);
  }
}

export default MetadataCallback;
