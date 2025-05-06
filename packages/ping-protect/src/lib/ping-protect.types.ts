export interface ProtectInitializeConfig {
  _type: 'PingOneProtect';
  _action: 'protect_initialize';
  envId?: string;
  consoleLogEnabled?: boolean;
  deviceAttributesToIgnore?: string[];
  customHost?: string;
  lazyMetadata?: boolean;
  behavioralDataCollection?: boolean;
  deviceKeyRsyncIntervals?: number;
  enableTrust?: boolean;
  disableTags?: boolean;
  disableHub?: boolean;
}

export interface ProtectEvaluationConfig {
  _type: 'PingOneProtect';
  _action: 'protect_risk_evaluation';
  envId: string;
  pauseBehavioralData: boolean;
}
