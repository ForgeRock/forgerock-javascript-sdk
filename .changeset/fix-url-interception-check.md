---
'@forgerock/token-vault': patch
---

fix(security): replace substring URL matching with strict equality in evaluateUrlForInterception to prevent URL allow-list bypass via query parameter injection
