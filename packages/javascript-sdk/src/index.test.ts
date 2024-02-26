import * as sdk from './';
import Auth from './auth';
import { CallbackType, ErrorCode } from './auth/enums';
import Config from './config';
import FRAuth from './fr-auth';
import FRCallback from './fr-auth/callbacks';
import AttributeInputCallback from './fr-auth/callbacks/attribute-input-callback';
import ChoiceCallback from './fr-auth/callbacks/choice-callback';
import ConfirmationCallback from './fr-auth/callbacks/confirmation-callback';
import DeviceProfileCallback from './fr-auth/callbacks/device-profile-callback';
import HiddenValueCallback from './fr-auth/callbacks/hidden-value-callback';
import KbaCreateCallback from './fr-auth/callbacks/kba-create-callback';
import MetadataCallback from './fr-auth/callbacks/metadata-callback';
import NameCallback from './fr-auth/callbacks/name-callback';
import PasswordCallback from './fr-auth/callbacks/password-callback';
import PollingWaitCallback from './fr-auth/callbacks/polling-wait-callback';
import ReCaptchaCallback from './fr-auth/callbacks/recaptcha-callback';
import RedirectCallback from './fr-auth/callbacks/redirect-callback';
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
import FRStep from './fr-auth/fr-step';
import FRDevice from './fr-device';
import FRPolicy, { PolicyKey } from './fr-policy';
import FRQRCode from './fr-qr-code';
import defaultMessageCreator from './fr-policy/message-creator';
import FRRecoveryCodes from './fr-recovery-codes';
import FRUser from './fr-user';
import FRWebAuthn, { WebAuthnOutcome, WebAuthnStepType } from './fr-webauthn';
import HttpClient from './http-client';
import OAuth2Client, { ResponseType } from './oauth2-client';
import SessionManager from './session-manager';
import TokenManager from './token-manager';
import TokenStorage from './token-storage';
import UserManager from './user-manager';
import Deferred from './util/deferred';
import PKCE from './util/pkce';
import LocalStorage from './util/storage';

test('ensure the sdk exports are exported from the index', () => {
  expect(sdk).toBeDefined();
  expect(sdk).toMatchObject({
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
    FRQRCode,
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
  });
});
