import type { SingleValueCollector, ActionCollector } from './collector.types.js';
import type { ErrorDetail, Links } from './davinci.types.js';

export interface DaVinciError {
  code: string | number;
  details?: ErrorDetail[];
  internalHttpStatus?: number;
  message?: string;
  status: 'error' | 'failure' | 'unknown';
}

export type Collectors =
  | SingleValueCollector<'SingleValueCollector'>
  | SingleValueCollector<'TextCollector'>
  | SingleValueCollector<'PasswordCollector'>
  | SingleValueCollector<'ListCollector'>
  | ActionCollector<'ActionCollector'>
  | ActionCollector<'SubmitCollector'>
  | ActionCollector<'SocialLoginCollector'>
  | ActionCollector<'FlowCollector'>;

export interface ErrorNode {
  cache: {
    key: string;
  };
  client: {
    status: 'error';
  };
  error: DaVinciError;
  httpStatus: number;
  server: {
    _links?: Links;
    eventName?: string;
    href?: string;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    status: 'error';
  } | null;
  status: 'error';
}

export interface FailureNode {
  cache: {
    key: string;
  };
  client: {
    status: 'failure';
  };
  error: DaVinciError;
  httpStatus: number;
  server: {
    _links?: Links;
    eventName?: string;
    href?: string;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    status: 'failure';
  } | null;
  status: 'failure';
}

export interface NextNode {
  cache: {
    key: string;
  };
  client: {
    action: string;
    collectors: Collectors[];
    description?: string;
    name?: string;
    status: 'next';
  };
  error: null;
  httpStatus: number;
  server: {
    _links?: Links;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    eventName?: string;
    status: 'next';
  };
  status: 'next';
}

export interface StartNode {
  cache: null;
  client: {
    status: 'start';
  };
  error: null;
  server: {
    status: 'start';
  };
  status: 'start';
}

export interface SuccessNode {
  cache: {
    key: string;
  };
  client: {
    authorization?: {
      code?: string;
      state?: string;
    };
    status: 'success';
  } | null;
  error: null;
  httpStatus: number;
  server: {
    _links?: Links;
    eventName?: string;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    session?: string;
    status: 'success';
  };
  status: 'success';
}
