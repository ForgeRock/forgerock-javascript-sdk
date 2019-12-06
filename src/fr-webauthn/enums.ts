enum Outcome {
  Error = 'ERROR',
  Unsupported = 'unsupported',
}

enum WebAuthnStepType {
  None = 0,
  Authentication = 1,
  Registration = 2,
}

export { Outcome, WebAuthnStepType };
