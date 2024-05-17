import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selector';
import { User } from '../../../../store/user/user.model';
import { Observable, Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  user = {
    _id: '',
    oldPassword: '',
    newPassword: '',
  };

  showOldPassword = false;
  showNewPassword = false;

  getOldPasswordType() {
    if (this.showOldPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleNewPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  getNewPasswordType() {
    if (this.showNewPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleOldPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  private readonly store = inject(Store);
  currentUser: Observable<User> = this.store.pipe(select(selectUser));
  private userSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService
  ) {
    this.userSubscription = this.currentUser.subscribe((user: any) => {
      if (user) this.user = Object.assign({}, user);
    });
  }

  savePassword() {
    if (!this.user.oldPassword || this.user.oldPassword.length === 0) {
      this.toastrService.danger(
        'Veuillez renseigner votre ancien mot de passe',
        'Erreur'
      );
      return;
    } else if (!this.user.newPassword || this.user.newPassword.length === 0) {
      this.toastrService.danger(
        'Veuillez renseigner votre nouveau mot de passe',
        'Erreur'
      );
      return;
    } else if (this.user.newPassword.length < 4) {
      this.toastrService.danger(
        'Veuillez saisir un nouveau mot de passe avec plus de 4 caractères',
        'Erreur'
      );
      return;
    }
    this.usersService
      .updatePassword(
        this.user._id,
        this.user.oldPassword,
        this.user.newPassword
      )
      .subscribe({
        next: () => {
          this.user.oldPassword = '';
          this.user.newPassword = '';
          this.toastrService.success(
            'Votre mot de passe a été modifié avec succès.',
            'Succès'
          );
        },
        error: () => {
          this.toastrService.danger(
            'Veuillez vérifier votre ancien mot de passe',
            'Erreur'
          );
        },
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
