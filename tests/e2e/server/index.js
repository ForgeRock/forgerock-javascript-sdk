import { Server, Response } from 'miragejs';
import { MOCK_AM_PATH, MOCK_AM_PORT, MOCK_HOSTNAME } from '../constants';
import { accessToken, initial, authFail, authSuccess, userInfo } from './data';

new Server({
  routes() {
    this.urlPrefix = `${MOCK_HOSTNAME}:${MOCK_AM_PORT}`;
    this.namespace = MOCK_AM_PATH;

    this.post('/json/realms/root/authenticate', (schema, request) => {
      /**
       * If there is no request body, then we know this is the initial
       * request, so we'll return the appropriate callbacks.
       * If there is a requestBody, then we check if it has a bad password.
       * Fail if bad password, otherwise return the second response with
       * appropriate token and success URL.
       */
      if (!request.requestBody) {
        return initial;
      } else {
        const body = JSON.parse(request.requestBody);
        const pwCb = body.callbacks.find(
          (callback) => callback.type === 'ValidatedCreatePasswordCallback',
        );
        if (pwCb.input[0].value === 'sad_Password1!_panda') {
          return new Response(401, {}, authFail);
        } else {
          return authSuccess;
        }
      }
    });

    this.post('/oauth2/realms/root/access_token', (schema, request) => {
      return new Response(200, {}, accessToken);
    });

    this.get('/oauth2/realms/root/userinfo', (schema, request) => {
      return userInfo;
    });

    this.get('/oauth2/realms/root/connect/endSession', (schema, request) => {
      return new Response(204);
    });

    this.post('/oauth2/realms/root/token/revoke', (schema, request) => {
      return new Response(200);
    });
  },
});
