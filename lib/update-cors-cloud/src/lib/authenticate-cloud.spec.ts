import axios from 'axios';
import { authenticateCloud } from './authenticate-cloud';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
describe('should test the authentication through AM', () => {
  it('should call the authenticate endpoint with username and password', async () => {
    mock.onPost('/openam/json/realms/root/realms/alpha/authenticate').reply(200, {
      tokenId: 'id',
      successUrl: '/success',
      realm: 'alpha',
    });
    const config = { realm: 'alpha', AM_URL: 'am-url/am', username: 'user', password: 'password' };
    const result = await authenticateCloud(config);
    expect(result.data).toEqual({ tokenId: 'id', successUrl: '/success', realm: 'alpha' });
  });
  it('should call the authenticate endpoint with username and password', async () => {
    mock.onPost('/openam/json/realms/root/realms/alpha/authenticate').reply(401, {
      tokenId: 'id',
      successUrl: '/success',
      realm: 'alpha',
    });
    const config = { realm: 'alpha', AM_URL: 'am-url/am', username: 'user', password: 'password' };
    const result = authenticateCloud(config);
    expect(result).rejects.toEqual('We encountered an error authorizing your request');
  });
});
