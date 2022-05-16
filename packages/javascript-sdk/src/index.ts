/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Auth, CallbackType, ErrorCode } from '@forgerock/libs/auth';
import type { PolicyRequirement, Step, StepDetail } from '@forgerock/libs/step-types';
import Config, { ConfigOptions, ValidConfigOptions } from '@forgerock/libs/config';
import Dispatcher, { CallbackContainer, FREvent, Listener } from '@forgerock/libs/event';
import { FRAuth } from '@forgerock/libs/fr-auth';
import type {
  FRCallbackFactory,
  FRCallback,
  NameValue,
  Callback,
} from '@forgerock/libs/fr-callback';
import {
  AttributeInputCallback,
  ChoiceCallback,
  ConfirmationCallback,
  DeviceProfileCallback,
  HiddenValueCallback,
  KbaCreateCallback,
  MetadataCallback,
  NameCallback,
  PasswordCallback,
  PollingWaitCallback,
  ReCaptchaCallback,
  RedirectCallback,
  SelectIdPCallback,
  IdPValue,
  SuspendedTextOutputCallback,
  TermsAndConditionsCallback,
  TextOutputCallback,
  ValidatedCreatePasswordCallback,
  ValidatedCreateUsernameCallback,
} from '@forgerock/libs/fr-callbacks';
import {
  StepType,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  FRStepHandler,
  AuthResponse,
  FailureDetail,
} from '@forgerock/libs/fr-auth';
import { FRDevice } from '@forgerock/libs/fr-device';
import {
  FRPolicy,
  MessageCreator,
  PolicyKey,
  ProcessedPropertyError,
  defaultMessageCreator,
} from '@forgerock/libs/fr-policy';
import { FRRecoveryCodes } from '@forgerock/libs/fr-recovery-codes';
import { FRUI } from '@forgerock/libs/fr-ui';
import { FRUser } from '@forgerock/libs/fr-user';
import {
  FRWebAuthn,
  RelyingParty,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnOutcome,
  WebAuthnRegistrationMetadata,
  WebAuthnStepType,
} from '@forgerock/libs/fr-webauthn';
import { HttpClient } from '@forgerock/libs/http-client';
import {
  OAuth2Client,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
  ResponseType,
} from '@forgerock/libs/oauth-2-client';
import { SessionManager } from '@forgerock/libs/session-manager';
import { Tokens } from '@forgerock/libs/shared';
import { TokenManager, GetTokensOptions } from '@forgerock/libs/token-manager';
import { TokenStorage } from '@forgerock/libs/token-storage';
import { UserManager } from '@forgerock/libs/user-manager';
import { Deferred, LocalStorage } from '@forgerock/libs/util';
import { PKCE } from '@forgerock/libs/util-pkce';

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
