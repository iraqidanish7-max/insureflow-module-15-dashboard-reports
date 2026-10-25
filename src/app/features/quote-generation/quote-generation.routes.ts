import { Routes } from '@angular/router';
import { QuoteListComponent } from './quote-list/quote-list';
import { QuoteFormComponent } from './quote-form/quote-form';
import { QuoteDetailsComponent } from './quote-details/quote-details';

// Import these routes into the main router when the module screens are ready.
export const Quote generationRoutes: Routes = [
  { path: 'quote-list', component: QuoteListComponent },
  { path: 'quote-form', component: QuoteFormComponent },
  { path: 'quote-details', component: QuoteDetailsComponent },
  { path: '', redirectTo: 'quote-list', pathMatch: 'full' }
];
