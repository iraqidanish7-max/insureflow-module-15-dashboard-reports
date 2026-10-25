import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { UserManagementComponent } from './user-management/user-management';
import { RoleManagementComponent } from './role-management/role-management';

// Import these routes into the main router when the module screens are ready.
export const AuthorizationRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'role-management', component: RoleManagementComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
