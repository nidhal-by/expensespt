import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthResult,
  NbAuthService,
  NbRegisterComponent,
} from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends NbRegisterComponent {
  constructor(
    authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options = {},
    cd: ChangeDetectorRef,
    router: Router,
    private toastrService: NbToastrService
  ) {
    super(authService, options, cd, router);
  }

  override register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.service
      .register(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.toastrService.success(
            'Votre inscription est validé, vous serez automatiquement connecté',
            'Félicitations !'
          );
        } else {
          this.errors = result.getErrors();
          console.log('this.errors => ', result.getResponse().status);
          if (result.getResponse().status === 409) {
            this.toastrService.danger(
              'Cet email est déjà utilisé.',
              'Erreur'
            );
          } else {
            this.toastrService.danger(
              'Une erreur est survenue, veuillez réessayer plus tard.',
              'Erreur'
            );
          }
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }
}
