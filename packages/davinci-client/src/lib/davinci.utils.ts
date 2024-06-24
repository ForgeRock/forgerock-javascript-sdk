import { DaVinciRequest } from './davinci.types';
import { NodeState } from './node.types';

export function transformSubmitRequest(node: NodeState): DaVinciRequest {
  // Filter out ActionCollectors as they are not used in form submissions
  const collectors = node.client.collectors?.filter(
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
        actionKey: 'SIGNON',
        formData: formData || {},
      },
    },
  };
}

export function transformActionRequest(node: NodeState, action: string): DaVinciRequest {
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
