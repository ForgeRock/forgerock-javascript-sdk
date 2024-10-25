/**
 * Request for DaVinci API
 */

import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationResultSelectorResult,
} from '@reduxjs/toolkit/query';

export interface DaVinciRequest {
  id: string;
  eventName: string;
  interactionId: string;
  parameters: {
    eventType: 'submit' | 'action';
    data: {
      actionKey: string;
      formData?: Record<string, unknown>;
    };
  };
}

/**
 * Base Response for DaVinci API
 */

export interface DaVinciBaseResponse {
  // Optional properties
  capabilityName?: string;
  companyId?: string;
  connectionId?: string;
  connectorId?: string;
  id?: string;
  interactionId?: string;
  interactionToken?: string;
  isResponseCompatibleWithMobileAndWebSdks?: boolean;
  status?: string;
}

// Common REST "_links" property
export interface Links {
  // Optional properties
  [key: string]: {
    href?: string;
  };
}

/**
 * Next or Continuation Response DaVinci API
 */

export interface DaVinciField {
  type: string;
  key: string;
  label: string;

  // Optional properties
  links?: Links;
}
export interface DavinciNextResponse extends DaVinciBaseResponse {
  // Optional properties
  _links?: Links;
  eventName?: string;
  formData?: {
    value?: {
      [key: string]: string;
    };
  };
  form?: {
    name?: string;
    description?: string;
    components?: {
      fields?: DaVinciField[];
    };
  };
}

/**
 * Error Response from DaVinci API
 */

interface NestedErrorDetails {
  // Optional properties
  code?: string;
  target?: string;
  message?: string;
  innerError?: {
    history?: string;
    unsatisfiedRequirements?: string[];
  };
}

export interface ErrorDetail {
  // Optional properties
  message: string;
  rawResponse?: {
    _embedded?: {
      users?: Array<unknown>;
    };
    code?: string;
    count?: number;
    details?: NestedErrorDetails[];
    id?: string;
    message?: string;
    size?: number;
    userFilter?: string;
    [key: string]: unknown;
  };
  statusCode?: number;
}

/**
 * The original DaVinci response is appended to the cache, so we are going
 * to pull it and dispatch the appropriate action based on the response.
 */
export type DaVinciCacheEntry = {
  data?: DaVinciBaseResponse;
  error?: { data: DaVinciBaseResponse; status: number };
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & MutationResultSelectorResult<any>;

export interface DavinciErrorResponse extends DaVinciBaseResponse {
  code: string | number;
  message: string;

  // Optional properties
  cause?: string | null;
  details?: ErrorDetail[];
  doNotSendToOE?: boolean;
  error?: {
    code?: string;
    message?: string;
  };
  errorCategory?: string;
  errorMessage?: string;
  expected?: boolean;
  isErrorCustomized?: boolean;
  httpResponseCode: number;
  metricAttributes?: {
    [key: string]: unknown;
  };
}

export interface DaVinciFailureResponse extends DaVinciBaseResponse {
  error?: {
    code?: string;
    message?: string;
    [key: string]: unknown;
  };
}

/**
 * Success Response DaVinci API
 */

export interface OAuthDetails {
  // Optional properties
  code?: string;
  state?: string;
  [key: string]: unknown;
}

export interface DaVinciSuccessResponse extends DaVinciBaseResponse {
  environment: {
    id: string;
    [key: string]: unknown;
  };
  status: string;
  success: true;

  // Optional properties
  _links?: Links;
  authorizeResponse?: OAuthDetails;
  resetCookie?: boolean;
  session?: {
    id?: string;
    [key: string]: unknown;
  };
  sessionToken?: string;
  sessionTokenMaxAge?: number;
  subFlowSettings?: {
    cssLinks?: unknown[];
    cssUrl?: unknown;
    jsLinks?: unknown[];
    loadingScreenSettings?: unknown;
    reactSkUrl?: unknown;
  };
}

/**
 * Redux Types
 */

export interface DaVinciAction {
  action: string;
}

export interface DaVinciErrorCacheEntry<T> {
  error: {
    data: T;
  };
  requestId: string;
  status: 'fulfilled' | 'pending' | 'rejected';
  endpointName: 'next' | 'flow' | 'start';
  startedTimeStamp: number;
  fulfilledTimeStamp: number;
  isUninitialized: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface ThrownQueryError {
  error: FetchBaseQueryError;
  isHandledError: boolean;
  meta: FetchBaseQueryMeta;
}
