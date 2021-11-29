# Contributing to Forgerock's Javascript SDK

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to the Forgerock SDK and its packages, which are hosted in the [ForgeRock organization](https://github.com/forgerock) on GitHub.

### Git Flow

Fork the repo to your own github account. From there, you can add the ForgeRock repository as an upstream.

`git remote add upstream git@github.com:ForgeRock/forgerock-javascript-sdk.git`

## Here is a checklist of items to ensure your Pull Request is reviewed and ready to be merged:

- [ ] Please make all pull requests against `develop` branch.
- [ ] Fill out the Pull Request template that appears when you open a PR.
- [ ] Please ensure `npm run lint` reports no issues.
- [ ] Please ensure `npm run build` reports no issues.
- [ ] Please ensure `npm run test` reports no failures.
- [ ] Please ensure your PR passes all PR checks.
- [ ] When your PR is ready to merge please rebase your commit into 1 commit.
- [ ] Commits should be verified (meaning you cannot squash your commit on github).
- [ ] Please ensure your code is passing CI in order to get a review.
- [ ] Structure your commit messages similarly to the [Angular Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).
- [ ] We will only review a PR once a successful CI build is passing.

```bash
    <type>(<scope>): <short summary>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
```
