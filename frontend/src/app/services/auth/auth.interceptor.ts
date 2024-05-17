import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isAuthenticated().pipe(switchMap((authenticated: boolean) => {
      if (authenticated) {
        return this.authService.getToken().pipe(switchMap((token: NbAuthToken) => {
          // Add "Bearer " prefix to the Authorization header
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.getValue()}`,
            },
          });
          return next.handle(authReq);
        }));
      } else {
        return next.handle(request);
      }
    }));
  }
}