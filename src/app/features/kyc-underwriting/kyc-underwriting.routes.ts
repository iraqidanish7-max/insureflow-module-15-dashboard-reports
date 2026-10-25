import { Routes } from '@angular/router';
import { KycReviewComponent } from './kyc-review/kyc-review';
import { UnderwritingReviewComponent } from './underwriting-review/underwriting-review';

// Import these routes into the main router when the module screens are ready.
export const Kyc underwritingRoutes: Routes = [
  { path: 'kyc-review', component: KycReviewComponent },
  { path: 'underwriting-review', component: UnderwritingReviewComponent },
  { path: '', redirectTo: 'kyc-review', pathMatch: 'full' }
];
