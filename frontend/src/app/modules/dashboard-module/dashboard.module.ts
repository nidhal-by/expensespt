import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbUserModule, NbMenuModule, NbInputModule, NbActionsModule, NbIconModule, NbFormFieldModule, NbToggleModule, NbSelectModule, NbDatepickerModule, NbAutocompleteModule, NbCardModule, NbTagModule, NbTreeGridModule, NbSpinnerModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../../store/user/user.reducer';
import { PasswordComponent } from './dashboard/password/password.component';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { AlertsComponent } from './dashboard/alerts/alerts.component';
import { BudgetComponent } from './dashboard/budget/budget.component';
import { TransactionComponent } from './dashboard/transaction/transaction.component';
import { CreateTransactionComponent } from './dashboard/transaction/create-transaction/create-transaction.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { CreateCategoryComponent } from './dashboard/category/create-category/create-category.component';
import { SearchTransactionComponent } from './dashboard/transaction/search-transaction/search-transaction.component';
import { TransactionTableComponent } from './dashboard/transaction/transaction-table/transaction-table.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarMenuComponent,
    ProfileComponent,
    PasswordComponent,
    AlertsComponent,
    BudgetComponent,
    TransactionComponent,
    CreateTransactionComponent,
    CategoryComponent,
    CreateCategoryComponent,
    SearchTransactionComponent,
    TransactionTableComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbUserModule,
    NbMenuModule,
    NbInputModule,
    NbActionsModule,
    FormsModule,
    StoreModule.forFeature('user', userReducer),
    NbIconModule,
    NbFormFieldModule,
    SvgIconComponent,
    NbToggleModule,
    NbSelectModule,
    NbDatepickerModule,
    NbAutocompleteModule,
    NbCardModule,
    NbTagModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    NbSpinnerModule,
    NgxEchartsModule.forChild()
  ]
})
export class DashboardModule { }
