interface ErrorResponse {
  code: number;
  reason: string;
  message: string;
  detail: ErrorDetail;
}

interface ErrorDetail {
  result: boolean;
  failedPolicyRequirements: FailedPolicyRequirement[];
}

interface FailedPolicyRequirement {
  policyRequirements: PolicyRequirement[];
  property: string;
}

interface PolicyRequirement {
  params?: any;
  policyRequirement: string;
}

interface PolicyRequirementParams {
  [key: string]: number;
}

export {
  ErrorResponse,
  ErrorDetail,
  FailedPolicyRequirement,
  PolicyRequirement,
  PolicyRequirementParams,
};
