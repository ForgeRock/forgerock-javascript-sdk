import axios, { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';

export const isApiLive = async (
  url: string,
  options: Partial<{ rejectUnauthorized: boolean }> = {}
): Promise<boolean> => {
  const axiosConfig: AxiosRequestConfig = {
    timeout: 500,
  };

  if (options?.rejectUnauthorized !== undefined) {
    axiosConfig.httpsAgent = new Agent({
      rejectUnauthorized: options.rejectUnauthorized,
    });
  }

  return axios
    .get(url, axiosConfig)
    .then((response) => {
      return response.status >= 200 && response.status < 300;
    })
    .catch((e) => {
      if (e.response?.status >= 400 && e.response?.status < 500) {
        // This is still technically not a server issue
        return true;
      }
      console.log(url);
      console.log(e.message);
      return false;
    });
};
