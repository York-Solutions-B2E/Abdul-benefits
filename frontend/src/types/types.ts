export interface Plan {
  name: string;
  planYear: number;
  networkName: string;
}

export interface Accumulator {
  type: string; // "DEDUCTIBLE" | "OOP_MAX"
  tier: string; // "IN_NETWORK" | "OUT_OF_NETWORK"
  limitAmount: number;
  usedAmount: number;
}

export interface Enrollment {
  plan: Plan;
  active: boolean;
  accumulators: Accumulator[];
  coverageStart: string;
  coverageEnd: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  status: string;
  totalBilled: number;
  totalAllowed: number;
  totalPlanPaid: number;
  serviceStartDate: string;
  serviceEndDate: string;
  description: string;
  totalMemberResponsibility: number;
  provider: {
    name: string;
    specialty: string;
  };

  lines: ClaimLine[];
}

export interface ClaimLine {
  id: string;
  lineNumber: number;
  cptCode: string;
  description: string;
  billedAmount: number;
  allowedAmount: number;
  deductibleApplied: number;
  copayApplied: number;
  coinsuranceApplied: number;
  planPaid: number;
  memberResponsibility: number;
}

export interface Member {
  firstName: string;
  lastName: string;
  activeEnrollment: Enrollment | null;
}

export interface DashboardData {
  member: Member | null;
  claims: Claim[];
}

// export interface ClaimStatus {
//   SUBMITTED: "SUBMITTED";
//   IN_REVIEW: "IN_REVIEW";
//   PROCESSED: "PROCESSED";
//   PAID: "PAID";
//   DENIED: "DENIED";
// }

export type ClaimStatusType =
  | "SUBMITTED"
  | "IN_REVIEW"
  | "In Review"
  | "PROCESSED"
  | "PAID"
  | "DENIED";
