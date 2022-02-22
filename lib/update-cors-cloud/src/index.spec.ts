import { update } from './index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authenticateCloud } from './lib/authenticate-cloud';
import { updateCorsConfig } from './lib/update-cors-cloud';

const mock = new MockAdapter(axios);

jest.mock('./lib/authenticate-cloud', () => ({
  authenticateCloud: jest.fn(() => ({ data: { tokenId: 'token1' } })),
}));
jest.mock('./lib/update-cors-cloud', () => ({
  updateCorsConfig: jest.fn(),
}));
describe('should test the flow from auth to update', () => {
  beforeEach(() => {
    mock.reset();
    mock.onPut('/global-config/services/CorsService').reply(201, { _id: '123' });
    mock.onPost('/openam/json/realms/root/realms/alpha/authenticate').reply(200, {
      tokenId: 'id',
      successUrl: '/success',
      realm: 'alpha',
    });
  });
  it('should authenticate and update with an origin', async () => {
    await update();
    expect(authenticateCloud).toHaveBeenCalledWith({
      AM_URL: 'some-am-url',
      username: 'admin',
      password: 'password',
      realm: 'alpha',
    });
    expect(updateCorsConfig).toHaveBeenCalledWith({
      AM_URL: 'some-am-url',
      origin: ['http://someurl.com/'],
      ssoToken: 'token1',
    });
  });
  it('should authenticate and update with an origin', async () => {
    await update();
    expect(authenticateCloud).toHaveBeenCalledWith({
      AM_URL: 'some-am-url',
      username: 'admin',
      password: 'password',
      realm: 'alpha',
    });
    expect(updateCorsConfig).toHaveBeenCalledWith({
      AM_URL: 'some-am-url',
      origin: ['http://someurl.com/'],
      ssoToken: 'token1',
    });
  });
});
