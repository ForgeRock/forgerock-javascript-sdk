/*
 * @forgerock/javascript-sdk
 *
 * http.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @module
 * @ignore
 * These are private utility functions
 */
function isOkOr4xx(response: Response): boolean {
  return response.ok || Math.floor(response.status / 100) === 4;
}

export { isOkOr4xx };
