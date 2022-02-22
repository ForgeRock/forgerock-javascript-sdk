import { updateCorsConfig } from './lib/update-cors-cloud';
import { authenticateCloud } from './lib/authenticate-cloud';

const { AM_URL = '', username = '', password = '', REALM_PATH = '' } = process.env;

async function update() {
  try {
    // We first need to authenticate to get an sso token
    const {
      data: { tokenId: ssoToken },
    } = await authenticateCloud({ AM_URL, realm: REALM_PATH, username, password });

    // TODO
    // we need to build our origins as well from the endpoints we are making
    const origin = ['http://someurl.com/'];

    // after we get an sso token we can call our cors configuration to update
    const cors = await updateCorsConfig({ AM_URL, origin, ssoToken });
    console.log('cors?', cors);

    // if we update successfully, return a success
    return { success: 'true' };
  } catch (err) {
    console.log(err);
    return err;
  }
}

export { update };
