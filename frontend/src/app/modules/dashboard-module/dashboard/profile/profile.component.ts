import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selector';
import { User } from '../../../../store/user/user.model';
import { Observable, Subscription } from 'rxjs';
import { setUser } from '../../../../store/user/user.actions';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    _id: '',
    firstname: '',
    lastname: '',
    mail: ''
  };

  private readonly store = inject(Store);
  currentUser: Observable<User> = this.store.pipe(select(selectUser));
  private userSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService
  ) {
    this.userSubscription = this.currentUser.subscribe((user) => {
      if (user) this.user = Object.assign({}, user);
    });
  }

  saveUser() {
    const userInfos = {
      id: this.user._id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      mail: this.user.mail,
    };
    this.usersService.edit(userInfos).subscribe({
      next: (user) => {
        console.log('new user => ', user);
        if (user) this.store.dispatch(setUser(user));
        this.toastrService.success(
          'Vos informations son mis à jour avec succès',
          'Succès'
        );
      },
      error: () => {
        this.toastrService.danger(
          'Un problème de modification d\'informations s\'est produit',
          'Erreur'
        );
      },
    });
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
