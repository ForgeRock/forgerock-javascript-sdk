import * as core from '@actions/core';
import { updateCorsConfig } from './lib/update-cors-cloud';
import { authenticateCloud } from './lib/authenticate-cloud';
import { constructUrls } from './lib/construct-urls';

const { AM_URL = '', username = '', password = '', REALM_PATH = '' } = process.env;

async function update(): Promise<void> {
  try {
    // We first need to authenticate to get an sso token
    const {
      data: { tokenId: ssoToken },
    } = await authenticateCloud({ AM_URL, realm: REALM_PATH, username, password });

    // we need to build our origins as well from the endpoints we are making
    const origin = constructUrls();

    // after we get an sso token we can call our cors configuration to update
    await updateCorsConfig({ AM_URL, origin, ssoToken });
  } catch (err) {
    return core.setFailed((err as Error).message);
  }
}

export { update };
