import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersService } from '../../../services/users.service';
import { setUser } from '../../../store/user/user.actions';
import { selectUser } from '../../../store/user/user.selector';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../store/user/user.model';
import { NbSidebarService } from '@nebular/theme';
import { NbAuthService } from '@nebular/auth';
import { CategoriesService } from '../../../services/categories.service';
import { setCategories } from '../../../store/categories/category.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly store = inject(Store);
  currentUser: Observable<User>;
  private userSubscription: Subscription;
  sideBarShown = true;

  constructor(
    private usersService: UsersService,
    public sidebarService: NbSidebarService,
    private authService: NbAuthService,
    private categoriesService: CategoriesService
  ) {
    this.currentUser = this.store.select(selectUser);
    this.userSubscription = this.currentUser.subscribe((user) => {
      if (!user || !user.mail) {
        // User is not loaded or does not have email address, load user
        this.authService.isAuthenticated().subscribe((authenticated) => {
          if (authenticated) this.loadUser();
        });
      }
    });
    this.sidebarService.onToggle().subscribe((res) => {
      this.sideBarShown = !this.sideBarShown;
    });
  }

  loadUser() {
    this.usersService.getUser().subscribe((user) => {
      if (user) {
        this.store.dispatch(setUser(user));
      }
    });
    this.categoriesService.getAllCategories().subscribe((categories) => {
      if (categories) {
        this.store.dispatch(setCategories({ categories }));
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, 'left');
  }
}
