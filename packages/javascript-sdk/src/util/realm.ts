/*
 * @forgerock/javascript-sdk
 *
 * realm.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/** @hidden */
function getRealmUrlPath(realmPath?: string): string {
  // Split the path and scrub segments
  const names = (realmPath || '')
    .split('/')
    .map((x) => x.trim())
    .filter((x) => x !== '');

  // Ensure 'root' is the first realm
  if (names[0] !== 'root') {
    names.unshift('root');
  }

  // Concatenate into a URL path
  const urlPath = names.map((x) => `realms/${x}`).join('/');
  return urlPath;
}

export { getRealmUrlPath };
