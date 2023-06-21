/*
 * @forgerock/javascript-sdk
 *
 * fr-webauthn.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const webAuthnRegJSCallback653 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar publicKey = {\n    challenge: new Int8Array([63, -71, 8, -32, 51, 11, 35, -85, -19, -93, -17, 9, -10, 104, 96, -5, -43, -94, 126, 123, 18, 44, -53, 27, 69, -59, -45, -113, 4, -120, -12, -17]).buffer,\n    // Relying Party:\n    rp: {\n        \n        name: "ForgeRock"\n    },\n    // User:\n    user: {\n        id: Uint8Array.from("sgsP5DNBy2TvEhwnWHu1BFRw2_LQepAdjkOfC1z6nxU", function (c) { return c.charCodeAt(0) }),\n        name: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629",\n        displayName: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629"\n    },\n    pubKeyCredParams: [ { "type": "public-key", "alg": -7 }, { "type": "public-key", "alg": -257 } ],\n    attestation: "none",\n    timeout: 60000,\n    excludeCredentials: [],\n    authenticatorSelection: {"userVerification":"discouraged"}\n};\n\nnavigator.credentials.create({publicKey: publicKey})\n    .then(function (newCredentialInfo) {\n        var rawId = newCredentialInfo.id;\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(newCredentialInfo.response.clientDataJSON));\n        var keyData = new Int8Array(newCredentialInfo.response.attestationObject).toString();\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + keyData + "::" + rawId;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });\n',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnAuthJSCallback653 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar acceptableCredentials = [\n    { "type": "public-key", "id": new Int8Array([1, 97, 2, 123, -105, -19, -106, 10, -86, 82, -23, 5, 52, 63, 103, 110, -71, 53, 107, 104, 76, -42, -49, 96, 67, -114, -97, 19, -59, 89, -102, -115, -110, -101, -6, -98, 39, -75, 2, 74, 23, -105, 67, 6, -112, 21, -3, 36, -114, 52, 35, 75, 74, 82, -8, 115, -128, -34, -105, 110, 124, 41, -79, -53, -90, 81, -11, -7, 91, -45, -67, -82, 106, 74, 30, 112, 100, -47, 54, -12, 95, 81, 97, 36, 123, -15, -91, 87, -82, 87, -45, -103, -80, 109, -111, 82, 109, 58, 50, 19, -21, -102, 54, -108, -68, 12, -101, -53, -65, 11, -94, -36, 112, -101, -95, -90, -118, 68, 13, 8, -49, -77, -28, -82, -97, 126, -71, 33, -58, 19, 58, -118, 36, -28, 22, -55, 64, -72, -80, -9, -48, -50, 58, -52, 64, -64, -27, -5, -12, 110, -95, -17]).buffer }\n];\n\nvar options = {\n    \n    challenge: new Int8Array([109, 14, 35, -101, 97, -69, -105, -89, -58, 14, 108, 59, 45, 87, 109, -78, -51, 64, 90, 124, -97, 43, -84, -108, -69, -117, 101, -4, -36, -69, -106, 103]).buffer,\n    timeout: 60000,\n    userVerification: "discouraged",\n    allowCredentials: acceptableCredentials\n};\n\nnavigator.credentials.get({ "publicKey" : options })\n    .then(function (assertion) {\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(assertion.response.clientDataJSON));\n        var authenticatorData = new Int8Array(assertion.response.authenticatorData).toString();\n        var signature = new Int8Array(assertion.response.signature).toString();\n        var rawId = assertion.id;\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + authenticatorData + "::" + signature + "::" + rawId;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });\n',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnRegJSCallback70 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar publicKey = {\n    challenge: new Int8Array([87, -95, 18, -17, -59, -3, -72, -9, -109, 77, -66, 67, 101, -59, -29, -92, -31, -58, 117, -14, 3, -123, 1, -54, -69, -122, 44, 111, 30, 49, 12, 81]).buffer,\n    // Relying Party:\n    rp: {\n        id: "https://user.example.com:3002",\n        name: "ForgeRock"\n    },\n    // User:\n    user: {\n        id: Uint8Array.from("NTdhNWI0ZTQtNjk5OS00YjQ1LWJmODYtYTRmMmU1ZDRiNjI5", function (c) { return c.charCodeAt(0) }),\n        name: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629",\n        displayName: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629"\n    },\n    pubKeyCredParams: [ { "type": "public-key", "alg": -257 }, { "type": "public-key", "alg": -7 } ],\n    attestation: "none",\n    timeout: 60000,\n    excludeCredentials: [{ "type": "public-key", "id": new Int8Array([49, -96, -107, 113, 106, 5, 115, 22, 68, 121, -85, -27, 8, -58, -113, 127, -105, -37, -10, -12, -58, -25, 29, -82, -18, 69, -99, 125, 33, 82, 38, -66, -27, -128, -91, -86, 87, 68, 94, 0, -78, 70, -11, -70, -14, -53, 38, -60, 46, 27, 66, 46, 21, -125, -70, 123, -46, -124, 86, -2, 102, 70, -52, 54]).buffer },{ "type": "public-key", "id": new Int8Array([64, 17, -15, -123, -21, 127, 76, -120, 90, -112, -5, 54, 105, 93, 82, -104, -79, 107, -69, -3, -113, -94, -59, -4, 126, -33, 117, 32, -44, 122, -97, 8, -112, 105, -96, 96, 90, 44, -128, -121, 107, 79, -98, -68, -93, 11, -105, -47, 102, 13, 110, 84, 59, -91, -30, 37, -3, -22, 39, 111, -10, 87, -50, -35]).buffer }],\n    authenticatorSelection: {"userVerification":"preferred"}\n};\n\nnavigator.credentials.create({publicKey: publicKey})\n    .then(function (newCredentialInfo) {\n        var rawId = newCredentialInfo.id;\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(newCredentialInfo.response.clientDataJSON));\n        var keyData = new Int8Array(newCredentialInfo.response.attestationObject).toString();\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + keyData + "::" + rawId;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnAuthJSCallback70 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar options = {\n    \n    challenge: new Int8Array([-2, 85, 78, -80, -124, -6, -118, 15, 77, -30, -76, -27, -43, -19, -51, -68, 60, -80, -64, -102, 73, -103, 76, -77, -96, -28, 5, -23, -59, -36, 1, -1]).buffer,\n    timeout: 60000,\n    allowCredentials: [{ "type": "public-key", "id": new Int8Array([-107, 93, 68, -67, -5, 107, 18, 16, -25, -30, 80, 103, -75, -53, -2, -95, 102, 42, 47, 126, -1, 85, 93, 45, -85, 8, -108, 107, 47, -25, 66, 12, -96, 81, 104, -127, 26, -59, -69, -23, 75, 89, 58, 124, -93, 4, 28, -128, 121, 35, 39, 103, -86, -86, 123, -67, -7, -4, 79, -49, 127, -19, 7, 4]).buffer }]\n};\n\nnavigator.credentials.get({ "publicKey" : options })\n    .then(function (assertion) {\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(assertion.response.clientDataJSON));\n        var authenticatorData = new Int8Array(assertion.response.authenticatorData).toString();\n        var signature = new Int8Array(assertion.response.signature).toString();\n        var rawId = assertion.id;\n        var userHandle = String.fromCharCode.apply(null, new Uint8Array(assertion.response.userHandle));\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + authenticatorData + "::" + signature + "::" + rawId + "::" + userHandle;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });\n',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnRegJSCallback70StoredUsername = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar publicKey = {\n    challenge: new Int8Array([-90, -30, 14, -111, 43, -115, -125, 43, -96, 124, -109, -1, -100, -64, -52, -56, -15, -9, 41, 22, -111, -116, -65, -88, 108, -60, -58, 53, 62, -66, -34, 104]).buffer,\n    // Relying Party:\n    rp: {\n        \n        name: "ForgeRock"\n    },\n    // User:\n    user: {\n        id: Uint8Array.from("NTdhNWI0ZTQtNjk5OS00YjQ1LWJmODYtYTRmMmU1ZDRiNjI5", function (c) { return c.charCodeAt(0) }),\n        name: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629",\n        displayName: "57a5b4e4-6999-4b45-bf86-a4f2e5d4b629"\n    },\n    pubKeyCredParams: [ { "type": "public-key", "alg": -257 }, { "type": "public-key", "alg": -7 } ],\n    attestation: "none",\n    timeout: 60000,\n    excludeCredentials: [],\n    authenticatorSelection: {"userVerification":"preferred","requireResidentKey":true}\n};\n\nnavigator.credentials.create({publicKey: publicKey})\n    .then(function (newCredentialInfo) {\n        var rawId = newCredentialInfo.id;\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(newCredentialInfo.response.clientDataJSON));\n        var keyData = new Int8Array(newCredentialInfo.response.attestationObject).toString();\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + keyData + "::" + rawId;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnAuthJSCallback70StoredUsername = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018-2020 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n */\n\nif (!window.PublicKeyCredential) {\n    document.getElementById(\'webAuthnOutcome\').value = "unsupported";\n    document.getElementById("loginButton_0").click();\n}\n\nvar options = {\n    \n    challenge: new Int8Array([50, -11, 63, -112, 37, -61, 57, 126, 83, -127, 122, -42, -102, -82, 26, -95, -75, -37, 16, 52, 27, 54, -101, 124, -16, 99, 33, 92, 63, 10, -110, 102]).buffer,\n    timeout: 60000,\n    userVerification: "preferred",\n    \n};\n\nnavigator.credentials.get({ "publicKey" : options })\n    .then(function (assertion) {\n        var clientData = String.fromCharCode.apply(null, new Uint8Array(assertion.response.clientDataJSON));\n        var authenticatorData = new Int8Array(assertion.response.authenticatorData).toString();\n        var signature = new Int8Array(assertion.response.signature).toString();\n        var rawId = assertion.id;\n        var userHandle = String.fromCharCode.apply(null, new Uint8Array(assertion.response.userHandle));\n        document.getElementById(\'webAuthnOutcome\').value = clientData + "::" + authenticatorData + "::" + signature + "::" + rawId + "::" + userHandle;\n        document.getElementById("loginButton_0").click();\n    }).catch(function (err) {\n        document.getElementById(\'webAuthnOutcome\').value = "ERROR" + "::" + err;\n        document.getElementById("loginButton_0").click();\n    });\n',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line
            '/*\n * Copyright 2018 ForgeRock AS. All Rights Reserved\n *\n * Use of this code requires a commercial software license with ForgeRock AS.\n * or with one of its affiliates. All use shall be exclusively subject\n * to such license between the licensee and ForgeRock AS.\n *\n */\n\n/*\n * Note:\n *\n * When a ConfirmationCallback is used (e.g. during recovery code use), the XUI does not render a loginButton. However\n * the webAuthn script needs to call loginButton.click() to execute the appropriate data reformatting prior to sending\n * the request into AM. Here we query whether the loginButton exists and add it to the DOM if it doesn\'t.\n */\n\nvar newLocation = document.getElementById("wrapper");\n\nvar script = "<div class=\\"form-group\\">\\n" +\n    "<div class=\\"panel panel-default\\">\\n" +\n    "    <div class=\\"panel-body text-center\\">\\n" +\n    "    <h4 class=\\"awaiting-response\\"><i class=\\"fa fa-circle-o-notch fa-spin text-primary\\"></i> Waiting for local device... </h4>\\n" +\n    "    </div>\\n" +\n    "</div>\\n";\n\nif (!document.getElementById("loginButton_0")) {\n    script += "<input id=\\"loginButton_0\\" role=\\"button\\" type=\\"submit\\" hidden>";\n} else {\n    document.getElementById("loginButton_0").style.visibility=\'hidden\';\n}\n\nscript += "</div>";\n\nnewLocation.getElementsByTagName("fieldset")[0].innerHTML += script;\ndocument.body.appendChild(newLocation);',
        },
        { name: 'messageType', value: '4' },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken3', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnRegMetaCallback70 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            relyingPartyName: 'ForgeRock',
            attestationPreference: 'none',
            displayName: '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629',
            _type: 'WebAuthn',
            relyingPartyId: '',
            userName: '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629',
            authenticatorSelection: '{"userVerification":"preferred"}',
            userId: 'NTdhNWI0ZTQtNjk5OS00YjQ1LWJmODYtYTRmMmU1ZDRiNjI5',
            timeout: '60000',
            excludeCredentials: '',
            pubKeyCredParams:
              '[ { "type": "public-key", "alg": -257 }, { "type": "public-key", "alg": -7 } ]',
            challenge: 'PiIwSUMSo5qN7ahxaBVzWCHnpIxiWZPBix3PDI4/O8k=',
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken2', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnAuthMetaCallback70 = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            userVerification: 'preferred',
            _type: 'WebAuthn',
            challenge: 'J7kVW1EpFY3thLYVMAAJuR9dswysFhqgrBT6vvSuidE=',
            relyingPartyId: '',
            allowCredentials:
              // eslint-disable-next-line
              'allowCredentials: [{ "type": "public-key", "id": new Int8Array([1, 122, 110, -32, -105, -95, -90, 81, 20, -122, -96, -115, -115, 38, -7, 15, -127, 48, 48, 97, 94, -23, -54, 74, 3, -41, -118, -124, 112, 5, -77, 87, -11, 102, -86, 93, 27, 112, -128, 103, -58, -75, 68, -62, -62, 72, -27, 108, -59, 0, -124, -117, -121, -52, -97, -88, -112, 22, 122, 109, 104, -89, -10, 46, -95, 62, 64, 43, -42, 127, -53, -98, 88, -126, -68, -94, -5, 81, -71, -52, -54, -12, -55, 127, -125, 125, 53, -61, 61, 47, -66, -12, 25, 115, -24, -56, 95, 8, -20, -6, 4, 72, -45, -103, -52, 39, 123, 13, 9, -79, 99, -62, 84, -2, -41, 55, 125, 17, 126, -38, -80, -83, -28, 99, -26, -30, -18, 122, 92, -91, -128, -27, 4, 27, -39, 36, 117, 4, 120, 9, -24, -72, 84, 124, 25, 100, -40, 32, 63, -97, 119, 10, 73, 8, -46, 61, 56]).buffer },{ "type": "public-key", "id": new Int8Array([1, 15, 3, 3, 70, 54, 31, -27, -121, 121, 41, 83, -28, -49, 9, -113, -58, 117, -97, 18, 1, 100, -29, 6, -116, -93, 90, -91, 75, -120, -127, 50, 99, -37, -56, -41, 105, 42, 8, -87, -21, 37, -7, 96, -121, -125, -33, 79, 2, -10, 127, -117, 23, 46, 42, 29, 125, 91, 47, -101, 126, 44, 70, -84, -124, -94, -119, -87, 63, -116, 11, -28, 127, 76, -67, 36, -62, 62, -125, -82, 99, 71, 24, 32, -87, 93, 53, 97, -44, 18, -14, 77, 80, 77, 110, -80, -52, 18, 69, 127, 82, -27, -116, 42, -66, -53, -26, -29, 74, 75, 34, -88, -119, 118, -50, -70, -110, -68, -91, -15, 100, 113, 24, 13, -127, 39, -1, -85, 114, -125, 89, 89, -101, 94, -37, 82, -61, 15, -2, 3, -4, 9, 28, -75, -84, 96, 60, 85, -44, -98, -27, -29, 107, -115, -111, -3, -102]).buffer }]',
            timeout: '60000',
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken2', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnRegMetaCallback70StoredUsername = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            relyingPartyName: 'ForgeRock',
            attestationPreference: 'none',
            displayName: '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629',
            _type: 'WebAuthn',
            relyingPartyId: '',
            userName: '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629',
            authenticatorSelection: '{"userVerification":"preferred","requireResidentKey":true}',
            userId: 'NTdhNWI0ZTQtNjk5OS00YjQ1LWJmODYtYTRmMmU1ZDRiNjI5',
            timeout: '60000',
            excludeCredentials: '',
            pubKeyCredParams:
              '[ { "type": "public-key", "alg": -257 }, { "type": "public-key", "alg": -7 } ]',
            challenge: 'DfZ7CvBgBaApXZgcqSb+7/yA5ih/yRHhpDzrrWLMtZc=',
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken2', value: 'webAuthnOutcome' }],
    },
  ],
};

export const webAuthnAuthMetaCallback70StoredUsername = {
  authId: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... ',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            userVerification: 'preferred',
            _type: 'WebAuthn',
            challenge: 'OHmmFKfBhrUZKkuZJ84lf9N8TaRmQSjRdZyueeSIXAo=',
            relyingPartyId: '',
            allowCredentials: '',
            timeout: '60000',
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        { name: 'value', value: 'false' },
        { name: 'id', value: 'webAuthnOutcome' },
      ],
      input: [{ name: 'IDToken2', value: 'webAuthnOutcome' }],
    },
  ],
};
