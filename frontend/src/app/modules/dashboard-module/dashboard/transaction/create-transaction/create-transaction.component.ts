import { Component, inject, ViewChild } from '@angular/core';
import { TransactionService } from '../../../../../services/transactions.service';
import {
  TRANSACTION_TYPES,
  TRANSACTION_EXPENSE,
  TRANSACTION_INCOME,
} from '../constants';
import { Store, select } from '@ngrx/store';
import { Categories } from '../../../../../store/categories/category.model';
import { selectCategories } from '../../../../../store/categories/category.selector';
import { Observable, Subscription, map, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbTagComponent, NbToastrService } from '@nebular/theme';
import { createTransaction } from '../../../../../store/transaction/transaction.actions';

interface Transaction {
  type: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  tags: Array<any>;
}

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  autocompleteTags = new FormControl();
  filteredTags$: Observable<string[]>;
  @ViewChild('tagInput') tagInput: any;
  autocompleteValue: string = '';
  defaultTransactionValues = {
    type: TRANSACTION_EXPENSE,
    amount: 0,
    date: new Date(),
    category: '',
    description: '',
    tags: [],
  };
  transaction: Transaction = { ...this.defaultTransactionValues };
  tags: Array<string> = [];
  transactionTypes = TRANSACTION_TYPES;
  transactionExpense = TRANSACTION_EXPENSE;
  transactionIncome = TRANSACTION_INCOME;

  categories: Array<any> = [];
  budgetLoaded = false;

  private readonly store = inject(Store);
  currentCategories: Observable<Categories> = this.store.pipe(
    select(selectCategories)
  );
  categoriesSubscription: Subscription;

  constructor(
    private transactionsService: TransactionService,
    private toastrService: NbToastrService
  ) {
    this.categoriesSubscription = this.currentCategories.subscribe(
      (categoriesState: any) => {
        if (categoriesState.categories.length > 0) {
          this.categories = categoriesState.categories;
          this.transaction.category = this.categories[0].id;
        }
      }
    );
  }

  ngOnInit() {
    this.transactionsService.getTags().subscribe((tags) => {
      this.tags = tags;
      this.filteredTags$ = of(this.tags);
    });
  }

  addTransaction() {
    this.transactionsService
      .create(this.transaction)
      .subscribe((transaction) => {
        if (transaction) {
          this.store.dispatch(createTransaction({ transaction }));
          this.autocompleteValue = '';
          this.transaction = {
            ...this.defaultTransactionValues,
            category: this.categories[0].id,
          };
          this.toastrService.success(
            `La nouvelle transaction a été ajouté avec succès.`,
            'Transaction ajouté'
          );
        }
      });
  }

  // Those methods are meant to handle autocomplete and

  onAutocompleteSelected(selectedItem: never | any) {
    if (selectedItem && !this.transaction.tags.includes(selectedItem)) {
      this.transaction.tags.push(selectedItem);
    }
    setTimeout(() => {
      this.autocompleteValue = '';
    });
  }

  onEnterPressed($event: any) {
    $event.preventDefault();
    const valueToAdd = this.autocompleteValue;
    if (valueToAdd.length > 0 && !this.transaction.tags.includes(valueToAdd)) {
      this.transaction.tags.push(valueToAdd);
      this.tags.push(valueToAdd);
    }

    this.filteredTags$ = of(this.tags);
    this.autocompleteValue = ''; // Clear the autocomplete input after adding the value
  }

  onTagRemoved(tagToRemove: NbTagComponent) {
    this.transaction.tags = this.transaction.tags.filter(
      (tag) => tag !== tagToRemove.text
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter((optionValue: string) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onTagChange() {
    this.filteredTags$ = this.getFilteredOptions(
      this.tagInput.nativeElement.value
    );
  }

  onSelectionChange($event: any) {
    this.filteredTags$ = this.getFilteredOptions($event);
  }
}
