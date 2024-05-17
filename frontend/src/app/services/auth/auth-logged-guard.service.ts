import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthLoggedInGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        map(authenticated => {
          if (authenticated) {
            this.router.navigate(['/']);
            return false;
          }
          
          return true;
        }),
      );
  }
}