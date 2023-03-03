/**
 * An event-handling function.
 */
declare type Listener = (e: FREvent) => void;
interface FREvent {
    type: string;
}

/**
 * Event dispatcher for subscribing and publishing categorized events.
 */
declare class Dispatcher {
    private callbacks;
    /**
     * Subscribes to an event type.
     *
     * @param type The event type
     * @param listener The function to subscribe to events of this type
     */
    addEventListener(type: string, listener: Listener): void;
    /**
     * Unsubscribes from an event type.
     *
     * @param type The event type
     * @param listener The function to unsubscribe from events of this type
     */
    removeEventListener(type: string, listener: Listener): void;
    /**
     * Unsubscribes all listener functions to a single event type or all event types.
     *
     * @param type The event type, or all event types if not specified
     */
    clearEventListeners(type?: string): void;
    /**
     * Publishes an event.
     *
     * @param event The event object to publish
     */
    dispatchEvent<T extends FREvent>(event: T): void;
}

declare enum ActionTypes {
    Authenticate = "AUTHENTICATE",
    Authorize = "AUTHORIZE",
    EndSession = "END_SESSION",
    Logout = "LOGOUT",
    ExchangeToken = "EXCHANGE_TOKEN",
    RefreshToken = "REFRESH_TOKEN",
    ResumeAuthenticate = "RESUME_AUTHENTICATE",
    RevokeToken = "REVOKE_TOKEN",
    StartAuthenticate = "START_AUTHENTICATE",
    UserInfo = "USER_INFO"
}

interface StringDict<T> {
    [name: string]: T;
}
interface Tokens {
    accessToken: string;
    idToken?: string;
    refreshToken?: string;
    tokenExpiry?: number;
}

/**
 * Types of callbacks directly supported by the SDK.
 */
declare enum CallbackType {
    BooleanAttributeInputCallback = "BooleanAttributeInputCallback",
    ChoiceCallback = "ChoiceCallback",
    ConfirmationCallback = "ConfirmationCallback",
    DeviceProfileCallback = "DeviceProfileCallback",
    HiddenValueCallback = "HiddenValueCallback",
    KbaCreateCallback = "KbaCreateCallback",
    MetadataCallback = "MetadataCallback",
    NameCallback = "NameCallback",
    NumberAttributeInputCallback = "NumberAttributeInputCallback",
    PasswordCallback = "PasswordCallback",
    PollingWaitCallback = "PollingWaitCallback",
    ReCaptchaCallback = "ReCaptchaCallback",
    RedirectCallback = "RedirectCallback",
    SelectIdPCallback = "SelectIdPCallback",
    StringAttributeInputCallback = "StringAttributeInputCallback",
    SuspendedTextOutputCallback = "SuspendedTextOutputCallback",
    TermsAndConditionsCallback = "TermsAndConditionsCallback",
    TextInputCallback = "TextInputCallback",
    TextOutputCallback = "TextOutputCallback",
    ValidatedCreatePasswordCallback = "ValidatedCreatePasswordCallback",
    ValidatedCreateUsernameCallback = "ValidatedCreateUsernameCallback"
}

/**
 * Represents the authentication tree API payload schema.
 */
interface Step {
    authId?: string;
    callbacks?: Callback[];
    code?: number;
    description?: string;
    detail?: StepDetail;
    header?: string;
    message?: string;
    ok?: string;
    realm?: string;
    reason?: string;
    stage?: string;
    status?: number;
    successUrl?: string;
    tokenId?: string;
}
/**
 * Represents details of a failure in an authentication step.
 */
interface StepDetail {
    failedPolicyRequirements?: FailedPolicyRequirement[];
    failureUrl?: string;
    result?: boolean;
}
/**
 * Represents configuration overrides used when requesting the next
 * step in an authentication tree.
 */
interface StepOptions extends ConfigOptions {
    query?: StringDict<string>;
}
/**
 * Represents failed policies for a matching property.
 */
interface FailedPolicyRequirement {
    policyRequirements: PolicyRequirement[];
    property: string;
}
/**
 * Represents a failed policy policy and failed policy params.
 */
interface PolicyRequirement {
    params?: Partial<PolicyParams>;
    policyRequirement: string;
}
interface PolicyParams {
    [key: string]: unknown;
    disallowedFields: string;
    duplicateValue: string;
    forbiddenChars: string;
    maxLength: number;
    minLength: number;
    numCaps: number;
    numNums: number;
}
/**
 * Represents the authentication tree API callback schema.
 */
interface Callback {
    _id?: number;
    input?: NameValue[];
    output: NameValue[];
    type: CallbackType;
}
/**
 * Represents a name/value pair found in an authentication tree callback.
 */
interface NameValue {
    name: string;
    value: unknown;
}

/**
 * Base class for authentication tree callback wrappers.
 */
declare class FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the name of this callback type.
     */
    getType(): string;
    /**
     * Gets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    getInputValue(selector?: number | string): unknown;
    /**
     * Sets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    setInputValue(value: unknown, selector?: number | string | RegExp): void;
    /**
     * Gets the value of the specified output element, or the first element if `selector`
     * is not provided.
     *
     * @param selector The index position or name of the desired element
     */
    getOutputValue(selector?: number | string): unknown;
    /**
     * Gets the value of the first output element with the specified name or the
     * specified default value.
     *
     * @param name The name of the desired element
     */
    getOutputByName<T>(name: string, defaultValue: T): T;
    private getArrayElement;
}

declare type FRCallbackFactory = (callback: Callback) => FRCallback;

interface Action {
    type: ActionTypes;
    payload: any;
}
/**
 * Configuration options.
 */
interface ConfigOptions {
    callbackFactory?: FRCallbackFactory;
    clientId?: string;
    middleware?: RequestMiddleware[];
    realmPath?: string;
    redirectUri?: string;
    scope?: string;
    serverConfig?: ServerConfig;
    support?: 'modern' | 'legacy' | undefined;
    tokenStore?: TokenStoreObject | 'indexedDB' | 'sessionStorage' | 'localStorage';
    tree?: string;
    type?: string;
    oauthThreshold?: number;
}
/**
 * Optional configuration for custom paths for actions
 */
interface CustomPathConfig {
    authenticate?: string;
    authorize?: string;
    accessToken?: string;
    endSession?: string;
    userInfo?: string;
    revoke?: string;
    sessions?: string;
}
declare type RequestMiddleware = (req: RequestObj, action: Action, next: () => RequestObj) => void;
interface RequestObj {
    url: URL;
    init: RequestInit;
}
/**
 * Configuration settings for connecting to a server.
 */
interface ServerConfig {
    baseUrl: string;
    paths?: CustomPathConfig;
    timeout: number;
}
/**
 * API for implementing a custom token store
 */
interface TokenStoreObject {
    get: (clientId: string) => Promise<Tokens>;
    set: (clientId: string, token: Tokens) => Promise<void>;
    remove: (clientId: string) => Promise<void>;
}

/**
 * Types of steps returned by the authentication tree.
 */
declare enum StepType {
    LoginFailure = "LoginFailure",
    LoginSuccess = "LoginSuccess",
    Step = "Step"
}

/**
 * Base interface for all types of authentication step responses.
 */
interface AuthResponse {
    type: StepType;
}
/**
 * Represents details of a failure in an authentication step.
 */
interface FailureDetail {
    failureUrl?: string;
}

/**
 * Represents a single step of an authentication tree.
 */
declare class FRStep implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.Step;
    /**
     * The callbacks contained in this step.
     */
    callbacks: FRCallback[];
    /**
     * @param payload The raw payload returned by OpenAM
     * @param callbackFactory A function that returns am implementation of FRCallback
     */
    constructor(payload: Step, callbackFactory?: FRCallbackFactory);
    /**
     * Gets the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    getCallbackOfType<T extends FRCallback>(type: CallbackType): T;
    /**
     * Gets all callbacks of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    getCallbacksOfType<T extends FRCallback>(type: CallbackType): T[];
    /**
     * Sets the value of the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     * @param value The value to set for the callback.
     */
    setCallbackValue(type: CallbackType, value: unknown): void;
    /**
     * Gets the step's description.
     */
    getDescription(): string | undefined;
    /**
     * Gets the step's header.
     */
    getHeader(): string | undefined;
    /**
     * Gets the step's stage.
     */
    getStage(): string | undefined;
    private convertCallbacks;
}

declare type HandleStep = (step: FRStep) => Promise<FRStep>;
/**
 * Options to use when making an HTTP call.
 */
interface HttpClientRequestOptions {
    bypassAuthentication?: boolean;
    authorization?: {
        config?: ConfigOptions;
        handleStep: HandleStep;
        idToken?: string;
        txnID?: string;
    };
    init: RequestInit;
    requiresNewToken?: RequiresNewTokenFn;
    timeout: number;
    url: string;
}
/**
 * A function that determines whether a new token is required based on a HTTP response.
 */
declare type RequiresNewTokenFn = (res: Response) => boolean;

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
declare abstract class HttpClient extends Dispatcher {
    /**
     * Makes a request using the specified options.
     *
     * @param options The options to use when making the request
     */
    static request(options: HttpClientRequestOptions): Promise<Response>;
    private static setAuthHeaders;
    private static stepIterator;
    private static _request;
}

declare type Primitive = string | number | bigint | boolean | null | undefined;

declare namespace util {
    type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;
    export const assertEqual: <A, B>(val: AssertEqual<A, B>) => AssertEqual<A, B>;
    export function assertIs<T>(_arg: T): void;
    export function assertNever(_x: never): never;
    export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
    export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
    export const arrayToEnum: <T extends string, U extends [T, ...T[]]>(items: U) => { [k in U[number]]: k; };
    export const getValidEnumValues: (obj: any) => any[];
    export const objectValues: (obj: any) => any[];
    export const objectKeys: ObjectConstructor["keys"];
    export const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
    export type identity<T> = T;
    export type flatten<T> = identity<{
        [k in keyof T]: T[k];
    }>;
    export type noUndefined<T> = T extends undefined ? never : T;
    export const isInteger: NumberConstructor["isInteger"];
    export function joinValues<T extends any[]>(array: T, separator?: string): string;
    export const jsonStringifyReplacer: (_: string, value: any) => any;
    export {};
}
declare const ZodParsedType: {
    function: "function";
    number: "number";
    string: "string";
    nan: "nan";
    integer: "integer";
    float: "float";
    boolean: "boolean";
    date: "date";
    bigint: "bigint";
    symbol: "symbol";
    undefined: "undefined";
    null: "null";
    array: "array";
    object: "object";
    unknown: "unknown";
    promise: "promise";
    void: "void";
    never: "never";
    map: "map";
    set: "set";
};
declare type ZodParsedType = keyof typeof ZodParsedType;

declare type allKeys<T> = T extends any ? keyof T : never;
declare type typeToFlattenedError<T, U = string> = {
    formErrors: U[];
    fieldErrors: {
        [P in allKeys<T>]?: U[];
    };
};
declare const ZodIssueCode: {
    invalid_type: "invalid_type";
    invalid_literal: "invalid_literal";
    custom: "custom";
    invalid_union: "invalid_union";
    invalid_union_discriminator: "invalid_union_discriminator";
    invalid_enum_value: "invalid_enum_value";
    unrecognized_keys: "unrecognized_keys";
    invalid_arguments: "invalid_arguments";
    invalid_return_type: "invalid_return_type";
    invalid_date: "invalid_date";
    invalid_string: "invalid_string";
    too_small: "too_small";
    too_big: "too_big";
    invalid_intersection_types: "invalid_intersection_types";
    not_multiple_of: "not_multiple_of";
};
declare type ZodIssueCode = keyof typeof ZodIssueCode;
declare type ZodIssueBase = {
    path: (string | number)[];
    message?: string;
};
interface ZodInvalidTypeIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_type;
    expected: ZodParsedType;
    received: ZodParsedType;
}
interface ZodInvalidLiteralIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_literal;
    expected: unknown;
}
interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.unrecognized_keys;
    keys: string[];
}
interface ZodInvalidUnionIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_union;
    unionErrors: ZodError[];
}
interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_union_discriminator;
    options: Primitive[];
}
interface ZodInvalidEnumValueIssue extends ZodIssueBase {
    received: string | number;
    code: typeof ZodIssueCode.invalid_enum_value;
    options: (string | number)[];
}
interface ZodInvalidArgumentsIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_arguments;
    argumentsError: ZodError;
}
interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_return_type;
    returnTypeError: ZodError;
}
interface ZodInvalidDateIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_date;
}
declare type StringValidation = "email" | "url" | "uuid" | "regex" | "cuid" | {
    startsWith: string;
} | {
    endsWith: string;
};
interface ZodInvalidStringIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_string;
    validation: StringValidation;
}
interface ZodTooSmallIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.too_small;
    minimum: number;
    inclusive: boolean;
    type: "array" | "string" | "number" | "set" | "date";
}
interface ZodTooBigIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.too_big;
    maximum: number;
    inclusive: boolean;
    type: "array" | "string" | "number" | "set" | "date";
}
interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_intersection_types;
}
interface ZodNotMultipleOfIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.not_multiple_of;
    multipleOf: number;
}
interface ZodCustomIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.custom;
    params?: {
        [k: string]: any;
    };
}
declare type ZodIssueOptionalMessage = ZodInvalidTypeIssue | ZodInvalidLiteralIssue | ZodUnrecognizedKeysIssue | ZodInvalidUnionIssue | ZodInvalidUnionDiscriminatorIssue | ZodInvalidEnumValueIssue | ZodInvalidArgumentsIssue | ZodInvalidReturnTypeIssue | ZodInvalidDateIssue | ZodInvalidStringIssue | ZodTooSmallIssue | ZodTooBigIssue | ZodInvalidIntersectionTypesIssue | ZodNotMultipleOfIssue | ZodCustomIssue;
declare type ZodIssue = ZodIssueOptionalMessage & {
    message: string;
};
declare type ZodFormattedError<T, U = string> = {
    _errors: U[];
} & (T extends [any, ...any[]] ? {
    [K in keyof T]?: ZodFormattedError<T[K]>;
} : T extends any[] ? {
    [k: number]: ZodFormattedError<T[number]>;
} : T extends object ? {
    [K in keyof T]?: ZodFormattedError<T[K]>;
} : unknown);
declare class ZodError<T = any> extends Error {
    issues: ZodIssue[];
    get errors(): ZodIssue[];
    constructor(issues: ZodIssue[]);
    format(): ZodFormattedError<T>;
    format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
    static create: (issues: ZodIssue[]) => ZodError<any>;
    toString(): string;
    get message(): string;
    get isEmpty(): boolean;
    addIssue: (sub: ZodIssue) => void;
    addIssues: (subs?: ZodIssue[]) => void;
    flatten(): typeToFlattenedError<T>;
    flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
    get formErrors(): typeToFlattenedError<T, string>;
}
declare type stripPath<T extends object> = T extends any ? util.OmitKeys<T, "path"> : never;
declare type IssueData = stripPath<ZodIssueOptionalMessage> & {
    path?: (string | number)[];
    fatal?: boolean;
};
declare type ErrorMapCtx = {
    defaultError: string;
    data: any;
};
declare type ZodErrorMap = (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
    message: string;
};

declare type ParseParams = {
    path: (string | number)[];
    errorMap: ZodErrorMap;
    async: boolean;
};
declare type ParsePathComponent = string | number;
declare type ParsePath = ParsePathComponent[];
interface ParseContext {
    readonly common: {
        readonly issues: ZodIssue[];
        readonly contextualErrorMap?: ZodErrorMap;
        readonly async: boolean;
    };
    readonly path: ParsePath;
    readonly schemaErrorMap?: ZodErrorMap;
    readonly parent: ParseContext | null;
    readonly data: any;
    readonly parsedType: ZodParsedType;
}
declare type ParseInput = {
    data: any;
    path: (string | number)[];
    parent: ParseContext;
};
declare class ParseStatus {
    value: "aborted" | "dirty" | "valid";
    dirty(): void;
    abort(): void;
    static mergeArray(status: ParseStatus, results: SyncParseReturnType<any>[]): SyncParseReturnType;
    static mergeObjectAsync(status: ParseStatus, pairs: {
        key: ParseReturnType<any>;
        value: ParseReturnType<any>;
    }[]): Promise<SyncParseReturnType<any>>;
    static mergeObjectSync(status: ParseStatus, pairs: {
        key: SyncParseReturnType<any>;
        value: SyncParseReturnType<any>;
        alwaysSet?: boolean;
    }[]): SyncParseReturnType;
}
declare type INVALID = {
    status: "aborted";
};
declare const INVALID: INVALID;
declare type DIRTY<T> = {
    status: "dirty";
    value: T;
};
declare const DIRTY: <T>(value: T) => DIRTY<T>;
declare type OK<T> = {
    status: "valid";
    value: T;
};
declare const OK: <T>(value: T) => OK<T>;
declare type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;
declare type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
declare type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;

declare namespace enumUtil {
    type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends (k: infer Intersection) => void ? Intersection : never;
    type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last ? Last : never;
    type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never] ? Tuple : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;
    type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;
    export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
    export {};
}

declare namespace errorUtil {
    type ErrMessage = string | {
        message?: string;
    };
    const errToObj: (message?: string | {
        message?: string | undefined;
    } | undefined) => {
        message?: string | undefined;
    };
    const toString: (message?: string | {
        message?: string | undefined;
    } | undefined) => string | undefined;
}

declare namespace partialUtil {
    type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<infer Shape, infer Params, infer Catchall> ? ZodObject<{
        [k in keyof Shape]: ZodOptional<DeepPartial<Shape[k]>>;
    }, Params, Catchall> : T extends ZodArray<infer Type, infer Card> ? ZodArray<DeepPartial<Type>, Card> : T extends ZodOptional<infer Type> ? ZodOptional<DeepPartial<Type>> : T extends ZodNullable<infer Type> ? ZodNullable<DeepPartial<Type>> : T extends ZodTuple<infer Items> ? {
        [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never;
    } extends infer PI ? PI extends ZodTupleItems ? ZodTuple<PI> : never : never : T;
}

declare type RefinementCtx = {
    addIssue: (arg: IssueData) => void;
    path: (string | number)[];
};
declare type ZodRawShape = {
    [k: string]: ZodTypeAny;
};
declare type ZodTypeAny = ZodType<any, any, any>;
declare type TypeOf<T extends ZodType<any, any, any>> = T["_output"];
declare type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;
interface ZodTypeDef {
    errorMap?: ZodErrorMap;
    description?: string;
}
declare type RawCreateParams = {
    errorMap?: ZodErrorMap;
    invalid_type_error?: string;
    required_error?: string;
    description?: string;
} | undefined;
declare type SafeParseSuccess<Output> = {
    success: true;
    data: Output;
};
declare type SafeParseError<Input> = {
    success: false;
    error: ZodError<Input>;
};
declare type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;
declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    readonly _type: Output;
    readonly _output: Output;
    readonly _input: Input;
    readonly _def: Def;
    get description(): string | undefined;
    abstract _parse(input: ParseInput): ParseReturnType<Output>;
    _getType(input: ParseInput): string;
    _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
    _processInputParams(input: ParseInput): {
        status: ParseStatus;
        ctx: ParseContext;
    };
    _parseSync(input: ParseInput): SyncParseReturnType<Output>;
    _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
    parse(data: unknown, params?: Partial<ParseParams>): Output;
    safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;
    parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
    safeParseAsync(data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
    /** Alias of safeParseAsync */
    spa: (data: unknown, params?: Partial<ParseParams> | undefined) => Promise<SafeParseReturnType<Input, Output>>;
    refine<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, RefinedOutput, Input>;
    refine(check: (arg: Output) => unknown | Promise<unknown>, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, Output, Input>;
    refinement<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, RefinedOutput, Input>;
    refinement(check: (arg: Output) => boolean, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, Output, Input>;
    _refinement(refinement: RefinementEffect<Output>["refinement"]): ZodEffects<this, Output, Input>;
    superRefine: (refinement: RefinementEffect<Output>["refinement"]) => ZodEffects<this, Output, Input>;
    constructor(def: Def);
    optional(): ZodOptional<this>;
    nullable(): ZodNullable<this>;
    nullish(): ZodNullable<ZodOptional<this>>;
    array(): ZodArray<this>;
    promise(): ZodPromise<this>;
    or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
    and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
    transform<NewOut>(transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
    default(def: util.noUndefined<Input>): ZodDefault<this>;
    default(def: () => util.noUndefined<Input>): ZodDefault<this>;
    brand<B extends string | number | symbol>(): ZodBranded<this, B>;
    describe(description: string): this;
    isOptional(): boolean;
    isNullable(): boolean;
}
declare type ZodStringCheck = {
    kind: "min";
    value: number;
    message?: string;
} | {
    kind: "max";
    value: number;
    message?: string;
} | {
    kind: "email";
    message?: string;
} | {
    kind: "url";
    message?: string;
} | {
    kind: "uuid";
    message?: string;
} | {
    kind: "cuid";
    message?: string;
} | {
    kind: "startsWith";
    value: string;
    message?: string;
} | {
    kind: "endsWith";
    value: string;
    message?: string;
} | {
    kind: "regex";
    regex: RegExp;
    message?: string;
} | {
    kind: "trim";
    message?: string;
};
interface ZodStringDef extends ZodTypeDef {
    checks: ZodStringCheck[];
    typeName: ZodFirstPartyTypeKind.ZodString;
}
declare class ZodString extends ZodType<string, ZodStringDef> {
    _parse(input: ParseInput): ParseReturnType<string>;
    protected _regex: (regex: RegExp, validation: StringValidation, message?: string | {
        message?: string | undefined;
    } | undefined) => ZodEffects<this, string, string>;
    _addCheck(check: ZodStringCheck): ZodString;
    email(message?: errorUtil.ErrMessage): ZodString;
    url(message?: errorUtil.ErrMessage): ZodString;
    uuid(message?: errorUtil.ErrMessage): ZodString;
    cuid(message?: errorUtil.ErrMessage): ZodString;
    regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString;
    startsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
    endsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
    min(minLength: number, message?: errorUtil.ErrMessage): ZodString;
    max(maxLength: number, message?: errorUtil.ErrMessage): ZodString;
    length(len: number, message?: errorUtil.ErrMessage): ZodString;
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty: (message?: string | {
        message?: string | undefined;
    } | undefined) => ZodString;
    trim: () => ZodString;
    get isEmail(): boolean;
    get isURL(): boolean;
    get isUUID(): boolean;
    get isCUID(): boolean;
    get minLength(): number | null;
    get maxLength(): number | null;
    static create: (params?: RawCreateParams) => ZodString;
}
declare type ZodNumberCheck = {
    kind: "min";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "max";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "int";
    message?: string;
} | {
    kind: "multipleOf";
    value: number;
    message?: string;
};
interface ZodNumberDef extends ZodTypeDef {
    checks: ZodNumberCheck[];
    typeName: ZodFirstPartyTypeKind.ZodNumber;
}
declare class ZodNumber extends ZodType<number, ZodNumberDef> {
    _parse(input: ParseInput): ParseReturnType<number>;
    static create: (params?: RawCreateParams) => ZodNumber;
    gte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    min: (value: number, message?: string | {
        message?: string | undefined;
    } | undefined) => ZodNumber;
    gt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    lte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    max: (value: number, message?: string | {
        message?: string | undefined;
    } | undefined) => ZodNumber;
    lt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    protected setLimit(kind: "min" | "max", value: number, inclusive: boolean, message?: string): ZodNumber;
    _addCheck(check: ZodNumberCheck): ZodNumber;
    int(message?: errorUtil.ErrMessage): ZodNumber;
    positive(message?: errorUtil.ErrMessage): ZodNumber;
    negative(message?: errorUtil.ErrMessage): ZodNumber;
    nonpositive(message?: errorUtil.ErrMessage): ZodNumber;
    nonnegative(message?: errorUtil.ErrMessage): ZodNumber;
    multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    step: (value: number, message?: string | {
        message?: string | undefined;
    } | undefined) => ZodNumber;
    get minValue(): number | null;
    get maxValue(): number | null;
    get isInt(): boolean;
}
interface ZodBooleanDef extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodBoolean;
}
declare class ZodBoolean extends ZodType<boolean, ZodBooleanDef> {
    _parse(input: ParseInput): ParseReturnType<boolean>;
    static create: (params?: RawCreateParams) => ZodBoolean;
}
interface ZodUnknownDef extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodUnknown;
}
declare class ZodUnknown extends ZodType<unknown, ZodUnknownDef> {
    _unknown: true;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodUnknown;
}
interface ZodVoidDef extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodVoid;
}
declare class ZodVoid extends ZodType<void, ZodVoidDef> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodVoid;
}
interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodArray;
    minLength: {
        value: number;
        message?: string;
    } | null;
    maxLength: {
        value: number;
        message?: string;
    } | null;
}
declare type ArrayCardinality = "many" | "atleastone";
declare type arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];
declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> extends ZodType<arrayOutputType<T, Cardinality>, ZodArrayDef<T>, Cardinality extends "atleastone" ? [T["_input"], ...T["_input"][]] : T["_input"][]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get element(): T;
    min(minLength: number, message?: errorUtil.ErrMessage): this;
    max(maxLength: number, message?: errorUtil.ErrMessage): this;
    length(len: number, message?: errorUtil.ErrMessage): this;
    nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
    static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodArray<T_1, "many">;
}
declare namespace objectUtil {
    export type MergeShapes<U extends ZodRawShape, V extends ZodRawShape> = {
        [k in Exclude<keyof U, keyof V>]: U[k];
    } & V;
    type optionalKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? k : never;
    }[keyof T];
    type requiredKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? never : k;
    }[keyof T];
    export type addQuestionMarks<T extends object> = Partial<Pick<T, optionalKeys<T>>> & Pick<T, requiredKeys<T>>;
    export type identity<T> = T;
    export type flatten<T extends object> = identity<{
        [k in keyof T]: T[k];
    }>;
    export type noNeverKeys<T extends ZodRawShape> = {
        [k in keyof T]: [T[k]] extends [never] ? never : k;
    }[keyof T];
    export type noNever<T extends ZodRawShape> = identity<{
        [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never;
    }>;
    export const mergeShapes: <U extends ZodRawShape, T extends ZodRawShape>(first: U, second: T) => T & U;
    export {};
}
declare type extendShape<A, B> = Omit<A, keyof B> & B;
declare type UnknownKeysParam = "passthrough" | "strict" | "strip";
interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodObject;
    shape: () => T;
    catchall: Catchall;
    unknownKeys: UnknownKeys;
}
declare type baseObjectOutputType<Shape extends ZodRawShape> = objectUtil.flatten<objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_output"];
}>>;
declare type objectOutputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny> = ZodTypeAny extends Catchall ? baseObjectOutputType<Shape> : objectUtil.flatten<baseObjectOutputType<Shape> & {
    [k: string]: Catchall["_output"];
}>;
declare type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.flatten<objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_input"];
}>>;
declare type objectInputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny> = ZodTypeAny extends Catchall ? baseObjectInputType<Shape> : objectUtil.flatten<baseObjectInputType<Shape> & {
    [k: string]: Catchall["_input"];
}>;
declare type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U> ? deoptional<U> : T;
declare class ZodObject<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = "strip", Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall>, Input = objectInputType<T, Catchall>> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
    private _cached;
    _getCached(): {
        shape: T;
        keys: string[];
    };
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get shape(): T;
    strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
    strip(): ZodObject<T, "strip", Catchall>;
    passthrough(): ZodObject<T, "passthrough", Catchall>;
    /**
     * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
     * If you want to pass through unknown properties, use `.passthrough()` instead.
     */
    nonstrict: () => ZodObject<T, "passthrough", Catchall>;
    augment: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall, objectOutputType<extendShape<T, Augmentation>, Catchall>, objectInputType<extendShape<T, Augmentation>, Catchall>>;
    extend: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall, objectOutputType<extendShape<T, Augmentation>, Catchall>, objectInputType<extendShape<T, Augmentation>, Catchall>>;
    setKey<Key extends string, Schema extends ZodTypeAny>(key: Key, schema: Schema): ZodObject<T & {
        [k in Key]: Schema;
    }, UnknownKeys, Catchall>;
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge<Incoming extends AnyZodObject>(merging: Incoming): ZodObject<extendShape<T, ReturnType<Incoming["_def"]["shape"]>>, Incoming["_def"]["unknownKeys"], Incoming["_def"]["catchall"]>;
    catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
    pick<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
    omit<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
    deepPartial(): partialUtil.DeepPartial<this>;
    partial(): ZodObject<{
        [k in keyof T]: ZodOptional<T[k]>;
    }, UnknownKeys, Catchall>;
    partial<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<objectUtil.noNever<{
        [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
    }>, UnknownKeys, Catchall>;
    required(): ZodObject<{
        [k in keyof T]: deoptional<T[k]>;
    }, UnknownKeys, Catchall>;
    keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
    static create: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
    static strictCreate: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strict", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
    static lazycreate: <T_1 extends ZodRawShape>(shape: () => T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
}
declare type AnyZodObject = ZodObject<any, any, any>;
declare type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[
    ZodTypeAny,
    ZodTypeAny,
    ...ZodTypeAny[]
]>> extends ZodTypeDef {
    options: T;
    typeName: ZodFirstPartyTypeKind.ZodUnion;
}
declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<T[number]["_output"], ZodUnionDef<T>, T[number]["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    static create: <T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(types: T_1, params?: RawCreateParams) => ZodUnion<T_1>;
}
interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    left: T;
    right: U;
    typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> extends ZodType<T["_output"] & U["_output"], ZodIntersectionDef<T, U>, T["_input"] & U["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny>(left: T_1, right: U_1, params?: RawCreateParams) => ZodIntersection<T_1, U_1>;
}
declare type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
declare type AssertArray<T> = T extends any[] ? T : never;
declare type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_output"] : never;
}>;
declare type OutputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;
declare type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_input"] : never;
}>;
declare type InputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;
interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> extends ZodTypeDef {
    items: T;
    rest: Rest;
    typeName: ZodFirstPartyTypeKind.ZodTuple;
}
declare type AnyZodTuple = ZodTuple<[
    ZodTypeAny,
    ...ZodTypeAny[]
] | [], ZodTypeAny | null>;
declare class ZodTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]], Rest extends ZodTypeAny | null = null> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest>, InputTypeOfTupleWithRest<T, Rest>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get items(): T;
    rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
    static create: <T_1 extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(schemas: T_1, params?: RawCreateParams) => ZodTuple<T_1, null>;
}
interface ZodFunctionDef<Args extends ZodTuple<any, any> = ZodTuple<any, any>, Returns extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    args: Args;
    returns: Returns;
    typeName: ZodFirstPartyTypeKind.ZodFunction;
}
declare type OuterTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = Args["_input"] extends Array<any> ? (...args: Args["_input"]) => Returns["_output"] : never;
declare type InnerTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = Args["_output"] extends Array<any> ? (...args: Args["_output"]) => Returns["_input"] : never;
declare class ZodFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> extends ZodType<OuterTypeOfFunction<Args, Returns>, ZodFunctionDef<Args, Returns>, InnerTypeOfFunction<Args, Returns>> {
    _parse(input: ParseInput): ParseReturnType<any>;
    parameters(): Args;
    returnType(): Returns;
    args<Items extends Parameters<typeof ZodTuple["create"]>[0]>(...items: Items): ZodFunction<ZodTuple<Items, ZodUnknown>, Returns>;
    returns<NewReturnType extends ZodType<any, any>>(returnType: NewReturnType): ZodFunction<Args, NewReturnType>;
    implement<F extends InnerTypeOfFunction<Args, Returns>>(func: F): ReturnType<F> extends Returns["_output"] ? (...args: Args["_input"]) => ReturnType<F> : OuterTypeOfFunction<Args, Returns>;
    strictImplement(func: InnerTypeOfFunction<Args, Returns>): InnerTypeOfFunction<Args, Returns>;
    validate: <F extends InnerTypeOfFunction<Args, Returns>>(func: F) => ReturnType<F> extends Returns["_output"] ? (...args: Args["_input"]) => ReturnType<F> : OuterTypeOfFunction<Args, Returns>;
    static create(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>;
    static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>>(args: T): ZodFunction<T, ZodUnknown>;
    static create<T extends AnyZodTuple, U extends ZodTypeAny>(args: T, returns: U): ZodFunction<T, U>;
    static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>, U extends ZodTypeAny = ZodUnknown>(args: T, returns: U, params?: RawCreateParams): ZodFunction<T, U>;
}
interface ZodLiteralDef<T = any> extends ZodTypeDef {
    value: T;
    typeName: ZodFirstPartyTypeKind.ZodLiteral;
}
declare class ZodLiteral<T> extends ZodType<T, ZodLiteralDef<T>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get value(): T;
    static create: <T_1 extends string | number | bigint | boolean | null | undefined>(value: T_1, params?: RawCreateParams) => ZodLiteral<T_1>;
}
declare type EnumValues = [string, ...string[]];
declare type Values<T extends EnumValues> = {
    [k in T[number]]: k;
};
interface ZodEnumDef<T extends EnumValues = EnumValues> extends ZodTypeDef {
    values: T;
    typeName: ZodFirstPartyTypeKind.ZodEnum;
}
declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(values: T, params?: RawCreateParams): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(values: T, params?: RawCreateParams): ZodEnum<T>;
declare class ZodEnum<T extends [string, ...string[]]> extends ZodType<T[number], ZodEnumDef<T>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    get enum(): Values<T>;
    get Values(): Values<T>;
    get Enum(): Values<T>;
    static create: typeof createZodEnum;
}
interface ZodNativeEnumDef<T extends EnumLike = EnumLike> extends ZodTypeDef {
    values: T;
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum;
}
declare type EnumLike = {
    [k: string]: string | number;
    [nu: number]: string;
};
declare class ZodNativeEnum<T extends EnumLike> extends ZodType<T[keyof T], ZodNativeEnumDef<T>> {
    _parse(input: ParseInput): ParseReturnType<T[keyof T]>;
    get enum(): T;
    static create: <T_1 extends EnumLike>(values: T_1, params?: RawCreateParams) => ZodNativeEnum<T_1>;
}
interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodPromise;
}
declare class ZodPromise<T extends ZodTypeAny> extends ZodType<Promise<T["_output"]>, ZodPromiseDef<T>, Promise<T["_input"]>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodPromise<T_1>;
}
declare type RefinementEffect<T> = {
    type: "refinement";
    refinement: (arg: T, ctx: RefinementCtx) => any;
};
declare type TransformEffect<T> = {
    type: "transform";
    transform: (arg: T, ctx: RefinementCtx) => any;
};
declare type PreprocessEffect<T> = {
    type: "preprocess";
    transform: (arg: T) => any;
};
declare type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    schema: T;
    typeName: ZodFirstPartyTypeKind.ZodEffects;
    effect: Effect<any>;
}
declare class ZodEffects<T extends ZodTypeAny, Output = T["_output"], Input = T["_input"]> extends ZodType<Output, ZodEffectsDef<T>, Input> {
    innerType(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"], I["_input"]>;
    static createWithPreprocess: <I extends ZodTypeAny>(preprocess: (arg: unknown) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], unknown>;
}

interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodOptional;
}
declare class ZodOptional<T extends ZodTypeAny> extends ZodType<T["_output"] | undefined, ZodOptionalDef<T>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
}
interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodNullable;
}
declare class ZodNullable<T extends ZodTypeAny> extends ZodType<T["_output"] | null, ZodNullableDef<T>, T["_input"] | null> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodNullable<T_1>;
}
interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    defaultValue: () => util.noUndefined<T["_input"]>;
    typeName: ZodFirstPartyTypeKind.ZodDefault;
}
declare class ZodDefault<T extends ZodTypeAny> extends ZodType<util.noUndefined<T["_output"]>, ZodDefaultDef<T>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    removeDefault(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
}
interface ZodBrandedDef<T extends ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodBranded;
}
declare const BRAND: unique symbol;
declare type BRAND<T extends string | number | symbol> = {
    [BRAND]: {
        [k in T]: true;
    };
};
declare class ZodBranded<T extends ZodTypeAny, B extends string | number | symbol> extends ZodType<T["_output"] & BRAND<B>, ZodBrandedDef<T>, T["_input"] & BRAND<B>> {
    _parse(input: ParseInput): ParseReturnType<any>;
    unwrap(): T;
}
declare enum ZodFirstPartyTypeKind {
    ZodString = "ZodString",
    ZodNumber = "ZodNumber",
    ZodNaN = "ZodNaN",
    ZodBigInt = "ZodBigInt",
    ZodBoolean = "ZodBoolean",
    ZodDate = "ZodDate",
    ZodUndefined = "ZodUndefined",
    ZodNull = "ZodNull",
    ZodAny = "ZodAny",
    ZodUnknown = "ZodUnknown",
    ZodNever = "ZodNever",
    ZodVoid = "ZodVoid",
    ZodArray = "ZodArray",
    ZodObject = "ZodObject",
    ZodUnion = "ZodUnion",
    ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    ZodIntersection = "ZodIntersection",
    ZodTuple = "ZodTuple",
    ZodRecord = "ZodRecord",
    ZodMap = "ZodMap",
    ZodSet = "ZodSet",
    ZodFunction = "ZodFunction",
    ZodLazy = "ZodLazy",
    ZodLiteral = "ZodLiteral",
    ZodEnum = "ZodEnum",
    ZodEffects = "ZodEffects",
    ZodNativeEnum = "ZodNativeEnum",
    ZodOptional = "ZodOptional",
    ZodNullable = "ZodNullable",
    ZodDefault = "ZodDefault",
    ZodPromise = "ZodPromise",
    ZodBranded = "ZodBranded"
}

interface MessageCreator {
    [key: string]: (propertyName: string, params?: {
        [key: string]: unknown;
    }) => string;
}
interface ProcessedPropertyError {
    detail: FailedPolicyRequirement;
    messages: string[];
}

declare class FRLoginFailure implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.LoginFailure;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Step);
    /**
     * Gets the error code.
     */
    getCode(): number;
    /**
     * Gets the failure details.
     */
    getDetail(): FailureDetail | undefined;
    /**
     * Gets the failure message.
     */
    getMessage(): string | undefined;
    /**
     * Gets processed failure message.
     */
    getProcessedMessage(messageCreator?: MessageCreator): ProcessedPropertyError[];
    /**
     * Gets the failure reason.
     */
    getReason(): string | undefined;
}

declare class FRLoginSuccess implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.LoginSuccess;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Step);
    /**
     * Gets the step's realm.
     */
    getRealm(): string | undefined;
    /**
     * Gets the step's session token.
     */
    getSessionToken(): string | undefined;
    /**
     * Gets the step's success URL.
     */
    getSuccessUrl(): string | undefined;
}

/**
 * Tokens returned after successful authentication.
 */
interface OAuth2Tokens {
    accessToken: string;
    idToken?: string;
    refreshToken?: string;
    tokenExpiry?: number;
}

interface GetTokensOptions extends ConfigOptions {
    forceRenew?: boolean;
    login?: 'embedded' | 'redirect' | undefined;
    query?: StringDict<string>;
}

declare function noop(): void;

/**
 * INTERNAL, DO NOT USE. Code may change at any time.
 */
interface Fragment {
    key: string | null;
    first: null;
    c: () => void;
    l: (nodes: any) => void;
    h: () => void;
    m: (target: HTMLElement, anchor: any) => void;
    p: (ctx: T$$['ctx'], dirty: T$$['dirty']) => void;
    r: () => void;
    f: () => void;
    a: () => void;
    i: (local: any) => void;
    o: (local: any) => void;
    d: (detaching: 0 | 1) => void;
}
interface T$$ {
    dirty: number[];
    ctx: any[];
    bound: any;
    update: () => void;
    callbacks: any;
    after_update: any[];
    props: Record<string, 0 | string>;
    fragment: null | false | Fragment;
    not_equal: any;
    before_update: any[];
    context: Map<any, any>;
    on_mount: any[];
    on_destroy: any[];
    skip_bound: boolean;
    on_disconnect: any[];
    root: Element | ShadowRoot;
}

/**
 * Base class for Svelte components. Used when dev=false.
 */
declare class SvelteComponent {
    $$: T$$;
    $$set?: ($$props: any) => void;
    $destroy(): void;
    $on(type: any, callback: any): typeof noop;
    $set($$props: any): void;
}

declare type Props = Record<string, any>;
interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
    target: Element | ShadowRoot;
    anchor?: Element;
    props?: Props;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}
interface SvelteComponentDev$1 {
    $set(props?: Props): void;
    $on(event: string, callback: ((event: any) => void) | null | undefined): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
declare class SvelteComponentDev$1 extends SvelteComponent {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: any;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: any;
    constructor(options: ComponentConstructorOptions);
    $capture_state(): void;
    $inject_state(): void;
}
interface SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> {
    $set(props?: Partial<Props>): void;
    $on<K extends Extract<keyof Events, string>>(type: K, callback: ((e: Events[K]) => void) | null | undefined): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
declare class SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponentDev$1 {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: Events;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: Slots;
    constructor(options: ComponentConstructorOptions<Props>);
}

/** Callback to inform of a value updates. */
declare type Subscriber<T> = (value: T) => void;
/** Unsubscribes from value updates. */
declare type Unsubscriber = () => void;
/** Callback to update a value. */
declare type Updater<T> = (value: T) => T;
/** Cleanup logic callback. */
declare type Invalidator<T> = (value?: T) => void;
/** Readable interface for subscribing. */
interface Readable<T> {
    /**
     * Subscribe on value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
}
/** Writable interface for both updating and subscribing. */
interface Writable<T> extends Readable<T> {
    /**
     * Set value and inform subscribers.
     * @param value to set
     */
    set(this: void, value: T): void;
    /**
     * Update value using callback and inform subscribers.
     * @param updater callback
     */
    update(this: void, updater: Updater<T>): void;
}

type Maybe<T> = T | null | undefined;

interface CallbackMetadata {
    derived: {
        canForceUserInputOptionality: boolean;
        isFirstInvalidInput: boolean;
        isReadyForSubmission: boolean;
        isSelfSubmitting: boolean;
        isUserInputRequired: boolean;
    };
    idx: number;
    platform?: Record<string, unknown>;
}
interface JourneyStore extends Pick<Writable<JourneyStoreValue>, 'subscribe'> {
    next: (prevStep?: StepTypes, nextOptions?: StepOptions) => void;
    pop: () => void;
    push: (changeOptions: StepOptions) => void;
    reset: () => void;
    resume: (url: string, resumeOptions?: StepOptions) => void;
    start: (startOptions?: StepOptions) => void;
}
interface JourneyStoreValue {
    completed: boolean;
    error: Maybe<{
        code: Maybe<number>;
        message: Maybe<string>;
        step: Maybe<Step>;
    }>;
    loading: boolean;
    metadata: {
        callbacks: CallbackMetadata[];
        step: StepMetadata;
    } | null;
    step: StepTypes;
    successful: boolean;
    response: Maybe<Step>;
}
interface StepMetadata {
    derived: {
        isUserInputOptional: boolean;
        isStepSelfSubmittable: boolean;
        numOfCallbacks: number;
        numOfSelfSubmittableCbs: number;
        numOfUserInputCbs: number;
    };
    platform?: Record<string, unknown>;
}
type StepTypes = FRStep | FRLoginSuccess | FRLoginFailure | null;

interface OAuthStore extends Pick<Writable<OAuthTokenStoreValue>, 'subscribe'> {
    get: (getOptions?: GetTokensOptions) => void;
    reset: () => void;
}
interface OAuthTokenStoreValue {
    completed: boolean;
    error: Maybe<{
        code?: Maybe<number>;
        message: Maybe<string>;
    }>;
    loading: boolean;
    successful: boolean;
    response: Maybe<OAuth2Tokens> | void;
}

interface UserStore extends Pick<Writable<UserStoreValue>, 'subscribe'> {
    get: (getOptions?: ConfigOptions) => void;
    reset: () => void;
}
interface UserStoreValue {
    completed: boolean;
    error: Maybe<{
        code?: Maybe<number>;
        message: Maybe<string>;
    }>;
    loading: boolean;
    successful: boolean;
    response: unknown;
}

declare const partialConfigSchema: ZodObject<{
    callbackFactory: ZodOptional<ZodOptional<ZodFunction<ZodTuple<[ZodObject<{
        _id: ZodOptional<ZodNumber>;
        input: ZodOptional<ZodArray<ZodObject<{
            name: ZodString;
            value: ZodUnknown;
        }, "strip", ZodTypeAny, {
            value?: unknown;
            name: string;
        }, {
            value?: unknown;
            name: string;
        }>, "many">>;
        output: ZodArray<ZodObject<{
            name: ZodString;
            value: ZodUnknown;
        }, "strip", ZodTypeAny, {
            value?: unknown;
            name: string;
        }, {
            value?: unknown;
            name: string;
        }>, "many">;
        type: ZodNativeEnum<typeof CallbackType>;
    }, "strip", ZodTypeAny, {
        input?: {
            value?: unknown;
            name: string;
        }[] | undefined;
        _id?: number | undefined;
        type: CallbackType;
        output: {
            value?: unknown;
            name: string;
        }[];
    }, {
        input?: {
            value?: unknown;
            name: string;
        }[] | undefined;
        _id?: number | undefined;
        type: CallbackType;
        output: {
            value?: unknown;
            name: string;
        }[];
    }>], ZodUnknown>, ZodType<FRCallback, ZodTypeDef, FRCallback>>>>;
    clientId: ZodOptional<ZodOptional<ZodString>>;
    middleware: ZodOptional<ZodOptional<ZodArray<ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>, "many">>>;
    realmPath: ZodOptional<ZodString>;
    redirectUri: ZodOptional<ZodOptional<ZodString>>;
    scope: ZodOptional<ZodOptional<ZodString>>;
    serverConfig: ZodOptional<ZodObject<{
        baseUrl: ZodString;
        paths: ZodOptional<ZodObject<{
            authenticate: ZodString;
            authorize: ZodString;
            accessToken: ZodString;
            endSession: ZodString;
            userInfo: ZodString;
            revoke: ZodString;
            sessions: ZodString;
        }, "strip", ZodTypeAny, {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        }, {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        }>>;
        timeout: ZodNumber;
    }, "strip", ZodTypeAny, {
        paths?: {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        } | undefined;
        timeout: number;
        baseUrl: string;
    }, {
        paths?: {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        } | undefined;
        timeout: number;
        baseUrl: string;
    }>>;
    support: ZodOptional<ZodOptional<ZodUnion<[ZodLiteral<"legacy">, ZodLiteral<"modern">]>>>;
    tokenStore: ZodOptional<ZodOptional<ZodUnion<[ZodObject<{
        get: ZodFunction<ZodTuple<[ZodString], ZodUnknown>, ZodPromise<ZodObject<{
            accessToken: ZodString;
            idToken: ZodOptional<ZodString>;
            refreshToken: ZodOptional<ZodString>;
            tokenExpiry: ZodOptional<ZodNumber>;
        }, "strip", ZodTypeAny, {
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }, {
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }>>>;
        set: ZodFunction<ZodTuple<[ZodString], ZodUnknown>, ZodPromise<ZodVoid>>;
        remove: ZodFunction<ZodTuple<[ZodString], ZodUnknown>, ZodPromise<ZodVoid>>;
    }, "strip", ZodTypeAny, {
        set: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        remove: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        get: (args_0: string, ...args_1: unknown[]) => Promise<{
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }>;
    }, {
        set: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        remove: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        get: (args_0: string, ...args_1: unknown[]) => Promise<{
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }>;
    }>, ZodLiteral<"indexedDB">, ZodLiteral<"sessionStorage">, ZodLiteral<"localStorage">]>>>;
    tree: ZodOptional<ZodOptional<ZodString>>;
    type: ZodOptional<ZodOptional<ZodString>>;
    oauthThreshold: ZodOptional<ZodOptional<ZodNumber>>;
}, "strict", ZodTypeAny, {
    type?: string | undefined;
    callbackFactory?: ((args_0: {
        input?: {
            value?: unknown;
            name: string;
        }[] | undefined;
        _id?: number | undefined;
        type: CallbackType;
        output: {
            value?: unknown;
            name: string;
        }[];
    }, ...args_1: unknown[]) => FRCallback) | undefined;
    clientId?: string | undefined;
    middleware?: ((...args: unknown[]) => unknown)[] | undefined;
    realmPath?: string | undefined;
    redirectUri?: string | undefined;
    scope?: string | undefined;
    serverConfig?: {
        paths?: {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        } | undefined;
        timeout: number;
        baseUrl: string;
    } | undefined;
    support?: "modern" | "legacy" | undefined;
    tokenStore?: "localStorage" | "indexedDB" | "sessionStorage" | {
        set: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        remove: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        get: (args_0: string, ...args_1: unknown[]) => Promise<{
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }>;
    } | undefined;
    tree?: string | undefined;
    oauthThreshold?: number | undefined;
}, {
    type?: string | undefined;
    callbackFactory?: ((args_0: {
        input?: {
            value?: unknown;
            name: string;
        }[] | undefined;
        _id?: number | undefined;
        type: CallbackType;
        output: {
            value?: unknown;
            name: string;
        }[];
    }, ...args_1: unknown[]) => FRCallback) | undefined;
    clientId?: string | undefined;
    middleware?: ((...args: unknown[]) => unknown)[] | undefined;
    realmPath?: string | undefined;
    redirectUri?: string | undefined;
    scope?: string | undefined;
    serverConfig?: {
        paths?: {
            authenticate: string;
            authorize: string;
            accessToken: string;
            endSession: string;
            userInfo: string;
            revoke: string;
            sessions: string;
        } | undefined;
        timeout: number;
        baseUrl: string;
    } | undefined;
    support?: "modern" | "legacy" | undefined;
    tokenStore?: "localStorage" | "indexedDB" | "sessionStorage" | {
        set: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        remove: (args_0: string, ...args_1: unknown[]) => Promise<void>;
        get: (args_0: string, ...args_1: unknown[]) => Promise<{
            idToken?: string | undefined;
            refreshToken?: string | undefined;
            tokenExpiry?: number | undefined;
            accessToken: string;
        }>;
    } | undefined;
    tree?: string | undefined;
    oauthThreshold?: number | undefined;
}>;

declare const journeyConfigSchema: ZodObject<{
    forgotPassword: ZodObject<{
        journey: ZodOptional<ZodString>;
        match: ZodArray<ZodString, "many">;
    }, "strip", ZodTypeAny, {
        journey?: string | undefined;
        match: string[];
    }, {
        journey?: string | undefined;
        match: string[];
    }>;
    forgotUsername: ZodObject<{
        journey: ZodOptional<ZodString>;
        match: ZodArray<ZodString, "many">;
    }, "strip", ZodTypeAny, {
        journey?: string | undefined;
        match: string[];
    }, {
        journey?: string | undefined;
        match: string[];
    }>;
    login: ZodObject<{
        journey: ZodOptional<ZodString>;
        match: ZodArray<ZodString, "many">;
    }, "strip", ZodTypeAny, {
        journey?: string | undefined;
        match: string[];
    }, {
        journey?: string | undefined;
        match: string[];
    }>;
    register: ZodObject<{
        journey: ZodOptional<ZodString>;
        match: ZodArray<ZodString, "many">;
    }, "strip", ZodTypeAny, {
        journey?: string | undefined;
        match: string[];
    }, {
        journey?: string | undefined;
        match: string[];
    }>;
}, "strip", ZodTypeAny, {
    forgotPassword: {
        journey?: string | undefined;
        match: string[];
    };
    forgotUsername: {
        journey?: string | undefined;
        match: string[];
    };
    login: {
        journey?: string | undefined;
        match: string[];
    };
    register: {
        journey?: string | undefined;
        match: string[];
    };
}, {
    forgotPassword: {
        journey?: string | undefined;
        match: string[];
    };
    forgotUsername: {
        journey?: string | undefined;
        match: string[];
    };
    login: {
        journey?: string | undefined;
        match: string[];
    };
    register: {
        journey?: string | undefined;
        match: string[];
    };
}>;

declare const partialLinksSchema: ZodObject<{
    termsAndConditions: ZodOptional<ZodString>;
}, "strict", ZodTypeAny, {
    termsAndConditions?: string | undefined;
}, {
    termsAndConditions?: string | undefined;
}>;

declare const partialStringsSchema: ZodObject<{
    alreadyHaveAnAccount: ZodOptional<ZodString>;
    backToDefault: ZodOptional<ZodString>;
    backToLogin: ZodOptional<ZodString>;
    dontHaveAnAccount: ZodOptional<ZodString>;
    closeModal: ZodOptional<ZodString>;
    chooseDifferentUsername: ZodOptional<ZodString>;
    confirmPassword: ZodOptional<ZodString>;
    constraintViolationForPassword: ZodOptional<ZodString>;
    constraintViolationForValue: ZodOptional<ZodString>;
    continueWith: ZodOptional<ZodString>;
    customSecurityQuestion: ZodOptional<ZodString>;
    doesNotMeetMinimumCharacterLength: ZodOptional<ZodString>;
    ensurePasswordIsMoreThan: ZodOptional<ZodString>;
    ensurePasswordHasOne: ZodOptional<ZodString>;
    exceedsMaximumCharacterLength: ZodOptional<ZodString>;
    fieldCanNotContainFollowingCharacters: ZodOptional<ZodString>;
    fieldCanNotContainFollowingValues: ZodOptional<ZodString>;
    forgotPassword: ZodOptional<ZodString>;
    forgotUsername: ZodOptional<ZodString>;
    givenName: ZodOptional<ZodString>;
    inputRequiredError: ZodOptional<ZodString>;
    loading: ZodOptional<ZodString>;
    loginButton: ZodOptional<ZodString>;
    loginFailure: ZodOptional<ZodString>;
    loginHeader: ZodOptional<ZodString>;
    loginSuccess: ZodOptional<ZodString>;
    mail: ZodOptional<ZodString>;
    minimumNumberOfNumbers: ZodOptional<ZodString>;
    minimumNumberOfLowercase: ZodOptional<ZodString>;
    minimumNumberOfUppercase: ZodOptional<ZodString>;
    minimumNumberOfSymbols: ZodOptional<ZodString>;
    nameCallback: ZodOptional<ZodString>;
    nextButton: ZodOptional<ZodString>;
    notToExceedMaximumCharacterLength: ZodOptional<ZodString>;
    noLessThanMinimumCharacterLength: ZodOptional<ZodString>;
    passwordCallback: ZodOptional<ZodString>;
    passwordRequirements: ZodOptional<ZodString>;
    pleaseCheckValue: ZodOptional<ZodString>;
    pleaseConfirm: ZodOptional<ZodString>;
    preferencesMarketing: ZodOptional<ZodString>;
    preferencesUpdates: ZodOptional<ZodString>;
    provideCustomQuestion: ZodOptional<ZodString>;
    redirectingTo: ZodOptional<ZodString>;
    registerButton: ZodOptional<ZodString>;
    registerHeader: ZodOptional<ZodString>;
    registerSuccess: ZodOptional<ZodString>;
    requiredField: ZodOptional<ZodString>;
    securityAnswer: ZodOptional<ZodString>;
    securityQuestions: ZodOptional<ZodString>;
    securityQuestionsPrompt: ZodOptional<ZodString>;
    showPassword: ZodOptional<ZodString>;
    sn: ZodOptional<ZodString>;
    submitButton: ZodOptional<ZodString>;
    successMessage: ZodOptional<ZodString>;
    termsAndConditions: ZodOptional<ZodString>;
    termsAndConditionsLinkText: ZodOptional<ZodString>;
    tryAgain: ZodOptional<ZodString>;
    useValidEmail: ZodOptional<ZodString>;
    unrecoverableError: ZodOptional<ZodString>;
    unknownNetworkError: ZodOptional<ZodString>;
    usernameRequirements: ZodOptional<ZodString>;
    validatedCreatePasswordCallback: ZodOptional<ZodString>;
    validatedCreateUsernameCallback: ZodOptional<ZodString>;
    valueRequirements: ZodOptional<ZodString>;
}, "strict", ZodTypeAny, {
    loading?: string | undefined;
    termsAndConditions?: string | undefined;
    alreadyHaveAnAccount?: string | undefined;
    backToDefault?: string | undefined;
    backToLogin?: string | undefined;
    dontHaveAnAccount?: string | undefined;
    closeModal?: string | undefined;
    chooseDifferentUsername?: string | undefined;
    confirmPassword?: string | undefined;
    constraintViolationForPassword?: string | undefined;
    constraintViolationForValue?: string | undefined;
    continueWith?: string | undefined;
    customSecurityQuestion?: string | undefined;
    doesNotMeetMinimumCharacterLength?: string | undefined;
    ensurePasswordIsMoreThan?: string | undefined;
    ensurePasswordHasOne?: string | undefined;
    exceedsMaximumCharacterLength?: string | undefined;
    fieldCanNotContainFollowingCharacters?: string | undefined;
    fieldCanNotContainFollowingValues?: string | undefined;
    forgotPassword?: string | undefined;
    forgotUsername?: string | undefined;
    givenName?: string | undefined;
    inputRequiredError?: string | undefined;
    loginButton?: string | undefined;
    loginFailure?: string | undefined;
    loginHeader?: string | undefined;
    loginSuccess?: string | undefined;
    mail?: string | undefined;
    minimumNumberOfNumbers?: string | undefined;
    minimumNumberOfLowercase?: string | undefined;
    minimumNumberOfUppercase?: string | undefined;
    minimumNumberOfSymbols?: string | undefined;
    nameCallback?: string | undefined;
    nextButton?: string | undefined;
    notToExceedMaximumCharacterLength?: string | undefined;
    noLessThanMinimumCharacterLength?: string | undefined;
    passwordCallback?: string | undefined;
    passwordRequirements?: string | undefined;
    pleaseCheckValue?: string | undefined;
    pleaseConfirm?: string | undefined;
    preferencesMarketing?: string | undefined;
    preferencesUpdates?: string | undefined;
    provideCustomQuestion?: string | undefined;
    redirectingTo?: string | undefined;
    registerButton?: string | undefined;
    registerHeader?: string | undefined;
    registerSuccess?: string | undefined;
    requiredField?: string | undefined;
    securityAnswer?: string | undefined;
    securityQuestions?: string | undefined;
    securityQuestionsPrompt?: string | undefined;
    showPassword?: string | undefined;
    sn?: string | undefined;
    submitButton?: string | undefined;
    successMessage?: string | undefined;
    termsAndConditionsLinkText?: string | undefined;
    tryAgain?: string | undefined;
    useValidEmail?: string | undefined;
    unrecoverableError?: string | undefined;
    unknownNetworkError?: string | undefined;
    usernameRequirements?: string | undefined;
    validatedCreatePasswordCallback?: string | undefined;
    validatedCreateUsernameCallback?: string | undefined;
    valueRequirements?: string | undefined;
}, {
    loading?: string | undefined;
    termsAndConditions?: string | undefined;
    alreadyHaveAnAccount?: string | undefined;
    backToDefault?: string | undefined;
    backToLogin?: string | undefined;
    dontHaveAnAccount?: string | undefined;
    closeModal?: string | undefined;
    chooseDifferentUsername?: string | undefined;
    confirmPassword?: string | undefined;
    constraintViolationForPassword?: string | undefined;
    constraintViolationForValue?: string | undefined;
    continueWith?: string | undefined;
    customSecurityQuestion?: string | undefined;
    doesNotMeetMinimumCharacterLength?: string | undefined;
    ensurePasswordIsMoreThan?: string | undefined;
    ensurePasswordHasOne?: string | undefined;
    exceedsMaximumCharacterLength?: string | undefined;
    fieldCanNotContainFollowingCharacters?: string | undefined;
    fieldCanNotContainFollowingValues?: string | undefined;
    forgotPassword?: string | undefined;
    forgotUsername?: string | undefined;
    givenName?: string | undefined;
    inputRequiredError?: string | undefined;
    loginButton?: string | undefined;
    loginFailure?: string | undefined;
    loginHeader?: string | undefined;
    loginSuccess?: string | undefined;
    mail?: string | undefined;
    minimumNumberOfNumbers?: string | undefined;
    minimumNumberOfLowercase?: string | undefined;
    minimumNumberOfUppercase?: string | undefined;
    minimumNumberOfSymbols?: string | undefined;
    nameCallback?: string | undefined;
    nextButton?: string | undefined;
    notToExceedMaximumCharacterLength?: string | undefined;
    noLessThanMinimumCharacterLength?: string | undefined;
    passwordCallback?: string | undefined;
    passwordRequirements?: string | undefined;
    pleaseCheckValue?: string | undefined;
    pleaseConfirm?: string | undefined;
    preferencesMarketing?: string | undefined;
    preferencesUpdates?: string | undefined;
    provideCustomQuestion?: string | undefined;
    redirectingTo?: string | undefined;
    registerButton?: string | undefined;
    registerHeader?: string | undefined;
    registerSuccess?: string | undefined;
    requiredField?: string | undefined;
    securityAnswer?: string | undefined;
    securityQuestions?: string | undefined;
    securityQuestionsPrompt?: string | undefined;
    showPassword?: string | undefined;
    sn?: string | undefined;
    submitButton?: string | undefined;
    successMessage?: string | undefined;
    termsAndConditionsLinkText?: string | undefined;
    tryAgain?: string | undefined;
    useValidEmail?: string | undefined;
    unrecoverableError?: string | undefined;
    unknownNetworkError?: string | undefined;
    usernameRequirements?: string | undefined;
    validatedCreatePasswordCallback?: string | undefined;
    validatedCreateUsernameCallback?: string | undefined;
    valueRequirements?: string | undefined;
}>;

declare const partialStyleSchema: ZodObject<{
    checksAndRadios: ZodOptional<ZodOptional<ZodUnion<[ZodLiteral<"animated">, ZodLiteral<"standard">]>>>;
    labels: ZodOptional<ZodOptional<ZodUnion<[ZodOptional<ZodLiteral<"floating">>, ZodLiteral<"stacked">]>>>;
    logo: ZodOptional<ZodOptional<ZodObject<{
        dark: ZodOptional<ZodString>;
        height: ZodOptional<ZodNumber>;
        light: ZodOptional<ZodString>;
        width: ZodOptional<ZodNumber>;
    }, "strict", ZodTypeAny, {
        height?: number | undefined;
        width?: number | undefined;
        dark?: string | undefined;
        light?: string | undefined;
    }, {
        height?: number | undefined;
        width?: number | undefined;
        dark?: string | undefined;
        light?: string | undefined;
    }>>>;
    sections: ZodOptional<ZodOptional<ZodObject<{
        header: ZodOptional<ZodBoolean>;
    }, "strip", ZodTypeAny, {
        header?: boolean | undefined;
    }, {
        header?: boolean | undefined;
    }>>>;
    stage: ZodOptional<ZodOptional<ZodObject<{
        icon: ZodOptional<ZodBoolean>;
    }, "strip", ZodTypeAny, {
        icon?: boolean | undefined;
    }, {
        icon?: boolean | undefined;
    }>>>;
}, "strict", ZodTypeAny, {
    labels?: "floating" | "stacked" | undefined;
    checksAndRadios?: "standard" | "animated" | undefined;
    logo?: {
        height?: number | undefined;
        width?: number | undefined;
        dark?: string | undefined;
        light?: string | undefined;
    } | undefined;
    sections?: {
        header?: boolean | undefined;
    } | undefined;
    stage?: {
        icon?: boolean | undefined;
    } | undefined;
}, {
    labels?: "floating" | "stacked" | undefined;
    checksAndRadios?: "standard" | "animated" | undefined;
    logo?: {
        height?: number | undefined;
        width?: number | undefined;
        dark?: string | undefined;
        light?: string | undefined;
    } | undefined;
    sections?: {
        header?: boolean | undefined;
    } | undefined;
    stage?: {
        icon?: boolean | undefined;
    } | undefined;
}>;

interface JourneyOptions {
    oauth?: boolean;
    user?: boolean;
}
interface JourneyOptionsStart {
    config?: StepOptions;
    journey?: string;
    resumeUrl?: string;
}
interface ModalApi {
    close(args?: {
        reason: 'auto' | 'external' | 'user';
    }): void;
    onClose(fn: (args: {
        reason: 'auto' | 'external' | 'user';
    }) => void): void;
    onMount(fn: (dialog: HTMLDialogElement, form: HTMLFormElement) => void): void;
    open(options?: JourneyOptions): void;
}
interface WidgetConfigOptions {
    config?: TypeOf<typeof partialConfigSchema>;
    content?: TypeOf<typeof partialStringsSchema>;
    journeys?: TypeOf<typeof journeyConfigSchema>;
    links?: TypeOf<typeof partialLinksSchema>;
    style?: TypeOf<typeof partialStyleSchema>;
}


declare const api: {
    getStores(): {
        journeyStore: JourneyStore;
        oauthStore: OAuthStore;
        userStore: UserStore;
    };
    user: {
        info(): {
            get: (options?: ConfigOptions | undefined) => Promise<unknown>;
            subscribe: (this: void, run: Subscriber<UserStoreValue>, invalidate?: ((value?: UserStoreValue | undefined) => void) | undefined) => Unsubscriber;
        };
        logout(): Promise<void>;
        tokens(): {
            get: (options?: ConfigOptions | undefined) => Promise<unknown>;
            subscribe: (this: void, run: Subscriber<OAuthTokenStoreValue>, invalidate?: ((value?: OAuthTokenStoreValue | undefined) => void) | undefined) => Unsubscriber;
        };
    };
    modal?: ModalApi | undefined;
    configuration: () => {
        set(options: WidgetConfigOptions): void;
    };
    journey: (options?: JourneyOptions | undefined) => {
        start: (startOptions?: JourneyOptionsStart | undefined) => Promise<unknown>;
        subscribe: (this: void, run: Subscriber<{
            journey: JourneyStoreValue;
            oauth: OAuthTokenStoreValue;
            user: UserStoreValue;
        }>, invalidate?: ((value?: {
            journey: JourneyStoreValue;
            oauth: OAuthTokenStoreValue;
            user: UserStoreValue;
        } | undefined) => void) | undefined) => Unsubscriber;
    };
    request: typeof HttpClient.request;
};
declare const configuration: () => {
    set(options: WidgetConfigOptions): void;
};
declare const journey: (options?: JourneyOptions | undefined) => {
    start: (startOptions?: JourneyOptionsStart | undefined) => Promise<unknown>;
    subscribe: (this: void, run: Subscriber<{
        journey: JourneyStoreValue;
        oauth: OAuthTokenStoreValue;
        user: UserStoreValue;
    }>, invalidate?: ((value?: {
        journey: JourneyStoreValue;
        oauth: OAuthTokenStoreValue;
        user: UserStoreValue;
    } | undefined) => void) | undefined) => Unsubscriber;
};
declare const modal: ModalApi;
declare const request: typeof HttpClient.request;
declare const user: {
    info(): {
        get: (options?: ConfigOptions | undefined) => Promise<unknown>;
        subscribe: (this: void, run: Subscriber<UserStoreValue>, invalidate?: ((value?: UserStoreValue | undefined) => void) | undefined) => Unsubscriber;
    };
    logout(): Promise<void>;
    tokens(): {
        get: (options?: ConfigOptions | undefined) => Promise<unknown>;
        subscribe: (this: void, run: Subscriber<OAuthTokenStoreValue>, invalidate?: ((value?: OAuthTokenStoreValue | undefined) => void) | undefined) => Unsubscriber;
    };
};
type ConfigurationApi = ReturnType<typeof api.configuration>;
type JourneyApi = ReturnType<typeof api.journey>;
type UserInfoApi = ReturnType<typeof api.user.info>;
type UserTokensApi = ReturnType<typeof api.user.tokens>;
declare const __propDef: {
    props: Record<string, never>;
    events: {
        'modal-mount': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type ModalProps = typeof __propDef.props;
type ModalEvents = typeof __propDef.events;
type ModalSlots = typeof __propDef.slots;
declare class Modal extends SvelteComponentTyped<ModalProps, ModalEvents, ModalSlots> {
}

export { ConfigurationApi, JourneyApi, ModalEvents, ModalProps, ModalSlots, UserInfoApi, UserTokensApi, configuration, Modal as default, journey, modal, request, user };
