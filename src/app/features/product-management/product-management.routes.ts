import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { ProductFormComponent } from './product-form/product-form';
import { ProductDetailsComponent } from './product-details/product-details';

// Import these routes into the main router when the module screens are ready.
export const Product managementRoutes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: '', redirectTo: 'product-list', pathMatch: 'full' }
];
