# Changelog

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
