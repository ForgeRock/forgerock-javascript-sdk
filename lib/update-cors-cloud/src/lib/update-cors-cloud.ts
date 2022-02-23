import axios from 'axios';
import { ADD_CONFIG } from './constants';

interface CorsConfigValues {
  AM_URL: string;
  origin: string[];
  ssoToken: string;
}

export async function updateCorsConfig({
  AM_URL,
  origin,
  ssoToken,
}: CorsConfigValues): Promise<Error | { id: string }> {
  if (!AM_URL) {
    return Promise.reject('You must provide an AM_URL');
  }
  try {
    /*
     * On success, AM returns an HTTP 201 response code,
     * and a representation of the CORS settings, in JSON format.
     * AM generates a UUID for the configuration, returned as the value of the
     * _id property. You can use this ID value to update or delete
     * the configuration with additional REST calls.
     * The new settings take effect immediately.
     */
    const response = await axios({
      baseURL: AM_URL,
      url: ADD_CONFIG.url,
      method: ADD_CONFIG.type,
      headers: { iPlanetDirectoryPro: ssoToken },
      data: {
        //  https://backstage.forgerock.com/docs/am/7.1/security-guide/enable-cors-support.html#add-cors-config
        enabled: true,
        acceptedOrigins: origin,
      },
    });

    if (response.status === 201) {
      return { id: response.data._id };
    }
    if (response.status === 401) {
      return new Error('You must provide an SSO token for authorization');
    }
    return new Error('Request did not return a 201 status code');
  } catch (err) {
    if (err instanceof Error) return new Error(err.message);
    return new Error(String(err));
  }
}
