import { client as clientModule } from './client';
import { interceptor as interceptorModule } from '@forgerock/shared/http-sw';
import { proxy as proxyModule } from './proxy';

export const client = clientModule;
export const interceptor = interceptorModule;
export const proxy = proxyModule;
