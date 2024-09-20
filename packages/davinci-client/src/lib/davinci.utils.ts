/**
 * Import the used types
 */
import type { SingleValueCollector } from './collector.types';
import type { DaVinciRequest } from './davinci.types';
import type { NextNode } from './node.types';

/**
 * @function transformSubmitRequest - Transforms a NextNode into a DaVinciRequest for form submissions
 * @param {NextNode} node - The node to transform into a DaVinciRequest
 * @returns {DaVinciRequest} - The transformed request object
 */
export function transformSubmitRequest(node: NextNode): DaVinciRequest {
  // Filter out ActionCollectors as they are not used in form submissions
  const collectors = node.client?.collectors?.filter(
    (collector) => collector.category === 'SingleValueCollector',
  ) as SingleValueCollector[];

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
 * @param {NextNode} node - The node to transform into a DaVinciRequest
 * @param {string} action - The action to transform into a DaVinciRequest
 * @returns {DaVinciRequest} - The transformed request object
 */
export function transformActionRequest(node: NextNode, action: string): DaVinciRequest {
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
