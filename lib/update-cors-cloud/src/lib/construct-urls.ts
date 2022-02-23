import * as core from '@actions/core';
import * as github from '@actions/github';

function constructUrls() {
  const prNumber = github.context.payload.pull_request?.number;
  const suffix = core.getInput('SUFFIX');
  const protocol = core.getInput('PROTOCOL') || 'https://';
  const domain = core.getInput('DOMAIN'); // include the . in the domain
  const inputList = core.getMultilineInput('SERVICE_NAMES', {});
  const constructedUrls = inputList.map(
    (value) => `${protocol}://${value}-${prNumber}-${suffix}${domain}`,
  );

  return constructedUrls;
}

export { constructUrls };
