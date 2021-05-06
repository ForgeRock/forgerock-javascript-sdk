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
import { Callback, NameValue, PolicyRequirement, Step, StepDetail } from './auth/interfaces';
import Config, { ConfigOptions, ValidConfigOptions } from './config';
import Dispatcher, { CallbackContainer, FREvent, Listener } from './event';
import FRAuth from './fr-auth';
import FRCallback from './fr-auth/callbacks';
import AttributeInputCallback from './fr-auth/callbacks/attribute-input-callback';
import ChoiceCallback from './fr-auth/callbacks/choice-callback';
import ConfirmationCallback from './fr-auth/callbacks/confirmation-callback';
import DeviceProfileCallback from './fr-auth/callbacks/device-profile-callback';
import { FRCallbackFactory } from './fr-auth/callbacks/factory';
import HiddenValueCallback from './fr-auth/callbacks/hidden-value-callback';
import KbaCreateCallback from './fr-auth/callbacks/kba-create-callback';
import MetadataCallback from './fr-auth/callbacks/metadata-callback';
import NameCallback from './fr-auth/callbacks/name-callback';
import PasswordCallback from './fr-auth/callbacks/password-callback';
import PollingWaitCallback from './fr-auth/callbacks/polling-wait-callback';
import ReCaptchaCallback from './fr-auth/callbacks/recaptcha-callback';
import RedirectCallback from './fr-auth/callbacks/redirect-callback';
import SelectIdPCallback, { IdPValue } from './fr-auth/callbacks/select-idp-callback';
import SuspendedTextOutputCallback from './fr-auth/callbacks/suspended-text-output-callback';
import TermsAndConditionsCallback from './fr-auth/callbacks/terms-and-conditions-callback';
import TextOutputCallback from './fr-auth/callbacks/text-output-callback';
// eslint-disable-next-line max-len
import ValidatedCreatePasswordCallback from './fr-auth/callbacks/validated-create-password-callback';
// eslint-disable-next-line max-len
import ValidatedCreateUsernameCallback from './fr-auth/callbacks/validated-create-username-callback';
import { StepType } from './fr-auth/enums';
import FRLoginFailure from './fr-auth/fr-login-failure';
import FRLoginSuccess from './fr-auth/fr-login-success';
import FRStep, { FRStepHandler } from './fr-auth/fr-step';
import { AuthResponse, FailureDetail } from './fr-auth/interfaces';
import FRDevice from './fr-device';
import FRPolicy, { MessageCreator, PolicyKey, ProcessedPropertyError } from './fr-policy';
import defaultMessageCreator from './fr-policy/message-creator';
import FRRecoveryCodes from './fr-recovery-codes';
import FRUI from './fr-ui';
import FRUser from './fr-user';
import FRWebAuthn, {
  RelyingParty,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnOutcome,
  WebAuthnRegistrationMetadata,
  WebAuthnStepType,
} from './fr-webauthn';
import HttpClient from './http-client';
import OAuth2Client, {
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
  ResponseType,
} from './oauth2-client';
import SessionManager from './session-manager';
import { Tokens } from './shared/interfaces';
import TokenManager, { GetTokensOptions } from './token-manager';
import TokenStorage from './token-storage';
import UserManager from './user-manager';
import Deferred from './util/deferred';
import PKCE from './util/pkce';
import LocalStorage from './util/storage';

export {
  defaultMessageCreator,
  AttributeInputCallback,
  Auth,
  AuthResponse,
  Callback,
  CallbackContainer,
  CallbackType,
  ChoiceCallback,
  Config,
  ConfigOptions,
  ConfirmationCallback,
  Deferred,
  DeviceProfileCallback,
  Dispatcher,
  ErrorCode,
  FailureDetail,
  FRAuth,
  FRCallback,
  FRCallbackFactory,
  FRDevice,
  FREvent,
  FRLoginFailure,
  FRLoginSuccess,
  FRPolicy,
  FRRecoveryCodes,
  FRStep,
  FRStepHandler,
  FRUI,
  FRUser,
  FRWebAuthn,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  GetTokensOptions,
  HiddenValueCallback,
  HttpClient,
  IdPValue,
  KbaCreateCallback,
  Listener,
  LocalStorage,
  MessageCreator,
  MetadataCallback,
  NameCallback,
  NameValue,
  OAuth2Client,
  OAuth2Tokens,
  PasswordCallback,
  PKCE,
  PolicyKey,
  PolicyRequirement,
  PollingWaitCallback,
  ProcessedPropertyError,
  ReCaptchaCallback,
  RedirectCallback,
  RelyingParty,
  ResponseType,
  SelectIdPCallback,
  SessionManager,
  Step,
  StepDetail,
  StepType,
  SuspendedTextOutputCallback,
  TermsAndConditionsCallback,
  TextOutputCallback,
  TokenManager,
  Tokens,
  TokenStorage,
  UserManager,
  ValidatedCreatePasswordCallback,
  ValidatedCreateUsernameCallback,
  ValidConfigOptions,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnOutcome,
  WebAuthnRegistrationMetadata,
  WebAuthnStepType,
};
