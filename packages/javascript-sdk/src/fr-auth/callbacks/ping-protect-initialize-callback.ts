/*
 * @forgerock/javascript-sdk
 *
 * ping-protect-initialize-callback.ts
 *
 * Copyright (c) 2024 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import type { Callback } from '../../auth/interfaces';

/**
 * @class - Represents a callback used to initialize and start device and behavioral data collection.
 */
class PingOneProtectInitializeCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Get callback's initialization config settings
   */
  public getConfig() {
    const config = {
      // Required parameter
      envId: this.getOutputByName<string>('envId', ''),

      // Optional parameters
      agentIdentification: this.getOutputByName<boolean>('agentIdentification', false),
      agentTimeout: this.getOutputByName<number>('agentTimeout', 0),
      agentPort: this.getOutputByName<number>('agentPort', 0),
      behavioralDataCollection: this.getOutputByName<boolean>('behavioralDataCollection', true),
      disableTags: this.getOutputByName<boolean>('disableTags', false),
      universalDeviceIdentification: this.getOutputByName<boolean>(
        'universalDeviceIdentification',
        false,
      ),

      // Deprecated parameters
      consoleLogEnabled: this.getOutputByName<boolean>('consoleLogEnabled', false),
      deviceAttributesToIgnore: this.getOutputByName<string[]>('deviceAttributesToIgnore', []),
      customHost: this.getOutputByName<string>('customHost', ''),
      lazyMetadata: this.getOutputByName<boolean>('lazyMetadata', false),
      deviceKeyRsyncIntervals: this.getOutputByName<number>('deviceKeyRsyncIntervals', 14),
      enableTrust: this.getOutputByName<boolean>('enableTrust', false),
      disableHub: this.getOutputByName<boolean>('disableHub', false),
    };
    return config;
  }

  public setClientError(errorMessage: string): void {
    this.setInputValue(errorMessage, /clientError/);
  }
}

export default PingOneProtectInitializeCallback;
