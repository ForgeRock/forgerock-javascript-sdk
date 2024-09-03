import type * as collectors from './lib/collector.types';
import type * as config from './lib/config.types';
import type * as nodes from './lib/node.types';

export type DaVinciConfig = config.DaVinciConfig;

export type StartNode = nodes.StartNode;
export type NextNode = nodes.NextNode;
export type ErrorNode = nodes.ErrorNode;
export type SuccessNode = nodes.SuccessNode;

export type ActionCollector = collectors.ActionCollector;
export type SingleValueCollector = collectors.SingleValueCollector;

export type FlowCollector = collectors.FlowCollector;
export type SocialLoginCollector = collectors.SocialLoginCollector;
export type PasswordCollector = collectors.PasswordCollector;
export type TextCollector = collectors.TextCollector;
