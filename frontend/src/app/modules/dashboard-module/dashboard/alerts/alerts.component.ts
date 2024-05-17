import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../store/user/user.model';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selector';
import { NbToastrService } from '@nebular/theme';
import { UsersService } from '../../../../services/users.service';
import { selectCategories } from '../../../../store/categories/category.selector';
import { Categories } from '../../../../store/categories/category.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
  user = {
    _id: '',
    firstname: '',
    lastname: '',
    mail: '',
    alerts: [],
    budget: [],
  };
  categories: Array<any> = [];
  budgetLoaded = false;

  private readonly store = inject(Store);
  currentUser: Observable<User> = this.store.pipe(select(selectUser));
  userSubscription: Subscription;
  currentCategories: Observable<Categories> = this.store.pipe(
    select(selectCategories)
  );
  categoriesSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService
  ) {
    this.userSubscription = this.currentUser.subscribe((user: any) => {
      if (user) {
        this.user = Object.assign({}, user);
      }

      this.categoriesSubscription = this.currentCategories.subscribe(
        (categoriesState: any) => {
          if (categoriesState.categories) {
            this.loadDefaultAlerts(categoriesState.categories);
          }
        }
      );
    });
  }

  loadDefaultAlerts(categories: Array<any>) {
    this.categories = categories.map((category: any) => {
      const alertCategory: any = this.user.alerts.find(
        (alertItem: any) => category.id === alertItem.categoryId
      );
      return {
        ...category,
        enabled: alertCategory?.alert || false,
      };
    });
  }

  alertChanged(value: boolean, categoryId: string, categoryName: string) {
    const alert: any = {};
    alert[categoryId] = value;

    this.usersService.setAlert(alert).subscribe(() => {
      this.toastrService.success(
        `Votre Alerte pour la catégorie ${categoryName} est bien mis à jour`,
        'Alerte enregistrée'
      );
    });
  }

  saveAlerts() {
    let alerts: any = {};
    this.categories.forEach((category: any) => {
      if (category.enabled) {
        alerts[category.id] = true;
      }
    });

    /*
    this.usersService.setAlerts(alerts).subscribe(() => {
      this.toastrService.success(
        'Votre budget est bien mis à jour',
        'Budget enregistré'
      );
    });
    */
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
