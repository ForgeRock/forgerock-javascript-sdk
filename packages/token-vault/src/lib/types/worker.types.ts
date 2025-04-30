/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import type { BaseConfig, ForgeRockConfig } from './config.types.js';

export interface InterceptorConfig {
  events?: BaseConfig['events'];
  forgerock: ForgeRockConfig;
  interceptor: {
    urls: string[];
  };
}
