
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportsDashboardService } from '../services/reports-dashboard.service';
import {
  ChartPoint,
  DashboardCharts,
  DashboardSummary
} from '../models/report.models';

type Role = 'admin' | 'agent' | 'customer';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css'
})
export class DashboardOverviewComponent implements OnInit {

  summary: DashboardSummary | null = null;
  charts: DashboardCharts | null = null;

  loading = true;
  errorMessage = '';
  role: Role = 'admin';

  readonly money = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  constructor(
    private readonly reportsService: ReportsDashboardService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const selectedRole = params.get('role');

      this.role =
        selectedRole === 'agent' || selectedRole === 'customer'
          ? selectedRole
          : 'admin';

      this.summary = null;
      this.charts = null;
      this.errorMessage = '';
      this.loading = true;

      if (this.role === 'agent') {
        this.loadDemoDashboard('agent');
        return;
      }

      if (this.role === 'customer') {
        this.loadDemoDashboard('customer');
        return;
      }

      this.loadAdminDashboard();
    });
  }

  private loadAdminDashboard(): void {
    this.reportsService.getDashboardSummary().subscribe({
      next: response => {
        this.summary = response.data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        console.error('Dashboard summary error:', error);
        this.errorMessage = 'Unable to load dashboard summary.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });

    this.reportsService.getDashboardCharts().subscribe({
      next: response => {
        this.charts = response.data;
        this.cdr.markForCheck();
      },
      error: error => {
        console.error('Dashboard charts error:', error);
        this.errorMessage = 'Unable to load chart data.';
        this.cdr.markForCheck();
      }
    });
  }

  private loadDemoDashboard(role: 'agent' | 'customer'): void {
    if (role === 'agent') {
      this.summary = {
        totalCustomers: 24,
        totalPolicies: 31,
        activePolicies: 26,
        premiumCollected: 485000,
        pendingPremium: 42000,
        claimsRegistered: 5,
        claimsApproved: 3,
        claimsRejected: 1,
        claimsSettled: 2,
        outstandingClaims: 65000,
        monthlyRevenue: 85000,
        lossRatioPercent: 42.5,
        renewalDue: 4,
        topPerformingAgent: 'You',
        dataSource: 'DUMMY_DATA'
      };

      this.charts = {
        premiumTrend: [
          { label: 'May', value: 52000 },
          { label: 'Jun', value: 68000 },
          { label: 'Jul', value: 61000 },
          { label: 'Aug', value: 79000 },
          { label: 'Sep', value: 72000 },
          { label: 'Oct', value: 85000 }
        ],
        policySales: [
          { label: 'May', value: 3 },
          { label: 'Jun', value: 5 },
          { label: 'Jul', value: 4 },
          { label: 'Aug', value: 7 },
          { label: 'Sep', value: 5 },
          { label: 'Oct', value: 7 }
        ],
        policiesByProduct: [
          { label: 'Health', value: 12 },
          { label: 'Life', value: 8 },
          { label: 'Vehicle', value: 11 }
        ],
        claimsByStatus: [
          { label: 'Pending', value: 1 },
          { label: 'Approved', value: 1 },
          { label: 'Rejected', value: 1 },
          { label: 'Settled', value: 2 }
        ],
        agentPerformance: [
          { label: 'Your sales', value: 31 }
        ],
        dataSource: [
          { label: 'Demo', value: 1 }
        ]
      };
    } else {
      this.summary = {
        totalCustomers: 1,
        totalPolicies: 3,
        activePolicies: 2,
        premiumCollected: 24500,
        pendingPremium: 3500,
        claimsRegistered: 1,
        claimsApproved: 1,
        claimsRejected: 0,
        claimsSettled: 1,
        outstandingClaims: 0,
        monthlyRevenue: 3500,
        lossRatioPercent: 0,
        renewalDue: 1,
        topPerformingAgent: 'Your insurance agent',
        dataSource: 'DUMMY_DATA'
      };

      this.charts = {
        premiumTrend: [
          { label: 'May', value: 3000 },
          { label: 'Jun', value: 3500 },
          { label: 'Jul', value: 3000 },
          { label: 'Aug', value: 4500 },
          { label: 'Sep', value: 5000 },
          { label: 'Oct', value: 3500 }
        ],
        policySales: [
          { label: 'May', value: 0 },
          { label: 'Jun', value: 1 },
          { label: 'Jul', value: 0 },
          { label: 'Aug', value: 1 },
          { label: 'Sep', value: 0 },
          { label: 'Oct', value: 1 }
        ],
        policiesByProduct: [
          { label: 'Health', value: 1 },
          { label: 'Life', value: 1 },
          { label: 'Vehicle', value: 1 }
        ],
        claimsByStatus: [
          { label: 'Pending', value: 0 },
          { label: 'Approved', value: 0 },
          { label: 'Rejected', value: 0 },
          { label: 'Settled', value: 1 }
        ],
        agentPerformance: [
          { label: 'Your policies', value: 3 }
        ],
        dataSource: [
          { label: 'Demo', value: 1 }
        ]
      };
    }

    this.loading = false;
    this.cdr.markForCheck();
  }

  formatMoney(value: number | undefined): string {
    return this.money.format(value ?? 0);
  }

  maxValue(points: ChartPoint[] | undefined): number {
    return Math.max(1, ...(points || []).map(point => point.value));
  }

  barHeight(value: number, points: ChartPoint[] | undefined): string {
    return `${Math.max(4, value / this.maxValue(points) * 100)}%`;
  }

  trackByLabel(_index: number, point: ChartPoint): string {
    return point.label;
  }
}
