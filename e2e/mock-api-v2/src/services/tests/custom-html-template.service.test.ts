import { it, expect } from '@effect/vitest';
import { CustomHtmlTemplate, mockCustomHtmlTemplate } from '../custom-html-template.service';
import { Effect, Exit, Layer } from 'effect';
import { mockRequest } from '../request.service';
import { UsernamePassword } from '../../responses/username-password';

const queryParams = {
  response_mode: 'pi.flow',
  client_id: '724ec718-c41c-4d51-98b0-84a583f450f9',
  redirect_uri: 'http%3A%2F%2Flocalhost%3A8443%2Fcallback',
  response_type: 'code',
  scope: 'openid%20profile%20email',
  state: 'MTg1MjI5MTEzMTIzMjQwMjU5OTcxMjAxMjI4NDIxNDA0MzE4MTA4MjQ1',
  code_challenge: 'E8YevbSo7Y8jLE43QN3v8e8aVeD-ek-LjG6AcFLP5rg',
  code_challenge_method: 'S256',
  code: 'test ',
  acr_values: 'UsernamePassword',
};
const headers = {
  cookie: 'stepIndex=1',
};
const body = {
  id: 'cq77vwelou',
  eventName: 'continue',
  interactionId: '18a833b0-32e8-4e81-aba4-85d5e6f62077',
  parameters: {
    eventType: 'submit',
    data: {
      actionKey: 'SIGNON',
      formData: {
        value: {
          pingprotectsdk: '123432432423',
        },
      },
    },
  },
};
it.effect('should return index 1 of responseMap with customHtmlHandler', () =>
  Effect.gen(function* () {
    const { handleCustomHtmlTemplate } = yield* CustomHtmlTemplate;
    const result = yield* handleCustomHtmlTemplate(headers, queryParams, body);

    expect(result).toEqual(UsernamePassword);
  }).pipe(Effect.provide(Layer.provideMerge(mockCustomHtmlTemplate, mockRequest))),
);

it.effect('should return error', () =>
  Effect.gen(function* () {
    const body = {
      id: 'cq77vwelou',
      eventName: 'continue',
      interactionId: '18a833b0-32e8-4e81-aba4-85d5e6f62077',
      parameters: {
        eventType: 'submit',
        data: {
          actionKey: 'SIGNON',
          formData: {
            value: {
              pingprotectsdk: '',
            },
          },
        },
      },
    };

    const { handleCustomHtmlTemplate } = yield* CustomHtmlTemplate;
    const result = yield* handleCustomHtmlTemplate(
      { cookie: 'stepIndex=1' },
      queryParams,
      body,
    ).pipe(Effect.exit);

    expect(result).toEqual(Exit.fail('unauthorized'));
  }).pipe(Effect.provide(Layer.provideMerge(mockCustomHtmlTemplate, mockRequest))),
);
