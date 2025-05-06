/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { interceptor } from './interceptor.js';

describe('interceptor', () => {
  it('should error when no urls are passed in', () => {
    expect(() => interceptor({} as any)).toThrow('Config: `config.interceptor.urls` is required');
  });
});
