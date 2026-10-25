import { Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview';
import { ReportsComponent } from './reports/reports';

export const reportsDashboardRoutes: Routes = [
  { path: 'dashboard-overview', component: DashboardOverviewComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }
];
