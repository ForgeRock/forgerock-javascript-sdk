---
'@forgerock/javascript-sdk': patch
---

remove SharedArray buffer type from webauthn types. A webauthn type should never be a SharedArrayBuffer per spec. https://github.com/microsoft/TypeScript/issues/62168
