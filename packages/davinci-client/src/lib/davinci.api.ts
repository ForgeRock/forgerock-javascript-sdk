import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { createAuthorizeUrl } from './authorize.utils';
import { nodeSlice } from './node.slice';
import { transformActionRequest, transformSubmitRequest } from './davinci.utils';

import { DaVinciAction, DaVinciRequest, DaVinciResponse } from './davinci.types';

export const davinciApi = createApi({
  reducerPath: 'davinci',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('x-requested-with', 'forgerock-sdk');
      headers.set('x-requested-platform', 'javascript');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    flow: builder.mutation<any, DaVinciAction>({
      queryFn: async (params, api, __, baseQuery) => {
        const state: any = api.getState();
        const requestBody = transformActionRequest(state.node, params.action);

        const response = await baseQuery({
          url: state.node.server.href,
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            interactionId: state.node.server.interactionId,
            interactionToken: state.node.server.interactionToken,
          },
          body: JSON.stringify(requestBody),
        });

        return response;
      },
      async onCacheEntryAdded(_, api) {
        await api.cacheDataLoaded;
        const cacheEntry = api.getCacheEntry() as DaVinciResponse;
        if (cacheEntry.data.status !== 'COMPLETED') {
          api.dispatch(nodeSlice.actions.set(cacheEntry));
        } else {
          api.dispatch(nodeSlice.actions.complete(cacheEntry));
        }
      },
    }),
    next: builder.mutation<any, DaVinciRequest | void>({
      queryFn: async (body, api, __, baseQuery) => {
        const state: any = api.getState();
        let requestBody;

        if (!body) {
          requestBody = transformSubmitRequest(state.node);
        } else {
          requestBody = body;
        }

        const response = await baseQuery({
          url: state.node.server.href,
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            interactionId: state.node.server.interactionId,
            interactionToken: state.node.server.interactionToken,
          },
          body: JSON.stringify(requestBody),
        });

        return response;
      },
      async onCacheEntryAdded(_, api) {
        await api.cacheDataLoaded;
        const cacheEntry = api.getCacheEntry() as DaVinciResponse;
        if (cacheEntry.data.status !== 'COMPLETED') {
          api.dispatch(nodeSlice.actions.set(cacheEntry));
        } else {
          api.dispatch(nodeSlice.actions.complete(cacheEntry));
        }
      },
    }),
    start: builder.mutation<any, void>({
      queryFn: async (_, api, __, baseQuery) => {
        const state: any = api.getState();

        if (!state) {
          return {
            error: {
              status: 500,
              data: 'Store must be initialized before use',
            },
          };
        }

        const baseUrl = state?.config?.serverConfig?.baseUrl;

        if (!baseUrl) {
          return { error: { status: 500, data: 'Base URL must be set' } };
        }

        try {
          const authorizeUrl = await createAuthorizeUrl(baseUrl, {
            clientId: state?.config?.clientId,
            redirectUri: state?.config?.redirectUri,
            responseType: state?.config?.responseType,
            scope: state?.config?.scope,
          });

          const response = await baseQuery({
            url: authorizeUrl,
            credentials: 'include',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          return response;
        } catch (error: unknown) {
          if (error instanceof Error) {
            return { error: { status: 500, data: error.message } };
          }
          return { error: { status: 500, data: 'An unknown error occurred' } };
        }
      },
      async onCacheEntryAdded(_, api) {
        await api.cacheDataLoaded;
        const cacheEntry = api.getCacheEntry() as DaVinciResponse;
        api.dispatch(nodeSlice.actions.set(cacheEntry));
      },
    }),
  }),
});
