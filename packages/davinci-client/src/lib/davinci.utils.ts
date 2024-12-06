/**
 * Import the used types
 */
import type { Dispatch } from '@reduxjs/toolkit';

import { nodeSlice } from './node.slice';

import type {
  DaVinciCacheEntry,
  DavinciErrorResponse,
  DaVinciFailureResponse,
  DaVinciNextResponse,
  DaVinciRequest,
  DaVinciSuccessResponse,
} from './davinci.types';
import type { ContinueNode } from './node.types';

/**
 * @function transformSubmitRequest - Transforms a NextNode into a DaVinciRequest for form submissions
 * @param {ContinueNode} node - The node to transform into a DaVinciRequest
 * @returns {DaVinciRequest} - The transformed request object
 */
export function transformSubmitRequest(node: ContinueNode): DaVinciRequest {
  // Filter out ActionCollectors as they are not used in form submissions
  const collectors = node.client?.collectors?.filter(
    (collector) => collector.category === 'SingleValueCollector',
  );

  const formData = collectors?.reduce<{
    [key: string]: string | number | boolean;
  }>((acc, collector) => {
    acc[collector.input.key] = collector.input.value;
    return acc;
  }, {});

  return {
    id: node.server.id || '',
    eventName: node.server.eventName || '',
    interactionId: node.server.interactionId || '',
    parameters: {
      eventType: 'submit',
      data: {
        actionKey: node.client?.action || '',
        formData: formData || {},
      },
    },
  };
}

/**
 * @function transformActionRequest - Transforms a NextNode into a DaVinciRequest for action requests
 * @param {ContinueNode} node - The node to transform into a DaVinciRequest
 * @param {string} action - The action to transform into a DaVinciRequest
 * @returns {DaVinciRequest} - The transformed request object
 */
export function transformActionRequest(node: ContinueNode, action: string): DaVinciRequest {
  return {
    id: node.server.id || '',
    eventName: node.server.eventName || '',
    interactionId: node.server.interactionId || '',
    parameters: {
      eventType: 'action',
      data: {
        actionKey: action,
      },
    },
  };
}

export function handleResponse(cacheEntry: DaVinciCacheEntry, dispatch: Dispatch, status: number) {
  /**
   * 5XX errors are treated as unrecoverable failures
   */
  if (cacheEntry.isError && cacheEntry.error.status >= 500) {
    const data = cacheEntry.error.data as unknown;
    const requestId = cacheEntry.requestId;
    dispatch(nodeSlice.actions.failure({ data, requestId, httpStatus: cacheEntry.error.status }));

    return; // Filter out 5XX's
  }

  /**
   * Check for 4XX errors that are unrecoverable
   */
  if (cacheEntry.isError && cacheEntry.error.status >= 400 && cacheEntry.error.status < 500) {
    const data = cacheEntry.error.data as DavinciErrorResponse;
    const requestId = cacheEntry.requestId;

    // Filter out client-side "timeout" related unrecoverable failures
    if (data.code === 1999 || data.code === 'requestTimedOut') {
      dispatch(nodeSlice.actions.failure({ data, requestId, httpStatus: cacheEntry.error.status }));

      return; // Filter out timeouts
    }

    // Filter our "PingOne Authentication Connector" unrecoverable failures
    if (
      data.connectorId === 'pingOneAuthenticationConnector' &&
      (data.capabilityName === 'returnSuccessResponseRedirect' ||
        data.capabilityName === 'setSession')
    ) {
      dispatch(nodeSlice.actions.failure({ data, requestId, httpStatus: cacheEntry.error.status }));

      return;
    }

    // If we're still here, we have a 4XX failure that should be recoverable
    dispatch(nodeSlice.actions.error({ data, requestId, httpStatus: cacheEntry.error.status }));

    return;
  }

  /**
   * If the response's HTTP status is a success (2XX), but the DaVinci API has returned an error,
   * we need to handle this as a failure or return as unknown.
   */
  if (cacheEntry.isSuccess && 'error' in cacheEntry.data) {
    const data = cacheEntry.data as DaVinciFailureResponse;
    const requestId = cacheEntry.requestId;
    dispatch(
      nodeSlice.actions.failure({
        data: data.error,
        requestId,
        httpStatus: status,
      }),
    );

    return; // Filter out 2XX errors
  }

  /**
   * If the response's HTTP status is a success (2XX), but the DaVinci API has returned an error,
   * we need to handle this as a failure or return as unknown.
   */
  if (cacheEntry.isSuccess && 'status' in cacheEntry.data) {
    const status = cacheEntry.data.status.toLowerCase();

    if (status === 'failure') {
      const data = cacheEntry.data as DaVinciFailureResponse;
      const requestId = cacheEntry.requestId;
      dispatch(
        nodeSlice.actions.failure({
          data: data.error,
          requestId,
          httpStatus: status,
        }),
      );

      return; // Filter out 2XX errors with 'failure' status
    } else {
      // Do nothing
    }
  }

  /**
   * If we've made it here, we have a successful response and do not have an error property.
   * Parse for state of the flow and dispatch appropriate action.
   */
  if (cacheEntry.isSuccess) {
    const requestId = cacheEntry.requestId;

    if ('eventName' in cacheEntry.data && cacheEntry.data.eventName === 'continue') {
      const data = cacheEntry.data as DaVinciNextResponse;
      dispatch(nodeSlice.actions.next({ data, requestId, httpStatus: status }));
    } else if ('session' in cacheEntry.data || 'authorizeResponse' in cacheEntry.data) {
      const data = cacheEntry.data as DaVinciSuccessResponse;
      dispatch(nodeSlice.actions.success({ data, requestId, httpStatus: status }));
    } else {
      // If we got here, the response type is unknown and therefore an unrecoverable failure
      const data = cacheEntry.data as DaVinciFailureResponse;
      dispatch(nodeSlice.actions.failure({ data, requestId, httpStatus: status }));
    }
  }
}
