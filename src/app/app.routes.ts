import { Routes } from '@angular/router';
import { WorkspacePage } from './features/workspace/workspace-page';
import { DashboardOverviewComponent } from './features/reports-dashboard/dashboard-overview/dashboard-overview';
import { ReportsComponent } from './features/reports-dashboard/reports/reports';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin/dashboard' },
  { path: ':role/dashboard', component: DashboardOverviewComponent },
  { path: ':role/reports', component: ReportsComponent },
  { path: ':role/:section', component: WorkspacePage },
  { path: ':role/:section/:submodule', component: WorkspacePage },
  { path: '**', redirectTo: 'admin/dashboard' }
];
