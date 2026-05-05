# Changelog

## 4.7.1

### Patch Changes

- Updated dependencies [[`d14d301`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/d14d301349bb08040363be5dafc01e100fb5862d)]:
  - @forgerock/javascript-sdk@4.9.1

## 4.7.0

### Minor Changes

- [#581](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/581) [`1253482`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/1253482a3c517ba470f4dd8c6e43b89d380d6944) Thanks [@SteinGabriel](https://github.com/SteinGabriel)! - fix(protect): update Protect callback with new Signals SDK config

### Patch Changes

- [#575](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/575) [`8ccfef4`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/8ccfef4532f219960f66e0d283cd6f8585a849f8) Thanks [@ryanbas21](https://github.com/ryanbas21)! - fixes the type of the options param in `PIProtect.start` so it better aligns with output from `PingOneProtectInitializeCallback.getConfig()` as defined in `javascript-sdk` (importantly it no longer expects `_type` and `_action` fields)

- Updated dependencies [[`03135cf`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/03135cf543e3f694d48e6b9e0b9116ccf42737d1), [`1fb1e57`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/1fb1e574a6583b00cecb909534e005da3b7d247e), [`1253482`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/1253482a3c517ba470f4dd8c6e43b89d380d6944)]:
  - @forgerock/javascript-sdk@4.9.0

## 4.6.2

### Patch Changes

- [`90099e5`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/90099e51031fc2672f73eda4388a368a0d54a89f) Thanks [@cerebrl](https://github.com/cerebrl)! - This aligns ping-protect and protect initialize callbacks to the new Journey Nodes

- Updated dependencies [[`0795917`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/0795917321dbee1b148bdb581a1743d197eb81fb), [`f35d9b2`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/f35d9b25c93641acb1d96b643eda59e367931af2), [`90099e5`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/90099e51031fc2672f73eda4388a368a0d54a89f), [`0ddd28f`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/0ddd28f8404401dbe4d379154cfb01c4a1314fbe)]:
  - @forgerock/javascript-sdk@4.8.3

## 4.6.1

### Patch Changes

- [#546](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/546) [`a87b517`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/a87b517c2a2cada9ec07ecdb279cb9b7a4edc35e) Thanks [@ryanbas21](https://github.com/ryanbas21)! - fix the protect-package versioning. no functional changes to protect package, but allow more loose versioning on javascript-sdk

## v4.6.0 (2024-08-15)

### 🚀 Features

- support-metadata-marketplace-protect ([a3494b9](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/a3494b9))

### ❤️ Thank You

- ryanbas21

## [4.4.2] - 2024-05-15

fix(ping-protect): update-module-type by @ryanbas21 in #434
fix(ping-protect): update-signals-sdk by @ryanbas21 in #437
fix(ping-protect): bundling by @ryanbas21 in #440
fix(ping-protect): update-ping-protect-signals-sdk by @ryanbas21 in #441
fix(ping-protect): dynamically load ping protect in start and transpile as esmodule

## [4.4.0] - 2024-03-12

feat(ping-protect): Add a new module for Ping Protect and allow for use of .wellknown endpoint for configuration of PingOne as an oauth server
