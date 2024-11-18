import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Endpoints, OpenIdResponse } from './wellknown.types';

export const wellknownApi = createApi({
  reducerPath: 'wellknown',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    wellknown: builder.query<Endpoints, string>({
      query: (endpoint: string) => ({ url: endpoint }),

      transformResponse: (value: OpenIdResponse): Endpoints => {
        return {
          authorize: value.authorization_endpoint,
          issuer: value.issuer,
          introspection: value.introspection_endpoint,
          tokens: value.token_endpoint,
          userinfo: value.userinfo_endpoint,
        };
      },
    }),
  }),
});
