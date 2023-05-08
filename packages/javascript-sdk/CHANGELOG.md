## [4.0.0-beta.1](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v3.4.0...v4.0.0-beta.1) (2023-05-08)


### ⚠ BREAKING CHANGES

* **javascript-sdk:** refactor token storage and config timeout
* **javascript-sdk:** remove the frui and event classes / folders and
references.
* **javascript-sdk:** for some reason breaking changes arent triggered by
semver so i'm auto triggering it here
* **javascript-sdk:** commit 48cc494  didn't get picked up for breaking
change, unsure why so i'm adding it here. there isn o breaking change in
this commit
* **javascript-sdk:** remove the ability to use 'modern' as a means of making calls. fetch
complicates the auth process too much for the value it provides. we've
opted to remove this support property, automatically defaulting to the
iframe.

### Features

* **javascript-sdk:** register-device-name ([f845505](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f845505d68e648bf3e6dd8068f2abb8133c7c304))


### Bug Fixes

* **javascript-sdk:** correct code / type in  getTokens call ([abd3e66](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/abd3e663286b8e830f568cce59fa652c16abbbb1))
* **javascript-sdk:** fix-policy-types ([5a3ac2a](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5a3ac2a3a80b4dff56fc0554b72bb646544b826d))
* **javascript-sdk:** fix-publish-readme-and-dist ([2a06503](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2a065035a67babd263dd896823cf46eb942ccbd0))
* **javascript-sdk:** fix-type-of-get-type ([56a0822](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/56a08229f71acfcf7a87e129fb55d54eda44095a))
* **javascript-sdk:** package-json ([9c03c28](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/9c03c2874cdd552f4f21236d42bb2b783f6e9be6))
* **javascript-sdk:** release process ([9f1b3a3](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/9f1b3a372d5d89c11d17122e9e749d87ed78d55b))
* **javascript-sdk:** release-process ([baabf80](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/baabf808ae11389b892a84e5add1fae7b8a37efb))
* **javascript-sdk:** remove-modules-unneeded ([bd2e1fe](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/bd2e1feb2ff926ff9c9eb984907c2d2bd9cc8027))
* **javascript-sdk:** remove-support-property ([48cc494](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/48cc4947105ce1b0559cd988913758f8eb17cecb))
* **javascript-sdk:** removes-rogue-package-updates-infra ([77dd8da](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/77dd8da94074591f72e4767de66d035383d4b485))
* **javascript-sdk:** use-prompt-none ([c1f4b49](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/c1f4b49f3dcf76dbb5fe40a7c0819106ba494510))
* **javascript-sdk:** validated-create-password-callback-json ([f619062](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f619062ee13b05dfc29c3b3dcdedd14bb9635a0e))
* **javascript-sdk:** validated-user-name-policies ([b08fcaa](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/b08fcaaf2c3e2498b5e73e1d6aed2751bb026dec))
* release-failure-packages ([22ded72](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/22ded728308d1513dc53a6d198e70c09f9d2008b))
* remove-beta ([2f8299e](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2f8299e339ebf48809fd2f9433f8429fb12e3885))


### Miscellaneous Chores

* **javascript-sdk:** pr comments ([f9e2622](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f9e2622c9a99407814cbf721cae2f179f95dc4f6))
* **javascript-sdk:** refactor token storage and config timeout ([23f8e4c](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/23f8e4c811c7a61ce51b49de699f2788a8d3e279))

# [4.0.0-beta.4](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2023-04-19)


### Bug Fixes

* **javascript-sdk:** fix-publish-readme-and-dist ([2a06503](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2a065035a67babd263dd896823cf46eb942ccbd0))
* **javascript-sdk:** release process ([9f1b3a3](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/9f1b3a372d5d89c11d17122e9e749d87ed78d55b))
* **javascript-sdk:** release-process ([baabf80](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/baabf808ae11389b892a84e5add1fae7b8a37efb))
* release-failure-packages ([22ded72](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/22ded728308d1513dc53a6d198e70c09f9d2008b))

# 1.0.0-beta.1 (2023-04-18)


### Bug Fixes

* fix-lockfile ([5122de1](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5122de1a85b965c147a11612417c74c39d0c7a7d))
* **javascript-sdk:** add-back-proper-namespace ([245d85e](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/245d85eef06149b0ad4bb0cae841d50d33bebb6c))
* **javascript-sdk:** capitalize headers ([9287f3b](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/9287f3b739bc2f9816ff7b0d7d41202edc86e183))
* **javascript-sdk:** correct code / type in  getTokens call ([abd3e66](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/abd3e663286b8e830f568cce59fa652c16abbbb1))
* **javascript-sdk:** fix-policy-types ([5a3ac2a](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5a3ac2a3a80b4dff56fc0554b72bb646544b826d))
* **javascript-sdk:** fix-profile-object-checks ([01e41e7](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/01e41e75321cb6c9c1a037ff1788cde2cfc56c04))
* **javascript-sdk:** fix-publish-readme-and-dist ([2a06503](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2a065035a67babd263dd896823cf46eb942ccbd0))
* **javascript-sdk:** fix-release ([06d2f33](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/06d2f3302d138a97dc47582e68035ad81774f9b0))
* **javascript-sdk:** fix-type-of-get-type ([56a0822](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/56a08229f71acfcf7a87e129fb55d54eda44095a))
* **javascript-sdk:** fixing-comment ([ea68f26](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/ea68f26f40700f6bfb98e5fcd0dfe64d0714c798))
* **javascript-sdk:** release-process ([baabf80](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/baabf808ae11389b892a84e5add1fae7b8a37efb))
* **javascript-sdk:** remove-support-property ([48cc494](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/48cc4947105ce1b0559cd988913758f8eb17cecb))
* **javascript-sdk:** removes-rogue-package-updates-infra ([77dd8da](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/77dd8da94074591f72e4767de66d035383d4b485))
* **javascript-sdk:** use-prompt-none ([c1f4b49](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/c1f4b49f3dcf76dbb5fe40a7c0819106ba494510))
* **javascript-sdk:** validated-create-password-callback-json ([f619062](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f619062ee13b05dfc29c3b3dcdedd14bb9635a0e))
* **javascript-sdk:** validated-user-name-policies ([b08fcaa](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/b08fcaaf2c3e2498b5e73e1d6aed2751bb026dec))
* release-failure-packages ([22ded72](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/22ded728308d1513dc53a6d198e70c09f9d2008b))
* remove-beta ([2f8299e](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2f8299e339ebf48809fd2f9433f8429fb12e3885))


### chore

* **javascript-sdk:** pr comments ([f9e2622](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f9e2622c9a99407814cbf721cae2f179f95dc4f6))


* fix(javascript-sdk)!: remove-modules-unneeded ([bd2e1fe](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/bd2e1feb2ff926ff9c9eb984907c2d2bd9cc8027))
* fix(javascript-sdk)!: package-json ([9c03c28](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/9c03c2874cdd552f4f21236d42bb2b783f6e9be6))


### Features

* **javascript-sdk,autoscript-apps,autoscript-suites,mock-api:** add-saml-params-to-resume ([5fcdcd2](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5fcdcd251a6be2441ecb88dda5341457728848a4))
* **javascript-sdk:** add tests to textinputcallback external contribution ([56eca0f](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/56eca0fcb27c5c06f0183fd0bcb80b3a232e7611))
* **javascript-sdk:** added-text-input-callback ([444eeb2](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/444eeb237ae6f5b454089aab84f8d78e9bbd2ed5))
* release- v3.4.0 ([6915d43](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/6915d43a4e04f8f1796ecfae4cabd0c568f3b08d))
* upgrade-nx-14 ([216e801](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/216e801c06d3bd8d4f3d5290e13ac829e20ab034))


### BREAKING CHANGES

* remove the frui and event classes / folders and
references.
* for some reason breaking changes arent triggered by
semver so i'm auto triggering it here
* **javascript-sdk:** commit 48cc494  didn't get picked up for breaking
change, unsure why so i'm adding it here. there isn o breaking change in
this commit
* **javascript-sdk:** remove the ability to use 'modern' as a means of making calls. fetch
complicates the auth process too much for the value it provides. we've
opted to remove this support property, automatically defaulting to the
iframe.

# [4.0.0-beta.4](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2023-04-13)


### Bug Fixes

* **javascript-sdk:** fix-publish-readme-and-dist ([2a06503](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2a065035a67babd263dd896823cf46eb942ccbd0))

# [4.0.0-beta.4](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2023-04-12)


### Bug Fixes

* **javascript-sdk:** fix-publish-readme-and-dist ([2a06503](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2a065035a67babd263dd896823cf46eb942ccbd0))

# [4.0.0-beta.3](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2023-04-12)


### Bug Fixes

* **javascript-sdk:** fix-policy-types ([5a3ac2a](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5a3ac2a3a80b4dff56fc0554b72bb646544b826d))
* **javascript-sdk:** validated-create-password-callback-json ([f619062](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f619062ee13b05dfc29c3b3dcdedd14bb9635a0e))
* **javascript-sdk:** validated-user-name-policies ([b08fcaa](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/b08fcaaf2c3e2498b5e73e1d6aed2751bb026dec))

# [4.0.0-beta.2](https://github.com/ForgeRock/forgerock-javascript-sdk/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2023-04-12)


### Bug Fixes

* **javascript-sdk:** removes-rogue-package-updates-infra ([77dd8da](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/77dd8da94074591f72e4767de66d035383d4b485))


* fix(javascript-sdk)!: remove-modules-unneeded ([bd2e1fe](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/bd2e1feb2ff926ff9c9eb984907c2d2bd9cc8027))


### BREAKING CHANGES

* remove the frui and event classes / folders and
references.

# Changelog

## [3.4.0] - 2022-10-18

- Fixed HTTP headers by capitalizing all header names
- Add support for TextInput Callback
- Fix object checks for device profile callback and use globalThis instead of window

## [3.3.1] - 2022-05-18

- Fixed issue where UMD bundle namespace changed

## [3.3.0] - 2022-04-25

### Added:

- OAuth token threshold config property and proactive refresh of tokens expiring soon
- Add Angular sample app to the repo

## [3.2.2] - 2022-1-31

### Fixed

- Fixed typescript transpilation bug in esmodule config

## [3.2.1] - 2022-1-31

### Fixed

- Updated readme

## [3.2.0] - 2022-1-31

### Fixed

- `/authorize` call not honoring middleware overwrites
- expand middleware passing to call-site so that it overwrites middleware set in `config`

### Added:

- Refactor of end-to-end test suite to use playwright test runner instead of jest
- Upgrade rxjs version from 6 to 7 in `autoscript` files for e2e tests
- Remove SSL certificate dependency in CI
- Move to using Github Actions for CI
- Convert to monorepo using `nx`
- Add react sample app to the repo
- Remove certificate dependency across all sample apps
- Replaced development bundle with a rollup production bundle in javascript-sdk package
- Update Readme's in all packages / samples
- Added a CONTRIBUTING.MD file
- Added a pull request template for contributors

## [3.0.0] - 2021-6-24

### Added

- "Native" Social Login callbacks for both the original AM nodes in 6.5 and the new IDM nodes in 7.0
- SDK Social Login feature officially supports Apple, Facebook and Google
- New `FRAuth` methods for handing redirection to provider and resuming an authentication journey
  - `FRAuth.redirect` for redirecting to an Identity Provider for authentication
  - `FRAuth.resume` supports both return from an IdP and returning from Email Suspend node
- New `FRAuth.start` method that aliases `FRAuth.next` to align native mobile SDKs
- E2E test pages will now follow your OS's dark mode setting

### Fixed

- Arbitrary query parameters are now passed along through to the `/authorize` endpoint supporting the use of ACR values for tree specificity
- Fixed build issue when using Windows PowerShell
- WebAuthn error handling is now standardized according to the WebAuthn spec
- When WebAuthn encounters an error, the SDK now formats the error appropriately for AM and sets it into the hiddenValueCallback; this allows the developer to just send it to AM "as is" or handle it specially when catching the thrown error
- Changed the default behavior in case of unidentified storage, to be the localStorage option
- Increased timeout (20 to 60 seconds) for E2E tests to avoid pure timeout failures

### Breaking

- WebAuthn's thrown error message text has been changed to align with spec, so check all conditionals comparing error message strings
- Renamed `getAuthorizeUrl` method to `getAuthCodeByIframe`
- Removed the single parameter from `createVerifier` function
- Removal of `nonce` function

## [2.2.0] - 2020-12-18

### Added

- Centralized login support has been added
- OAuth authorize endpoint now supports both iframe and fetch through the new `support` property in the config
- Support for TypeScript 4.0

### Fixed

- `step.getStage()` is no longer used in sample app; `getStage(step)` is now used for better compatibility with AM 6.5
- `FRUser.logout` now uses a try-catch around each endpoint call, rather than a single try-catch, ensuring an error in one doesn't interrupt other endpoints being called
- Paths for sample app now point to correct favicon image
- Improved automation testing
- Compatibility with AM 6.5.3 WebAuthn nodes
- Step detection with `getWebAuthnStepType` and "usernameless" configuration
- `getTokens` method with `forceRenew` now revokes existing tokens, if present, before requesting new ones

## [2.1.0] - 2020-08-25

### Added

- Support for "usernameless" login (storing username on WebAuthn capable tech)
- Support for the recovery code display node and the parsing of the codes from the TextOutputCallback
- Support for user verification property for WebAuthn
- Updated support for new IDM nodes for registration and self-service: BooleanAttributeInputCallback and NumberAttributeInputCallback support
- Added SuspendedTextOutputCallback support for the new Email Suspended Node
- Added SessionManager.logout() call back to FRUser.logout()

### Fixed

- Conditionally set user verification, relying party and allow credentials to WebAuthn key options
- Added exclude credentials to script parsing for WebAuthn key options
- Ensure display name and username are correctly parsed and added to WebAuthn key options
- Add authenticator attachment to WebAuthn and other WebAuthn fixes for custom configuration
- Increased entropy for cryptographic functions related to PKCE for both state and verifier
- Improved instructions for cert creation for sample app

### Deprecated

- Name change for `getAuthorizeUrl`: method's name will change to better reflect its behavior in v3
- Removal of `nonce`: this utility is no longer used in the SDK, and therefore will be removed in v3
- Function signature change for `createVerifier`: the parameter will be removed in v3.

## [2.0.0] - 2020-06-22

### Added

- Support for authorization by transaction
- Support for authorization by tree
- Support for device profile collection callback
- Allow server paths to be configurable
- Allow OAuth token storage to be configurable
- Support for request "middleware" for modifying request from SDK
- "Containerize" code base for easier development
- End-to-end tests now use Playwright and mock Node.js server
- Support for WebAuthn script-based authentication

### Fixed

- Increased default timeout to accommodate development/debugging
- Provide alternative token store for Firefox Private IndexedDB bug
- Aligned json-based WebAuthn with 7.0 release of AM

## [1.0.5] - 2020-01-16

### Added

- Support for additional querystring parameters (e.g. `suspendedId`) when invoking authentication trees

## [1.0.4] - 2020-01-06

### Fixed

- Renamed `getWebAuthStepType` to `getWebAuthnStepType` in `FRWebAuthn` module

## [1.0.3] - 2020-01-06

### Added

- Replaced `url` and `querystring` dependencies to avoid build issues in some environments

## [1.0.2] - 2019-12-20

### Added

- Exported `Deferred` and `nonce`

## [1.0.1] - 2019-12-19

### Added

- Server mocking with Mirage JS for E2E tests
- Version header to all OpenAM calls to avoid CSRF problems
- Updated callback interface to reflect that some properties are optional

## [1.0.0] - 2019-12-09

### Added

- WebAuthn module that can be used in custom UIs
- Improvements to `FRCallback`
- Addressed all linter warnings

## [0.9.3] - 2019-11-13

### Fixed

- Non-relative import in FRAuth module

## [0.9.2] - 2019-11-06

### Added

- OAuth2Client obeys `realmPath` configuration setting

## [0.9.1] - 2019-10-28

### Added

- FRPolicy module allows easy consumption and customization of policy-related errors
- Export `SessionManager` module
- `FRStep.type` property to simplify conditional handling of tree responses
- Overhaul and expansion of tests to include unit, integration, and e2e testing

## [0.9.0] - 2019-10-17

### Added

- Initial release for SDK
- Initial npm deployment for beta version
