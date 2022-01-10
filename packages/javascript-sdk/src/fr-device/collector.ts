/*
 * @forgerock/javascript-sdk
 *
 * collector.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { StringDict } from '../shared/interfaces';

/**
 * @class Collector - base class for FRDevice
 * Generic collector functions for collecting a device profile attributes
 */
class Collector {
  /**
   * @method reduceToObject - goes one to two levels into source to collect attribute
   * @param props - array of strings; can use dot notation for two level lookup
   * @param src - source of attributes to check
   */
  // eslint-disable-next-line
  reduceToObject(props: string[], src: StringDict<any>): StringDict<string> {
    return props.reduce((prev, curr) => {
      if (curr.includes('.')) {
        const propArr = curr.split('.');
        const prop1 = propArr[0];
        const prop2 = propArr[1];
        const prop = src[prop1] && src[prop1][prop2];
        prev[prop2] = prop != undefined ? prop : '';
      } else {
        prev[curr] = src[curr] != undefined ? src[curr] : null;
      }
      return prev;
    }, {} as StringDict<string>);
  }

  /**
   * @method reduceToString - goes one level into source to collect attribute
   * @param props - array of strings
   * @param src - source of attributes to check
   */
  // eslint-disable-next-line
  reduceToString(props: string[], src: any): string {
    return props.reduce((prev, curr) => {
      prev = `${prev}${src[curr].filename};`;
      return prev;
    }, '');
  }
}

export default Collector;
