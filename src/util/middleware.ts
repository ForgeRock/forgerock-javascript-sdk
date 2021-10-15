/*
 * @forgerock/javascript-sdk
 *
 * middleware.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { RequestMiddleware, RequestObj } from '../config/interfaces';
import { ActionTypes } from '../config/enums';

/**
 * @function middlewareWrapper - A "Node" and "Redux" style middleware that is called just before
 * the request is made from the SDK. This allows you access to the request for modification.
 * @param request - A request object container of the URL and the Request Init object
 * @param action - The action object that is passed into the middleware communicating intent
 * @param action.type - A "Redux" style type that contains the serialized action
 * @param action.payload - The payload of the action that can contain metadata
 * @returns {function} - Function that takes middleware parameter & runs middleware against request
 */
function middlewareWrapper(
  request: RequestObj,
  // eslint-disable-next-line
  { type, payload }: { type: ActionTypes; payload?: any },
): (middleware: RequestMiddleware[] | undefined) => RequestObj {
  // no mutation and no reassignment
  const actionCopy = Object.freeze({ type, payload });

  return (middleware: RequestMiddleware[] | undefined) => {
    if (!Array.isArray(middleware)) {
      return request;
    }

    // Copy middleware so the `shift` below doesn't mutate source
    const mwareCopy = middleware.map((fn) => fn);

    function iterator(): RequestObj {
      const next = mwareCopy.shift();
      next && next(request, actionCopy, iterator);
      return request;
    }

    return iterator();
  };
}

export default middlewareWrapper;
