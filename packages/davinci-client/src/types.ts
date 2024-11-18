import type * as collectors from './lib/collector.types.js';
import type * as config from './lib/config.types.js';
import type * as nodes from './lib/node.types.js';

export type DaVinciConfig = config.DaVinciConfig;

export type StartNode = nodes.StartNode;
export type NextNode = nodes.NextNode;
export type ErrorNode = nodes.ErrorNode;
export type SuccessNode = nodes.SuccessNode;

export type Collectors = nodes.Collectors;
export type DaVinciValidationError = nodes.DaVinciError;

export type ActionCollector<T extends collectors.ActionCollectorTypes> =
  collectors.ActionCollector<T>;
export type SingleValueCollector<T extends collectors.SingleValueCollectorTypes> =
  collectors.SingleValueCollector<T>;

export type FlowCollector = collectors.FlowCollector;
export type SocialLoginCollector = collectors.SocialLoginCollector;
export type PasswordCollector = collectors.PasswordCollector;
export type TextCollector = collectors.TextCollector;
