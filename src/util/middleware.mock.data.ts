/*
 * @forgerock/javascript-sdk
 *
 * middleware.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Action, RequestObj } from '../config/interfaces';
import { ActionTypes } from '../config/enums';

type NextFn = () => RequestObj;

const a = 'a' as ActionTypes;
const b = 'b' as ActionTypes;
const one = '1' as ActionTypes;
const two = '2' as ActionTypes;
const add = 'ADD' as ActionTypes;
const reassignment = 'REASSIGNMENT' as ActionTypes;
const mutateAction = 'MUTATE-ACTION' as ActionTypes;

export default [
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case a:
      case b:
        req.url.searchParams.set('letter', 'true');
        req.init.headers = { ...{ 'x-letter': 'true' }, ...req.init.headers };
        break;
      case one:
      case two:
        req.url.searchParams.set('letter', 'false');
        req.init.headers = { ...{ 'x-letter': 'false' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case a:
        req.url.searchParams.set('char', 'a');
        req.init.headers = { ...{ 'x-char': 'a' }, ...req.init.headers };
        break;
      case b:
        req.url.searchParams.set('char', 'b');
        req.init.headers = { ...{ 'x-char': 'b' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case one:
        req.url.searchParams.set('char', '1');
        req.init.headers = { ...{ 'x-char': '1' }, ...req.init.headers };
        break;
      case two:
        req.url.searchParams.set('char', '2');
        req.init.headers = { ...{ 'x-char': '2' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case add:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.init.headers = { ...{ 'x-char': 'a,' + action.payload }, ...req.init.headers };
        break;
    }
    next();
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case reassignment:
        req = { url: new URL('https://bad.com'), init: { headers: { 'x-bad': 'true' } } };
        break;
    }
    next();
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (req: RequestObj, action: Action, next: NextFn): void => {
    switch (action.type) {
      case mutateAction:
        action.type = 'hello' as ActionTypes;
        break;
    }
    next();
  },
];
