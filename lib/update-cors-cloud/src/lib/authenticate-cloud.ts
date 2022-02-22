import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

interface AuthenticateCloudParams {
  AM_URL: string;
  realm: string;
  username: string;
  password: string;
}
interface CloudAuth {
  tokenId: string;
  successUrl: string;
  realm: string;
}
async function authenticateCloud({
  realm,
  AM_URL,
  username,
  password,
}: AuthenticateCloudParams): Promise<AxiosResponse<CloudAuth, unknown>> {
  try {
    const config: AxiosRequestConfig = {
      baseURL: AM_URL.slice(-2),
      method: 'POST',
      url: `/openam/json/realms/root/realms/${realm}/authenticate`,
      data: {},
      headers: {
        'X-OpenAM-Username': username,
        'X-OpenAM-Password': password,
      },
    };
    const response = await axios.request<CloudAuth, AxiosPromise<CloudAuth>, unknown>(config);

    return response;
  } catch (error) {
    return Promise.reject(`We encountered an error authorizing your request`);
  }
}

export { authenticateCloud };
