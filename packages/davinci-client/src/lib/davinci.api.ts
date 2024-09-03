/**
 * Import the RTK Query library from Redux Toolkit
 * @see https://redux-toolkit.js.org/rtk-query/overview
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

/**
 * Import internal modules
 */
import { createAuthorizeUrl } from './authorize.utils';
import { nodeSlice } from './node.slice';
import { transformActionRequest, transformSubmitRequest } from './davinci.utils';

/**
 * Import the DaVinci types
 */
import {
  DaVinciAction,
  DaVinciCacheEntry,
  DaVinciErrorCacheEntry,
  DaVinciRequest,
  DavinciErrorResponse,
  DavinciNextResponse,
  DavinciSuccessResponse,
} from './davinci.types';

/**
 * @const davinciApi - Define the DaVinci API for Redux state management
 * @see https://redux-toolkit.js.org/rtk-query/overview
 */
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
    /**
     * @method flow - method for initiating a new flow with the DaVinci API
     */
    flow: builder.mutation<any, DaVinciAction>({
      async queryFn(params, api, __, baseQuery) {
        const state: any = api.getState();
        const requestBody = transformActionRequest(state.node, params.action);

        const response = await baseQuery({
          url: state.node.server._links?.next?.href,
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            interactionId: state.node.server.interactionId,
            interactionToken: state.node.server.interactionToken,
          },
          body: JSON.stringify(requestBody),
        });

        /**
         * Returns the original response from DaVinci,
         * this gets transformed in the onQueryStarted method
         */
        return response;
      },
      /**
       * @method onQueryStarted - method for handling the response from the DaVinci API
       *
       * The method name below is a bit misleading. It is not just
       * called when the query is started, but throughout the lifecycle of
       * the API, including when the query is fulfilled. This is because
       * the query is started, and then the response is awaited, and then
       * the response is processed.
       *
       * NOTE: The below is repeated for each endpoint, which is not "DRY",
       * but doing it inline reduces the typing complexity as all the
       * parameters are pre-typed from the library.
       */
      async onQueryStarted(_, api) {
        try {
          await api.queryFulfilled;
        } catch (error) {
          /**
           * This error is thrown when the query is rejected. We don't
           * want to do anything with it for now.
           */
        }

        /**
         * The original DaVinci response is appended to the cache, so we are going
         * to pull it and dispatch the appropriate action based on the response.
         */
        const cacheEntry = api.getCacheEntry();

        /**
         * Detect the type of response and dispatch the appropriate action
         * This leads to a new node in the state
         */
        if (cacheEntry.isSuccess && 'eventName' in cacheEntry.data) {
          const cacheNextEntry = cacheEntry as DaVinciCacheEntry<DavinciNextResponse>;
          api.dispatch(nodeSlice.actions.next(cacheNextEntry));
        } else if (cacheEntry.isSuccess && 'success' in cacheEntry.data) {
          const cacheSuccessEntry = cacheEntry as DaVinciCacheEntry<DavinciSuccessResponse>;
          api.dispatch(nodeSlice.actions.success(cacheSuccessEntry));
        } else if (cacheEntry.isError) {
          const cacheErrorEntry = cacheEntry as DaVinciErrorCacheEntry<DavinciErrorResponse>;
          api.dispatch(nodeSlice.actions.error(cacheErrorEntry));
        }
      },
    }),

    /**
     * @method next - method for initiating the next node in the current flow
     */
    next: builder.mutation<any, DaVinciRequest | void>({
      async queryFn(body, api, __, baseQuery) {
        const state: any = api.getState();
        let requestBody;

        if (!body) {
          requestBody = transformSubmitRequest(state.node);
        } else {
          requestBody = body;
        }

        const response = await baseQuery({
          url: state.node.server._links?.next?.href,
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            interactionId: state.node.server.interactionId,
            interactionToken: state.node.server.interactionToken,
          },
          body: JSON.stringify(requestBody),
        });

        /**
         * Returns the original response from DaVinci,
         * this gets transformed in the onQueryStarted method
         */
        return response;
      },
      async onQueryStarted(_, api) {
        try {
          await api.queryFulfilled;
        } catch (error) {
          /**
           * This error is thrown when the query is rejected. We don't
           * want to do anything with it for now.
           */
        }
        const cacheEntry = api.getCacheEntry();

        if (cacheEntry.isSuccess && 'eventName' in cacheEntry.data) {
          const cacheNextEntry = cacheEntry as DaVinciCacheEntry<DavinciNextResponse>;
          api.dispatch(nodeSlice.actions.next(cacheNextEntry));
        } else if (cacheEntry.isSuccess && 'success' in cacheEntry.data) {
          const cacheSuccessEntry = cacheEntry as DaVinciCacheEntry<DavinciSuccessResponse>;
          api.dispatch(nodeSlice.actions.success(cacheSuccessEntry));
        } else if (cacheEntry.isError) {
          const cacheErrorEntry = cacheEntry as DaVinciErrorCacheEntry<DavinciErrorResponse>;
          api.dispatch(nodeSlice.actions.error(cacheErrorEntry));
        }
      },
    }),

    /**
     * @method start - method for initiating a DaVinci flow
     */
    start: builder.mutation<any, void>({
      async queryFn(_, api, __, baseQuery) {
        const state: any = api.getState();

        if (!state) {
          return {
            error: {
              status: 400,
              data: 'Store must be initialized before use',
            },
          };
        }

        const baseUrl = state?.config?.serverConfig?.baseUrl;

        if (!baseUrl) {
          return { error: { status: 400, data: 'Base URL must be set' } };
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

          /**
           * Returns the original response from DaVinci,
           * this gets transformed in the onQueryStarted method
           */
          return response;
        } catch (error: unknown) {
          if (error instanceof Error) {
            return { error: { status: 400, data: error.message } };
          }
          return { error: { status: 400, data: 'An unknown error occurred' } };
        }
      },
      async onQueryStarted(_, api) {
        try {
          await api.queryFulfilled;
        } catch (error) {
          /**
           * This error is thrown when the query is rejected. We don't
           * want to do anything with it for now.
           */
        }
        const cacheEntry = api.getCacheEntry();

        if (cacheEntry.isSuccess && 'eventName' in cacheEntry.data) {
          const cacheNextEntry = cacheEntry as DaVinciCacheEntry<DavinciNextResponse>;
          api.dispatch(nodeSlice.actions.next(cacheNextEntry));
        } else if (cacheEntry.isSuccess && 'success' in cacheEntry.data) {
          const cacheSuccessEntry = cacheEntry as DaVinciCacheEntry<DavinciSuccessResponse>;
          api.dispatch(nodeSlice.actions.success(cacheSuccessEntry));
        } else if (cacheEntry.isError) {
          const cacheErrorEntry = cacheEntry as DaVinciErrorCacheEntry<DavinciErrorResponse>;
          api.dispatch(nodeSlice.actions.error(cacheErrorEntry));
        }
      },
    }),
  }),
});
