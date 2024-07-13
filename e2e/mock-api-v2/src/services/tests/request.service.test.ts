import { it, expect } from '@effect/vitest';
import { Request, mockRequest } from '../request.service';
import { Effect } from 'effect';
import { CustomHtmlResponseBody } from '../custom-html-template.service';
import { UsernamePassword } from '../../responses/username-password';

it('should make a get request', () =>
  Effect.gen(function* () {
    const { get } = yield* Request;
    const result = yield* get<null, null, any>('/myroute', { headers: null, query: null });

    expect(result).toEqual({});
  }));

it('should make a post request', () =>
  Effect.gen(function* () {
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
    const { post } = yield* Request;
    const result = yield* post<
      { cookie: 'somecookie' },
      typeof queryParams,
      typeof body,
      CustomHtmlResponseBody
    >('/myroute', { headers: null, query: null, body });

    expect(result).toEqual(UsernamePassword);
  }).pipe(Effect.provide(mockRequest)));
