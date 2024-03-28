import type { BaseConfig, ForgeRockConfig } from './config.types';

export interface InterceptorConfig {
  events?: BaseConfig['events'];
  forgerock: ForgeRockConfig;
  interceptor: {
    urls: string[];
  };
}
