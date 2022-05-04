import { AM_DOMAIN_PATH, OAUTH_REALM_PATH } from '$lib/constants';

export async function post(event) {
  const body = event.request.body.read();
  const bodyString = body.toString();

  // console.log('Revoke request body:');
  // console.log(bodyString);

  const response = await fetch(`${AM_DOMAIN_PATH}${OAUTH_REALM_PATH}/token/revoke`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: bodyString,
  });

  // const resBody = await response.json();
  // console.log(response);

  return {
    status: 200,
    body: response.body,
  };
}
