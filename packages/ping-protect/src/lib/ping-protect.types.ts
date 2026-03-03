/**
 *
 * Copyright (c) 2024 - 2026 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

export interface ProtectInitializeConfig {
  _type: 'PingOneProtect';
  _action: 'protect_initialize';
  envId: string;

  // Optional parameters
  agentIdentification?: boolean;
  agentTimeout?: number;
  agentPort?: number;
  behavioralDataCollection?: boolean;
  universalDeviceIdentification?: boolean;
  disableTags?: boolean;

  // Deprecated parameters
  consoleLogEnabled?: boolean;
  deviceAttributesToIgnore?: string[];
  customHost?: string;
  externalIdentifiers?: string;
  hubUrl?: string;
  lazyMetadata?: boolean;
  deviceKeyRsyncIntervals?: number;
  enableTrust?: boolean;
  disableHub?: boolean;
  waitForWindowLoad?: boolean;
}

export type SignalsInitializationOptions = Record<string, unknown>;
export type ProtectNodeInitializeConfig = ProtectInitializeConfig | SignalsInitializationOptions;

export interface ProtectEvaluationConfig {
  _type: 'PingOneProtect';
  _action: 'protect_risk_evaluation';
  envId: string;
  pauseBehavioralData: boolean;
}
