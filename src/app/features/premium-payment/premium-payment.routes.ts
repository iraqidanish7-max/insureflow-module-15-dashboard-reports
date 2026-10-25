import { Routes } from '@angular/router';
import { PremiumScheduleComponent } from './premium-schedule/premium-schedule';
import { PayPremiumComponent } from './pay-premium/pay-premium';
import { PaymentHistoryComponent } from './payment-history/payment-history';

// Import these routes into the main router when the module screens are ready.
export const Premium paymentRoutes: Routes = [
  { path: 'premium-schedule', component: PremiumScheduleComponent },
  { path: 'pay-premium', component: PayPremiumComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: '', redirectTo: 'premium-schedule', pathMatch: 'full' }
];
