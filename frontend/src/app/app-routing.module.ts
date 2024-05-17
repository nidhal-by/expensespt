import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard-module/dashboard/dashboard.component';
import { AuthGuard } from './services/auth/auth-guard.service';

import { NbAuthComponent } from '@nebular/auth';
import { AuthLoggedInGuard } from './services/auth/auth-logged-guard.service';
import { ProfileComponent } from './modules/dashboard-module/dashboard/profile/profile.component';
import { PasswordComponent } from './modules/dashboard-module/dashboard/password/password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { BudgetComponent } from './modules/dashboard-module/dashboard/budget/budget.component';
import { AlertsComponent } from './modules/dashboard-module/dashboard/alerts/alerts.component';
import { TransactionComponent } from './modules/dashboard-module/dashboard/transaction/transaction.component';
import { CreateTransactionComponent } from './modules/dashboard-module/dashboard/transaction/create-transaction/create-transaction.component';
import { CategoryComponent } from './modules/dashboard-module/dashboard/category/category.component';
import { CreateCategoryComponent } from './modules/dashboard-module/dashboard/category/create-category/create-category.component';
import { SearchTransactionComponent } from './modules/dashboard-module/dashboard/transaction/search-transaction/search-transaction.component';
import { ReportsComponent } from './modules/dashboard-module/dashboard/reports/reports.component';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthLoggedInGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthLoggedInGuard],
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'password',
        component: PasswordComponent,
      },
      {
        path: 'budget',
        component: BudgetComponent,
      },
      {
        path: 'alerts',
        component: AlertsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'transactions',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TransactionComponent,
          },
          {
            path: 'search',
            component: SearchTransactionComponent,
          },
          {
            path: 'create',
            component: CreateTransactionComponent,
          },
        ],
      },
      {
        path: 'categories',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: CategoryComponent,
          },
          {
            path: 'create',
            component: CreateCategoryComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , {enableTracing: true}
  exports: [RouterModule],
})
export class AppRoutingModule {}
