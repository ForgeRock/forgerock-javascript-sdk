import * as core from '@actions/core';
import { updateCorsConfig } from './lib/update-cors-cloud';
import { authenticateCloud } from './lib/authenticate-cloud';
// import { constructUrls } from './lib/construct-urls';

const AM_URL = core.getInput('AM_URL');
const username = core.getInput('USERNAME');
const password = core.getInput('PASSWORD');
const realm = core.getInput('REALM_PATH');
const origins = core.getInput('origins'); // this is json as input
const remove = Boolean(core.getInput('remove_origins'));

async function update(): Promise<void> {
  try {
    // We first need to authenticate to get an sso token
    const {
      data: { tokenId: ssoToken },
    } = await authenticateCloud({ AM_URL, realm, username, password });

    const originsToAdd = JSON.parse(origins);

    // we need to build our origins as well from the endpoints we are making
    const output = await updateCorsConfig({ AM_URL, originsToAdd, ssoToken, remove });

    core.setOutput('cors config', output);
  } catch (err) {
    return core.setFailed((err as Error).message);
  }
}

update();

export { update };
