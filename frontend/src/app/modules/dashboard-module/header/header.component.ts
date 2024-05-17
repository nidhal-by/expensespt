import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../store/user/user.model';
import { selectUser } from '../../../store/user/user.selector';
import { Store } from '@ngrx/store';
import { clearUser } from '../../../store/user/user.actions';
import { clearCategories } from '../../../store/categories/category.actions';
import { clearTransactions } from '../../../store/transaction/transaction.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user = {
    firstname: '',
    lastname: '',
    mail: '',
  };
  private readonly store = inject(Store);
  currentUser: Observable<User> = this.store.select(selectUser);
  private userSubscription: Subscription;

  constructor(
    private authService: NbAuthService,
    private nbTokenService: NbTokenService,
    private router: Router
  ) {
    this.userSubscription = this.currentUser.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  logout() {
    this.authService.logout('email').subscribe(() => {
      this.nbTokenService.clear();
      this.store.dispatch(clearUser());
      this.store.dispatch(clearCategories());
      this.store.dispatch(clearTransactions());
      this.router.navigate(['/auth']);
    });
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
