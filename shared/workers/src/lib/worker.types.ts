import type { BaseConfig, ForgeRockConfig } from '@shared/types';

export interface InterceptorConfig {
  events?: BaseConfig['events'];
  forgerock: ForgeRockConfig;
  interceptor: {
    urls: string[];
  };
}
