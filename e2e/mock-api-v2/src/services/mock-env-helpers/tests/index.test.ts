/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { it, expect } from '@effect/vitest';
import { Effect, Option } from 'effect';
import {
  getArrayFromResponseMap,
  getFirstElementAndRespond,
  getNextStep,
  mapDataToValue,
  validateCustomHtmlRequest,
} from '../index.js';
import { CustomHtmlRequestBody, QueryTypes } from '../../../types/index.js';
import { PingProtectNode } from '../../../responses/custom-html-template/ping-protect-node.js';
import { UsernamePassword } from '../../../responses/username-password.js';

it('should map data to value in a DavinciFormData', () => {
  const data = Option.some({
    actionKey: 'the action key',
    formData: {
      value: {
        username: 'ryan',
        password: 'password',
      },
    },
  });
  const result = mapDataToValue(data);
  expect(Option.some({ username: 'ryan', password: 'password' })).toEqual(result);
});

it('should get an array from the response map', () =>
  Effect.gen(function* () {
    const query: QueryTypes = { acr_values: 'UsernamePassword' };
    const responseMap = {
      UsernamePassword: [PingProtectNode],
    };
    const result = yield* getArrayFromResponseMap(query);
    expect(responseMap[0]).toEqual(result);
  }));

it('should getNextStep', () =>
  Effect.gen(function* () {
    const query: QueryTypes = { acr_values: 'UsernamePassword' };
    const result = yield* getNextStep(true, query);

    expect(UsernamePassword).toEqual(result);
  }));

it('should get first element and respond', () =>
  Effect.gen(function* () {
    const query: QueryTypes = { acr_values: 'UsernamePassword' };
    const result = yield* getFirstElementAndRespond(query);
    expect(Effect.succeed({ status: 200 as const, body: UsernamePassword })).toEqual(result);
  }));

it('should validateCustomHtml', () =>
  Effect.gen(function* () {
    const body: CustomHtmlRequestBody = {
      id: 'id',
      eventName: 'continue',
      interactionId: '13213',
      parameters: {
        eventType: 'event type',
        data: {
          actionKey: 'actionKey',
          formData: {
            value: {
              pingprotectsdk: '12312412412',
            },
          },
        },
      },
    };
    const result = yield* validateCustomHtmlRequest(body);

    expect(true).toEqual(result);
  }));
