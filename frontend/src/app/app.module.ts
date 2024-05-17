import { LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
} from '@nebular/auth';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Common modules
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbMenuModule,
  NbToastrModule,
  NbFormFieldModule,
  NbGlobalPhysicalPosition,
  NbAlertModule,
  NbDatepickerModule,
  NbDialogModule,
} from '@nebular/theme';

// Nebular module
import { NbThemeModule } from '@nebular/theme';
import { DashboardModule } from './modules/dashboard-module/dashboard.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Services
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthLoggedInGuard } from './services/auth/auth-logged-guard.service';
import { FormsModule } from '@angular/forms';
import { CustomAuthInterceptor } from './services/auth/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { AuthModule } from './modules/auth/auth.module';

import { provideSvgIcons } from '@ngneat/svg-icon';
import { provideSvgIconsConfig } from '@ngneat/svg-icon';
import { categoriesIcons } from './svg/categories';
import { transactionReducer } from './store/transaction/transaction.reducer';
import { categoriesReducer } from './store/categories/category.reducer';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { fr } from 'date-fns/locale';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { NbMomentDateModule } from '@nebular/moment';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';


const toastrPositions = NbGlobalPhysicalPosition;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    DashboardModule,
    AuthModule,
    NbSidebarModule,
    NbLayoutModule,
    NbButtonModule,
    HttpClientModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    FormsModule,
    StoreModule.forRoot({ user: userReducer, transactions: transactionReducer, categories: categoriesReducer }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'access_token',
          },
          baseEndpoint: 'http://localhost:3000',
          login: {
            endpoint: '/auth/login',
            redirect: {
              success: '/dashboard',
              failure: null, // stay on the same page
            }
          },
          register: {
            endpoint: '/users/create',
          },
        }),
      ],
      forms: {
        login: {
          rememberMe: false,
          redirectDelay: 1000
        },
        register: {
          redirectDelay: 1500,
          terms: false,
          showMessages: {
            success: false,
            error: false,
          },
        }
      },
    }),
    NbToastrModule.forRoot({position: toastrPositions.BOTTOM_RIGHT}),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbAlertModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: fr },
      formatOptions: { locale: fr },
    }),
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    NbDialogModule.forChild(),
    NgxEchartsModule.forRoot({ echarts })
  ],
  providers: [
    AuthGuard,
    AuthLoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomAuthInterceptor,
      multi: true,
    },
    provideSvgIcons(categoriesIcons),
    provideSvgIconsConfig({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        xxl: '30px',
      },
      defaultSize: 'md'
    }),
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
