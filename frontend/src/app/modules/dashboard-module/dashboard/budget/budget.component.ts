import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../store/user/user.model';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selector';
import { NbToastrService } from '@nebular/theme';
import { UsersService } from '../../../../services/users.service';
import { Categories } from '../../../../store/categories/category.model';
import { selectCategories } from '../../../../store/categories/category.selector';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
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
  currentCategories: Observable<Categories> = this.store.pipe(select(selectCategories));
  categoriesSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService
  ) {
    this.userSubscription = this.currentUser.subscribe((user: any) => {
      if (user) {
        this.user = Object.assign({}, user);
      }
    });
  }

  ngOnInit() {
    this.categoriesSubscription = this.currentCategories.subscribe((categoriesState: any) => {
      if (categoriesState.categories) {
        this.loadDefaultBudget(categoriesState.categories);
      }
    });
  }

  loadDefaultBudget(categories: []) {
    this.categories = categories.map((category: any) => {
      const budgetCategory: any = this.user.budget.find(
        (budgetElement: any) => category.id === budgetElement.categoryId
      );
      return {
        ...category,
        amount: budgetCategory?.amount || null
      }
    });
  }

  saveBudget() {
    let budget: any = {};
    let errorBudget = false;
    this.categories.forEach((category: any) => {
      if (category.amount) {
        if (isNaN(category.amount)) {
          this.toastrService.danger(
            `Le budget choisi pour la catégorie ${category.name} n'est pas correct`,
            'Budget incorrect'
          );
          errorBudget = true;
        }

        budget[category.id] = +category.amount;
      }
    });

    if (errorBudget) return;

    this.usersService.setBudget(budget).subscribe(() => {
      this.toastrService.success(
        'Votre budget est bien mis à jour',
        'Budget enregistré'
      );
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
