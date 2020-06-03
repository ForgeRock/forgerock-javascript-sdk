import { Action, RequestObj } from '../config/interfaces';

type NextFn = () => RequestObj;

export default [
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case 'a':
      case 'b':
        req.url.searchParams.set('letter', 'true');
        req.init.headers = { ...{ 'x-letter': 'true' }, ...req.init.headers };
        break;
      case '1':
      case '2':
        req.url.searchParams.set('letter', 'false');
        req.init.headers = { ...{ 'x-letter': 'false' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case 'a':
        req.url.searchParams.set('char', 'a');
        req.init.headers = { ...{ 'x-char': 'a' }, ...req.init.headers };
        break;
      case 'b':
        req.url.searchParams.set('char', 'b');
        req.init.headers = { ...{ 'x-char': 'b' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case '1':
        req.url.searchParams.set('char', '1');
        req.init.headers = { ...{ 'x-char': '1' }, ...req.init.headers };
        break;
      case '2':
        req.url.searchParams.set('char', '2');
        req.init.headers = { ...{ 'x-char': '2' }, ...req.init.headers };
        break;
    }
    next();
  },
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case 'ADD':
        // eslint-disable-next-line
        // @ts-ignore
        req.init.headers = { ...{ 'x-char': 'a,' + action.payload }, ...req.init.headers };
        break;
    }
    next();
  },
  // eslint-disable-next-line
  // @ts-ignore
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case 'REASSIGNMENT':
        req = { url: new URL('https://bad.com'), init: { headers: { 'x-bad': 'true' } } };
        break;
    }
    next();
  },
  // eslint-disable-next-line
  // @ts-ignore
  (req: RequestObj, action: Action, next: NextFn) => {
    switch (action.type) {
      case 'MUTATE-ACTION':
        action.type = 'hello';
        break;
    }
    next();
  },
];
