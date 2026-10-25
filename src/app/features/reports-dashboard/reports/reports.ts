import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportsDashboardService, CustomerReport } from '../services/reports-dashboard.service';
import { PolicyReport, PremiumReport, ClaimReport, UnderwritingReport, AgentReport, FinancialReport} from '../models/report.models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements OnInit {
  policies: PolicyReport[] = [];
  customers: CustomerReport[] = [];
  premiums: PremiumReport[] = [];
  claims: ClaimReport[] = []; 
  underwritingCases: UnderwritingReport[] = [];
  agents: AgentReport[] = [];
  financialRecords: FinancialReport[] = [];
  financialSearchText = '';
  financialTypeFilter = 'All';
  financialStatusFilter = 'All';
  financialBranchFilter = 'All';
  financialFromDate = '';
  financialToDate = '';

  agentSearchText = '';
  agentBranchFilter = 'All';
  agentMinSales: number | null = null;
  agentMinPremium: number | null = null;

  underwritingSearchText = '';
  underwritingStatusFilter = 'All';
  underwritingRiskFilter = 'All';
  underwritingUnderwriterFilter = 'All';
  underwritingFromDate = '';
  underwritingToDate = '';

  claimSearchText = '';
  claimStatusFilter = 'All';
  claimBranchFilter = 'All';
  claimInvestigationFilter = 'All';
  claimFromDate = '';
  claimToDate = '';

  premiumSearchText = '';
  premiumStatusFilter = 'All';
  premiumAgentFilter = 'All';
  premiumBranchFilter = 'All';
  premiumFromDate = '';
  premiumToDate = '';

  customerSearchText = '';
  customerStatusFilter = 'All';
  customerProductFilter = 'All';
  customerBranchFilter = 'All';
  customerFromDate = '';
  customerToDate = '';
  loading = true;
  errorMessage = '';
  searchText = '';
  statusFilter = 'All';
  productFilter = 'All';
  fromDate = '';
  toDate = '';
  exporting = false;
  exportMessage = '';
  readonly statuses = ['All', 'Active', 'Expired', 'Pending Payment', 'Cancelled'];
  role = 'admin';
  activeReport = 'policies';

  constructor(
    private readonly reportsService: ReportsDashboardService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const requestedRole = params.get('role');
      this.role = requestedRole === 'agent' || requestedRole === 'customer' ? requestedRole : 'admin';
      this.activeReport = 'policies';
      this.clearAllReportData();
      this.errorMessage = '';
      this.exportMessage = '';
      this.loading = this.role === 'admin';

      if (this.role === 'admin') {
        this.loadPolicies();
      } else {
        this.loadDemoData();
        this.loading = false;
      }
      this.cdr.markForCheck();
    });
  }

  private clearAllReportData(): void {
    this.policies = [];
    this.customers = [];
    this.premiums = [];
    this.claims = [];
    this.underwritingCases = [];
    this.agents = [];
    this.financialRecords = [];
  }

  private loadDemoData(): void {
    const customerMode = this.role === 'customer';
    const demoPolicies: PolicyReport[] = customerMode ? [
      { policyNumber: 'POL-CU-1001', customerId: 1001, product: 'Health Insurance', status: 'Active', branch: 'My Account', premium: 12500, issueDate: '2026-03-15', renewalDue: false },
      { policyNumber: 'POL-CU-1002', customerId: 1001, product: 'Vehicle Insurance', status: 'Active', branch: 'My Account', premium: 8000, issueDate: '2026-05-10', renewalDue: true },
      { policyNumber: 'POL-CU-1003', customerId: 1001, product: 'Life Insurance', status: 'Pending Payment', branch: 'My Account', premium: 4000, issueDate: '2026-08-20', renewalDue: false }
    ] : [
      { policyNumber: 'POL-AG-2001', customerId: 2001, product: 'Health Insurance', status: 'Active', branch: 'Your Portfolio', premium: 14500, issueDate: '2026-04-12', renewalDue: false },
      { policyNumber: 'POL-AG-2002', customerId: 2002, product: 'Vehicle Insurance', status: 'Active', branch: 'Your Portfolio', premium: 9000, issueDate: '2026-06-18', renewalDue: true },
      { policyNumber: 'POL-AG-2003', customerId: 2003, product: 'Life Insurance', status: 'Expired', branch: 'Your Portfolio', premium: 11000, issueDate: '2025-10-01', renewalDue: false }
    ];
    this.policies = demoPolicies;
    this.customers = customerMode ? [{ customerId: 1001, customerName: 'Demo Customer', city: 'Mumbai', state: 'Maharashtra', status: 'Active', product: 'Health Insurance', agent: 'Assigned Agent', branch: 'My Account', date: '2026-03-15' }] : [
      { customerId: 2001, customerName: 'Demo Customer A', city: 'Mumbai', state: 'Maharashtra', status: 'Active', product: 'Health Insurance', agent: 'You', branch: 'Your Portfolio', date: '2026-04-12' },
      { customerId: 2002, customerName: 'Demo Customer B', city: 'Thane', state: 'Maharashtra', status: 'Active', product: 'Vehicle Insurance', agent: 'You', branch: 'Your Portfolio', date: '2026-06-18' },
      { customerId: 2003, customerName: 'Demo Customer C', city: 'Navi Mumbai', state: 'Maharashtra', status: 'Inactive', product: 'Life Insurance', agent: 'You', branch: 'Your Portfolio', date: '2025-10-01' }
    ];
    this.premiums = customerMode ? [
      { paymentId: 7001, policyNumber: 'POL-CU-1001', amount: 12500, status: 'SUCCESS', paymentDate: '2026-04-15', agent: 'Assigned Agent', branch: 'My Account' },
      { paymentId: 7002, policyNumber: 'POL-CU-1002', amount: 8000, status: 'PENDING', paymentDate: '2026-10-10', agent: 'Assigned Agent', branch: 'My Account' }
    ] : [
      { paymentId: 8001, policyNumber: 'POL-AG-2001', amount: 14500, status: 'SUCCESS', paymentDate: '2026-05-12', agent: 'You', branch: 'Your Portfolio' },
      { paymentId: 8002, policyNumber: 'POL-AG-2002', amount: 9000, status: 'SUCCESS', paymentDate: '2026-07-18', agent: 'You', branch: 'Your Portfolio' },
      { paymentId: 8003, policyNumber: 'POL-AG-2003', amount: 3000, status: 'PENDING', paymentDate: '2026-10-01', agent: 'You', branch: 'Your Portfolio' }
    ];
    this.claims = customerMode ? [
      { claimId: 9001, policyNumber: 'POL-CU-1001', amount: 15000, status: 'SETTLED', claimDate: '2026-07-22', branch: 'My Account', investigation: 'No' }
    ] : [
      { claimId: 9101, policyNumber: 'POL-AG-2001', amount: 15000, status: 'SETTLED', claimDate: '2026-07-22', branch: 'Your Portfolio', investigation: 'No' },
      { claimId: 9102, policyNumber: 'POL-AG-2002', amount: 22000, status: 'PENDING', claimDate: '2026-09-05', branch: 'Your Portfolio', investigation: 'Yes' }
    ];
    this.underwritingCases = customerMode ? [] : [
      { caseId: 6001, customerId: 2001, status: 'APPROVED', risk: 'LOW', underwriter: 'Demo Underwriter', caseDate: '2026-04-10' },
      { caseId: 6002, customerId: 2002, status: 'PENDING', risk: 'MEDIUM', underwriter: 'Demo Underwriter', caseDate: '2026-06-15' }
    ];
    this.agents = customerMode ? [] : [
      { agent: 'You (Demo Agent)', sales: 3, premiumCollected: 32500, activeCustomers: 2, commission: 3250, branch: 'Your Portfolio' }
    ];
    this.financialRecords = [
      ...this.premiums.map(p => ({ paymentId: p.paymentId, policyNumber: p.policyNumber, amount: p.amount, status: p.status, paymentDate: p.paymentDate, agent: p.agent, branch: p.branch })),
      ...this.claims.map(c => ({ claimId: c.claimId, policyNumber: c.policyNumber, amount: c.amount, status: c.status, claimDate: c.claimDate, branch: c.branch, investigation: c.investigation }))
    ];
  }

  selectReport(report: string): void {
    const allowed = this.role === 'admin'
      ? ['policies', 'customers', 'premiums', 'claims', 'underwriting', 'agents', 'financial']
      : this.role === 'agent'
        ? ['policies', 'customers', 'premiums', 'claims', 'agents', 'financial']
        : ['policies', 'premiums', 'claims', 'financial'];
    if (!allowed.includes(report)) return;
    this.activeReport = report;
    this.errorMessage = '';
    this.exportMessage = '';
    if (this.role !== 'admin') {
      this.loading = false;
      return;
    }
    if (report === 'policies' && this.policies.length === 0) this.loadPolicies();
    if (report === 'customers') this.loadCustomers();
    if (report === 'premiums') this.loadPremiums();
    if (report === 'claims') this.loadClaims();
    if (report === 'underwriting') this.loadUnderwriting();
    if (report === 'agents') this.loadAgents();
    if (report === 'financial') this.loadFinancial();
  }

  loadPolicies(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.reportsService.getPolicies().subscribe({
      next: response => {
        console.log('Policy report:', response);

        this.policies = response.data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        console.error('Policy report error:', error);

        this.errorMessage = 'Unable to load policy report.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  
loadCustomers(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

  this.loading = true;
  this.errorMessage = '';
  this.cdr.markForCheck();

  this.reportsService.getCustomers().subscribe({
    next: response => {
      this.customers = response.data ?? [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Customer report error:', error);
      this.errorMessage = 'Unable to load customer report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}

loadPremiums(): void {
    if (this.role !== 'admin') { this.loading = false; return; }
  this.loading = true;
  this.errorMessage = '';

  this.reportsService.getPremiums().subscribe({
    next: response => {
      this.premiums = response.data || [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Premium report error:', error);
      this.errorMessage = 'Unable to load premium report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}

loadClaims(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

  this.loading = true;
  this.errorMessage = '';
  this.cdr.markForCheck();

  this.reportsService.getClaims().subscribe({
    next: response => {
      this.claims = response.data || [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Claims report error:', error);
      this.errorMessage = 'Unable to load claims report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}

loadUnderwriting(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

  this.loading = true;
  this.errorMessage = '';
  this.cdr.markForCheck();

  this.reportsService.getUnderwriting().subscribe({
    next: response => {
      this.underwritingCases = response.data || [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Underwriting report error:', error);
      this.errorMessage = 'Unable to load underwriting report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}

loadAgents(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

  this.loading = true;
  this.errorMessage = '';
  this.cdr.markForCheck();

  this.reportsService.getAgents().subscribe({
    next: response => {
      this.agents = response.data || [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Agent report error:', error);
      this.errorMessage = 'Unable to load agent report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}
loadFinancial(): void {
    if (this.role !== 'admin') { this.loading = false; return; }

  this.loading = true;
  this.errorMessage = '';
  this.cdr.markForCheck();

  this.reportsService.getFinancial().subscribe({
    next: response => {
      this.financialRecords = response.data || [];
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: error => {
      console.error('Financial report error:', error);
      this.errorMessage = 'Unable to load financial report.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}
  get products(): string[] { return [...new Set(this.policies.map(p => p.product))].sort(); }
  get filteredCustomers(): CustomerReport[] {
    const query = this.customerSearchText.trim().toLowerCase();

    return this.customers.filter(customer => {
      const matchesText = !query || [
        String(customer.customerId),
        customer.customerName,
        customer.city,
        customer.state,
        customer.product,
        customer.status,
        customer.agent,
        customer.branch
      ].some(value => value.toLowerCase().includes(query));

      const matchesStatus = this.customerStatusFilter === 'All' || customer.status === this.customerStatusFilter;
      const matchesProduct = this.customerProductFilter === 'All' || customer.product === this.customerProductFilter;
      const matchesBranch = this.customerBranchFilter === 'All' || customer.branch === this.customerBranchFilter;
      const matchesFrom = !this.customerFromDate || customer.date >= this.customerFromDate;
      const matchesTo = !this.customerToDate || customer.date <= this.customerToDate;

      return matchesText && matchesStatus && matchesProduct && matchesBranch && matchesFrom && matchesTo;
    });
  }

get customerProductCount(): number {
  return new Set(this.customers.map(customer => customer.product)).size;
}

get reportTitle(): string {
  const titles: Record<string, string> = {
    premiums: 'Premium report',
    claims: 'Claims report',
    underwriting: 'Underwriting report',
    agents: 'Agent report',
    financial: 'Financial report'
  };

  return titles[this.activeReport] ?? 'Report';
}
  countRenewals(): number { return this.policies.filter(p => p.renewalDue).length; }
  countActive(): number { return this.policies.filter(p => p.status === 'Active').length; }
  get filteredPolicies(): PolicyReport[] {
    const query = this.searchText.trim().toLowerCase();
    return this.policies.filter(p => {
      const matchesText = !query || [p.policyNumber, String(p.customerId), p.product, p.branch, p.status].some(v => v.toLowerCase().includes(query));
      const matchesStatus = this.statusFilter === 'All' || p.status === this.statusFilter;
      const matchesProduct = this.productFilter === 'All' || p.product === this.productFilter;
      const matchesFrom = !this.fromDate || p.issueDate >= this.fromDate;
      const matchesTo = !this.toDate || p.issueDate <= this.toDate;
      return matchesText && matchesStatus && matchesProduct && matchesFrom && matchesTo;
    });
  }

  get filteredPremiums(): PremiumReport[] {
    const query = this.premiumSearchText.trim().toLowerCase();

    return this.premiums.filter(payment => {
      const matchesText = !query || [
        String(payment.paymentId),
        payment.policyNumber,
        payment.status,
        payment.agent,
        payment.branch
      ].some(value => value.toLowerCase().includes(query));

      const matchesStatus = this.premiumStatusFilter === 'All' || payment.status === this.premiumStatusFilter;
      const matchesAgent = this.premiumAgentFilter === 'All' || payment.agent === this.premiumAgentFilter;
      const matchesBranch = this.premiumBranchFilter === 'All' || payment.branch === this.premiumBranchFilter;
      const matchesFrom = !this.premiumFromDate || payment.paymentDate >= this.premiumFromDate;
      const matchesTo = !this.premiumToDate || payment.paymentDate <= this.premiumToDate;

      return matchesText && matchesStatus && matchesAgent && matchesBranch && matchesFrom && matchesTo;
    });
  }

get totalPremiumAmount(): number {
  return this.premiums.reduce((total, p) => total + p.amount, 0);
}

get successfulPayments(): number {
  return this.premiums.filter(p => p.status === 'SUCCESS').length;
}

get pendingPayments(): number {
  return this.premiums.filter(p =>
    p.status === 'PENDING' || p.status === 'REFUND_PENDING'
  ).length;
}

get filteredClaims(): ClaimReport[] {
  const query = this.claimSearchText.trim().toLowerCase();

  return this.claims.filter(claim => {
    const matchesText = !query || [
      String(claim.claimId),
      claim.policyNumber,
      claim.status,
      claim.branch,
      claim.investigation,
      claim.claimDate
    ].some(value => value.toLowerCase().includes(query));

    const matchesStatus = this.claimStatusFilter === 'All' || claim.status === this.claimStatusFilter;
    const matchesBranch = this.claimBranchFilter === 'All' || claim.branch === this.claimBranchFilter;
    const matchesInvestigation = this.claimInvestigationFilter === 'All' || claim.investigation === this.claimInvestigationFilter;
    const matchesFrom = !this.claimFromDate || claim.claimDate >= this.claimFromDate;
    const matchesTo = !this.claimToDate || claim.claimDate <= this.claimToDate;

    return matchesText && matchesStatus && matchesBranch && matchesInvestigation && matchesFrom && matchesTo;
  });
}

get totalClaimAmount(): number {
  return this.claims.reduce((total, claim) => total + claim.amount, 0);
}

get settledClaims(): number {
  return this.claims.filter(claim => claim.status === 'SETTLED').length;
}

get investigationClaims(): number {
  return this.claims.filter(claim => claim.investigation === 'Yes').length;
}

get filteredUnderwriting(): UnderwritingReport[] {
  const query = this.underwritingSearchText.trim().toLowerCase();

  return this.underwritingCases.filter(item => {
    const matchesText = !query || [
      String(item.caseId),
      String(item.customerId),
      item.status,
      item.risk,
      item.underwriter,
      item.caseDate
    ].some(value => value.toLowerCase().includes(query));

    const matchesStatus = this.underwritingStatusFilter === 'All' || item.status === this.underwritingStatusFilter;
    const matchesRisk = this.underwritingRiskFilter === 'All' || item.risk === this.underwritingRiskFilter;
    const matchesUnderwriter = this.underwritingUnderwriterFilter === 'All' || item.underwriter === this.underwritingUnderwriterFilter;
    const matchesFrom = !this.underwritingFromDate || item.caseDate >= this.underwritingFromDate;
    const matchesTo = !this.underwritingToDate || item.caseDate <= this.underwritingToDate;

    return matchesText && matchesStatus && matchesRisk && matchesUnderwriter && matchesFrom && matchesTo;
  });
}

get approvedCases(): number {
  return this.underwritingCases.filter(
    item => item.status === 'APPROVED'
  ).length;
}

get pendingCases(): number {
  return this.underwritingCases.filter(
    item => item.status === 'PENDING' ||
            item.status === 'MEDICAL_PENDING'
  ).length;
}

get highRiskCases(): number {
  return this.underwritingCases.filter(
    item => item.risk === 'HIGH'
  ).length;
}

get filteredAgents(): AgentReport[] {
  const query = this.agentSearchText.trim().toLowerCase();

  return this.agents.filter(agent => {
    const matchesText = !query || [
      agent.agent,
      agent.branch,
      String(agent.sales),
      String(agent.activeCustomers),
      String(agent.premiumCollected),
      String(agent.commission)
    ].some(value => value.toLowerCase().includes(query));

    const matchesBranch = this.agentBranchFilter === 'All' || agent.branch === this.agentBranchFilter;
    const matchesSales = this.agentMinSales === null || agent.sales >= this.agentMinSales;
    const matchesPremium = this.agentMinPremium === null || agent.premiumCollected >= this.agentMinPremium;

    return matchesText && matchesBranch && matchesSales && matchesPremium;
  });
}

get totalAgentSales(): number {
  return this.agents.reduce((total, agent) => total + agent.sales, 0);
}

get totalAgentPremium(): number {
  return this.agents.reduce(
    (total, agent) => total + agent.premiumCollected, 0
  );
}

get totalAgentCommission(): number {
  return this.agents.reduce(
    (total, agent) => total + agent.commission, 0
  );
}

get totalActiveCustomers(): number {
  return this.agents.reduce(
    (total, agent) => total + agent.activeCustomers, 0
  );
}
get financialPayments(): FinancialReport[] {
  return this.financialRecords.filter(
    record => record.paymentId !== undefined
  );
}

get financialClaims(): FinancialReport[] {
  return this.financialRecords.filter(
    record => record.claimId !== undefined
  );
}

get totalFinancialPremium(): number {
  return this.financialPayments.reduce(
    (total, record) => total + record.amount, 0
  );
}

get totalFinancialClaimAmount(): number {
  return this.financialClaims.reduce(
    (total, record) => total + record.amount, 0
  );
}

get successfulFinancialPayments(): number {
  return this.financialPayments.filter(
    record => record.status === 'SUCCESS'
  ).length;
}

get filteredFinancialRecords(): FinancialReport[] {
  const query = this.financialSearchText.trim().toLowerCase();

  return this.financialRecords.filter(record => {
    const recordType = record.paymentId !== undefined ? 'Premium' : 'Claim';
    const recordDate = record.paymentDate || record.claimDate || '';
    const matchesText = !query || [
      String(record.paymentId ?? ''),
      String(record.claimId ?? ''),
      record.policyNumber,
      record.status,
      record.branch,
      record.agent ?? '',
      record.investigation ?? ''
    ].some(value => value.toLowerCase().includes(query));

    const matchesType = this.financialTypeFilter === 'All' || recordType === this.financialTypeFilter;
    const matchesStatus = this.financialStatusFilter === 'All' || record.status === this.financialStatusFilter;
    const matchesBranch = this.financialBranchFilter === 'All' || record.branch === this.financialBranchFilter;
    const matchesFrom = !this.financialFromDate || recordDate >= this.financialFromDate;
    const matchesTo = !this.financialToDate || recordDate <= this.financialToDate;

    return matchesText && matchesType && matchesStatus && matchesBranch && matchesFrom && matchesTo;
  });
}

get customerProducts(): string[] {
  return [...new Set(this.customers.map(item => item.product))].sort();
}

get customerBranches(): string[] {
  return [...new Set(this.customers.map(item => item.branch))].sort();
}

get customerStatuses(): string[] {
  return [...new Set(this.customers.map(item => item.status))].sort();
}

get premiumAgents(): string[] {
  return [...new Set(this.premiums.map(item => item.agent))].sort();
}

get premiumBranches(): string[] {
  return [...new Set(this.premiums.map(item => item.branch))].sort();
}

get premiumStatuses(): string[] {
  return [...new Set(this.premiums.map(item => item.status))].sort();
}

get claimBranches(): string[] {
  return [...new Set(this.claims.map(item => item.branch))].sort();
}

get claimStatuses(): string[] {
  return [...new Set(this.claims.map(item => item.status))].sort();
}

get underwritingStatuses(): string[] {
  return [...new Set(this.underwritingCases.map(item => item.status))].sort();
}

get underwritingRisks(): string[] {
  return [...new Set(this.underwritingCases.map(item => item.risk))].sort();
}

get underwritingUnderwriters(): string[] {
  return [...new Set(this.underwritingCases.map(item => item.underwriter))].sort();
}

get agentBranches(): string[] {
  return [...new Set(this.agents.map(item => item.branch))].sort();
}

get financialStatuses(): string[] {
  return [...new Set(this.financialRecords.map(item => item.status))].sort();
}

get financialBranches(): string[] {
  return [...new Set(this.financialRecords.map(item => item.branch))].sort();
}

clearCustomerFilters(): void {
  this.customerSearchText = '';
  this.customerStatusFilter = 'All';
  this.customerProductFilter = 'All';
  this.customerBranchFilter = 'All';
  this.customerFromDate = '';
  this.customerToDate = '';
}

clearPremiumFilters(): void {
  this.premiumSearchText = '';
  this.premiumStatusFilter = 'All';
  this.premiumAgentFilter = 'All';
  this.premiumBranchFilter = 'All';
  this.premiumFromDate = '';
  this.premiumToDate = '';
}

clearClaimFilters(): void {
  this.claimSearchText = '';
  this.claimStatusFilter = 'All';
  this.claimBranchFilter = 'All';
  this.claimInvestigationFilter = 'All';
  this.claimFromDate = '';
  this.claimToDate = '';
}

clearUnderwritingFilters(): void {
  this.underwritingSearchText = '';
  this.underwritingStatusFilter = 'All';
  this.underwritingRiskFilter = 'All';
  this.underwritingUnderwriterFilter = 'All';
  this.underwritingFromDate = '';
  this.underwritingToDate = '';
}

clearAgentFilters(): void {
  this.agentSearchText = '';
  this.agentBranchFilter = 'All';
  this.agentMinSales = null;
  this.agentMinPremium = null;
}

clearFinancialFilters(): void {
  this.financialSearchText = '';
  this.financialTypeFilter = 'All';
  this.financialStatusFilter = 'All';
  this.financialBranchFilter = 'All';
  this.financialFromDate = '';
  this.financialToDate = '';
}

  formatMoney(value: number): string { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value); }
  export(format: 'csv' | 'excel' | 'pdf'): void {
    if (this.role !== 'admin') { this.exportMessage = 'Export is available only in the Admin workspace. Demo data is not exported.'; return; }
    this.exporting = true; this.exportMessage = '';
    this.reportsService.exportReport(format, 'policies').subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob); const link = document.createElement('a');
        link.href = url; link.download = `policy-report.${format === 'excel' ? 'xlsx' : format}`; link.click(); URL.revokeObjectURL(url);
        this.exporting = false;
      },
      error: () => { this.exporting = false; this.exportMessage = `The ${format.toUpperCase()} export failed. Check that the backend export endpoint is enabled.`; }
    });
  }
  clearFilters(): void { this.searchText = ''; this.statusFilter = 'All'; this.productFilter = 'All'; this.fromDate = ''; this.toDate = ''; }
  
}
