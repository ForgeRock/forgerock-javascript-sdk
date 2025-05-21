# Contribution Guidelines for Ping SDK for Javascript

Welcome! We are excited that you are interested in contributing to the Ping SDK for JavaScript. This document will guide you through the steps required to contribute to the project.

The following is a set of guidelines for contributing to the Ping SDK and its packages, which are hosted in the [ForgeRock organization](https://github.com/forgerock) on GitHub.

# Setting Up Your Development Environment

Before you can contribute to the Ping SDK for Javascript, you'll need to set up your development environment. This section describes the prerequisites and steps needed to start using the project in your local machine.

## Prerequisites

- GitHub account.
- Git installed.
- (pnpm)[https://pnpm.io/installation]
- Node 20
- Setup an Advanced Identity Cloud tenant or PingAM instance, as described in the Documentation.

## Fork and Clone the Repository

Fork the repository to your own GitHub account by clicking the "Fork" button at the top-right of the repository page.

Clone your forked repository to your local machine:

git clone https://github.com/your-username/forgerock-javascript-sdk.git

- Navigate into the project folder:

- cd forgerock-javascript-sdk

- Build the project to make sure it works, `pnpm build`

### Commands in the repo

Most commands live within the local `project.json` of the package you are working in. You can use the project.json and the Nx vscode extension to run commands via the code lens.

Alternatively there are many ways to run commands, of which a few are to be listed below:
`pnpm build` will run build on all projects
`pnpm lint` will run lint on all projects
`pnpm test` will run unit tests on all projects
`pnpm e2e` will run e2e tests for all e2e apps

You can run commands with `nx` like so:
`pnpm nx build <name in project.json>`

_examples_:

```
`pnpm nx build javascript-sdk`
`pnpm nx lint javascript-sdk`
`pnpm nx test javascript-sdk`
`pnpm nx e2e autoscript-suites`
`pnpm nx serve autoscript-apps`
```

## Understanding the Project Structure

The Ping SDK for Javascript is organized in a modular way. This section is designed to help you understand the layout of the project. We will break down each of the folders and what modules you will find there. Getting familiar with the project structure will make contributing easier and more efficient.

```
 e2e/
   autoscript-apps
   autoscript-suites
   mock-api
   mock-api-v2
   token-vault-app
   token-vault-interceptor
   token-vault-proxy
   token-vault-suites
 packages/
   javascript-sdk
   ping-protect
   token-vault

```

### Package overview

- _javascript-sdk_: This is the core module that powers the rest of the packages. OIDC/AIC Callback support/etc
- _ping-protect_: This is the core package that allows a developer to interact with the Ping Protect signals api. This module will load the signals sdk for you, and provides a lightweight interface for interacting with the modules.
- _token-vault_: A propreitary way of managing tokens for environments which require high security.

### E2E Overview

```
- *autoscript-suites*: The e2e test location for writing modular and journey e2e's with the javascript-sdk or ping-protect.
- *autoscript-apps*: A multi-page web application for loading javascript files which call through the journey you are testing programatically
- *mock-api*: A backend server that serves mock data for the autoscript-apps. This is hard-coded data to mimic what the actual AIC Tenant will respond with
- *mock-api-v2*: A new version of the mock api, development of this is moved over to the new Ping SDK repo.
- *token-vault-app*: The application which sets up Token-Vault for testing
- *token-vault-proxy*: The proxy application (required) for using token vault
- *token-vault-suites*: The e2e test location for playwright tests.
```

## Changesets

We use changesets for releasing our packages. you can add a changeset when needed (when a change should require a release) using `pnpm changeset`

fill out the TUI information and add this to your PR.

More information can be found on the [changesets docs](https://changesets-docs.vercel.app/en)

## Standards of Practice

We ask that all contributors to this project adhere to our engineering Standard for team culture, practices and code of conduct. We expect everyone to be respectful, inclusive, and collaborative. Any violations will be handled according to the project's guidelines.

For more details on our Standards of Practice, please refer to the [SDK Standards of Practice](https://github.com/ForgeRock/sdk-standards-of-practice) documentation.

## Here is a checklist of items to ensure your Pull Request is reviewed and ready to be merged:

This section covers how to create your changes, and submit them for review by Ping Identity engineers
by using a Pull Request. A PR is a formal request to merge your changes from your forked repository into
the main project. The following steps will guide you on creating a well-structured PR that
facilitates efficient review and integration of your contributions.

### Create a New Branch

Always create a new branch to work on your changes. Avoid making changes directly on the `develop` or `master` branch.

```bash
git checkout -b feature/my-new-feature
```

### Release affecting changes

If the change you have made should be reflected in a release, be sure to add a changeset with `pnpm changeset`

### Commit Your Changes

Once you’ve made your changes, commit them with a clear and descriptive message. Note that our
repository requires all commits to be signed. For more information on signing commits, please refer to
the GitHub Docs

The commit message should follow this structure:

[Conventional Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary)

```
  [TYPE](scope?optional) Short description of the changes
  Types:

  feat: A new feature
  fix: A bug fix
  docs: Documentation changes
  refactor: Code refactoring (no feature change)
  test: Adding or modifying tests
  chore: not a release affecting change.
  ci: ci related changes
```

Example:

```
git commit -S -m "feat: add login functionality"
```

### Push Your Changes

After committing your changes, push them to your fork:

```
git push origin feature/my-new-feature
```

### Create a Pull Request

Go to your fork on GitHub.

Click on the "New Pull Request" button.

Select the base repository and base branch (usually develop), then select the branch you just pushed.

### Fill out the PR Template

Make sure to fill out the PR template provided. The template helps us better understand your change. Typically, a PR will require the following information:

Add a title and description for the PR. The description should include:

- What was changed and why.
- Any related issues.
- Any additional context if necessary, for example relevant screenshots or breaking changes.
- Once everything looks good, submit the PR for review.

### PR Review and Feedback

Once the PR is submitted, the team will review it. Be prepared to:

- Address any feedback or requested changes.
- Keep your branch up to date with the base branch by rebasing or merging.

### Definition of Done

- [ ] Please make all pull requests against `develop` branch.
- [ ] Fill out the Pull Request template that appears when you open a PR.
- [ ] Please ensure `pnpm run lint` reports no issues.
- [ ] Please ensure `pnpm run build` reports no issues.
- [ ] Please ensure `pnpm run test` reports no failures.
- [ ] Please ensure your PR passes all PR checks.
- [ ] When your PR is ready to merge please rebase your commit into 1 commit.
- [ ] Commits should be verified (meaning you cannot squash your commit on github).
- [ ] Please ensure your code is passing CI in order to get a review.
- [ ] Structure your commit messages similarly to the [Conventional Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```bash
    <type>(<scope>): <short summary>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
```
