/*
 * @forgerock/javascript-sdk
 *
 * script-text.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../auth/enums';

/* eslint-disable max-len */
const displayRecoveryCodes = `/*
* Copyright 2018 ForgeRock AS. All Rights Reserved
*
* Use of this code requires a commercial software license with ForgeRock AS.
* or with one of its affiliates. All use shall be exclusively subject
* to such license between the licensee and ForgeRock AS.
*/\n\nvar newLocation = document.getElementById(\"wrapper\");\nvar oldHtml = newLocation.getElementsByTagName(\"fieldset\")[0].innerHTML;\nnewLocation.getElementsByTagName(\"fieldset\")[0].innerHTML = \"<div class=\\\"panel panel-default\\\">\\n\" +
   \"    <div class=\\\"panel-body text-center\\\">\\n\" +
   \"        <h3>Your Recovery Codes</h3>\\n\" +
   \"        <h4>You must make a copy of these WebAuthn authenticator recovery codes. They cannot be displayed again.</h4>\\n\" +
   \"    </div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"iZmEtxvQ00\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"Eqw3GFVamY\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"nNPqIEtIpS\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"vGhNQpDjP8\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"ItA4W3iBaA\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"JmLQP6XyIo\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"G2e6foNKke\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"h2SqAqvT21\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"q6VX1ojNbI\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"text-center\\\">\\n\" +
   \"IZKIQXAfY2\\n\" +
   \"</div>\\n\" +
   \"<div class=\\\"panel-body text-center\\\">\\n\" +
   \"        <p>Use one of these codes to authenticate if you lose your device, which has been named: <em>New Security Key</em></p>\\n\" +
   \"</div>\\n\" +
   \"</div>\" + oldHtml;\ndocument.body.appendChild(newLocation);\n\n\n
`;

const displayRecoveryCodesResponse = {
  authId: 'foo',
  callbacks: [
    {
      type: 'TextOutputCallback' as CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nvar newLocation = document.getElementById("wrapper");\nvar oldHtml = newLocation.getElementsByTagName("fieldset")[0].innerHTML;\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML = "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "        <h3>Your Recovery Codes</h3>\\n" +\n    "        <h4>You must make a copy of these WebAuthn authenticator recovery codes. They cannot be displayed again.</h4>\\n" +\n    "    </div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "iZmEtxvQ00\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "Eqw3GFVamY\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "nNPqIEtIpS\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "vGhNQpDjP8\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "ItA4W3iBaA\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "JmLQP6XyIo\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "G2e6foNKke\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "h2SqAqvT21\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "q6VX1ojNbI\\n" +\n    "</div>\\n" +\n    "<div class=\\"text-center\\">\\n" +\n    "IZKIQXAfY2\\n" +\n    "</div>\\n" +\n    "<div class=\\"panel-body text-center\\">\\n" +\n    "        <p>Use one of these codes to authenticate if you lose your device, which has been named: <em>New Security Key</em></p>\\n" +\n    "</div>\\n" +\n    "</div>" + oldHtml;\ndocument.body.appendChild(newLocation);\n\n\n',
        },
        { name: 'messageType', value: '4' },
      ],
    },
  ],
};

const expectedRecoveryCodes = [
  'iZmEtxvQ00',
  'Eqw3GFVamY',
  'nNPqIEtIpS',
  'vGhNQpDjP8',
  'ItA4W3iBaA',
  'JmLQP6XyIo',
  'G2e6foNKke',
  'h2SqAqvT21',
  'q6VX1ojNbI',
  'IZKIQXAfY2',
];

const otherResponse = {
  authId: 'foo',
  callbacks: [
    {
      type: 'TextOutputCallback' as CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nvar new Location = foo;',
        },
        { name: 'messageType', value: '4' },
      ],
    },
  ],
};

export { displayRecoveryCodes, displayRecoveryCodesResponse, expectedRecoveryCodes, otherResponse };
