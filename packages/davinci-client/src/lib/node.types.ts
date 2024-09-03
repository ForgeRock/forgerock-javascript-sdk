import { SingleValueCollector, ActionCollector } from './collector.types';
import { ErrorDetail, Links } from './davinci.types';

export interface DaVinciValidationError {
  code: string;
  message: string;
  httpCode: number;
  // TODO: Improve error type identification
  type: 'genericError' | 'validationError' | 'networkError' | 'unknownError';
  details?: ErrorDetail[];
}

export interface ErrorNode {
  cache: {
    key: string;
  };
  client: null;
  error: DaVinciValidationError;
  server: {
    _links?: Links;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    eventName?: string;
  } | null;
  status: 'error';
}

export interface NextNode {
  cache: {
    key: string;
  };
  client: {
    action: string;
    collectors: (SingleValueCollector | ActionCollector)[];
    description?: string;
    name?: string;
  };
  error: null;
  server: {
    _links?: Links;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    eventName?: string;
  };
  status: 'next';
}

export interface StartNode {
  cache: null;
  client: null;
  error: null;
  server: null;
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
  } | null;
  error: null;
  server: {
    _links?: Links;
    eventName?: string;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    session?: string;
  };
  status: 'success';
}
