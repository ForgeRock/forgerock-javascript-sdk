/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Auth from './auth';
import { CallbackType, ErrorCode } from './auth/enums';
import type { Callback, NameValue, PolicyRequirement, Step, StepDetail } from './auth/interfaces';
import Config from './config';
import type { ConfigOptions, ValidConfigOptions } from './config';
import FRAuth from './fr-auth';
import FRCallback from './fr-auth/callbacks';
import AttributeInputCallback from './fr-auth/callbacks/attribute-input-callback';
import ChoiceCallback from './fr-auth/callbacks/choice-callback';
import ConfirmationCallback from './fr-auth/callbacks/confirmation-callback';
import DeviceProfileCallback from './fr-auth/callbacks/device-profile-callback';
import type { FRCallbackFactory } from './fr-auth/callbacks/factory';
import HiddenValueCallback from './fr-auth/callbacks/hidden-value-callback';
import KbaCreateCallback from './fr-auth/callbacks/kba-create-callback';
import MetadataCallback from './fr-auth/callbacks/metadata-callback';
import NameCallback from './fr-auth/callbacks/name-callback';
import PasswordCallback from './fr-auth/callbacks/password-callback';
import PollingWaitCallback from './fr-auth/callbacks/polling-wait-callback';
import ReCaptchaCallback from './fr-auth/callbacks/recaptcha-callback';
import RedirectCallback from './fr-auth/callbacks/redirect-callback';
import type { IdPValue } from './fr-auth/callbacks/select-idp-callback';
import SelectIdPCallback from './fr-auth/callbacks/select-idp-callback';
import SuspendedTextOutputCallback from './fr-auth/callbacks/suspended-text-output-callback';
import TermsAndConditionsCallback from './fr-auth/callbacks/terms-and-conditions-callback';
import TextInputCallback from './fr-auth/callbacks/text-input-callback';
import TextOutputCallback from './fr-auth/callbacks/text-output-callback';
// eslint-disable-next-line max-len
import ValidatedCreatePasswordCallback from './fr-auth/callbacks/validated-create-password-callback';
// eslint-disable-next-line max-len
import ValidatedCreateUsernameCallback from './fr-auth/callbacks/validated-create-username-callback';
import { StepType } from './fr-auth/enums';
import FRLoginFailure from './fr-auth/fr-login-failure';
import FRLoginSuccess from './fr-auth/fr-login-success';
import type { FRStepHandler } from './fr-auth/fr-step';
import FRStep from './fr-auth/fr-step';
import type { AuthResponse, FailureDetail } from './fr-auth/interfaces';
import FRDevice from './fr-device';
import type { MessageCreator, ProcessedPropertyError } from './fr-policy';
import FRPolicy, { PolicyKey } from './fr-policy';
import defaultMessageCreator from './fr-policy/message-creator';
import FRRecoveryCodes from './fr-recovery-codes';
import FRUser from './fr-user';
import type {
  RelyingParty,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnRegistrationMetadata,
} from './fr-webauthn';
import FRWebAuthn, { WebAuthnOutcome, WebAuthnStepType } from './fr-webauthn';
import HttpClient from './http-client';
import type {
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
} from './oauth2-client';
import OAuth2Client, { ResponseType } from './oauth2-client';
import SessionManager from './session-manager';
import type { Tokens } from './shared/interfaces';
import type { GetTokensOptions } from './token-manager';
import TokenManager from './token-manager';
import TokenStorage from './token-storage';
import UserManager from './user-manager';
import Deferred from './util/deferred';
import PKCE from './util/pkce';
import LocalStorage from './util/storage';
import type { LoggerFunctions } from './config/interfaces';

export type {
  AuthResponse,
  Callback,
  ConfigOptions,
  FailureDetail,
  FRCallbackFactory,
  FRStepHandler,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  GetTokensOptions,
  IdPValue,
  LoggerFunctions,
  MessageCreator,
  NameValue,
  OAuth2Tokens,
  PolicyRequirement,
  ProcessedPropertyError,
  RelyingParty,
  Step,
  StepDetail,
  Tokens,
  ValidConfigOptions,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnRegistrationMetadata,
};
export {
  defaultMessageCreator,
  AttributeInputCallback,
  Auth,
  CallbackType,
  ChoiceCallback,
  Config,
  ConfirmationCallback,
  Deferred,
  DeviceProfileCallback,
  ErrorCode,
  FRAuth,
  FRCallback,
  FRDevice,
  FRLoginFailure,
  FRLoginSuccess,
  FRPolicy,
  FRRecoveryCodes,
  FRStep,
  FRUser,
  FRWebAuthn,
  HiddenValueCallback,
  HttpClient,
  KbaCreateCallback,
  LocalStorage,
  MetadataCallback,
  NameCallback,
  OAuth2Client,
  PasswordCallback,
  PKCE,
  PolicyKey,
  PollingWaitCallback,
  ReCaptchaCallback,
  RedirectCallback,
  ResponseType,
  SelectIdPCallback,
  SessionManager,
  StepType,
  SuspendedTextOutputCallback,
  TermsAndConditionsCallback,
  TextInputCallback,
  TextOutputCallback,
  TokenManager,
  TokenStorage,
  UserManager,
  ValidatedCreatePasswordCallback,
  ValidatedCreateUsernameCallback,
  WebAuthnOutcome,
  WebAuthnStepType,
};
