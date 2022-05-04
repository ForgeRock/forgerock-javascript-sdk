import { AM_DOMAIN_PATH, OAUTH_REALM_PATH } from '$lib/constants';

export async function get(event) {
  const response = await fetch(
    `${AM_DOMAIN_PATH}${OAUTH_REALM_PATH}/connect/endSession${event.url.search}`,
    {
      method: 'GET',
      headers: {
        authorization: event.request.headers.get('authorization'),
      },
    },
  );

  // const resBody = await response.json();
  // console.log(response);

  return {
    status: 200,
    body: response.body,
  };
}
