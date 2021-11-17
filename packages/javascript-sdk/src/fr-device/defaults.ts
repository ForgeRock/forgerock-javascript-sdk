/*
 * @forgerock/javascript-sdk
 *
 * defaults.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const browserProps = [
  'userAgent',
  'appName',
  'appCodeName',
  'appVersion',
  'appMinorVersion',
  'buildID',
  'product',
  'productSub',
  'vendor',
  'vendorSub',
  'browserLanguage',
];
const configurableCategories = [
  'fontNames',
  'displayProps',
  'browserProps',
  'hardwareProps',
  'platformProps',
];
const delay = 30 * 1000;
const devicePlatforms = {
  mac: ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
  windows: ['Win32', 'Win64', 'Windows', 'WinCE'],
  ios: ['iPhone', 'iPad', 'iPod'],
};
const displayProps = ['width', 'height', 'pixelDepth', 'orientation.angle'];
const fontNames = [
  'cursive',
  'monospace',
  'serif',
  'sans-serif',
  'fantasy',
  'Arial',
  'Arial Black',
  'Arial Narrow',
  'Arial Rounded MT Bold',
  'Bookman Old Style',
  'Bradley Hand ITC',
  'Century',
  'Century Gothic',
  'Comic Sans MS',
  'Courier',
  'Courier New',
  'Georgia',
  'Gentium',
  'Impact',
  'King',
  'Lucida Console',
  'Lalit',
  'Modena',
  'Monotype Corsiva',
  'Papyrus',
  'Tahoma',
  'TeX',
  'Times',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Verona',
];
const hardwareProps = [
  'cpuClass',
  'deviceMemory',
  'hardwareConcurrency',
  'maxTouchPoints',
  'oscpu',
];
const platformProps = ['language', 'platform', 'userLanguage', 'systemLanguage'];

export {
  browserProps,
  configurableCategories,
  delay,
  devicePlatforms,
  displayProps,
  fontNames,
  hardwareProps,
  platformProps,
};
