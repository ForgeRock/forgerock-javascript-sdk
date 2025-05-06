# Changelog

## 4.8.0

### Minor Changes

- [#535](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/535) [`a5daf4c`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/a5daf4cbb4ae9039eaf34d8369e5c92c488e17dd) Thanks [@cerebrl](https://github.com/cerebrl)! - Add new PingOne signoff, remove unneeded /session call, add flag for iframe

- [#537](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/537) [`fc00259`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/fc0025941348a90994bd3931194b13a694964619) Thanks [@cerebrl](https://github.com/cerebrl)! - Add feature to provide JSON outcome response to callback if requested

## 4.7.0

### Minor Changes

- [#530](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/530) [`db41dcc`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/db41dcc31c0d9b2dcc427cc1510ff7f6b2e7801f) Thanks [@ryanbas21](https://github.com/ryanbas21)! - add-device-client

### Patch Changes

- [#527](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/527) [`5119dc0`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/5119dc0a983afd2fe7f986d18a7b6296df9984bd) Thanks [@cerebrl](https://github.com/cerebrl)! - In order to display a more user-friendly name when saving a WebAuthn/Passkey device to an account, we prioritized displayName over userName for assignment to the `name` property of the WebAuthn options object. This avoids the display of UUIDs for saved credentials.

## [4.6.0] - 2024-08-15

### 🚀 Features

- ping-fed-central-login ([57e7c80](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/57e7c80))

- recaptcha-enterprise-callback ([006cec9](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/006cec9))

- support-metadata-marketplace-protect ([a3494b9](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/a3494b9))

- **javascript-sdk:** refactor authorize URL utilities for DaVinci ([b34e458](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/b34e458))

- **javascript-sdk:** recaptcha-enterprise ([8b4656c](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/8b4656c))

### 🩹 Fixes

- **javascript-sdk:** allowed-error-messages ([88ece3f](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/88ece3f))

- **javascript-sdk:** change pkce utility to return storage function ([b4e0fbe](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/b4e0fbe))

### ❤️ Thank You

- Justin Lowery
- ryanbas21

## [4.4.2] - 2024-05-15

Features:
feat: new request header by @juangarmendia05 in #432

Fixes:
fix(javascript-sdk): fix-exports-update-protect by @ryanbas21 in #433
fix(javascript-sdk): circular-dep by @ryanbas21 in #435
fix(javascript-sdk): change x-requested-platform to opt-in by @cerebrl in #438
fix(javascript-sdk): add logout redirect for pingone by @cerebrl in #443

## [4.4.1] - 2024-03-27

Fixes:
fix(javascript-sdk): Export the classes of ping-protect callbacks from index

## [4.4.0] - 2024-03-12

Features:

feat(javascript-sdk): add config.setAsync for wellknown endpoint support
feat(javascript-sdk): handle-device-name-in-response

Fixes
fix(javascript-sdk): add PingOne login error to allowed errors
fix(javascript-sdk): sessionStorage conflict
fix(javascript-sdk): circular-dependency

## [4.3.0] - 2024-01-04

Features

- Make a prefix to the storage keys configurable via the Config class
- Added a QR Code utility class to determine if a step has a QR Code and handle QR Codes in SDK

Fixes

- Fix main and module fields in package.json being undefined

## [4.2.0] - 2023-09-11

Features:

- Added ability for SDK to accept a logLevel and customLogger option in the config. The default to the logger is `none` which means the SDK will no longer output to the console messages/warnings/console.error calls.

## [4.1.2] - 2023-07-20

Features:

- Minor changes to prepare for an upcoming Token Vault release

Fixes:

- fix(javascript-sdk): get-tokens-default-destructure (360df9968d)

## [4.1.1] - 2023-06-29

Features:

- Transaction Authorization advices information adds support for JSON, HTTPClient modified to support this change

Fixes:

- Improved types when in strict mode of Typescript

## [4.0.0] - 2023-05-23

Breaking Changes:

- Dropped UMD bundle support, if you would like to use a UMD bundle it's available in 3.4 or you can produce your own by git cloning the repo and setting up the ability to do so.
- Removed Event and FRUI modules

Deprecated:

- JavaScript support configuration property deprecated.

Features:

- Updated the esmodule bundle
- Added interface to register a name to a webauthn device

Fixes:

- Fixed Policy Types so that a PolicyRequirement array is outputted from `failedPolicies`

Infrastructure:

- Updated tags in github to be prefixed with package name

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
