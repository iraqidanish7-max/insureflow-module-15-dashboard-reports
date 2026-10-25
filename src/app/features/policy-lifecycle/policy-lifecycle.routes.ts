import { Routes } from '@angular/router';
import { PolicyListComponent } from './policy-list/policy-list';
import { PolicyDetailsComponent } from './policy-details/policy-details';
import { PolicyRenewalComponent } from './policy-renewal/policy-renewal';
import { PolicyClosureComponent } from './policy-closure/policy-closure';
import { PolicyServicingComponent } from './policy-servicing/policy-servicing';

// Import these routes into the main router when the module screens are ready.
export const Policy lifecycleRoutes: Routes = [
  { path: 'policy-list', component: PolicyListComponent },
  { path: 'policy-details', component: PolicyDetailsComponent },
  { path: 'policy-renewal', component: PolicyRenewalComponent },
  { path: 'policy-closure', component: PolicyClosureComponent },
  { path: 'policy-servicing', component: PolicyServicingComponent },
  { path: '', redirectTo: 'policy-list', pathMatch: 'full' }
];
