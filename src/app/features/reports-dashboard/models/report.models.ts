export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface DashboardSummary {
  totalCustomers: number;
  totalPolicies: number;
  activePolicies: number;
  premiumCollected: number;
  pendingPremium: number;
  claimsRegistered: number;
  claimsApproved: number;
  claimsRejected: number;
  claimsSettled: number;
  outstandingClaims: number;
  monthlyRevenue: number;
  lossRatioPercent: number;
  renewalDue: number;
  topPerformingAgent: string;
  dataSource: string;
}

export interface ChartPoint { label: string; value: number; }
export interface DashboardCharts {
  premiumTrend: ChartPoint[];
  policySales: ChartPoint[];
  policiesByProduct: ChartPoint[];
  claimsByStatus: ChartPoint[];
  agentPerformance: ChartPoint[];
  dataSource: ChartPoint[];
}

export interface PolicyReport {
  policyNumber: string;
  customerId: number;
  product: string;
  status: string;
  branch: string;
  premium: number;
  issueDate: string;
  renewalDue: boolean;
}

export interface PremiumReport {
  paymentId: number;
  policyNumber: string;
  amount: number;
  status: string;
  paymentDate: string;
  agent: string;
  branch: string;
}
export interface ClaimReport {
  claimId: number;
  policyNumber: string;
  amount: number;
  status: string;
  claimDate: string;
  branch: string;
  investigation: string;
}
export interface UnderwritingReport {
  caseId: number;
  customerId: number;
  status: string;
  risk: string;
  underwriter: string;
  caseDate: string;
}
export interface AgentReport {
  agent: string;
  sales: number;
  premiumCollected: number;
  activeCustomers: number;
  commission: number;
  branch: string;
}
export interface FinancialReport {
  paymentId?: number;
  claimId?: number;
  policyNumber: string;
  amount: number;
  status: string;
  paymentDate?: string;
  claimDate?: string;
  agent?: string;
  branch: string;
  investigation?: string;
}