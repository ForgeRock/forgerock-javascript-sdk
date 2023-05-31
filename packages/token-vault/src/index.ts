import { interceptor as interceptorModule } from '@shared/workers';
import { client as clientModule } from './lib/client';
import { proxy as proxyModule } from './lib/proxy';

export const client = clientModule;
export const interceptor = interceptorModule;
export const proxy = proxyModule;
