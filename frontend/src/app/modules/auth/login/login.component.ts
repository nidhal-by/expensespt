/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbLoginComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends NbLoginComponent {
  constructor(
    authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options = {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(authService, options, cd, router);
  }
}
