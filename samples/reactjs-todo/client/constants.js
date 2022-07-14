/*
 * forgerock-sample-web-react
 *
 * constants.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const AM_URL = process.env.AM_URL;
export const API_URL = process.env.API_URL;
// Yes, the debugger boolean is intentionally reversed
export const DEBUGGER = process.env.DEBUGGER_OFF === 'true' ? false : true;
export const JOURNEY_LOGIN = process.env.JOURNEY_LOGIN;
export const JOURNEY_REGISTER = process.env.JOURNEY_REGISTER;
export const WEB_OAUTH_CLIENT = process.env.WEB_OAUTH_CLIENT;
export const REALM_PATH = process.env.REALM_PATH;
export const SESSION_URL = `${AM_URL}json/realms/root/sessions`;
