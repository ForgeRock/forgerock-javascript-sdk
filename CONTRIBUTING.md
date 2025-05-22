# Contribution Guidelines for Ping SDK for Javascript

Welcome! We are excited that you are interested in contributing to the Ping SDK for JavaScript. This document will guide you through the steps required to contribute to the project.

The following is a set of guidelines for contributing to the Forgerock SDK and its packages, which are hosted in the [ForgeRock organization](https://github.com/forgerock) on GitHub.

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

### Git Flow

Fork the repo to your own github account. From there, you can add the ForgeRock repository as an upstream.

`git remote add upstream git@github.com:ForgeRock/forgerock-javascript-sdk.git`

Please make PR's against the develop branch, which is the default branch.

## Changesets

We use changesets for releasing our packages. you can add a changeset when needed (when a change should require a release) using `pnpm changeset`

fill out the TUI information and add this to your PR.

More information can be found on the [changesets docs](https://changesets-docs.vercel.app/en)

## Standards of Practice

We ask that all contributors to this project adhere to our engineering Standard for team culture, practices and code of conduct. We expect everyone to be respectful, inclusive, and collaborative. Any violations will be handled according to the project's guidelines.

For more details on our Standards of Practice, please refer to the SDK Standards of Practice documentation.

### Here is a checklist of items to ensure your Pull Request is reviewed and ready to be merged:

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
