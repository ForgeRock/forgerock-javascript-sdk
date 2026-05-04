---
'@forgerock/javascript-sdk': patch
---

fix: move getAuthenticationCredential back inside try/catch so that WebAuthn cancellation errors (e.g. NotAllowedError) are written to the HiddenValueCallback before re-throwing
