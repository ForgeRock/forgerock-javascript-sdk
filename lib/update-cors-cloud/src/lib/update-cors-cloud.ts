import axios, { AxiosResponse } from 'axios';
import { ADD_CONFIG, GET_CONFIG } from './constants';

function handleOrigins(originsToAdd: string[], origins: string[], remove: boolean) {
  if (remove) {
    return origins.filter((origin: string) => !originsToAdd.includes(origin));
  } else {
    return origins.concat(originsToAdd);
  }
}
interface CorsStructure {
  maxAge: number;
  exposedHeaders: string[];
  acceptedHeaders: string[];
  allowedCredentials: boolean;
  acceptedMethods: string[];
  acceptedOrigins: string[];
  enabled: boolean;
  _id: string;
  _type: {
    _id: string;
    name: string;
    collection: boolean;
  };
}

interface CorsResponse {
  data: {
    results: CorsStructure[];
  };
}

interface CorsConfigValues {
  AM_URL: string;
  originsToAdd: string[];
  ssoToken: string;
  remove: boolean;
}

export async function updateCorsConfig({
  AM_URL,
  originsToAdd,
  ssoToken,
  remove = false, // default to not remove origins
}: CorsConfigValues): Promise<Error | { acceptedOrigins: string[]; id: string }> {
  if (!AM_URL) {
    return Promise.reject('You must provide an AM_URL');
  }
  if (!originsToAdd) {
    return new Error('You must provide a list of origins to update the cors config with');
  }
  if (!ssoToken) {
    return new Error(
      'No SSO Token provided to update the cors config, exiting without a network call',
    );
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
    const { data }: AxiosResponse<CorsResponse, unknown> = await axios({
      baseURL: AM_URL,
      url: GET_CONFIG.url,
      method: GET_CONFIG.type,
      headers: { iPlanetDirectoryPro: ssoToken },
    });
    const [{ acceptedOrigins: existingOrigins }] = data.data.results;
    const origins = handleOrigins(originsToAdd, existingOrigins, remove);

    const response = await axios({
      baseURL: AM_URL,
      url: ADD_CONFIG.url,
      method: ADD_CONFIG.type,
      headers: { iPlanetDirectoryPro: ssoToken },
      data: {
        //  https://backstage.forgerock.com/docs/am/7.1/security-guide/enable-cors-support.html#add-cors-config
        enabled: true,
        acceptedOrigins: origins, // probably need to concat the existing origins here also
      },
    });

    if (response.status === 201) {
      return { id: response.data._id, acceptedOrigins: response.data.acceptedOrigins };
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
