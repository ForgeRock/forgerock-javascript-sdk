import Config from '../config';
import { RequestObj } from '../config/interfaces';

function middlewareWrapper(request: RequestObj, type: string, payload?: any): RequestObj {
  const { middleware } = Config.get();

  if (!Array.isArray(middleware)) {
    return request;
  }
  // no mutation and no reassignment
  const action = Object.freeze({ type, payload });
  // Copy middleware so the `shift` below doesn't mutate source
  const mwareCopy = middleware.map((fn) => fn);

  function iterator(): RequestObj {
    const next = mwareCopy.shift();
    next && next(request, action, iterator);
    return request;
  }

  return iterator();
}

export default middlewareWrapper;
