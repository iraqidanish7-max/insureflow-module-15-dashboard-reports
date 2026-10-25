import { Routes } from '@angular/router';
import { ClaimListComponent } from './claim-list/claim-list';
import { ClaimDetailsComponent } from './claim-details/claim-details';
import { ClaimSettlementComponent } from './claim-settlement/claim-settlement';
import { InvestigationComponent } from './investigation/investigation';

// Import these routes into the main router when the module screens are ready.
export const Claims settlementRoutes: Routes = [
  { path: 'claim-list', component: ClaimListComponent },
  { path: 'claim-details', component: ClaimDetailsComponent },
  { path: 'claim-settlement', component: ClaimSettlementComponent },
  { path: 'investigation', component: InvestigationComponent },
  { path: '', redirectTo: 'claim-list', pathMatch: 'full' }
];
