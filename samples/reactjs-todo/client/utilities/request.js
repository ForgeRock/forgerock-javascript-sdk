/*
 * forgerock-sample-web-react
 *
 * request.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { API_URL, DEBUGGER } from '../constants';

/**
 * @function request - A convenience function for wrapping around HttpClient
 * @param {string} resource - the resource path for the API server
 * @param {string} method - the method (GET, POST, etc) for the API server
 * @param {string} data - the data to POST against the API server
 * @return {Object} - JSON response from API
 */
export default async function apiRequest(resource, method, data) {
  let json;
  try {
    const response = await fetch(`${API_URL}/${resource}`, {
      body: data && JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: method,
    });
    if (!response.ok) {
      throw new Error(`Status ${response.status}: API request failed`);
    }
    json = await response.json();
  } catch (err) {
    console.error(`Error: API request; ${err}`);

    json = {
      error: err.message,
    };
  }

  return json;
}
