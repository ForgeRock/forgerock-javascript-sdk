/*
 * @forgerock/javascript-sdk
 *
 * wait.js
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const delay = 0;

export default function wait(req, res, next) {
  setTimeout(() => next(), delay);
}
