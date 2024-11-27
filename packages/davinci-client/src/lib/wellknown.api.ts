import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { OpenIdResponse } from './wellknown.types';

export const wellknownApi = createApi({
  reducerPath: 'wellknown',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    wellknown: builder.query<OpenIdResponse, string>({
      query: (endpoint: string) => ({ url: endpoint }),
    }),
  }),
});
