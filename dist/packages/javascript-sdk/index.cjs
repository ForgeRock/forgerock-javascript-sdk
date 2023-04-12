'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/*
 * @forgerock/javascript-sdk
 *
 * constants.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/** @hidden */
const DEFAULT_TIMEOUT = 60 * 1000;
const DEFAULT_OAUTH_THRESHOLD = 30 * 1000;

/**
 * Sets defaults for options that are required but have no supplied value
 * @param options The options to set defaults for
 * @returns options The options with defaults
 */
function setDefaults(options) {
  return _extends({}, options, {
    oauthThreshold: options.oauthThreshold || DEFAULT_OAUTH_THRESHOLD
  });
}
/**
 * Utility for merging configuration defaults with one-off options.
 *
 * Example:
 *
 * ```js
 * // Establish configuration defaults
 * Config.set({
 *   clientId: 'myApp',
 *   serverConfig: { baseUrl: 'https://openam-domain.com/am' },
 *   tree: 'UsernamePassword'
 * });
 *
 * // Specify overrides as needed
 * const configOverrides = { tree: 'PasswordlessWebAuthn' };
 * const step = await FRAuth.next(undefined, configOverrides);
 */
class Config {
  /**
   * Sets the default options.
   *
   * @param options The options to use as defaults
   */
  static set(options) {
    if (!this.isValid(options)) {
      throw new Error('Configuration is invalid');
    }
    if (options.serverConfig) {
      this.validateServerConfig(options.serverConfig);
    }
    this.options = _extends({}, setDefaults(options));
  }
  /**
   * Merges the provided options with the default options.  Ensures a server configuration exists.
   *
   * @param options The options to merge with defaults
   */
  static get(options) {
    if (!this.options && !options) {
      throw new Error('Configuration has not been set');
    }
    const merged = _extends({}, this.options, options);
    if (!merged.serverConfig || !merged.serverConfig.baseUrl) {
      throw new Error('Server configuration has not been set');
    }
    return merged;
  }
  static isValid(options) {
    return !!(options && options.serverConfig);
  }
  static validateServerConfig(serverConfig) {
    if (!serverConfig.timeout) {
      serverConfig.timeout = DEFAULT_TIMEOUT;
    }
    const url = serverConfig.baseUrl;
    if (url && url.charAt(url.length - 1) !== '/') {
      serverConfig.baseUrl = url + '/';
    }
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var ActionTypes;
(function (ActionTypes) {
  ActionTypes["Authenticate"] = "AUTHENTICATE";
  ActionTypes["Authorize"] = "AUTHORIZE";
  ActionTypes["EndSession"] = "END_SESSION";
  ActionTypes["Logout"] = "LOGOUT";
  ActionTypes["ExchangeToken"] = "EXCHANGE_TOKEN";
  ActionTypes["RefreshToken"] = "REFRESH_TOKEN";
  ActionTypes["ResumeAuthenticate"] = "RESUME_AUTHENTICATE";
  ActionTypes["RevokeToken"] = "REVOKE_TOKEN";
  ActionTypes["StartAuthenticate"] = "START_AUTHENTICATE";
  ActionTypes["UserInfo"] = "USER_INFO";
})(ActionTypes || (ActionTypes = {}));

/*
 * @forgerock/javascript-sdk
 *
 * constants.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @module
 * @ignore
 * These are private constants
 */
const REQUESTED_WITH = 'forgerock-sdk';

/*
 * @forgerock/javascript-sdk
 *
 * timeout.ts
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
function withTimeout(promise, timeout = DEFAULT_TIMEOUT) {
  const effectiveTimeout = timeout || DEFAULT_TIMEOUT;
  const timeoutP = new Promise((_, reject) => window.setTimeout(() => reject(new Error('Timeout')), effectiveTimeout));
  return Promise.race([promise, timeoutP]);
}

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
function getRealmUrlPath(realmPath) {
  // Split the path and scrub segments
  const names = (realmPath || '').split('/').map(x => x.trim()).filter(x => x !== '');
  // Ensure 'root' is the first realm
  if (names[0] !== 'root') {
    names.unshift('root');
  }
  // Concatenate into a URL path
  const urlPath = names.map(x => `realms/${x}`).join('/');
  return urlPath;
}

/*
 * @forgerock/javascript-sdk
 *
 * url.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Returns the base URL including protocol, hostname and any non-standard port.
 * The returned URL does not include a trailing slash.
 */
function getBaseUrl(url) {
  const isNonStandardPort = url.protocol === 'http:' && ['', '80'].indexOf(url.port) === -1 || url.protocol === 'https:' && ['', '443'].indexOf(url.port) === -1;
  const port = isNonStandardPort ? `:${url.port}` : '';
  const baseUrl = `${url.protocol}//${url.hostname}${port}`;
  return baseUrl;
}
function getEndpointPath(endpoint, realmPath, customPaths) {
  const realmUrlPath = getRealmUrlPath(realmPath);
  const defaultPaths = {
    authenticate: `json/${realmUrlPath}/authenticate`,
    authorize: `oauth2/${realmUrlPath}/authorize`,
    accessToken: `oauth2/${realmUrlPath}/access_token`,
    endSession: `oauth2/${realmUrlPath}/connect/endSession`,
    userInfo: `oauth2/${realmUrlPath}/userinfo`,
    revoke: `oauth2/${realmUrlPath}/token/revoke`,
    sessions: `json/${realmUrlPath}/sessions/`
  };
  if (customPaths && customPaths[endpoint]) {
    // TypeScript is not correctly reading the condition above
    // It's thinking that customPaths[endpoint] may result in undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return customPaths[endpoint];
  } else {
    return defaultPaths[endpoint];
  }
}
function resolve(baseUrl, path) {
  const url = new URL(baseUrl);
  if (path.startsWith('/')) {
    return `${getBaseUrl(url)}${path}`;
  }
  const basePath = url.pathname.split('/');
  const destPath = path.split('/').filter(x => !!x);
  const newPath = [...basePath.slice(0, -1), ...destPath].join('/');
  return `${getBaseUrl(url)}${newPath}`;
}
function parseQuery(fullUrl) {
  const url = new URL(fullUrl);
  const query = {};
  url.searchParams.forEach((v, k) => query[k] = v);
  return query;
}
function stringify(data) {
  const pairs = [];
  for (const k in data) {
    if (data[k]) {
      pairs.push(k + '=' + encodeURIComponent(data[k]));
    }
  }
  return pairs.join('&');
}

/*
 * @forgerock/javascript-sdk
 *
 * middleware.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @function middlewareWrapper - A "Node" and "Redux" style middleware that is called just before
 * the request is made from the SDK. This allows you access to the request for modification.
 * @param request - A request object container of the URL and the Request Init object
 * @param action - The action object that is passed into the middleware communicating intent
 * @param action.type - A "Redux" style type that contains the serialized action
 * @param action.payload - The payload of the action that can contain metadata
 * @returns {function} - Function that takes middleware parameter & runs middleware against request
 */
function middlewareWrapper(request,
// eslint-disable-next-line
{
  type,
  payload
}) {
  // no mutation and no reassignment
  const actionCopy = Object.freeze({
    type,
    payload
  });
  return middleware => {
    if (!Array.isArray(middleware)) {
      return request;
    }
    // Copy middleware so the `shift` below doesn't mutate source
    const mwareCopy = middleware.map(fn => fn);
    function iterator() {
      const nextMiddlewareToBeCalled = mwareCopy.shift();
      nextMiddlewareToBeCalled && nextMiddlewareToBeCalled(request, actionCopy, iterator);
      return request;
    }
    return iterator();
  };
}

/**
 * Provides direct access to the OpenAM authentication tree API.
 */

function _await$e(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$d(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class Auth {
  /**
   * Gets the next step in the authentication tree.
   *
   * @param {Step} previousStep The previous step, including any required input.
   * @param {StepOptions} options Configuration default overrides.
   * @return {Step} The next step in the authentication tree.
   */
  static next(previousStep, options) {
    const _this = this;
    return _call$d(function () {
      const {
        middleware,
        realmPath,
        serverConfig,
        tree,
        type
      } = Config.get(options);
      const query = options ? options.query : {};
      const url = _this.constructUrl(serverConfig, realmPath, tree, query);
      const runMiddleware = middlewareWrapper({
        url: new URL(url),
        init: _this.configureRequest(previousStep)
      }, {
        type: previousStep ? ActionTypes.Authenticate : ActionTypes.StartAuthenticate,
        payload: {
          tree,
          type: type ? type : 'service'
        }
      });
      const req = runMiddleware(middleware);
      return _await$e(withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout), function (res) {
        return _await$e(_this.getResponseJson(res));
      });
    });
  }
  static constructUrl(serverConfig, realmPath, tree, query) {
    const treeParams = tree ? {
      authIndexType: 'service',
      authIndexValue: tree
    } : undefined;
    const params = _extends({}, query, treeParams);
    const queryString = Object.keys(params).length > 0 ? `?${stringify(params)}` : '';
    const path = getEndpointPath('authenticate', realmPath, serverConfig.paths);
    const url = resolve(serverConfig.baseUrl, `${path}${queryString}`);
    return url;
  }
  static configureRequest(step) {
    const init = {
      body: step ? JSON.stringify(step) : undefined,
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Accept-API-Version': 'protocol=1.0,resource=2.1',
        'Content-Type': 'application/json',
        'X-Requested-With': REQUESTED_WITH
      }),
      method: 'POST'
    };
    return init;
  }
  static getResponseJson(res) {
    return _call$d(function () {
      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.indexOf('application/json') > -1;
      return _await$e(_await$e(isJson ? res.json() : {}, function (json) {
        json.status = res.status;
        json.ok = res.ok;
        return json;
      }, !isJson));
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Known errors that can occur during authentication.
 */
exports.ErrorCode = void 0;
(function (ErrorCode) {
  ErrorCode["BadRequest"] = "BAD_REQUEST";
  ErrorCode["Timeout"] = "TIMEOUT";
  ErrorCode["Unauthorized"] = "UNAUTHORIZED";
  ErrorCode["Unknown"] = "UNKNOWN";
})(exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * Types of callbacks directly supported by the SDK.
 */
exports.CallbackType = void 0;
(function (CallbackType) {
  CallbackType["BooleanAttributeInputCallback"] = "BooleanAttributeInputCallback";
  CallbackType["ChoiceCallback"] = "ChoiceCallback";
  CallbackType["ConfirmationCallback"] = "ConfirmationCallback";
  CallbackType["DeviceProfileCallback"] = "DeviceProfileCallback";
  CallbackType["HiddenValueCallback"] = "HiddenValueCallback";
  CallbackType["KbaCreateCallback"] = "KbaCreateCallback";
  CallbackType["MetadataCallback"] = "MetadataCallback";
  CallbackType["NameCallback"] = "NameCallback";
  CallbackType["NumberAttributeInputCallback"] = "NumberAttributeInputCallback";
  CallbackType["PasswordCallback"] = "PasswordCallback";
  CallbackType["PollingWaitCallback"] = "PollingWaitCallback";
  CallbackType["ReCaptchaCallback"] = "ReCaptchaCallback";
  CallbackType["RedirectCallback"] = "RedirectCallback";
  CallbackType["SelectIdPCallback"] = "SelectIdPCallback";
  CallbackType["StringAttributeInputCallback"] = "StringAttributeInputCallback";
  CallbackType["SuspendedTextOutputCallback"] = "SuspendedTextOutputCallback";
  CallbackType["TermsAndConditionsCallback"] = "TermsAndConditionsCallback";
  CallbackType["TextInputCallback"] = "TextInputCallback";
  CallbackType["TextOutputCallback"] = "TextOutputCallback";
  CallbackType["ValidatedCreatePasswordCallback"] = "ValidatedCreatePasswordCallback";
  CallbackType["ValidatedCreateUsernameCallback"] = "ValidatedCreateUsernameCallback";
})(exports.CallbackType || (exports.CallbackType = {}));

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
exports.PolicyKey = void 0;
(function (PolicyKey) {
  PolicyKey["CannotContainCharacters"] = "CANNOT_CONTAIN_CHARACTERS";
  PolicyKey["CannotContainDuplicates"] = "CANNOT_CONTAIN_DUPLICATES";
  PolicyKey["CannotContainOthers"] = "CANNOT_CONTAIN_OTHERS";
  PolicyKey["LeastCapitalLetters"] = "AT_LEAST_X_CAPITAL_LETTERS";
  PolicyKey["LeastNumbers"] = "AT_LEAST_X_NUMBERS";
  PolicyKey["MatchRegexp"] = "MATCH_REGEXP";
  PolicyKey["MaximumLength"] = "MAX_LENGTH";
  PolicyKey["MaximumNumber"] = "MAXIMUM_NUMBER_VALUE";
  PolicyKey["MinimumLength"] = "MIN_LENGTH";
  PolicyKey["MinimumNumber"] = "MINIMUM_NUMBER_VALUE";
  PolicyKey["Required"] = "REQUIRED";
  PolicyKey["Unique"] = "UNIQUE";
  PolicyKey["UnknownPolicy"] = "UNKNOWN_POLICY";
  PolicyKey["ValidArrayItems"] = "VALID_ARRAY_ITEMS";
  PolicyKey["ValidDate"] = "VALID_DATE";
  PolicyKey["ValidEmailAddress"] = "VALID_EMAIL_ADDRESS_FORMAT";
  PolicyKey["ValidNameFormat"] = "VALID_NAME_FORMAT";
  PolicyKey["ValidNumber"] = "VALID_NUMBER";
  PolicyKey["ValidPhoneFormat"] = "VALID_PHONE_FORMAT";
  PolicyKey["ValidQueryFilter"] = "VALID_QUERY_FILTER";
  PolicyKey["ValidType"] = "VALID_TYPE";
})(exports.PolicyKey || (exports.PolicyKey = {}));

/*
 * @forgerock/javascript-sdk
 *
 * strings.ts
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
function plural(n, singularText, pluralText) {
  if (n === 1) {
    return singularText;
  }
  return pluralText !== undefined ? pluralText : singularText + 's';
}

/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
function getProp(obj, prop, defaultValue) {
  if (!obj || obj[prop] === undefined) {
    return defaultValue;
  }
  return obj[prop];
}

/*
 * @forgerock/javascript-sdk
 *
 * message-creator.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
const defaultMessageCreator = {
  [exports.PolicyKey.CannotContainCharacters]: (property, params) => {
    const forbiddenChars = getProp(params, 'forbiddenChars', '');
    return `${property} must not contain following characters: "${forbiddenChars}"`;
  },
  [exports.PolicyKey.CannotContainDuplicates]: (property, params) => {
    const duplicateValue = getProp(params, 'duplicateValue', '');
    return `${property}  must not contain duplicates: "${duplicateValue}"`;
  },
  [exports.PolicyKey.CannotContainOthers]: (property, params) => {
    const disallowedFields = getProp(params, 'disallowedFields', '');
    return `${property} must not contain: "${disallowedFields}"`;
  },
  [exports.PolicyKey.LeastCapitalLetters]: (property, params) => {
    const numCaps = getProp(params, 'numCaps', 0);
    return `${property} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`;
  },
  [exports.PolicyKey.LeastNumbers]: (property, params) => {
    const numNums = getProp(params, 'numNums', 0);
    return `${property} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`;
  },
  [exports.PolicyKey.MatchRegexp]: property => `${property} has failed the "MATCH_REGEXP" policy`,
  [exports.PolicyKey.MaximumLength]: (property, params) => {
    const maxLength = getProp(params, 'maxLength', 0);
    return `${property} must be at most ${maxLength} ${plural(maxLength, 'character')}`;
  },
  [exports.PolicyKey.MaximumNumber]: property => `${property} has failed the "MAXIMUM_NUMBER_VALUE" policy`,
  [exports.PolicyKey.MinimumLength]: (property, params) => {
    const minLength = getProp(params, 'minLength', 0);
    return `${property} must be at least ${minLength} ${plural(minLength, 'character')}`;
  },
  [exports.PolicyKey.MinimumNumber]: property => `${property} has failed the "MINIMUM_NUMBER_VALUE" policy`,
  [exports.PolicyKey.Required]: property => `${property} is required`,
  [exports.PolicyKey.Unique]: property => `${property} must be unique`,
  [exports.PolicyKey.UnknownPolicy]: (property, params) => {
    const policyRequirement = getProp(params, 'policyRequirement', 'Unknown');
    return `${property}: Unknown policy requirement "${policyRequirement}"`;
  },
  [exports.PolicyKey.ValidArrayItems]: property => `${property} has failed the "VALID_ARRAY_ITEMS" policy`,
  [exports.PolicyKey.ValidDate]: property => `${property} has an invalid date`,
  [exports.PolicyKey.ValidEmailAddress]: property => `${property} has an invalid email address`,
  [exports.PolicyKey.ValidNameFormat]: property => `${property} has an invalid name format`,
  [exports.PolicyKey.ValidNumber]: property => `${property} has an invalid number`,
  [exports.PolicyKey.ValidPhoneFormat]: property => `${property} has an invalid phone number`,
  [exports.PolicyKey.ValidQueryFilter]: property => `${property} has failed the "VALID_QUERY_FILTER" policy`,
  [exports.PolicyKey.ValidType]: property => `${property} has failed the "VALID_TYPE" policy`
};

/**
 * Utility for processing policy failures into human readable messages.
 *
 * Example:
 *
 * ```js
 * // Create message overrides and extensions as needed
 * const messageCreator = {
 *   [PolicyKey.unique]: (property: string) => (
 *     `this is a custom message for "UNIQUE" policy of ${property}`
 *   ),
 *   CUSTOM_POLICY: (property: string, params: any) => (
 *     `this is a custom message for "${params.policyRequirement}" policy of ${property}`
 *   ),
 * };
 *
 * const thisStep = await FRAuth.next(previousStep);
 *
 * if (thisStep.type === StepType.LoginFailure) {
 *   const messagesStepMethod = thisStep.getProcessedMessage(messageCreator);
 *   const messagesClassMethod = FRPolicy.parseErrors(thisStep, messageCreator)
 * }
 */
class FRPolicy {
  /**
   * Parses policy errors and generates human readable error messages.
   *
   * @param {Step} err The step containing the error.
   * @param {MessageCreator} messageCreator
   * Extensible and overridable custom error messages for policy failures.
   * @return {ProcessedPropertyError[]} Array of objects containing all processed policy errors.
   */
  static parseErrors(err, messageCreator) {
    const errors = [];
    if (err.detail && err.detail.failedPolicyRequirements) {
      err.detail.failedPolicyRequirements.map(x => {
        errors.push.apply(errors, [{
          detail: x,
          messages: this.parseFailedPolicyRequirement(x, messageCreator)
        }]);
      });
    }
    return errors;
  }
  /**
   * Parses a failed policy and returns a string array of error messages.
   *
   * @param {FailedPolicyRequirement} failedPolicy The detail data of the failed policy.
   * @param {MessageCreator} customMessage
   * Extensible and overridable custom error messages for policy failures.
   * @return {string[]} Array of strings with all processed policy errors.
   */
  static parseFailedPolicyRequirement(failedPolicy, messageCreator) {
    const errors = [];
    failedPolicy.policyRequirements.map(policyRequirement => {
      errors.push(this.parsePolicyRequirement(failedPolicy.property, policyRequirement, messageCreator));
    });
    return errors;
  }
  /**
   * Parses a policy error into a human readable error message.
   *
   * @param {string} property The property with the policy failure.
   * @param {PolicyRequirement} policy The policy failure data.
   * @param {MessageCreator} customMessage
   * Extensible and overridable custom error messages for policy failures.
   * @return {string} Human readable error message.
   */
  static parsePolicyRequirement(property, policy, messageCreator = {}) {
    // AM is returning policy requirement failures as JSON strings
    const policyObject = typeof policy === 'string' ? JSON.parse(policy) : _extends({}, policy);
    const policyRequirement = policyObject.policyRequirement;
    // Determine which message creator function to use
    const effectiveMessageCreator = messageCreator[policyRequirement] || defaultMessageCreator[policyRequirement] || defaultMessageCreator[exports.PolicyKey.UnknownPolicy];
    // Flatten the parameters and create the message
    const params = policyObject.params ? _extends({}, policyObject.params, {
      policyRequirement
    }) : {
      policyRequirement
    };
    const message = effectiveMessageCreator(property, params);
    return message;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Types of steps returned by the authentication tree.
 */
exports.StepType = void 0;
(function (StepType) {
  StepType["LoginFailure"] = "LoginFailure";
  StepType["LoginSuccess"] = "LoginSuccess";
  StepType["Step"] = "Step";
})(exports.StepType || (exports.StepType = {}));

/*
 * @forgerock/javascript-sdk
 *
 * fr-login-failure.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
class FRLoginFailure {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    this.payload = payload;
    /**
     * The type of step.
     */
    this.type = exports.StepType.LoginFailure;
  }
  /**
   * Gets the error code.
   */
  getCode() {
    return Number(this.payload.code);
  }
  /**
   * Gets the failure details.
   */
  getDetail() {
    return this.payload.detail;
  }
  /**
   * Gets the failure message.
   */
  getMessage() {
    return this.payload.message;
  }
  /**
   * Gets processed failure message.
   */
  getProcessedMessage(messageCreator) {
    return FRPolicy.parseErrors(this.payload, messageCreator);
  }
  /**
   * Gets the failure reason.
   */
  getReason() {
    return this.payload.reason;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * fr-login-success.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
class FRLoginSuccess {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    this.payload = payload;
    /**
     * The type of step.
     */
    this.type = exports.StepType.LoginSuccess;
  }
  /**
   * Gets the step's realm.
   */
  getRealm() {
    return this.payload.realm;
  }
  /**
   * Gets the step's session token.
   */
  getSessionToken() {
    return this.payload.tokenId;
  }
  /**
   * Gets the step's success URL.
   */
  getSuccessUrl() {
    return this.payload.successUrl;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Base class for authentication tree callback wrappers.
 */
class FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    this.payload = payload;
  }
  /**
   * Gets the name of this callback type.
   */
  getType() {
    return this.payload.type;
  }
  /**
   * Gets the value of the specified input element, or the first element if `selector` is not
   * provided.
   *
   * @param selector The index position or name of the desired element
   */
  getInputValue(selector = 0) {
    return this.getArrayElement(this.payload.input, selector).value;
  }
  /**
   * Sets the value of the specified input element, or the first element if `selector` is not
   * provided.
   *
   * @param selector The index position or name of the desired element
   */
  setInputValue(value, selector = 0) {
    this.getArrayElement(this.payload.input, selector).value = value;
  }
  /**
   * Gets the value of the specified output element, or the first element if `selector`
   * is not provided.
   *
   * @param selector The index position or name of the desired element
   */
  getOutputValue(selector = 0) {
    return this.getArrayElement(this.payload.output, selector).value;
  }
  /**
   * Gets the value of the first output element with the specified name or the
   * specified default value.
   *
   * @param name The name of the desired element
   */
  getOutputByName(name, defaultValue) {
    const output = this.payload.output.find(x => x.name === name);
    return output ? output.value : defaultValue;
  }
  getArrayElement(array, selector = 0) {
    if (array === undefined) {
      throw new Error(`No NameValue array was provided to search (selector ${selector})`);
    }
    if (typeof selector === 'number') {
      if (selector < 0 || selector > array.length - 1) {
        throw new Error(`Selector index ${selector} is out of range`);
      }
      return array[selector];
    }
    if (typeof selector === 'string') {
      const input = array.find(x => x.name === selector);
      if (!input) {
        throw new Error(`Missing callback input entry "${selector}"`);
      }
      return input;
    }
    // Duck typing for RegEx
    if (typeof selector === 'object' && selector.test && Boolean(selector.exec)) {
      const input = array.find(x => selector.test(x.name));
      if (!input) {
        throw new Error(`Missing callback input entry "${selector}"`);
      }
      return input;
    }
    throw new Error('Invalid selector value type');
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * attribute-input-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect attributes.
 *
 * @typeparam T Maps to StringAttributeInputCallback, NumberAttributeInputCallback and
 *     BooleanAttributeInputCallback, respectively
 */
class AttributeInputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the attribute name.
   */
  getName() {
    return this.getOutputByName('name', '');
  }
  /**
   * Gets the attribute prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Gets whether the attribute is required.
   */
  isRequired() {
    return this.getOutputByName('required', false);
  }
  /**
   * Gets the callback's failed policies.
   */
  getFailedPolicies() {
    return this.getOutputByName('failedPolicies', []);
  }
  /**
   * Gets the callback's applicable policies.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPolicies() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getOutputByName('policies', {});
  }
  /**
   * Set if validating value only.
   */
  setValidateOnly(value) {
    this.setInputValue(value, /validateOnly/);
  }
  /**
   * Sets the attribute's value.
   */
  setValue(value) {
    this.setInputValue(value);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * choice-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect an answer to a choice.
 */
class ChoiceCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the choice's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Gets the choice's default answer.
   */
  getDefaultChoice() {
    return this.getOutputByName('defaultChoice', 0);
  }
  /**
   * Gets the choice's possible answers.
   */
  getChoices() {
    return this.getOutputByName('choices', []);
  }
  /**
   * Sets the choice's answer by index position.
   */
  setChoiceIndex(index) {
    const length = this.getChoices().length;
    if (index < 0 || index > length - 1) {
      throw new Error(`${index} is out of bounds`);
    }
    this.setInputValue(index);
  }
  /**
   * Sets the choice's answer by value.
   */
  setChoiceValue(value) {
    const index = this.getChoices().indexOf(value);
    if (index === -1) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(index);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * confirmation-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect a confirmation to a message.
 */
class ConfirmationCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the index position of the confirmation's default answer.
   */
  getDefaultOption() {
    return Number(this.getOutputByName('defaultOption', 0));
  }
  /**
   * Gets the confirmation's message type.
   */
  getMessageType() {
    return Number(this.getOutputByName('messageType', 0));
  }
  /**
   * Gets the confirmation's possible answers.
   */
  getOptions() {
    return this.getOutputByName('options', []);
  }
  /**
   * Gets the confirmation's option type.
   */
  getOptionType() {
    return Number(this.getOutputByName('optionType', 0));
  }
  /**
   * Gets the confirmation's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Set option index.
   */
  setOptionIndex(index) {
    if (index !== 0 && index !== 1) {
      throw new Error(`"${index}" is not a valid choice`);
    }
    this.setInputValue(index);
  }
  /**
   * Set option value.
   */
  setOptionValue(value) {
    const index = this.getOptions().indexOf(value);
    if (index === -1) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(index);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * device-profile-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect device profile data.
 */
class DeviceProfileCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's data.
   */
  getMessage() {
    return this.getOutputByName('message', '');
  }
  /**
   * Does callback require metadata?
   */
  isMetadataRequired() {
    return this.getOutputByName('metadata', false);
  }
  /**
   * Does callback require location data?
   */
  isLocationRequired() {
    return this.getOutputByName('location', false);
  }
  /**
   * Sets the profile.
   */
  setProfile(profile) {
    this.setInputValue(JSON.stringify(profile));
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * hidden-value-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect information indirectly from the user.
 */
class HiddenValueCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * kba-create-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect KBA-style security questions and answers.
 */
class KbaCreateCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Gets the callback's list of pre-defined security questions.
   */
  getPredefinedQuestions() {
    return this.getOutputByName('predefinedQuestions', []);
  }
  /**
   * Sets the callback's security question.
   */
  setQuestion(question) {
    this.setValue('question', question);
  }
  /**
   * Sets the callback's security question answer.
   */
  setAnswer(answer) {
    this.setValue('answer', answer);
  }
  setValue(type, value) {
    if (!this.payload.input) {
      throw new Error('KBA payload is missing input');
    }
    const input = this.payload.input.find(x => x.name.endsWith(type));
    if (!input) {
      throw new Error(`No input has name ending in "${type}"`);
    }
    input.value = value;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * metadata-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to deliver and collect miscellaneous data.
 */
class MetadataCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's data.
   */
  getData() {
    return this.getOutputByName('data', {});
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * name-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect a username.
 */
class NameCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Sets the username.
   */
  setName(name) {
    this.setInputValue(name);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * password-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect a password.
 */
class PasswordCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's failed policies.
   */
  getFailedPolicies() {
    return this.getOutputByName('failedPolicies', []);
  }
  /**
   * Gets the callback's applicable policies.
   */
  getPolicies() {
    return this.getOutputByName('policies', []);
  }
  /**
   * Gets the callback's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Sets the password.
   */
  setPassword(password) {
    this.setInputValue(password);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * polling-wait-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to instruct the system to poll while a backend process completes.
 */
class PollingWaitCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the message to display while polling.
   */
  getMessage() {
    return this.getOutputByName('message', '');
  }
  /**
   * Gets the polling interval in milliseconds.
   */
  getWaitTime() {
    return Number(this.getOutputByName('waitTime', 0));
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * recaptcha-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to integrate reCAPTCHA.
 */
class ReCaptchaCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the reCAPTCHA site key.
   */
  getSiteKey() {
    return this.getOutputByName('recaptchaSiteKey', '');
  }
  /**
   * Sets the reCAPTCHA result.
   */
  setResult(result) {
    this.setInputValue(result);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * redirect-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect an answer to a choice.
 */
class RedirectCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the redirect URL.
   */
  getRedirectUrl() {
    return this.getOutputByName('redirectUrl', '');
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * select-idp-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect an answer to a choice.
 */
class SelectIdPCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the available providers.
   */
  getProviders() {
    return this.getOutputByName('providers', []);
  }
  /**
   * Sets the provider by name.
   */
  setProvider(value) {
    const item = this.getProviders().find(item => item.provider === value);
    if (!item) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(item.provider);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * text-output-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to display a message.
 */
class TextOutputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the message content.
   */
  getMessage() {
    return this.getOutputByName('message', '');
  }
  /**
   * Gets the message type.
   */
  getMessageType() {
    return this.getOutputByName('messageType', '');
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * suspended-text-output-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to display a message.
 */
class SuspendedTextOutputCallback extends TextOutputCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * terms-and-conditions-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect acceptance of terms and conditions.
 */
class TermsAndConditionsCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the terms and conditions content.
   */
  getTerms() {
    return this.getOutputByName('terms', '');
  }
  /**
   * Gets the version of the terms and conditions.
   */
  getVersion() {
    return this.getOutputByName('version', '');
  }
  /**
   * Gets the date of the terms and conditions.
   */
  getCreateDate() {
    const date = this.getOutputByName('createDate', '');
    return new Date(date);
  }
  /**
   * Sets the callback's acceptance.
   */
  setAccepted(accepted = true) {
    this.setInputValue(accepted);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * text-input-callback.ts
 *
 * Copyright (c) 2022 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to retrieve input from the user.
 */
class TextInputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Sets the callback's input value.
   */
  setInput(input) {
    this.setInputValue(input);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * validated-create-password-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect a valid platform password.
 */
class ValidatedCreatePasswordCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's failed policies.
   */
  getFailedPolicies() {
    return this.getOutputByName('failedPolicies', []);
  }
  /**
   * Gets the callback's applicable policies.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPolicies() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getOutputByName('policies', {});
  }
  /**
   * Gets the callback's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Gets whether the password is required.
   */
  isRequired() {
    return this.getOutputByName('required', false);
  }
  /**
   * Sets the callback's password.
   */
  setPassword(password) {
    this.setInputValue(password);
  }
  /**
   * Set if validating value only.
   */
  setValidateOnly(value) {
    this.setInputValue(value, /validateOnly/);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * validated-create-username-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a callback used to collect a valid platform username.
 */
class ValidatedCreateUsernameCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  /**
   * Gets the callback's prompt.
   */
  getPrompt() {
    return this.getOutputByName('prompt', '');
  }
  /**
   * Gets the callback's failed policies.
   */
  getFailedPolicies() {
    return this.getOutputByName('failedPolicies', []);
  }
  /**
   * Gets the callback's applicable policies.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPolicies() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getOutputByName('policies', {});
  }
  /**
   * Gets whether the username is required.
   */
  isRequired() {
    return this.getOutputByName('required', false);
  }
  /**
   * Sets the callback's username.
   */
  setName(name) {
    this.setInputValue(name);
  }
  /**
   * Set if validating value only.
   */
  setValidateOnly(value) {
    this.setInputValue(value, /validateOnly/);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * factory.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @hidden
 */
function createCallback(callback) {
  switch (callback.type) {
    case exports.CallbackType.BooleanAttributeInputCallback:
      return new AttributeInputCallback(callback);
    case exports.CallbackType.ChoiceCallback:
      return new ChoiceCallback(callback);
    case exports.CallbackType.ConfirmationCallback:
      return new ConfirmationCallback(callback);
    case exports.CallbackType.DeviceProfileCallback:
      return new DeviceProfileCallback(callback);
    case exports.CallbackType.HiddenValueCallback:
      return new HiddenValueCallback(callback);
    case exports.CallbackType.KbaCreateCallback:
      return new KbaCreateCallback(callback);
    case exports.CallbackType.MetadataCallback:
      return new MetadataCallback(callback);
    case exports.CallbackType.NameCallback:
      return new NameCallback(callback);
    case exports.CallbackType.NumberAttributeInputCallback:
      return new AttributeInputCallback(callback);
    case exports.CallbackType.PasswordCallback:
      return new PasswordCallback(callback);
    case exports.CallbackType.PollingWaitCallback:
      return new PollingWaitCallback(callback);
    case exports.CallbackType.ReCaptchaCallback:
      return new ReCaptchaCallback(callback);
    case exports.CallbackType.RedirectCallback:
      return new RedirectCallback(callback);
    case exports.CallbackType.SelectIdPCallback:
      return new SelectIdPCallback(callback);
    case exports.CallbackType.StringAttributeInputCallback:
      return new AttributeInputCallback(callback);
    case exports.CallbackType.SuspendedTextOutputCallback:
      return new SuspendedTextOutputCallback(callback);
    case exports.CallbackType.TermsAndConditionsCallback:
      return new TermsAndConditionsCallback(callback);
    case exports.CallbackType.TextInputCallback:
      return new TextInputCallback(callback);
    case exports.CallbackType.TextOutputCallback:
      return new TextOutputCallback(callback);
    case exports.CallbackType.ValidatedCreatePasswordCallback:
      return new ValidatedCreatePasswordCallback(callback);
    case exports.CallbackType.ValidatedCreateUsernameCallback:
      return new ValidatedCreateUsernameCallback(callback);
    default:
      return new FRCallback(callback);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * fr-step.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Represents a single step of an authentication tree.
 */
class FRStep {
  /**
   * @param payload The raw payload returned by OpenAM
   * @param callbackFactory A function that returns am implementation of FRCallback
   */
  constructor(payload, callbackFactory) {
    this.payload = payload;
    /**
     * The type of step.
     */
    this.type = exports.StepType.Step;
    /**
     * The callbacks contained in this step.
     */
    this.callbacks = [];
    if (payload.callbacks) {
      this.callbacks = this.convertCallbacks(payload.callbacks, callbackFactory);
    }
  }
  /**
   * Gets the first callback of the specified type in this step.
   *
   * @param type The type of callback to find.
   */
  getCallbackOfType(type) {
    const callbacks = this.getCallbacksOfType(type);
    if (callbacks.length !== 1) {
      throw new Error(`Expected 1 callback of type "${type}", but found ${callbacks.length}`);
    }
    return callbacks[0];
  }
  /**
   * Gets all callbacks of the specified type in this step.
   *
   * @param type The type of callback to find.
   */
  getCallbacksOfType(type) {
    return this.callbacks.filter(x => x.getType() === type);
  }
  /**
   * Sets the value of the first callback of the specified type in this step.
   *
   * @param type The type of callback to find.
   * @param value The value to set for the callback.
   */
  setCallbackValue(type, value) {
    const callbacks = this.getCallbacksOfType(type);
    if (callbacks.length !== 1) {
      throw new Error(`Expected 1 callback of type "${type}", but found ${callbacks.length}`);
    }
    callbacks[0].setInputValue(value);
  }
  /**
   * Gets the step's description.
   */
  getDescription() {
    return this.payload.description;
  }
  /**
   * Gets the step's header.
   */
  getHeader() {
    return this.payload.header;
  }
  /**
   * Gets the step's stage.
   */
  getStage() {
    return this.payload.stage;
  }
  convertCallbacks(callbacks, callbackFactory) {
    const converted = callbacks.map(x => {
      // This gives preference to the provided factory and falls back to our default implementation
      return (callbackFactory || createCallback)(x) || createCallback(x);
    });
    return converted;
  }
}

/**
 * Provides access to the OpenAM authentication tree API.
 */

function _await$d(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$c(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class FRAuth {
  /**
   * Requests the next step in the authentication tree.
   *
   * Call `FRAuth.next()` recursively.  At each step, check for session token or error, otherwise
   * populate the step's callbacks and call `next()` again.
   *
   * Example:
   *
   * ```js
   * async function nextStep(previousStep) {
   *   const thisStep = await FRAuth.next(previousStep);
   *
   *   switch (thisStep.type) {
   *     case StepType.LoginSuccess:
   *       const token = thisStep.getSessionToken();
   *       break;
   *     case StepType.LoginFailure:
   *       const detail = thisStep.getDetail();
   *       break;
   *     case StepType.Step:
   *       // Populate `thisStep` callbacks here, and then continue
   *       thisStep.setInputValue('foo');
   *       nextStep(thisStep);
   *       break;
   *   }
   * }
   * ```
   *
   * @param previousStep The previous step with its callback values populated
   * @param options Configuration overrides
   * @return The next step in the authentication tree
   */
  static next(previousStep, options) {
    return _call$c(function () {
      return _await$d(Auth.next(previousStep ? previousStep.payload : undefined, options), function (nextPayload) {
        if (nextPayload.authId) {
          // If there's an authId, tree has not been completed
          const callbackFactory = options ? options.callbackFactory : undefined;
          return new FRStep(nextPayload, callbackFactory);
        }
        return !nextPayload.authId && nextPayload.ok ? new FRLoginSuccess(nextPayload) : new FRLoginFailure(nextPayload);
      });
    });
  }
  /**
   * Redirects to the URL identified in the RedirectCallback and saves the full
   * step information to localStorage for retrieval when user returns from login.
   *
   * Example:
   * ```js
   * forgerock.FRAuth.redirect(step);
   * ```
   */
  static redirect(step) {
    const cb = step.getCallbackOfType(exports.CallbackType.RedirectCallback);
    const redirectUrl = cb.getRedirectUrl();
    window.localStorage.setItem(this.previousStepKey, JSON.stringify(step));
    window.location.assign(redirectUrl);
  }
  /**
   * Resumes a tree after returning from an external client or provider.
   * Requires the full URL of the current window. It will parse URL for
   * key-value pairs as well as, if required, retrieves previous step.
   *
   * Example;
   * ```js
   * forgerock.FRAuth.resume(window.location.href)
   * ```
   */
  static resume(url, options) {
    const _this = this;
    return _call$c(function () {
      var _parsedUrl$searchPara, _options$tree, _options$tree2;
      const parsedUrl = new URL(url);
      const code = parsedUrl.searchParams.get('code');
      const error = parsedUrl.searchParams.get('error');
      const errorCode = parsedUrl.searchParams.get('errorCode');
      const errorMessage = parsedUrl.searchParams.get('errorMessage');
      const form_post_entry = parsedUrl.searchParams.get('form_post_entry');
      const nonce = parsedUrl.searchParams.get('nonce');
      const RelayState = parsedUrl.searchParams.get('RelayState');
      const responsekey = parsedUrl.searchParams.get('responsekey');
      const scope = parsedUrl.searchParams.get('scope');
      const state = parsedUrl.searchParams.get('state');
      const suspendedId = parsedUrl.searchParams.get('suspendedId');
      const authIndexValue = (_parsedUrl$searchPara = parsedUrl.searchParams.get('authIndexValue')) != null ? _parsedUrl$searchPara : undefined;
      function requiresPreviousStep() {
        return code && state || form_post_entry || responsekey;
      }
      /**
       * If we are returning back from a provider, the previous redirect step data is required.
       * Retrieve the previous step from localStorage, and then delete it to remove stale data.
       * If suspendedId is present, no previous step data is needed, so skip below conditional.
       */
      let previousStep;
      if (requiresPreviousStep()) {
        const redirectStepString = window.localStorage.getItem(_this.previousStepKey);
        if (!redirectStepString) {
          throw new Error('Error: could not retrieve original redirect information.');
        }
        try {
          previousStep = JSON.parse(redirectStepString);
        } catch (err) {
          throw new Error('Error: could not parse redirect params or step information');
        }
        window.localStorage.removeItem(_this.previousStepKey);
      }
      /**
       * Construct options object from the options parameter and key-value pairs from URL.
       * Ensure query parameters from current URL are the last properties spread in the object.
       */
      const nextOptions = _extends({}, options, {
        query: _extends({}, code && {
          code
        }, error && {
          error
        }, errorCode && {
          errorCode
        }, errorMessage && {
          errorMessage
        }, form_post_entry && {
          form_post_entry
        }, nonce && {
          nonce
        }, RelayState && {
          RelayState
        }, responsekey && {
          responsekey
        }, scope && {
          scope
        }, state && {
          state
        }, suspendedId && {
          suspendedId
        }, options && options.query)
      }, ((_options$tree = options == null ? void 0 : options.tree) != null ? _options$tree : authIndexValue) && {
        tree: (_options$tree2 = options == null ? void 0 : options.tree) != null ? _options$tree2 : authIndexValue
      });
      return _await$d(_this.next(previousStep, nextOptions));
    });
  }
  /**
   * Requests the first step in the authentication tree.
   * This is essentially an alias to calling FRAuth.next without a previous step.
   *
   * @param options Configuration overrides
   * @return The next step in the authentication tree
   */
  static start(options) {
    return _call$c(function () {
      return _await$d(FRAuth.next(undefined, options));
    });
  }
}
FRAuth.previousStepKey = 'FRAuth_PreviousStep';

/*
 * @forgerock/javascript-sdk
 *
 * defaults.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
const browserProps = ['userAgent', 'appName', 'appCodeName', 'appVersion', 'appMinorVersion', 'buildID', 'product', 'productSub', 'vendor', 'vendorSub', 'browserLanguage'];
const configurableCategories = ['fontNames', 'displayProps', 'browserProps', 'hardwareProps', 'platformProps'];
const delay = 30 * 1000;
const devicePlatforms = {
  mac: ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
  windows: ['Win32', 'Win64', 'Windows', 'WinCE'],
  ios: ['iPhone', 'iPad', 'iPod']
};
const displayProps = ['width', 'height', 'pixelDepth', 'orientation.angle'];
const fontNames = ['cursive', 'monospace', 'serif', 'sans-serif', 'fantasy', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Bookman Old Style', 'Bradley Hand ITC', 'Century', 'Century Gothic', 'Comic Sans MS', 'Courier', 'Courier New', 'Georgia', 'Gentium', 'Impact', 'King', 'Lucida Console', 'Lalit', 'Modena', 'Monotype Corsiva', 'Papyrus', 'Tahoma', 'TeX', 'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Verona'];
const hardwareProps = ['cpuClass', 'deviceMemory', 'hardwareConcurrency', 'maxTouchPoints', 'oscpu'];
const platformProps = ['language', 'platform', 'userLanguage', 'systemLanguage'];

/*
 * @forgerock/javascript-sdk
 *
 * collector.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @class Collector - base class for FRDevice
 * Generic collector functions for collecting a device profile attributes
 */
class Collector {
  /**
   * @method reduceToObject - goes one to two levels into source to collect attribute
   * @param props - array of strings; can use dot notation for two level lookup
   * @param src - source of attributes to check
   */
  // eslint-disable-next-line
  reduceToObject(props, src) {
    return props.reduce((prev, curr) => {
      if (curr.includes('.')) {
        const propArr = curr.split('.');
        const prop1 = propArr[0];
        const prop2 = propArr[1];
        const prop = src[prop1] && src[prop1][prop2];
        prev[prop2] = prop != undefined ? prop : '';
      } else {
        prev[curr] = src[curr] != undefined ? src[curr] : null;
      }
      return prev;
    }, {});
  }
  /**
   * @method reduceToString - goes one level into source to collect attribute
   * @param props - array of strings
   * @param src - source of attributes to check
   */
  // eslint-disable-next-line
  reduceToString(props, src) {
    return props.reduce((prev, curr) => {
      prev = `${prev}${src[curr].filename};`;
      return prev;
    }, '');
  }
}

/**
 * @class FRDevice - Collects user device metadata
 *
 * Example:
 *
 * ```js
 * // Instantiate new device object (w/optional config, if needed)
 * const device = new forgerock.FRDevice(
 *   // optional configuration
 * );
 * // override any instance methods, if needed
 * // e.g.: device.getDisplayMeta = () => {};
 *
 * // Call getProfile with required argument obj of boolean properties
 * // of location and metadata
 * const profile = await device.getProfile({
 *   location: isLocationRequired,
 *   metadata: isMetadataRequired,
 * });
 * ```
 */

function _await$c(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$b(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
function _async$2(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function _invoke$4(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
class FRDevice extends Collector {
  constructor(config) {
    super();
    this.config = {
      fontNames,
      devicePlatforms,
      displayProps,
      browserProps,
      hardwareProps,
      platformProps
    };
    if (config) {
      Object.keys(config).forEach(key => {
        if (!configurableCategories.includes(key)) {
          throw new Error('Device profile configuration category does not exist.');
        }
        this.config[key] = config[key];
      });
    }
  }
  getBrowserMeta() {
    if (typeof navigator === 'undefined') {
      console.warn('Cannot collect browser metadata. navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.browserProps, navigator);
  }
  getBrowserPluginsNames() {
    if (!(typeof navigator !== 'undefined' && navigator.plugins)) {
      console.warn('Cannot collect browser plugin information. navigator.plugins is not defined.');
      return '';
    }
    return this.reduceToString(Object.keys(navigator.plugins), navigator.plugins);
  }
  getDeviceName() {
    if (typeof navigator === 'undefined') {
      console.warn('Cannot collect device name. navigator is not defined.');
      return '';
    }
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    switch (true) {
      case this.config.devicePlatforms.mac.includes(platform):
        return 'Mac (Browser)';
      case this.config.devicePlatforms.ios.includes(platform):
        return `${platform} (Browser)`;
      case this.config.devicePlatforms.windows.includes(platform):
        return 'Windows (Browser)';
      case /Android/.test(platform) || /Android/.test(userAgent):
        return 'Android (Browser)';
      case /CrOS/.test(userAgent) || /Chromebook/.test(userAgent):
        return 'Chrome OS (Browser)';
      case /Linux/.test(platform):
        return 'Linux (Browser)';
      default:
        return `${platform || 'Unknown'} (Browser)`;
    }
  }
  getDisplayMeta() {
    if (typeof screen === 'undefined') {
      console.warn('Cannot collect screen information. screen is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.displayProps, screen);
  }
  getHardwareMeta() {
    if (typeof navigator === 'undefined') {
      console.warn('Cannot collect OS metadata. Navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.hardwareProps, navigator);
  }
  getIdentifier() {
    if (!(typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues)) {
      console.warn('Cannot generate profile ID. Crypto and/or getRandomValues is not supported.');
      return '';
    }
    if (!localStorage) {
      console.warn('Cannot store profile ID. localStorage is not supported.');
      return '';
    }
    let id = localStorage.getItem('profile-id');
    if (!id) {
      // generate ID, 3 sections of random numbers: "714524572-2799534390-3707617532"
      id = globalThis.crypto.getRandomValues(new Uint32Array(3)).join('-');
      localStorage.setItem('profile-id', id);
    }
    return id;
  }
  getInstalledFonts() {
    if (typeof document === undefined) {
      console.warn('Cannot collect font data. Global document object is undefined.');
      return '';
    }
    const canvas = document.createElement('canvas');
    if (!canvas) {
      console.warn('Cannot collect font data. Browser does not support canvas element');
      return '';
    }
    const context = canvas.getContext && canvas.getContext('2d');
    if (!context) {
      console.warn('Cannot collect font data. Browser does not support 2d canvas context');
      return '';
    }
    const text = 'abcdefghi0123456789';
    context.font = '72px Comic Sans';
    const baseWidth = context.measureText(text).width;
    const installedFonts = this.config.fontNames.reduce((prev, curr) => {
      context.font = `72px ${curr}, Comic Sans`;
      const newWidth = context.measureText(text).width;
      if (newWidth !== baseWidth) {
        prev = `${prev}${curr};`;
      }
      return prev;
    }, '');
    return installedFonts;
  }
  getLocationCoordinates() {
    return _call$b(function () {
      if (!(typeof navigator !== 'undefined' && navigator.geolocation)) {
        console.warn('Cannot collect geolocation information. navigator.geolocation is not defined.');
        return Promise.resolve({});
      }
      // eslint-disable-next-line no-async-promise-executor
      return _await$c(new Promise(_async$2(function (resolve) {
        navigator.geolocation.getCurrentPosition(position => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }), error => {
          console.warn('Cannot collect geolocation information. ' + error.code + ': ' + error.message);
          resolve({});
        }, {
          enableHighAccuracy: true,
          timeout: delay,
          maximumAge: 0
        });
        return _await$c();
      })));
    });
  }
  getOSMeta() {
    if (typeof navigator === 'undefined') {
      console.warn('Cannot collect OS metadata. navigator is not defined.');
      return {};
    }
    return this.reduceToObject(this.config.platformProps, navigator);
  }
  getProfile({
    location,
    metadata
  }) {
    const _this = this;
    return _call$b(function () {
      const profile = {
        identifier: _this.getIdentifier()
      };
      if (metadata) {
        profile.metadata = {
          hardware: _extends({}, _this.getHardwareMeta(), {
            display: _this.getDisplayMeta()
          }),
          browser: _extends({}, _this.getBrowserMeta(), {
            plugins: _this.getBrowserPluginsNames()
          }),
          platform: _extends({}, _this.getOSMeta(), {
            deviceName: _this.getDeviceName(),
            fonts: _this.getInstalledFonts(),
            timezone: _this.getTimezoneOffset()
          })
        };
      }
      return _await$c(_invoke$4(function () {
        if (location) {
          return _await$c(_this.getLocationCoordinates(), function (_this$getLocationCoor) {
            profile.location = _this$getLocationCoor;
          });
        }
      }, function () {
        return profile;
      }));
    });
  }
  getTimezoneOffset() {
    try {
      return new Date().getTimezoneOffset();
    } catch (err) {
      console.warn('Cannot collect timezone information. getTimezoneOffset is not defined.');
      return null;
    }
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * script-parser.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
function parseDisplayRecoveryCodesText(text) {
  /**
   * e.g. ` ...
   *    "<div class=\"text-center\">\n" +
   *    "iZmEtxvQ00\n" +
   *    "</div>\n" +
   * ... `
   */
  const recoveryCodesMatches = text.match(/\s[\w\W]"([\w]*)\\/g);
  const recoveryCodes = Array.isArray(recoveryCodesMatches) && recoveryCodesMatches.map(substr => {
    // e.g. `"iZmEtxvQ00\`
    const arr = substr.match(/"([\w]*)\\/);
    return Array.isArray(arr) ? arr[1] : '';
  });
  return recoveryCodes || [];
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Utility for handling recovery code nodes.
 *
 * Example:
 *
 * ```js
 * // Determine if step is Display Recovery Codes step
 * const isDisplayRecoveryCodesStep = FRRecoveryCodes.isDisplayStep(step);
 * if (isDisplayRecoveryCodesStep) {
 *   const recoveryCodes = FRRecoveryCodes.getCodes(step);
 *   // Do the UI needful
 * }
 * ```
 */
class FRRecoveryCodes {
  /**
   * Retrieves the recovery codes by parsing the JavaScript message text in callback.
   *
   * @param step The step to evaluate
   * @return Recovery Code values in array
   */
  static getCodes(step) {
    var _this$getDisplayCallb;
    const text = (_this$getDisplayCallb = this.getDisplayCallback(step)) == null ? void 0 : _this$getDisplayCallb.getOutputByName('message', '');
    return parseDisplayRecoveryCodesText(text || '');
  }
  /**
   * Determines if the given step is a Display Recovery Codes step.
   *
   * @param step The step to evaluate
   * @return Is this step a Display Recovery Codes step
   */
  static isDisplayStep(step) {
    return !!this.getDisplayCallback(step);
  }
  /**
   * Gets the recovery codes step.
   *
   * @param step The step to evaluate
   * @return gets the Display Recovery Codes' callback
   */
  static getDisplayCallback(step) {
    return step.getCallbacksOfType(exports.CallbackType.TextOutputCallback).find(x => {
      const cb = x.getOutputByName('message', undefined);
      return cb && (cb.includes('Recovery Codes') || cb.includes('recovery codes'));
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * constants.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @module
 * @ignore
 * These are private constants for TokenStorage
 */
const DB_NAME = 'forgerock-sdk';
/** @hidden */
const TOKEN_KEY = 'tokens';

/*
 * @forgerock/javascript-sdk
 *
 * indexed-db.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides wrapper for tokens with IndexedDB.
 */

function _await$b(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$a(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class IndexedDBWrapper {
  /**
   * Retrieve tokens.
   */
  static get(clientId) {
    return _call$a(function () {
      return _await$b(new Promise((resolve, reject) => {
        const onError = () => reject();
        const openReq = window.indexedDB.open(DB_NAME);
        openReq.onsuccess = () => {
          if (!openReq.result.objectStoreNames.contains(clientId)) {
            openReq.result.close();
            return reject('Client ID not found');
          }
          const getReq = openReq.result.transaction(clientId, 'readonly').objectStore(clientId).get(TOKEN_KEY);
          getReq.onsuccess = event => {
            if (!event || !event.target) {
              throw new Error('Missing storage event target');
            }
            openReq.result.close();
            resolve(event.target.result);
          };
          getReq.onerror = onError;
        };
        openReq.onupgradeneeded = () => {
          openReq.result.close();
          reject('IndexedDB upgrade needed');
        };
        openReq.onerror = onError;
      }));
    });
  }
  /**
   * Saves tokens.
   */
  static set(clientId, tokens) {
    return _call$a(function () {
      return _await$b(new Promise((resolve, reject) => {
        let openReq = window.indexedDB.open(DB_NAME);
        const onSetSuccess = () => {
          openReq.result.close();
          resolve();
        };
        const onError = () => reject();
        const onUpgradeNeeded = () => {
          openReq.result.createObjectStore(clientId);
        };
        const onOpenSuccess = () => {
          if (!openReq.result.objectStoreNames.contains(clientId)) {
            const version = openReq.result.version + 1;
            openReq.result.close();
            openReq = window.indexedDB.open(DB_NAME, version);
            openReq.onupgradeneeded = onUpgradeNeeded;
            openReq.onsuccess = onOpenSuccess;
            openReq.onerror = onError;
            return;
          }
          const txnReq = openReq.result.transaction(clientId, 'readwrite');
          txnReq.onerror = onError;
          const objectStore = txnReq.objectStore(clientId);
          const putReq = objectStore.put(tokens, TOKEN_KEY);
          putReq.onsuccess = onSetSuccess;
          putReq.onerror = onError;
        };
        openReq.onupgradeneeded = onUpgradeNeeded;
        openReq.onsuccess = onOpenSuccess;
        openReq.onerror = onError;
      }));
    });
  }
  /**
   * Removes stored tokens.
   */
  static remove(clientId) {
    return _call$a(function () {
      return _await$b(new Promise((resolve, reject) => {
        const onError = () => reject();
        const openReq = window.indexedDB.open(DB_NAME);
        openReq.onsuccess = () => {
          if (!openReq.result.objectStoreNames.contains(clientId)) {
            return resolve();
          }
          const removeReq = openReq.result.transaction(clientId, 'readwrite').objectStore(clientId).delete(TOKEN_KEY);
          removeReq.onsuccess = () => {
            resolve();
          };
          removeReq.onerror = onError;
        };
        openReq.onerror = onError;
      }));
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * local-storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides wrapper for tokens with localStorage.
 */

function _await$a(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$9(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class LocalStorageWrapper {
  /**
   * Retrieve tokens.
   */
  static get(clientId) {
    return _call$9(function () {
      const tokenString = localStorage.getItem(`${DB_NAME}-${clientId}`);
      try {
        return Promise.resolve(JSON.parse(tokenString || ''));
      } catch (err) {
        console.warn('Could not parse token from localStorage. This could be due to accessing a removed token');
        // Original behavior had an untyped return of undefined for no token
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return _await$a(undefined);
      }
      return _await$a();
    });
  }
  /**
   * Saves tokens.
   */
  static set(clientId, tokens) {
    return _call$9(function () {
      const tokenString = JSON.stringify(tokens);
      localStorage.setItem(`${DB_NAME}-${clientId}`, tokenString);
      return _await$a();
    });
  }
  /**
   * Removes stored tokens.
   */
  static remove(clientId) {
    return _call$9(function () {
      localStorage.removeItem(`${DB_NAME}-${clientId}`);
      return _await$a();
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * session-storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides wrapper for tokens with sessionStorage.
 */

function _await$9(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$8(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class SessionStorageWrapper {
  /**
   * Retrieve tokens.
   */
  static get(clientId) {
    return _call$8(function () {
      const tokenString = sessionStorage.getItem(`${DB_NAME}-${clientId}`);
      try {
        return Promise.resolve(JSON.parse(tokenString || ''));
      } catch (err) {
        console.warn('Could not parse token from sessionStorage. This could be due to accessing a removed token');
        // Original behavior had an untyped return of undefined for no token
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return _await$9(undefined);
      }
      return _await$9();
    });
  }
  /**
   * Saves tokens.
   */
  static set(clientId, tokens) {
    return _call$8(function () {
      const tokenString = JSON.stringify(tokens);
      sessionStorage.setItem(`${DB_NAME}-${clientId}`, tokenString);
      return _await$9();
    });
  }
  /**
   * Removes stored tokens.
   */
  static remove(clientId) {
    return _call$8(function () {
      sessionStorage.removeItem(`${DB_NAME}-${clientId}`);
      return _await$9();
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides access to the token storage API.
 * The type of storage (localStorage, sessionStorage, etc) can be configured
 * through `tokenStore` object on the SDK configuration.
 */

function _await$8(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _invoke$3(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _call$7(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class TokenStorage {
  /**
   * Gets stored tokens.
   */
  static get() {
    const _this = this;
    return _call$7(function () {
      let _exit = false;
      const {
        clientId,
        tokenStore
      } = _this.getClientConfig();
      return _await$8(_invoke$3(function () {
        if (tokenStore === 'sessionStorage') {
          return _await$8(SessionStorageWrapper.get(clientId), function (_await$SessionStorage) {
            _exit = true;
            return _await$SessionStorage;
          });
        } else return function () {
          if (tokenStore === 'localStorage') {
            return _await$8(LocalStorageWrapper.get(clientId), function (_await$LocalStorageWr) {
              _exit = true;
              return _await$LocalStorageWr;
            });
          } else return function () {
            if (tokenStore === 'indexedDB') {
              return _await$8(IndexedDBWrapper.get(clientId), function (_await$IndexedDBWrapp) {
                _exit = true;
                return _await$IndexedDBWrapp;
              });
            } else return function () {
              if (tokenStore && tokenStore.get) {
                // User supplied token store
                return _await$8(tokenStore.get(clientId), function (_await$tokenStore$get) {
                  _exit = true;
                  return _await$tokenStore$get;
                });
              }
            }();
          }();
        }();
      }, function (_result) {
        return _exit ? _result : _await$8(LocalStorageWrapper.get(clientId));
      })); // if tokenStore is undefined, default to localStorage
    });
  }
  /**
   * Saves tokens.
   */
  static set(tokens) {
    const _this2 = this;
    return _call$7(function () {
      let _exit2 = false;
      const {
        clientId,
        tokenStore
      } = _this2.getClientConfig();
      return _await$8(_invoke$3(function () {
        if (tokenStore === 'sessionStorage') {
          return _await$8(SessionStorageWrapper.set(clientId, tokens), function (_await$SessionStorage2) {
            _exit2 = true;
            return _await$SessionStorage2;
          });
        } else return function () {
          if (tokenStore === 'localStorage') {
            return _await$8(LocalStorageWrapper.set(clientId, tokens), function (_await$LocalStorageWr2) {
              _exit2 = true;
              return _await$LocalStorageWr2;
            });
          } else return function () {
            if (tokenStore === 'indexedDB') {
              return _await$8(IndexedDBWrapper.set(clientId, tokens), function (_await$IndexedDBWrapp2) {
                _exit2 = true;
                return _await$IndexedDBWrapp2;
              });
            } else return function () {
              if (tokenStore && tokenStore.set) {
                // User supplied token store
                return _await$8(tokenStore.set(clientId, tokens), function (_await$tokenStore$set) {
                  _exit2 = true;
                  return _await$tokenStore$set;
                });
              }
            }();
          }();
        }();
      }, function (_result5) {
        return _exit2 ? _result5 : _await$8(LocalStorageWrapper.set(clientId, tokens));
      })); // if tokenStore is undefined, default to localStorage
    });
  }
  /**
   * Removes stored tokens.
   */
  static remove() {
    const _this3 = this;
    return _call$7(function () {
      let _exit3 = false;
      const {
        clientId,
        tokenStore
      } = _this3.getClientConfig();
      return _await$8(_invoke$3(function () {
        if (tokenStore === 'sessionStorage') {
          return _await$8(SessionStorageWrapper.remove(clientId), function (_await$SessionStorage3) {
            _exit3 = true;
            return _await$SessionStorage3;
          });
        } else return function () {
          if (tokenStore === 'localStorage') {
            return _await$8(LocalStorageWrapper.remove(clientId), function (_await$LocalStorageWr3) {
              _exit3 = true;
              return _await$LocalStorageWr3;
            });
          } else return function () {
            if (tokenStore === 'indexedDB') {
              return _await$8(IndexedDBWrapper.remove(clientId), function (_await$IndexedDBWrapp3) {
                _exit3 = true;
                return _await$IndexedDBWrapp3;
              });
            } else return function () {
              if (tokenStore && tokenStore.remove) {
                // User supplied token store
                return _await$8(tokenStore.remove(clientId), function (_await$tokenStore$rem) {
                  _exit3 = true;
                  return _await$tokenStore$rem;
                });
              }
            }();
          }();
        }();
      }, function (_result9) {
        return _exit3 ? _result9 : _await$8(LocalStorageWrapper.remove(clientId));
      })); // if tokenStore is undefined, default to localStorage
    });
  }
  static getClientConfig() {
    const {
      clientId,
      tokenStore
    } = Config.get();
    if (!clientId) {
      throw new Error('clientId is required to manage token storage');
    }
    return {
      clientId,
      tokenStore
    };
  }
}

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
function isOkOr4xx(response) {
  return response.ok || Math.floor(response.status / 100) === 4;
}

/*
 * @forgerock/javascript-sdk
 *
 * pkce.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Helper class for generating verifier, challenge and state strings used for
 * Proof Key for Code Exchange (PKCE).
 */

function _await$7(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$6(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class PKCE {
  /**
   * Creates a random state.
   */
  static createState() {
    return this.createRandomString(16);
  }
  /**
   * Creates a random verifier.
   */
  static createVerifier() {
    return this.createRandomString(32);
  }
  /**
   * Creates a SHA-256 hash of the verifier.
   *
   * @param verifier The verifier to hash
   */
  static createChallenge(verifier) {
    const _this = this;
    return _call$6(function () {
      return _await$7(_this.sha256(verifier), function (sha256) {
        const challenge = _this.base64UrlEncode(sha256);
        return challenge;
      });
    });
  }
  /**
   * Creates a base64 encoded, URL-friendly version of the specified array.
   *
   * @param array The array of numbers to encode
   */
  static base64UrlEncode(array) {
    const numbers = Array.prototype.slice.call(array);
    const ascii = window.btoa(String.fromCharCode.apply(null, numbers));
    const urlEncoded = ascii.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return urlEncoded;
  }
  /**
   * Creates a SHA-256 hash of the specified string.
   *
   * @param value The string to hash
   */
  static sha256(value) {
    return _call$6(function () {
      const uint8Array = new TextEncoder().encode(value);
      return _await$7(window.crypto.subtle.digest('SHA-256', uint8Array), function (hashBuffer) {
        const hashArray = new Uint8Array(hashBuffer);
        return hashArray;
      });
    });
  }
  /**
   * Creates a random string.
   *
   * @param size The number for entropy (default: 32)
   */
  static createRandomString(num = 32) {
    const random = new Uint8Array(num);
    window.crypto.getRandomValues(random);
    return btoa(random.join('')).replace(/[^a-zA-Z0-9]+/, '');
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Specifies the type of OAuth flow to invoke.
 */
exports.ResponseType = void 0;
(function (ResponseType) {
  ResponseType["Code"] = "code";
  ResponseType["Token"] = "token";
})(exports.ResponseType || (exports.ResponseType = {}));

function _await$6(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
const allowedErrors = {
  // AM error for consent requirement
  AuthenticationConsentRequired: 'Authentication or consent required',
  // Manual iframe error
  AuthorizationTimeout: 'Authorization timed out',
  // Chromium browser error
  FailedToFetch: 'Failed to fetch',
  // Mozilla browser error
  NetworkError: 'NetworkError when attempting to fetch resource.',
  // Webkit browser error
  CORSError: 'Cross-origin redirection',
  // prompt=none errors
  InteractionNotAllowed: 'The request requires some interaction that is not allowed.'
};
/**
 * OAuth 2.0 client.
 */

function _invoke$2(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _call$5(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class OAuth2Client {
  static createAuthorizeUrl(options) {
    const _this = this;
    return _call$5(function () {
      const {
        clientId,
        middleware,
        redirectUri,
        scope
      } = Config.get(options);
      const requestParams = _extends({}, options.query, {
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: options.responseType,
        scope,
        state: options.state
      }, options.prompt ? {
        prompt: options.prompt
      } : {});
      return _await$6(_invoke$2(function () {
        if (options.verifier) {
          return _await$6(PKCE.createChallenge(options.verifier), function (challenge) {
            requestParams.code_challenge = challenge;
            requestParams.code_challenge_method = 'S256';
          });
        }
      }, function () {
        const runMiddleware = middlewareWrapper({
          url: new URL(_this.getUrl('authorize', requestParams, options)),
          init: {}
        }, {
          type: ActionTypes.Authorize
        });
        const {
          url
        } = runMiddleware(middleware);
        return url.toString();
      }));
    });
  }
  /**
   * Calls the authorize URL with an iframe. If successful,
   * it returns the callback URL with authentication code,
   * optionally using PKCE.
   * Method renamed in v3.
   * Original Name: getAuthorizeUrl
   * New Name: getAuthCodeByIframe
   */
  static getAuthCodeByIframe(options) {
    const _this2 = this;
    return _call$5(function () {
      return _await$6(_this2.createAuthorizeUrl(_extends({}, options, {
        prompt: 'none'
      })), function (url) {
        const {
          serverConfig
        } = Config.get(options);
        return new Promise((resolve, reject) => {
          const iframe = document.createElement('iframe');
          // Define these here to avoid linter warnings
          const noop = () => {
            return;
          };
          let onLoad = noop;
          let cleanUp = noop;
          let timeout = 0;
          cleanUp = () => {
            window.clearTimeout(timeout);
            iframe.removeEventListener('load', onLoad);
            iframe.remove();
          };
          onLoad = () => {
            if (iframe.contentWindow) {
              const newHref = iframe.contentWindow.location.href;
              if (_this2.containsAuthCode(newHref)) {
                cleanUp();
                resolve(newHref);
              } else if (_this2.containsAuthError(newHref)) {
                cleanUp();
                resolve(newHref);
              }
            }
          };
          timeout = window.setTimeout(() => {
            cleanUp();
            reject(new Error(allowedErrors.AuthorizationTimeout));
          }, serverConfig.timeout);
          iframe.style.display = 'none';
          iframe.addEventListener('load', onLoad);
          document.body.appendChild(iframe);
          iframe.src = url;
        });
      });
    });
  }
  /**
   * Exchanges an authorization code for OAuth tokens.
   */
  static getOAuth2Tokens(options) {
    const _this3 = this;
    return _call$5(function () {
      const {
        clientId,
        redirectUri
      } = Config.get(options);
      const requestParams = {
        client_id: clientId,
        code: options.authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      };
      if (options.verifier) {
        requestParams.code_verifier = options.verifier;
      }
      const body = stringify(requestParams);
      const init = {
        body,
        headers: new Headers({
          'Content-Length': body.length.toString(),
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        method: 'POST'
      };
      return _await$6(_this3.request('accessToken', undefined, false, init, options), function (response) {
        return _await$6(_this3.getBody(response), function (responseBody) {
          if (response.status !== 200) {
            const message = typeof responseBody === 'string' ? `Expected 200, received ${response.status}` : _this3.parseError(responseBody);
            throw new Error(message);
          }
          const responseObject = responseBody;
          if (!responseObject.access_token) {
            throw new Error('Access token not found in response');
          }
          let tokenExpiry = undefined;
          if (responseObject.expires_in) {
            tokenExpiry = Date.now() + responseObject.expires_in * 1000;
          }
          return {
            accessToken: responseObject.access_token,
            idToken: responseObject.id_token,
            refreshToken: responseObject.refresh_token,
            tokenExpiry: tokenExpiry
          };
        });
      });
    });
  }
  /**
   * Gets OIDC user information.
   */
  static getUserInfo(options) {
    const _this4 = this;
    return _call$5(function () {
      return _await$6(_this4.request('userInfo', undefined, true, undefined, options), function (response) {
        if (response.status !== 200) {
          throw new Error(`Failed to get user info; received ${response.status}`);
        }
        return _await$6(response.json());
      });
    });
  }
  /**
   * Invokes the OIDC end session endpoint.
   */
  static endSession(options) {
    const _this5 = this;
    return _call$5(function () {
      return _await$6(TokenStorage.get(), function ({
        idToken
      }) {
        const query = {};
        if (idToken) {
          query.id_token_hint = idToken;
        }
        return _await$6(_this5.request('endSession', query, true, undefined, options), function (response) {
          if (!isOkOr4xx(response)) {
            throw new Error(`Failed to end session; received ${response.status}`);
          }
          return response;
        });
      });
    });
  }
  /**
   * Immediately revokes the stored access token.
   */
  static revokeToken(options) {
    const _this6 = this;
    return _call$5(function () {
      const {
        clientId
      } = Config.get(options);
      return _await$6(TokenStorage.get(), function ({
        accessToken
      }) {
        const init = {
          body: stringify({
            client_id: clientId,
            token: accessToken
          }),
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
          method: 'POST'
        };
        return _await$6(_this6.request('revoke', undefined, false, init, options), function (response) {
          if (!isOkOr4xx(response)) {
            throw new Error(`Failed to revoke token; received ${response.status}`);
          }
          return response;
        });
      });
    });
  }
  static request(endpoint, query, includeToken, init, options) {
    const _this7 = this;
    return _call$5(function () {
      const {
        middleware,
        serverConfig
      } = Config.get(options);
      const url = _this7.getUrl(endpoint, query, options);
      const getActionType = endpoint => {
        switch (endpoint) {
          case 'accessToken':
            return ActionTypes.ExchangeToken;
          case 'endSession':
            return ActionTypes.EndSession;
          case 'revoke':
            return ActionTypes.RevokeToken;
          default:
            return ActionTypes.UserInfo;
        }
      };
      init = init || {};
      return _await$6(_invoke$2(function () {
        if (includeToken) {
          return _await$6(TokenStorage.get(), function ({
            accessToken
          }) {
            init.credentials = 'include';
            init.headers = init.headers || new Headers();
            init.headers.set('Authorization', `Bearer ${accessToken}`);
          });
        }
      }, function () {
        const runMiddleware = middlewareWrapper({
          url: new URL(url),
          init
        }, {
          type: getActionType(endpoint)
        });
        const req = runMiddleware(middleware);
        return _await$6(withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout));
      }));
    });
  }
  static containsAuthCode(url) {
    return !!url && /code=([^&]+)/.test(url);
  }
  static containsAuthError(url) {
    return !!url && /error=([^&]+)/.test(url);
  }
  static getBody(response) {
    return _call$5(function () {
      let _exit = false;
      const contentType = response.headers.get('Content-Type');
      return _await$6(_invoke$2(function () {
        if (contentType && contentType.indexOf('application/json') > -1) {
          return _await$6(response.json(), function (_await$response$json) {
            _exit = true;
            return _await$response$json;
          });
        }
      }, function (_result) {
        return _exit ? _result : _await$6(response.text());
      }));
    });
  }
  static parseError(json) {
    if (json) {
      if (json.error && json.error_description) {
        return `${json.error}: ${json.error_description}`;
      }
      if (json.code && json.message) {
        return `${json.code}: ${json.message}`;
      }
    }
    return undefined;
  }
  static getUrl(endpoint, query, options) {
    const {
      realmPath,
      serverConfig
    } = Config.get(options);
    const path = getEndpointPath(endpoint, realmPath, serverConfig.paths);
    let url = resolve(serverConfig.baseUrl, path);
    if (query) {
      url += `?${stringify(query)}`;
    }
    return url;
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides access to the session management API.
 */

function _await$5(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$4(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class SessionManager {
  /**
   * Ends the current session.
   */
  static logout(options) {
    return _call$4(function () {
      const {
        middleware,
        realmPath,
        serverConfig
      } = Config.get(options);
      const init = {
        credentials: 'include',
        headers: new Headers({
          'Accept-API-Version': 'protocol=1.0,resource=2.0',
          'X-Requested-With': REQUESTED_WITH
        }),
        method: 'POST'
      };
      const path = `${getEndpointPath('sessions', realmPath, serverConfig.paths)}?_action=logout`;
      const url = resolve(serverConfig.baseUrl, path);
      const runMiddleware = middlewareWrapper({
        url: new URL(url),
        init
      }, {
        type: ActionTypes.Logout
      });
      const req = runMiddleware(middleware);
      return _await$5(withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout), function (response) {
        if (!isOkOr4xx(response)) {
          throw new Error(`Failed to log out; received ${response.status}`);
        }
        return response;
      });
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2022 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @module
 * @ignore
 * These are private utility functions for Token Manager
 */
function tokensWillExpireWithinThreshold(oauthThreshold, tokenExpiry) {
  if (oauthThreshold && tokenExpiry) {
    return tokenExpiry - oauthThreshold < Date.now();
  }
  return false;
}

const _excluded = ["forceRenew", "login"];
function _await$4(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _catch$3(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _empty$2() {}
function _awaitIgnored$1(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty$2) : Promise.resolve();
  }
}
function _continueIgnored(value) {
  if (value && value.then) {
    return value.then(_empty$2);
  }
}
function _continue$3(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
function _invoke$1(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _call$3(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class TokenManager {
  /**
   * Token Manager class that provides high-level abstraction for Authorization Code flow,
   * PKCE value generation, token exchange and token storage.
   *
   * Supports both embedded authentication as well as external authentication via redirects
   *
   Example 1:
      ```js
   const tokens = forgerock.TokenManager.getTokens({
     forceRenew: true, // If you want to get new tokens, despite existing ones
     login: 'embedded', // If user authentication is handled in-app
     serverConfig: {
       timeout: 5000, // If using "legacy", use a short timeout to catch error
     },
   });
   ```
      Example 2:
      ```js
   const tokens = forgerock.TokenManager.getTokens({
     forceRenew: false, // Will immediately return stored tokens, if they exist
     login: 'redirect', // If user authentication is handled in external Web app
   });
   ```
      Example 3:
      ```js
   const tokens = forgerock.TokenManager.getTokens({
     query: {
       code: 'lFJQYdoQG1u7nUm8 ... ', // Authorization code from redirect URL
       state: 'MTY2NDkxNTQ2Nde3D ... ', // State from redirect URL
     },
   });
   ```
   */
  static getTokens(options) {
    const _this = this;
    return _call$3(function () {
      let tokens = null;
      const {
        clientId,
        oauthThreshold
      } = Config.get(options);
      /**
       * First, let's see if tokens exist locally
       */
      return _await$4(_continue$3(_catch$3(function () {
        return _await$4(TokenStorage.get(), function (_TokenStorage$get) {
          tokens = _TokenStorage$get;
        });
      }, function (error) {
        console.info('No stored tokens available', error);
      }), function () {
        var _options, _options2, _options2$query;
        return tokens && !((_options = options) != null && _options.forceRenew) && !((_options2 = options) != null && (_options2$query = _options2.query) != null && _options2$query.code) && !tokensWillExpireWithinThreshold(oauthThreshold, tokens.tokenExpiry) ? tokens : _invoke$1(function () {
          if (tokens) {
            return _continueIgnored(_catch$3(function () {
              return _await$4(OAuth2Client.revokeToken(options), function () {
                return _awaitIgnored$1(TokenManager.deleteTokens());
              });
            }, function (error) {
              console.warn('Existing tokens could not be revoked or deleted', error);
            }));
          }
        }, function () {
          let _exit = false;
          /**
           * If authorization code and state are passed in, call token exchange
           * and return acquired tokens
           */
          return _invoke$1(function () {
            var _options3, _options3$query, _options4, _options4$query;
            if ((_options3 = options) != null && (_options3$query = _options3.query) != null && _options3$query.code && (_options4 = options) != null && (_options4$query = _options4.query) != null && _options4$query.state) {
              const storedString = window.sessionStorage.getItem(clientId);
              window.sessionStorage.removeItem(clientId);
              const storedValues = JSON.parse(storedString);
              return _await$4(_this.tokenExchange(options, storedValues), function (_await$_this$tokenExc) {
                _exit = true;
                return _await$_this$tokenExc;
              });
            }
          }, function (_result) {
            let _exit2 = false;
            if (_exit) return _result;
            /**
             * If we are here, then we are just beginning the auth code flow,
             * so let's generate authorize PKCE values and URL
             */
            const verifier = PKCE.createVerifier();
            const state = PKCE.createState();
            /** strict mode requires us to be smarter about destructuring */
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const config = _objectWithoutPropertiesLoose(options, _excluded);
            const authorizeUrlOptions = _extends({}, config, {
              responseType: exports.ResponseType.Code,
              state,
              verifier
            });
            /**
             * Attempt to call the authorize URL to retrieve authorization code
             */
            return _continue$3(_catch$3(function () {
              // Check expected browser support
              // To support legacy browsers, iframe works best with short timeout
              return _await$4(OAuth2Client.getAuthCodeByIframe(authorizeUrlOptions), function (_OAuth2Client$getAuth) {
                const parsedUrl = new URL(_OAuth2Client$getAuth);
                // Throw if we have an error param or have no authorization code
                if (parsedUrl.searchParams.get('error')) {
                  throw Error(`${parsedUrl.searchParams.get('error_description')}`);
                } else if (!parsedUrl.searchParams.get('code')) {
                  throw Error(allowedErrors.AuthenticationConsentRequired);
                }
                const parsedQuery = parseQuery(parsedUrl.toString());
                if (!options) {
                  options = {};
                }
                options.query = parsedQuery;
              });
            }, function (err) {
              var _options5;
              // If authorize request fails, handle according to `login` type
              if (!(err instanceof Error) || ((_options5 = options) == null ? void 0 : _options5.login) !== 'redirect') {
                // Throw for any error if login is NOT of type "redirect"
                throw err;
              }
              // Check if error is not one of our allowed errors
              if (allowedErrors.AuthenticationConsentRequired !== err.message && allowedErrors.AuthorizationTimeout !== err.message && allowedErrors.FailedToFetch !== err.message && allowedErrors.NetworkError !== err.message && allowedErrors.InteractionNotAllowed !== err.message &&
              // Safari has a very long error message, so we check for a substring
              !err.message.includes(allowedErrors.CORSError)) {
                // Throw if the error is NOT an explicitly allowed error along with redirect of true
                // as that is a normal response and just requires a redirect
                throw err;
              }
              // Since `login` is configured for "redirect", store authorize values and redirect
              window.sessionStorage.setItem(clientId, JSON.stringify(authorizeUrlOptions));
              return _await$4(OAuth2Client.createAuthorizeUrl(authorizeUrlOptions), function (authorizeUrl) {
                const _window$location$assi = window.location.assign(authorizeUrl);
                _exit2 = true;
                return _window$location$assi;
              });
            }), function (_result2) {
              return _exit2 ? _result2 : _await$4(_this.tokenExchange(options, {
                state,
                verifier
              }));
            });
            /**
             * Exchange authorization code for tokens
             */
          });
        });
      }));
      /**
       * If tokens are stored, no option for `forceRenew` or `query` object with `code`, and do not expire within the configured threshold,
       * immediately return the stored tokens
       */
    });
  }
  static deleteTokens() {
    return _call$3(function () {
      return _await$4(_awaitIgnored$1(TokenStorage.remove()));
    });
  }
  static tokenExchange(options, stored) {
    return _call$3(function () {
      var _options$query, _options$query2, _options$query3, _options$query4;
      /**
       * Ensure incoming state and stored state are equal and authorization code exists
       */
      if (((_options$query = options.query) == null ? void 0 : _options$query.state) !== stored.state) {
        throw new Error('State mismatch');
      }
      if (!((_options$query2 = options.query) != null && _options$query2.code) || Array.isArray((_options$query3 = options.query) == null ? void 0 : _options$query3.code)) {
        throw new Error('Failed to acquire authorization code');
      }
      /**
       * Generate token exchange options
       */
      const authorizationCode = (_options$query4 = options.query) == null ? void 0 : _options$query4.code;
      const verifier = stored.verifier;
      const getTokensOptions = _extends({}, options, {
        authorizationCode,
        verifier
      });
      return _await$4(OAuth2Client.getOAuth2Tokens(getTokensOptions), function (tokens) {
        if (!tokens || !tokens.accessToken) {
          throw new Error('Unable to exchange authorization for tokens');
        }
        return _continue$3(_catch$3(function () {
          return _awaitIgnored$1(TokenStorage.set(tokens));
        }, function (error) {
          console.error('Failed to store tokens', error);
        }), function () {
          return tokens;
        });
      });
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * High-level API for logging a user in/out and getting profile information.
 */

function _await$3(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _call$2(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
function _empty$1() {}
function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty$1) : Promise.resolve();
  }
}
function _catch$2(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _continue$2(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
class FRUser {
  /**
   * Logs the user in with the specified step handler, acquires OAuth tokens, and retrieves
   * user profile.  **Currently not implemented.**
   *
   * @typeparam T The type of user object expected
   * @param handler The function to invoke when handling authentication steps
   * @param options Configuration overrides
   */
  static login(handler, options) {
    return _call$2(function () {
      console.info(handler, options); // Avoid lint errors
      throw new Error('FRUser.login() not implemented');
      return _await$3();
    });
  }
  /**
   * Ends the user's session and revokes OAuth tokens.
   *
   * @param options Configuration overrides
   */
  static logout(options) {
    return _call$2(function () {
      // Just log any exceptions that are thrown, but don't abandon the flow
      return _await$3(_continue$2(_catch$2(function () {
        // Both invalidates the session on the server AND removes browser cookie
        return _awaitIgnored(SessionManager.logout(options));
      }, function () {
        console.warn('Session logout was not successful');
      }), function () {
        return _continue$2(_catch$2(function () {
          // Invalidates session on the server tied to the ID Token
          // Needed for Express environment as session logout is unavailable
          return _awaitIgnored(OAuth2Client.endSession(options));
        }, function () {
          console.warn('OAuth endSession was not successful');
        }), function () {
          return _continue$2(_catch$2(function () {
            return _awaitIgnored(OAuth2Client.revokeToken(options));
          }, function () {
            console.warn('OAuth revokeToken was not successful');
          }), function () {
            return _awaitIgnored(TokenManager.deleteTokens());
          });
        });
      }));
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
exports.WebAuthnOutcome = void 0;
(function (WebAuthnOutcome) {
  WebAuthnOutcome["Error"] = "ERROR";
  WebAuthnOutcome["Unsupported"] = "unsupported";
})(exports.WebAuthnOutcome || (exports.WebAuthnOutcome = {}));
var WebAuthnOutcomeType;
(function (WebAuthnOutcomeType) {
  WebAuthnOutcomeType["AbortError"] = "AbortError";
  WebAuthnOutcomeType["DataError"] = "DataError";
  WebAuthnOutcomeType["ConstraintError"] = "ConstraintError";
  WebAuthnOutcomeType["EncodingError"] = "EncodingError";
  WebAuthnOutcomeType["InvalidError"] = "InvalidError";
  WebAuthnOutcomeType["NetworkError"] = "NetworkError";
  WebAuthnOutcomeType["NotAllowedError"] = "NotAllowedError";
  WebAuthnOutcomeType["NotSupportedError"] = "NotSupportedError";
  WebAuthnOutcomeType["SecurityError"] = "SecurityError";
  WebAuthnOutcomeType["TimeoutError"] = "TimeoutError";
  WebAuthnOutcomeType["UnknownError"] = "UnknownError";
})(WebAuthnOutcomeType || (WebAuthnOutcomeType = {}));
exports.WebAuthnStepType = void 0;
(function (WebAuthnStepType) {
  WebAuthnStepType[WebAuthnStepType["None"] = 0] = "None";
  WebAuthnStepType[WebAuthnStepType["Authentication"] = 1] = "Authentication";
  WebAuthnStepType[WebAuthnStepType["Registration"] = 2] = "Registration";
})(exports.WebAuthnStepType || (exports.WebAuthnStepType = {}));

/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
function ensureArray(arr) {
  return arr || [];
}
function arrayBufferToString(arrayBuffer) {
  // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
  // gives us and let AM disregard randomly-injected properties
  const uint8Array = new Uint8Array(arrayBuffer);
  const txtDecoder = new TextDecoder();
  const json = txtDecoder.decode(uint8Array);
  return json;
}
function getIndexOne(arr) {
  return arr ? arr[1] : '';
}
// TODO: Remove this once AM is providing fully-serialized JSON
function parseCredentials(value) {
  try {
    const creds = value.split('}').filter(x => !!x && x !== ']').map(x => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const idArray = parseNumberArray(x);
      return {
        id: new Int8Array(idArray).buffer,
        type: 'public-key'
      };
    });
    return creds;
  } catch (error) {
    const e = new Error('Transforming credential object to string failed');
    e.name = WebAuthnOutcomeType.EncodingError;
    throw e;
  }
}
function parseNumberArray(value) {
  const matches = /new Int8Array\((.+)\)/.exec(value);
  if (matches === null || matches.length < 2) {
    return [];
  }
  return JSON.parse(matches[1]);
}
function parsePubKeyArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'string') {
    return undefined;
  }
  if (value && value[0] === '[') {
    return JSON.parse(value);
  }
  value = value.replace(/(\w+):/g, '"$1":');
  return JSON.parse(`[${value}]`);
}
/**
 * AM is currently serializing RP as one of the following formats, depending on
 * whether RP ID has been configured:
 *   "relyingPartyId":""
 *   "relyingPartyId":"rpId: \"foo\","
 * This regex handles both formats, but should be removed once AM is fixed.
 */
function parseRelyingPartyId(relyingPartyId) {
  if (relyingPartyId.includes('rpId')) {
    return relyingPartyId.replace(/rpId: "(.+)",/, '$1');
  } else {
    return relyingPartyId.replace(/id: "(.+)",/, '$1');
  }
}

function parseWebAuthnRegisterText(text) {
  const txtEncoder = new TextEncoder();
  // TODO: Incrementally move to `*` instead of `{0,}`
  // e.g. `attestation: "none"`
  const attestation = getIndexOne(text.match(/attestation"{0,}:\s{0,}"(\w+)"/));
  // e.g. `timeout: 60000`
  const timeout = Number(getIndexOne(text.match(/timeout"{0,}:\s{0,}(\d+)/)));
  // e.g. from 7.0: `"userVerification":"preferred"`
  // e.g. from 6.5: `userVerification: "preferred"`
  const userVerification = getIndexOne(text.match(/userVerification"{0,}:\s{0,}"(\w+)"/));
  // e.g. `"requireResidentKey":true`
  const requireResidentKey = getIndexOne(text.match(/requireResidentKey"{0,}:\s{0,}(\w+)/));
  // e.g. `"authenticatorAttachment":"cross-platform"`
  const authenticatorAttachment = getIndexOne(text.match(/authenticatorAttachment"{0,}:\s{0,}"([\w-]+)/));
  // e.g. `rp: {\n id: \"https://user.example.com:3002\",\n name: \"ForgeRock\"\n }`
  const rp = getIndexOne(text.match(/rp"{0,}:\s{0,}{([^}]+)}/)).trim();
  // e.g. `id: \"example.com\"
  const rpId = getIndexOne(rp.match(/id"{0,}:\s{0,}"([^"]*)"/));
  // e.g. `name: \"ForgeRock\"`
  const rpName = getIndexOne(rp.match(/name"{0,}:\s{0,}"([^"]*)"/));
  // e.g. `user: {\n id: Uint8Array.from(\"NTdhN...RiNjI5\",
  // function (c) { return c.charCodeAt(0) }),\n
  // name: \"57a5b4e4-...-a4f2e5d4b629\",\n
  // displayName: \"57a5b4e4-...-a4f2e5d4b629\"\n }`
  const user = getIndexOne(text.match(/user"{0,}:\s{0,}{([^]{0,})},/)).trim();
  // e.g `id: Uint8Array.from(\"NTdhN...RiNjI5\",`
  const userId = getIndexOne(user.match(/id"{0,}:\s{0,}Uint8Array.from\("([^"]+)"/));
  // e.g. `name: \"57a5b4e4-...-a4f2e5d4b629\",`
  const userName = getIndexOne(user.match(/name"{0,}:\s{0,}"([\d\w._-]+)"/));
  // e.g. `displayName: \"57a5b4e4-...-a4f2e5d4b629\"`
  const userDisplayName = getIndexOne(user.match(/displayName"{0,}:\s{0,}"([\d\w\s.@_-]+)"/));
  // e.g. `pubKeyCredParams: [
  // { \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }
  // ]`
  const pubKeyCredParamsString = getIndexOne(
  // Capture the `pubKeyCredParams` without also matching `excludeCredentials` as well.
  // `excludeCredentials` values are very similar to this property, so we need to make sure
  // our last value doesn't end with "buffer", so we are only capturing objects that
  // end in a digit and possibly a space.
  text.match(/pubKeyCredParams"*:\s*\[([^]+\d\s*})\s*]/)).trim();
  // e.g. `{ \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }`
  const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
  if (!pubKeyCredParams) {
    const e = new Error('Missing pubKeyCredParams property from registration options');
    e.name = WebAuthnOutcomeType.DataError;
    throw e;
  }
  // e.g. `excludeCredentials: [{
  // \"type\": \"public-key\", \"id\": new Int8Array([-18, 69, -99, 82, 38, -66]).buffer },
  // { \"type\": \"public-key\", \"id\": new Int8Array([64, 17, -15, 56, -32, 91]).buffer }],\n`
  const excludeCredentialsString = getIndexOne(text.match(/excludeCredentials"{0,}:\s{0,}\[([^]+)\s{0,}]/)).trim();
  // e.g. `{ \"type\": \"public-key\", \"id\": new Int8Array([-18, 69, -99, 82, 38, -66]).buffer },
  // { \"type\": \"public-key\", \"id\": new Int8Array([64, 17, -15, 56, -32, 91]).buffer }`
  const excludeCredentials = parseCredentials(excludeCredentialsString);
  // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
  const challengeArr = ensureArray(text.match(/challenge"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
  // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
  const challengeJSON = JSON.parse(challengeArr[2]);
  // e.g. [87, -95, 18, ... -3,  49, 12, 81]
  const challenge = new Int8Array(challengeJSON).buffer;
  return _extends({
    attestation,
    authenticatorSelection: _extends({
      userVerification
    }, authenticatorAttachment && {
      authenticatorAttachment
    }, requireResidentKey === 'true' && {
      requireResidentKey: !!requireResidentKey
    }),
    challenge
  }, excludeCredentials.length && {
    excludeCredentials
  }, {
    pubKeyCredParams,
    rp: _extends({
      name: rpName
    }, rpId && {
      id: rpId
    }),
    timeout,
    user: {
      displayName: userDisplayName,
      id: txtEncoder.encode(userId),
      name: userName
    }
  });
}
function parseWebAuthnAuthenticateText(text) {
  let allowCredentials;
  let allowCredentialsText;
  if (text.includes('acceptableCredentials')) {
    // e.g. `var acceptableCredentials = [
    //  { "type": "public-key", "id": new Int8Array([1, 97, 2, 123, ... -17]).buffer }
    // ];`
    allowCredentialsText = getIndexOne(text.match(/acceptableCredentials"*\s*=\s*\[([^]+)\s*]/)).trim();
  } else {
    // e.g. `allowCredentials: [
    // { \"type\": \"public-key\",
    // \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer }
    // ]`
    allowCredentialsText = getIndexOne(text.match(/allowCredentials"{0,}:\s{0,}\[([^]+)\s{0,}]/)).trim();
  }
  // e.g. `"userVerification":"preferred"`
  const userVerification = getIndexOne(text.match(/userVerification"{0,}:\s{0,}"(\w+)"/));
  if (allowCredentialsText) {
    // Splitting objects in array in case the user has multiple keys
    const allowCredentialArr = allowCredentialsText.split('},') || [allowCredentialsText];
    // Iterating over array of substrings
    allowCredentials = allowCredentialArr.map(str => {
      // e.g. `{ \"type\": \"public-key\",
      const type = getIndexOne(str.match(/type"{0,}:\s{0,}"([\w-]+)"/));
      // e.g. \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer
      const idArr = ensureArray(str.match(/id"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
      // e.g. `[-107, 93, 68, -67, ... -19, 7, 4]`
      const idJSON = JSON.parse(idArr[2]);
      // e.g. [-107, 93, 68, -67, ... -19, 7, 4]
      const id = new Int8Array(idJSON).buffer;
      return {
        type,
        id
      };
    });
  }
  // e.g. `timeout: 60000`
  const timeout = Number(getIndexOne(text.match(/timeout"{0,}:\s{0,}(\d+)/)));
  // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
  const challengeArr = ensureArray(text.match(/challenge"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
  // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
  const challengeJSON = JSON.parse(challengeArr[2]);
  // e.g. [87, -95, 18, ... -3,  49, 12, 81]
  const challenge = new Int8Array(challengeJSON).buffer;
  // e.g. `rpId: \"example.com\"`
  const rpId = getIndexOne(text.match(/rpId"{0,}:\s{0,}\\{0,}"([^"\\]*)/));
  return _extends({
    challenge,
    timeout
  }, allowCredentials && {
    allowCredentials
  }, userVerification && {
    userVerification
  }, rpId && {
    rpId
  });
}

/**
 * Utility for integrating a web browser's WebAuthn API.
 *
 * Example:
 *
 * ```js
 * // Determine if a step is a WebAuthn step
 * const stepType = FRWebAuthn.getWebAuthnStepType(step);
 * if (stepType === WebAuthnStepType.Registration) {
 *   // Register a new device
 *   await FRWebAuthn.register(step);
 * } else if (stepType === WebAuthnStepType.Authentication) {
 *   // Authenticate with a registered device
 *   await FRWebAuthn.authenticate(step);
 * }
 * ```
 */

function _await$2(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _continue$1(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
function _call$1(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
class FRWebAuthn {
  /**
   * Determines if the given step is a WebAuthn step.
   *
   * @param step The step to evaluate
   * @return A WebAuthnStepType value
   */
  static getWebAuthnStepType(step) {
    const outcomeCallback = this.getOutcomeCallback(step);
    const metadataCallback = this.getMetadataCallback(step);
    const textOutputCallback = this.getTextOutputCallback(step);
    if (outcomeCallback && metadataCallback) {
      const metadata = metadataCallback.getOutputValue('data');
      if (metadata != null && metadata.pubKeyCredParams) {
        return exports.WebAuthnStepType.Registration;
      }
      return exports.WebAuthnStepType.Authentication;
    } else if (outcomeCallback && textOutputCallback) {
      const message = textOutputCallback.getMessage();
      if (message.includes('pubKeyCredParams')) {
        return exports.WebAuthnStepType.Registration;
      }
      return exports.WebAuthnStepType.Authentication;
    } else {
      return exports.WebAuthnStepType.None;
    }
  }
  /**
   * Populates the step with the necessary authentication outcome.
   *
   * @param step The step that contains WebAuthn authentication data
   * @return The populated step
   */
  static authenticate(step) {
    const _this = this;
    return _call$1(function () {
      let _exit = false;
      const {
        hiddenCallback,
        metadataCallback,
        textOutputCallback
      } = _this.getCallbacks(step);
      if (hiddenCallback && (metadataCallback || textOutputCallback)) {
        let outcome;
        return _await$2(_continue$1(_catch$1(function () {
          let publicKey;
          if (metadataCallback) {
            const meta = metadataCallback.getOutputValue('data');
            publicKey = _this.createAuthenticationPublicKey(meta);
          } else if (textOutputCallback) {
            publicKey = parseWebAuthnAuthenticateText(textOutputCallback.getMessage());
          }
          // TypeScript doesn't like `publicKey` being assigned in conditionals above
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return _await$2(_this.getAuthenticationCredential(publicKey), function (credential) {
            outcome = _this.getAuthenticationOutcome(credential);
          });
        }, function (error) {
          if (!(error instanceof Error)) throw error;
          // NotSupportedError is a special case
          if (error.name === WebAuthnOutcomeType.NotSupportedError) {
            hiddenCallback.setInputValue(exports.WebAuthnOutcome.Unsupported);
            throw error;
          }
          hiddenCallback.setInputValue(`${exports.WebAuthnOutcome.Error}::${error.name}:${error.message}`);
          throw error;
        }), function (_result) {
          if (_exit) ;
          hiddenCallback.setInputValue(outcome);
          return step;
        }));
      } else {
        const e = new Error('Incorrect callbacks for WebAuthn authentication');
        e.name = WebAuthnOutcomeType.DataError;
        hiddenCallback == null ? void 0 : hiddenCallback.setInputValue(`${exports.WebAuthnOutcome.Error}::${e.name}:${e.message}`);
        throw e;
      }
      return _await$2();
    });
  }
  /**
   * Populates the step with the necessary registration outcome.
   *
   * @param step The step that contains WebAuthn registration data
   * @return The populated step
   */
  static register(step) {
    const _this2 = this;
    return _call$1(function () {
      let _exit2 = false;
      const {
        hiddenCallback,
        metadataCallback,
        textOutputCallback
      } = _this2.getCallbacks(step);
      if (hiddenCallback && (metadataCallback || textOutputCallback)) {
        let outcome;
        return _await$2(_continue$1(_catch$1(function () {
          let publicKey;
          if (metadataCallback) {
            const meta = metadataCallback.getOutputValue('data');
            publicKey = _this2.createRegistrationPublicKey(meta);
          } else if (textOutputCallback) {
            publicKey = parseWebAuthnRegisterText(textOutputCallback.getMessage());
          }
          // TypeScript doesn't like `publicKey` being assigned in conditionals above
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return _await$2(_this2.getRegistrationCredential(publicKey), function (credential) {
            outcome = _this2.getRegistrationOutcome(credential);
          });
        }, function (error) {
          if (!(error instanceof Error)) throw error;
          // NotSupportedError is a special case
          if (error.name === WebAuthnOutcomeType.NotSupportedError) {
            hiddenCallback.setInputValue(exports.WebAuthnOutcome.Unsupported);
            throw error;
          }
          hiddenCallback.setInputValue(`${exports.WebAuthnOutcome.Error}::${error.name}:${error.message}`);
          throw error;
        }), function (_result2) {
          if (_exit2) ;
          hiddenCallback.setInputValue(outcome);
          return step;
        }));
      } else {
        const e = new Error('Incorrect callbacks for WebAuthn registration');
        e.name = WebAuthnOutcomeType.DataError;
        hiddenCallback == null ? void 0 : hiddenCallback.setInputValue(`${exports.WebAuthnOutcome.Error}::${e.name}:${e.message}`);
        throw e;
      }
      return _await$2();
    });
  }
  /**
   * Returns an object containing the two WebAuthn callbacks.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The WebAuthn callbacks
   */
  static getCallbacks(step) {
    const hiddenCallback = this.getOutcomeCallback(step);
    const metadataCallback = this.getMetadataCallback(step);
    const textOutputCallback = this.getTextOutputCallback(step);
    const returnObj = {
      hiddenCallback
    };
    if (metadataCallback) {
      returnObj.metadataCallback = metadataCallback;
    } else if (textOutputCallback) {
      returnObj.textOutputCallback = textOutputCallback;
    }
    return returnObj;
  }
  /**
   * Returns the WebAuthn metadata callback containing data to pass to the browser
   * Web Authentication API.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The metadata callback
   */
  static getMetadataCallback(step) {
    return step.getCallbacksOfType(exports.CallbackType.MetadataCallback).find(x => {
      const cb = x.getOutputByName('data', undefined);
      // eslint-disable-next-line no-prototype-builtins
      return cb && cb.hasOwnProperty('relyingPartyId');
    });
  }
  /**
   * Returns the WebAuthn hidden value callback where the outcome should be populated.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The hidden value callback
   */
  static getOutcomeCallback(step) {
    return step.getCallbacksOfType(exports.CallbackType.HiddenValueCallback).find(x => x.getOutputByName('id', '') === 'webAuthnOutcome');
  }
  /**
   * Returns the WebAuthn metadata callback containing data to pass to the browser
   * Web Authentication API.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The metadata callback
   */
  static getTextOutputCallback(step) {
    return step.getCallbacksOfType(exports.CallbackType.TextOutputCallback).find(x => {
      const cb = x.getOutputByName('message', undefined);
      return cb && cb.includes('webAuthnOutcome');
    });
  }
  /**
   * Retrieves the credential from the browser Web Authentication API.
   *
   * @param options The public key options associated with the request
   * @return The credential
   */
  static getAuthenticationCredential(options) {
    return _call$1(function () {
      // Feature check before we attempt registering a device
      if (!window.PublicKeyCredential) {
        const e = new Error('PublicKeyCredential not supported by this browser');
        e.name = WebAuthnOutcomeType.NotSupportedError;
        throw e;
      }
      return _await$2(navigator.credentials.get({
        publicKey: options
      }));
    });
  }
  /**
   * Converts an authentication credential into the outcome expected by OpenAM.
   *
   * @param credential The credential to convert
   * @return The outcome string
   */
  static getAuthenticationOutcome(credential) {
    if (credential === null) {
      const e = new Error('No credential generated from authentication');
      e.name = WebAuthnOutcomeType.UnknownError;
      throw e;
    }
    try {
      const clientDataJSON = arrayBufferToString(credential.response.clientDataJSON);
      const assertionResponse = credential.response;
      const authenticatorData = new Int8Array(assertionResponse.authenticatorData).toString();
      const signature = new Int8Array(assertionResponse.signature).toString();
      // Current native typing for PublicKeyCredential does not include `userHandle`
      // eslint-disable-next-line
      // @ts-ignore
      const userHandle = arrayBufferToString(credential.response.userHandle);
      let stringOutput = `${clientDataJSON}::${authenticatorData}::${signature}::${credential.id}`;
      // Check if Username is stored on device
      if (userHandle) {
        stringOutput = `${stringOutput}::${userHandle}`;
      }
      return stringOutput;
    } catch (error) {
      const e = new Error('Transforming credential object to string failed');
      e.name = WebAuthnOutcomeType.EncodingError;
      throw e;
    }
  }
  /**
   * Retrieves the credential from the browser Web Authentication API.
   *
   * @param options The public key options associated with the request
   * @return The credential
   */
  static getRegistrationCredential(options) {
    return _call$1(function () {
      // Feature check before we attempt registering a device
      if (!window.PublicKeyCredential) {
        const e = new Error('PublicKeyCredential not supported by this browser');
        e.name = WebAuthnOutcomeType.NotSupportedError;
        throw e;
      }
      return _await$2(navigator.credentials.create({
        publicKey: options
      }));
    });
  }
  /**
   * Converts a registration credential into the outcome expected by OpenAM.
   *
   * @param credential The credential to convert
   * @return The outcome string
   */
  static getRegistrationOutcome(credential) {
    if (credential === null) {
      const e = new Error('No credential generated from registration');
      e.name = WebAuthnOutcomeType.UnknownError;
      throw e;
    }
    try {
      const clientDataJSON = arrayBufferToString(credential.response.clientDataJSON);
      const attestationResponse = credential.response;
      const attestationObject = new Int8Array(attestationResponse.attestationObject).toString();
      return `${clientDataJSON}::${attestationObject}::${credential.id}`;
    } catch (error) {
      const e = new Error('Transforming credential object to string failed');
      e.name = WebAuthnOutcomeType.EncodingError;
      throw e;
    }
  }
  /**
   * Converts authentication tree metadata into options required by the browser
   * Web Authentication API.
   *
   * @param metadata The metadata provided in the authentication tree MetadataCallback
   * @return The Web Authentication API request options
   */
  static createAuthenticationPublicKey(metadata) {
    const {
      acceptableCredentials,
      allowCredentials,
      challenge,
      relyingPartyId,
      timeout,
      userVerification
    } = metadata;
    const rpId = parseRelyingPartyId(relyingPartyId);
    const allowCredentialsValue = parseCredentials(allowCredentials || acceptableCredentials || '');
    return _extends({
      challenge: Uint8Array.from(atob(challenge), c => c.charCodeAt(0)).buffer,
      timeout
    }, allowCredentialsValue && {
      allowCredentials: allowCredentialsValue
    }, userVerification && {
      userVerification
    }, rpId && {
      rpId
    });
  }
  /**
   * Converts authentication tree metadata into options required by the browser
   * Web Authentication API.
   *
   * @param metadata The metadata provided in the authentication tree MetadataCallback
   * @return The Web Authentication API request options
   */
  static createRegistrationPublicKey(metadata) {
    const {
      pubKeyCredParams: pubKeyCredParamsString
    } = metadata;
    const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
    if (!pubKeyCredParams) {
      const e = new Error('Missing pubKeyCredParams property from registration options');
      e.name = WebAuthnOutcomeType.DataError;
      throw e;
    }
    const excludeCredentials = parseCredentials(metadata.excludeCredentials);
    const {
      attestationPreference,
      authenticatorSelection,
      challenge,
      relyingPartyId,
      relyingPartyName,
      timeout,
      userId,
      userName,
      displayName
    } = metadata;
    const rpId = parseRelyingPartyId(relyingPartyId);
    const rp = _extends({
      name: relyingPartyName
    }, rpId && {
      id: rpId
    });
    return _extends({
      attestation: attestationPreference,
      authenticatorSelection: JSON.parse(authenticatorSelection),
      challenge: Uint8Array.from(atob(challenge), c => c.charCodeAt(0)).buffer
    }, excludeCredentials.length && {
      excludeCredentials
    }, {
      pubKeyCredParams,
      rp,
      timeout,
      user: {
        displayName: displayName || userName,
        id: Int8Array.from(userId.split('').map(c => c.charCodeAt(0))),
        name: userName
      }
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _async$1(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
const normalizeRESTJSON = _async$1(function (res) {
  return res.json();
});
const isAuthzStep = _async$1(function (res) {
  // TODO: add comment
  const clone = res.clone();
  return _await$1(clone.json(), function (json) {
    return !!json.callbacks;
  });
});
const examineForRESTAuthz = _async$1(function (res) {
  const clone = res.clone();
  return _await$1(clone.json(), function (json) {
    return !!json.advices;
  });
});
function addAuthzInfoToHeaders(init, advices, tokens) {
  const headers = new Headers(init.headers);
  if (advices.AuthenticateToServiceConditionAdvice) {
    headers.set('X-Tree', advices.AuthenticateToServiceConditionAdvice[0]);
  } else if (advices.TransactionConditionAdvice) {
    headers.set('X-TxID', advices.TransactionConditionAdvice[0]);
  }
  if (tokens && tokens.idToken) {
    headers.set('X-IdToken', tokens.idToken);
  }
  return headers;
}
function addAuthzInfoToURL(url, advices, tokens) {
  const updatedURL = new URL(url);
  // Only modify URL for Transactional Authorization
  if (advices.TransactionConditionAdvice) {
    const txId = advices.TransactionConditionAdvice[0];
    // Add Txn ID to *original* request options as URL param
    updatedURL.searchParams.append('_txid', txId);
  }
  // If tokens are used, send idToken (OIDC)
  if (tokens && tokens.idToken) {
    updatedURL.searchParams.append('_idtoken', tokens.idToken);
  }
  // FYI: in certain circumstances, the URL may be returned unchanged
  return updatedURL.toString();
}
function buildAuthzOptions(authzObj, baseURL, timeout, realmPath, customPaths) {
  const treeAuthAdvices = authzObj.advices && authzObj.advices.AuthenticateToServiceConditionAdvice;
  const txnAuthAdvices = authzObj.advices && authzObj.advices.TransactionConditionAdvice;
  let attributeValue = '';
  let attributeName = '';
  if (treeAuthAdvices) {
    attributeValue = treeAuthAdvices.reduce((prev, curr) => {
      const prevWithSpace = prev ? ` ${prev}` : prev;
      prev = `${curr}${prevWithSpace}`;
      return prev;
    }, '');
    attributeName = 'AuthenticateToServiceConditionAdvice';
  } else if (txnAuthAdvices) {
    attributeValue = txnAuthAdvices.reduce((prev, curr) => {
      const prevWithSpace = prev ? ` ${prev}` : prev;
      prev = `${curr}${prevWithSpace}`;
      return prev;
    }, '');
    attributeName = 'TransactionConditionAdvice';
  }
  const openTags = `<Advices><AttributeValuePair>`;
  const nameTag = `<Attribute name="${attributeName}"/>`;
  const valueTag = `<Value>${attributeValue}</Value>`;
  const endTags = `</AttributeValuePair></Advices>`;
  const fullXML = `${openTags}${nameTag}${valueTag}${endTags}`;
  const path = getEndpointPath('authenticate', realmPath, customPaths);
  const queryParams = {
    authIndexType: 'composite_advice',
    authIndexValue: fullXML
  };
  const options = {
    init: {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Accept-API-Version': 'resource=2.0, protocol=1.0'
      })
    },
    timeout,
    url: resolve(baseURL, `${path}?${stringify(queryParams)}`)
  };
  return options;
}
function examineForIGAuthz(res) {
  const type = res.headers.get('Content-Type') || '';
  return type.includes('html') && res.url.includes('composite_advice');
}
function getXMLValueFromURL(urlString) {
  const url = new URL(urlString);
  const value = url.searchParams.get('authIndexValue') || '';
  const parser = new DOMParser();
  const decodedValue = decodeURIComponent(value);
  const doc = parser.parseFromString(decodedValue, 'application/xml');
  const el = doc.querySelector('Value');
  return el ? el.innerHTML : '';
}
function hasAuthzAdvice(json) {
  if (json.advices && json.advices.AuthenticateToServiceConditionAdvice) {
    return Array.isArray(json.advices.AuthenticateToServiceConditionAdvice) && json.advices.AuthenticateToServiceConditionAdvice.length > 0;
  } else if (json.advices && json.advices.TransactionConditionAdvice) {
    return Array.isArray(json.advices.TransactionConditionAdvice) && json.advices.TransactionConditionAdvice.length > 0;
  } else {
    return false;
  }
}
function newTokenRequired(res, requiresNewToken) {
  if (typeof requiresNewToken === 'function') {
    return requiresNewToken(res);
  }
  return res.status === 401;
}
function normalizeIGJSON(res) {
  const advices = {};
  if (res.url.includes('AuthenticateToServiceConditionAdvice')) {
    advices.AuthenticateToServiceConditionAdvice = [getXMLValueFromURL(res.url)];
  } else {
    advices.TransactionConditionAdvice = [getXMLValueFromURL(res.url)];
  }
  return {
    resource: '',
    actions: {},
    attributes: {},
    advices,
    ttl: 0
  };
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * HTTP client that includes bearer token injection and refresh.
 * This module also supports authorization for policy protected endpoints.
 *
 * Example:
 *
 * ```js
 * return forgerock.HttpClient.request({
 *   url: `https://example.com/protected/resource`,
 *   init: {
 *     method: 'GET',
 *     credentials: 'include',
 *   },
 *   authorization: {
 *     handleStep: async (step) => {
 *       step.getCallbackOfType('PasswordCallback').setPassword(pw);
 *       return Promise.resolve(step);
 *     },
 *   },
 * });
 * ```
 */

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _empty() {}
function _invokeIgnored(body) {
  var result = body();
  if (result && result.then) {
    return result.then(_empty);
  }
}
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
function _invoke(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
class HttpClient {
  /**
   * Makes a request using the specified options.
   *
   * @param options The options to use when making the request
   */
  static request(options) {
    const _this = this;
    return _call(function () {
      return _await(_this._request(options, false), function (res) {
        let authorizationJSON;
        let hasIG = false;
        return _invoke(function () {
          if (newTokenRequired(res, options.requiresNewToken)) {
            return _await(_this._request(options, true), function (_this$_request) {
              res = _this$_request;
            });
          }
        }, function () {
          let _exit = false;
          return _invoke(function () {
            if (options.authorization && options.authorization.handleStep) {
              return _invoke(function () {
                if (res.redirected && examineForIGAuthz(res)) {
                  hasIG = true;
                  authorizationJSON = normalizeIGJSON(res);
                } else return _await(examineForRESTAuthz(res), function (_examineForRESTAuthz) {
                  return _invokeIgnored(function () {
                    if (_examineForRESTAuthz) {
                      return _await(normalizeRESTJSON(res), function (_normalizeRESTJSON) {
                        authorizationJSON = _normalizeRESTJSON;
                      });
                    }
                  });
                });
              }, function () {
                return function () {
                  if (authorizationJSON && authorizationJSON.advices) {
                    const {
                      middleware,
                      realmPath,
                      serverConfig
                    } = Config.get(options.authorization.config);
                    const authzOptions = buildAuthzOptions(authorizationJSON, serverConfig.baseUrl, options.timeout, realmPath, serverConfig.paths);
                    const url = new URL(authzOptions.url);
                    const type = url.searchParams.get('authIndexType');
                    const tree = url.searchParams.get('authIndexValue');
                    const runMiddleware = middlewareWrapper({
                      url: new URL(authzOptions.url),
                      init: authzOptions.init
                    }, {
                      type: ActionTypes.StartAuthenticate,
                      payload: {
                        type,
                        tree
                      }
                    });
                    const {
                      url: authUrl,
                      init: authInit
                    } = runMiddleware(middleware);
                    authzOptions.url = authUrl.toString();
                    authzOptions.init = authInit;
                    return _await(_this._request(authzOptions, false), function (initialStep) {
                      let _exit2 = false;
                      return _await(isAuthzStep(initialStep), function (_isAuthzStep) {
                        if (!_isAuthzStep) {
                          throw new Error('Error: Initial response from auth server not a "step".');
                        }
                        if (!hasAuthzAdvice(authorizationJSON)) {
                          throw new Error(`Error: Transactional or Service Advice is empty.`);
                        }
                        // Walk through auth tree
                        return _await(_this.stepIterator(initialStep, options.authorization.handleStep, type, tree), function () {
                          // See if OAuth tokens are being used
                          let tokens;
                          return _continue(_catch(function () {
                            return _await(TokenStorage.get(), function (_TokenStorage$get) {
                              tokens = _TokenStorage$get;
                            });
                          }, _empty), function () {
                            if (hasIG) {
                              // Update URL with IDs and tokens for IG
                              options.url = addAuthzInfoToURL(options.url, authorizationJSON.advices, tokens);
                            } else {
                              // Update headers with IDs and tokens for REST API
                              options.init.headers = addAuthzInfoToHeaders(options.init, authorizationJSON.advices, tokens);
                            }
                            // Retry original resource request
                            return _await(_this._request(options, false), function (_this$_request2) {
                              res = _this$_request2;
                            });
                          });
                        });
                      });
                    });
                  }
                }();
              });
            }
          }, function (_result2) {
            return _exit ? _result2 : res;
          });
        });
      });
    });
  }
  static setAuthHeaders(headers, forceRenew) {
    return _call(function () {
      let tokens;
      return _await(_continue(_catch(function () {
        return _await(TokenStorage.get(), function (_TokenStorage$get2) {
          tokens = _TokenStorage$get2;
        });
      }, _empty), function () {
        /**
         * Condition to see if Auth is session based or OAuth token based
         */
        return _invoke(function () {
          if (tokens && tokens.accessToken) {
            // Access tokens are an OAuth artifact
            return _await(TokenManager.getTokens({
              forceRenew
            }), function (_TokenManager$getToke) {
              tokens = _TokenManager$getToke;
              if (tokens && tokens.accessToken) {
                headers.set('Authorization', `Bearer ${tokens.accessToken}`);
              }
            }); // TODO: Temp fix; refactor this in next txn auth story
          }
        }, function () {
          return headers;
        });
      }));
    });
  }
  static stepIterator(res, handleStep, type, tree) {
    return _call(function () {
      return _await(res.json(), function (jsonRes) {
        const initialStep = new FRStep(jsonRes);
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(function (resolve, reject) {
          const handleNext = _async(function (step) {
            return _await(handleStep(step), function (input) {
              return _await(FRAuth.next(input, {
                type,
                tree
              }), function (output) {
                if (output.type === exports.StepType.LoginSuccess) {
                  resolve();
                } else if (output.type === exports.StepType.LoginFailure) {
                  reject('Authentication tree failure.');
                } else {
                  handleNext(output);
                }
              });
            });
          });
          handleNext(initialStep);
          return _await();
        });
      });
    });
  }
  static _request(options, forceRenew) {
    const _this2 = this;
    return _call(function () {
      const {
        url,
        init,
        timeout
      } = options;
      let headers = new Headers(init.headers || {});
      return _await(_invoke(function () {
        if (!options.bypassAuthentication) {
          return _await(_this2.setAuthHeaders(headers, forceRenew), function (_this2$setAuthHeaders) {
            headers = _this2$setAuthHeaders;
          });
        }
      }, function () {
        init.headers = headers;
        return withTimeout(fetch(url, init), timeout);
      }));
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Provides access to the current user's profile.
 */
class UserManager {
  /**
   * Gets the current user's profile.
   */
  static getCurrentUser(options) {
    return OAuth2Client.getUserInfo(options);
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * deferred.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Implementation of the Deferred API to simplify handling of Promises.
 */
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

/*
 * @forgerock/javascript-sdk
 *
 * storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/** @hidden */
class LocalStorage {
  constructor(persist = false) {
    this.storage = persist ? window.localStorage : window.sessionStorage;
  }
  get(key) {
    const value = this.storage.getItem(key);
    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  }
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  remove(key) {
    this.storage.removeItem(key);
  }
}

exports.AttributeInputCallback = AttributeInputCallback;
exports.Auth = Auth;
exports.ChoiceCallback = ChoiceCallback;
exports.Config = Config;
exports.ConfirmationCallback = ConfirmationCallback;
exports.Deferred = Deferred;
exports.DeviceProfileCallback = DeviceProfileCallback;
exports.FRAuth = FRAuth;
exports.FRCallback = FRCallback;
exports.FRDevice = FRDevice;
exports.FRLoginFailure = FRLoginFailure;
exports.FRLoginSuccess = FRLoginSuccess;
exports.FRPolicy = FRPolicy;
exports.FRRecoveryCodes = FRRecoveryCodes;
exports.FRStep = FRStep;
exports.FRUser = FRUser;
exports.FRWebAuthn = FRWebAuthn;
exports.HiddenValueCallback = HiddenValueCallback;
exports.HttpClient = HttpClient;
exports.KbaCreateCallback = KbaCreateCallback;
exports.LocalStorage = LocalStorage;
exports.MetadataCallback = MetadataCallback;
exports.NameCallback = NameCallback;
exports.OAuth2Client = OAuth2Client;
exports.PKCE = PKCE;
exports.PasswordCallback = PasswordCallback;
exports.PollingWaitCallback = PollingWaitCallback;
exports.ReCaptchaCallback = ReCaptchaCallback;
exports.RedirectCallback = RedirectCallback;
exports.SelectIdPCallback = SelectIdPCallback;
exports.SessionManager = SessionManager;
exports.SuspendedTextOutputCallback = SuspendedTextOutputCallback;
exports.TermsAndConditionsCallback = TermsAndConditionsCallback;
exports.TextInputCallback = TextInputCallback;
exports.TextOutputCallback = TextOutputCallback;
exports.TokenManager = TokenManager;
exports.TokenStorage = TokenStorage;
exports.UserManager = UserManager;
exports.ValidatedCreatePasswordCallback = ValidatedCreatePasswordCallback;
exports.ValidatedCreateUsernameCallback = ValidatedCreateUsernameCallback;
exports.defaultMessageCreator = defaultMessageCreator;
