# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, GitHub Copilot, Gemini, etc.) when working with code in this repository. It follows the open AGENTS.md convention.

> **Note:** CLAUDE.md, GEMINI.md, and .github/copilot-instructions.md in this repository are redirects to AGENTS.md. Edit AGENTS.md only.

## Development Commands

```sh
# Install dependencies
pnpm install

# Full repo checks (affected projects only)
pnpm build
pnpm lint
pnpm test
pnpm e2e

# CI-parity (build + lint + test + e2e on affected)
pnpm exec nx affected --target=build lint test e2e

# Package-scoped commands (preferred for focused work)
pnpm nx build javascript-sdk
pnpm nx lint javascript-sdk
pnpm nx test javascript-sdk
pnpm nx e2e autoscript-suites

# Single test file (javascript-sdk — Jest)
pnpm nx test javascript-sdk --testPathPattern=packages/javascript-sdk/src/fr-auth/callbacks/text-input-callback.test.ts

# Single test file (token-vault — Vitest)
pnpm nx test token-vault -- --run src/lib/token.utils.test.ts

# Single Playwright spec
pnpm nx e2e autoscript-suites -- --grep "your test name"
pnpm nx e2e autoscript-suites -- e2e/autoscript-suites/src/path/to/spec.ts

# Local stacks
pnpm start:token-vault   # serves token-vault-app, token-vault-proxy, mock-api
```

## Architecture Overview

### Module Structure

The SDK is an **Nx + pnpm monorepo**. Higher layers may depend on lower layers — never the reverse.

**Packages (`packages/`):**

- `javascript-sdk` (`@forgerock/javascript-sdk`) — core SDK surface for authentication journeys and OAuth/OIDC flows
  - `FRAuth` drives tree progression (`start` / `next` / `resume`) and returns `FRStep`, `FRLoginSuccess`, or `FRLoginFailure`
  - Callback handling centralized in `fr-auth/callbacks/factory.ts`, mapping callback `type` to concrete callback classes
  - Root export surface curated in `packages/javascript-sdk/src/index.ts`
- `ping-protect` (`@forgerock/ping-protect`) — Ping Protect fraud detection integration; exposed via `PIProtect` API (`start`, `getData`, behavioral controls) and callback types consumed by `javascript-sdk`
- `token-vault` (`@forgerock/token-vault`) — token isolation plugin, split across three exported entry points:
  - `client` (main-app integration)
  - `interceptor` (service worker side)
  - `proxy` (iframe/origin-isolated side)

**E2E (`e2e/`):**

- `autoscript-suites` — Playwright suites for auth journey flows
- `autoscript-apps` — helper app for autoscript suites
- `token-vault-suites` — Playwright suites for token vault flows
- `token-vault-app`, `token-vault-interceptor`, `token-vault-proxy` — multi-origin token vault stack
- `mock-api`, `mock-api-v2` — mock API servers for local/CI e2e runs

### Key Directory Structure

```
packages/
├── javascript-sdk/src/
│   ├── fr-auth/
│   │   ├── callbacks/         # Callback classes
│   │   ├── factory.ts         # type → callback class mapping
│   │   └── index.ts
│   ├── fr-webauthn/           # WebAuthn support
│   ├── oauth2-client/         # OAuth2/OIDC flows
│   ├── token-manager/         # Token lifecycle
│   ├── token-storage/         # Storage abstraction
│   ├── device-client/
│   │   └── device.store.ts    # Device client facade
│   ├── http-client/           # HTTP primitives
│   ├── util/                  # Shared pure utilities
│   └── index.ts               # Public export surface
├── ping-protect/src/lib/
│   └── ping-protect.ts        # PIProtect API
└── token-vault/src/lib/
    ├── client.ts              # Client entry point
    ├── proxy.ts               # Proxy entry point
    ├── worker/
    │   └── interceptor.ts     # Service worker entry point
    ├── token.utils.ts         # Pure token helpers
    ├── network/
    │   └── network.utilities.ts
    ├── types/                 # *.types.ts contracts
    └── worker/
        └── worker.utilities.ts

e2e/
├── autoscript-suites/
├── autoscript-apps/
├── token-vault-suites/
├── mock-api/
└── mock-api-v2/
```

### Internal File Conventions

Architecture is encoded in file names — this is a constraint mechanism, not cosmetic:

| File / suffix                   | Responsibility                                                     |
| ------------------------------- | ------------------------------------------------------------------ |
| `index.ts`                      | Module entry point and public export surface                       |
| `factory.ts`                    | Type-to-class or type-to-function mapping (e.g. callback dispatch) |
| `*.store.ts`                    | Client facade — factory function returns public API                |
| `*.types.ts`                    | Type contracts — no runtime code (`type` and `interface` only)     |
| `*.utils.ts` / `*.utilities.ts` | Pure helpers and transformations — no side-effects, no state       |
| `helpers.ts`                    | Module-local pure helper functions                                 |
| `interfaces.ts`                 | TypeScript interface definitions for a module                      |
| `enums.ts`                      | Enum definitions for a module                                      |
| `constants.ts`                  | Shared constant values                                             |

**Key rules:**

- `*.utils.ts` / `*.utilities.ts` must be pure and stateless — no side-effects
- `*.types.ts` files have no runtime code — `type` and `interface` only
- Callback additions in `javascript-sdk` require wiring in both the callback class under `fr-auth/callbacks/` and the mapping in `fr-auth/callbacks/factory.ts`
- E2E suites declare `implicitDependencies` on the app/service projects they need — preserve/update those when changing suite-app coupling

## Architectural Principles

1. Intentionally & declaratively design your code
2. Unix philosophy
3. Functional programming philosophy
4. Event-driven, Observable (Rx-style) patterns for async management
5. Unidirectional code execution and dependency
6. Immutable-state management
7. Explicit, isolated side-effects ("pushed to the edge")
8. Pure, stateless utilities at the core
9. Functions returning APIs over singleton-style or classes
10. File names as explicit architectural signals

**Key requirements for all code:**

- Decoupled from systems
- Agnostic to frameworks
- Testable by design
- Safe by default
- Privacy of information

## Development Notes

### Key Conventions

- **pnpm only.** `preinstall` enforces with `only-allow pnpm`.
- Prefer Nx target execution over ad-hoc scripts; most workflows are `affected` in CI and project-scoped locally.
- Keep changes project-local and rely on Nx project names (`javascript-sdk`, `token-vault`, `ping-protect`, etc.) from each `project.json`.
- Release process uses Changesets (`pnpm changeset`), with Nx release/changelog configuration in `nx.json`.

### Branch Strategy

- `develop`: main integration branch, PRs target here
- `master`: production/release branch
- Feature branches target `develop` via PR

### CI/CD

- GitHub Actions runs `nx affected` targets on PR/push
- E2E suites are Playwright projects — they start workspace apps and `mock-api` as needed
- Releases are automated via Changesets on merge to `master`
