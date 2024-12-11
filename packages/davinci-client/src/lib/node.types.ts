import type {
  FlowCollector,
  PasswordCollector,
  TextCollector,
  SocialLoginCollector,
  SubmitCollector,
  ActionCollector,
  SingleValueCollector,
} from './collector.types.js';
import type { ErrorDetail, Links } from './davinci.types.js';
import { GenericError } from './error.types.js';

export interface DaVinciError extends GenericError {
  details?: ErrorDetail[];
  internalHttpStatus?: number;
  status: 'error' | 'failure' | 'unknown';
}

export type Collectors =
  | FlowCollector
  | PasswordCollector
  | TextCollector
  | SocialLoginCollector
  | SubmitCollector
  | ActionCollector<'ActionCollector'>
  | SingleValueCollector<'SingleValueCollector'>;

export interface ContinueNode {
  cache: {
    key: string;
  };
  client: {
    action: string;
    collectors: Collectors[];
    description?: string;
    name?: string;
    status: 'continue';
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
    status: 'continue';
  };
  status: 'continue';
}

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
