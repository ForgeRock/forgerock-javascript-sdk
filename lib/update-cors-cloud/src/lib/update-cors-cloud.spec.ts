import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateCorsConfig } from './update-cors-cloud';

const mock = new MockAdapter(axios);

describe('libUpdateCorsCloud', () => {
  beforeEach(() => {
    mock.onPut('/global-config/services/CorsService').reply(201, { _id: '123' });
  });
  it('should successfully update a cors config', async () => {
    const data = { AM_URL: 'am-cloud.com', origin: ['preview-url'], ssoToken: '123abc' };
    const result = await updateCorsConfig(data);
    expect(result).toEqual({ success: 'ok', id: (result as any).id });
  });
  it('should handle when there is no AM_URL', async () => {
    const data = { AM_URL: '', origin: ['preview-url'], ssoToken: '123abc' };
    expect(updateCorsConfig(data)).rejects.toEqual('You must provide an AM_URL');
  });
  it('should return success false when request fails', async () => {
    const data = { AM_URL: 'am-cloud.com', origin: ['preview-url'], ssoToken: '123abc' };
    mock.reset();
    mock.onPut('/global-config/services/CorsService').replyOnce(400, {});
    const result = await updateCorsConfig(data);
    expect(result).toEqual({ success: false });
  });
  it('should return success false when request fails with 404', async () => {
    const data = { AM_URL: 'am-cloud.com', origin: ['preview-url'], ssoToken: '123abc' };
    mock.reset();
    mock.onPut('/global-config/services/CorsService').replyOnce(404, {});
    const result = await updateCorsConfig(data);
    expect(result).toEqual({ success: false });
  });
});
