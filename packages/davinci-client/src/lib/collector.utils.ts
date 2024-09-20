/**
 * Import the required types
 */
import type {
  FlowCollector,
  PasswordCollector,
  SocialLoginCollector,
  TextCollector,
} from './collector.types';
import type { DaVinciField } from './davinci.types';
import type {
  ActionCollector,
  ActionCollectorTypes,
  SingleValueCollector,
  SingleValueCollectorTypes,
} from './collector.types';

/**
 * @function returnActionCollector - Creates an ActionCollector object based on the provided field and index.
 * @param {DaVinciField} field - The field object containing key, label, type, and links.
 * @param {number} idx - The index to be used in the id of the ActionCollector.
 * @param {ActionCollectorTypes} [collectorType] - Optional type of the ActionCollector.
 * @returns {ActionCollector} The constructed ActionCollector object.
 */
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
      url: field.links?.authenticate?.href,
    },
  };
}

/**
 * @function returnFlowCollector - Returns a flow collector object
 * @param {DaVinciField} field - The field representing the flow button
 * @param {number} idx - The index of the field in the form
 * @returns {FlowCollector} - The flow collector object
 */

export function returnFlowCollector(field: DaVinciField, idx: number): FlowCollector {
  return returnActionCollector(field, idx, 'FlowCollector');
}

/**
 * @function returnSocialLoginCollector - Returns a social login collector object
 * @param {DaVinciField} field - The field representing the social login button
 * @param {number} idx - The index of the field in the form
 * @returns {SocialLoginCollector} - The social login collector object
 */
export function returnSocialLoginCollector(field: DaVinciField, idx: number): SocialLoginCollector {
  return returnActionCollector(field, idx, 'SocialLoginCollector');
}

/**
 * @function returnSubmitCollector - Returns a submit collector object
 * @param {DaVinciField} field - The field representing the submit button
 * @param {number} idx - The index of the field in the form
 * @returns {ActionCollector} - The submit collector object
 */
export function returnSubmitCollector(field: DaVinciField, idx: number): ActionCollector {
  return returnActionCollector(field, idx, 'SubmitCollector');
}

/**
 * @function returnSingleValueCollector - Creates a SingleValueCollector object based on the provided field, index, and optional collector type.
 * @param {DaVinciField} field - The field object containing key, label, type, and links.
 * @param {number} idx - The index to be used in the id of the SingleValueCollector.
 * @param {SingleValueCollectorTypes} [collectorType] - Optional type of the SingleValueCollector.
 * @returns {SingleValueCollector} The constructed SingleValueCollector object.
 */
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

/**
 * @function returnPasswordCollector - Creates a PasswordCollector object based on the provided field and index.
 * @param {DaVinciField} field - The field object containing key, label, type, and links.
 * @param {number} idx - The index to be used in the id of the PasswordCollector.
 * @returns {PasswordCollector} The constructed PasswordCollector object.
 */
export function returnPasswordCollector(field: DaVinciField, idx: number): PasswordCollector {
  return returnSingleValueCollector(field, idx, 'PasswordCollector');
}

/**
 * @function returnTextCollector - Creates a TextCollector object based on the provided field and index.
 * @param {DaVinciField} field - The field object containing key, label, type, and links.
 * @param {number} idx - The index to be used in the id of the TextCollector.
 * @returns {TextCollector} The constructed TextCollector object.
 */
export function returnTextCollector(field: DaVinciField, idx: number): TextCollector {
  return returnSingleValueCollector(field, idx, 'TextCollector');
}
