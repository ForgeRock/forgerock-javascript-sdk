import { DaVinciField } from './davinci.types';
import {
  ActionCollector,
  ActionCollectorTypes,
  SingleValueCollector,
  SingleValueCollectorTypes,
} from './node.types';

type FlowCollector = ActionCollector;

export function returnActionCollector(
  field: DaVinciField,
  idx: number,
  collectorType?: ActionCollectorTypes,
): ActionCollector {
  return {
    category: 'ActionCollector',
    type: collectorType || 'ActionCollector',
    id: `${field.key}-${idx}`,
    name: field.key,
    output: {
      key: field.key,
      label: field.label,
      type: field.type,
    },
  };
}

export function returnFlowCollector(field: DaVinciField, idx: number): FlowCollector {
  return returnActionCollector(field, idx, 'FlowCollector');
}

export function returnSubmitCollector(field: DaVinciField, idx: number): ActionCollector {
  return returnActionCollector(field, idx, 'SubmitCollector');
}

export function returnPasswordCollector(field: DaVinciField, idx: number) {
  return returnSingleValueCollector(field, idx, 'PasswordCollector' as const);
}

export function returnTextCollector(field: DaVinciField, idx: number) {
  return returnSingleValueCollector(field, idx, 'TextCollector');
}

export function returnSingleValueCollector(
  field: DaVinciField,
  idx: number,
  collectorType?: SingleValueCollectorTypes,
): SingleValueCollector {
  return {
    category: 'SingleValueCollector',
    type: collectorType || 'SingleValueCollector',
    id: `${field.key}-${idx}`,
    name: field.key,
    input: {
      key: field.key,
      value: '',
      type: field.type,
    },
    output: {
      key: field.key,
      label: field.label,
      type: field.type,
    },
  };
}
