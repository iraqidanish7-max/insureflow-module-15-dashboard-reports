import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list';
import { CustomerFormComponent } from './customer-form/customer-form';
import { CustomerDetailsComponent } from './customer-details/customer-details';

// Import these routes into the main router when the module screens are ready.
export const Customer managementRoutes: Routes = [
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: '', redirectTo: 'customer-list', pathMatch: 'full' }
];
