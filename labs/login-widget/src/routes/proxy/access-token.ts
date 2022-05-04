import { AM_DOMAIN_PATH, OAUTH_REALM_PATH } from '$lib/constants';

export async function post(event) {
  const body = event.request.body.read();

  const response = await fetch(`${AM_DOMAIN_PATH}${OAUTH_REALM_PATH}/access_token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const resBody = await response.json();
  console.log(resBody);

  return {
    status: 200,
    body: resBody,
  };
}
