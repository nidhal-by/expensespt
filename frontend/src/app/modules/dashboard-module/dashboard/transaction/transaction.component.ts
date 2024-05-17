import { Component, inject } from '@angular/core';
import { TransactionService } from '../../../../services/transactions.service';
import { Store } from '@ngrx/store';
import {
  setTransactions,
} from '../../../../store/transaction/transaction.actions';
import {
  NbSortDirection,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { TRANSACTION_TYPES } from './constants';
import { Observable, Subscription } from 'rxjs';
import { selectTransactions } from '../../../../store/transaction/transaction.selector';
import {
  Transaction,
  Transactions,
} from '../../../../store/transaction/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  allColumns = [
    'date',
    'amount',
    'category',
    'type',
    'tags',
    'description',
    'action',
  ];
  transactionsTypes = TRANSACTION_TYPES;

  columnsInfos = [
    {
      name: 'date',
      label: 'Date',
    },
    {
      name: 'amount',
      label: 'Montant',
    },
    {
      name: 'category',
      label: 'Catégorie',
    },
    {
      name: 'type',
      label: 'Type',
    },
    {
      name: 'tags',
      label: 'Les tags',
    },
    {
      name: 'description',
      label: 'Description',
    },
    {
      name: 'action',
      label: 'Action',
    },
  ];

  private readonly store = inject(Store);
  transactionsList: Observable<Transactions>;
  transactionsSubscription: Subscription;

  transactions: Array<Transaction> = [];
  allTransactions: Array<Transaction> = [];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  dataSource: NbTreeGridDataSource<Transaction>;

  availableCategories: any = [];
  selectedCategories: Array<any> = [];
  budgetLoaded = false;

  constructor(
    private transactionsService: TransactionService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Transaction>
  ) {
    this.transactionsService.getAll().subscribe((transactions) => {
      this.allTransactions = transactions;
      this.store.dispatch(setTransactions({ transactions }));

      this.transactions = transactions.map((transaction: any) => {
        if (
          !this.availableCategories.find(
            (category: any) => category.id === transaction.category.id
          )
        )
          this.availableCategories.push(transaction.category);
      });
      this.initTransactions(transactions);
    });
    this.transactionsList = this.store.select(selectTransactions);
    this.transactionsSubscription = this.transactionsList.subscribe(
      (transactionsState) => {
        if (
          transactionsState.transactions &&
          transactionsState.transactions.length
        ) {
          this.allTransactions = transactionsState.transactions;
          this.initTransactions(transactionsState.transactions);
        }
      }
    );
  }

  categoriesSelected(selectedCategories: any) {
    if (!selectedCategories.length) {
      this.initTransactions([...this.allTransactions]);
    } else {
      this.initTransactions(
        this.allTransactions.filter((transaction: any) =>
          selectedCategories.includes(transaction.category.id)
        )
      );
    }
  }

  initTransactions(transactions: any) {
    this.transactions = transactions.map((transaction: any) => {
      return {
        data: {
          id: transaction._id,
          date: new Date(transaction.date).toISOString().substring(0, 10),
          amount: transaction.amount,
          category: transaction.category,
          type: TRANSACTION_TYPES[transaction.type],
          tags: transaction.tags ? transaction.tags.join(' / ') : '-',
          description: transaction.description,
        },
      };
    });
    this.dataSource = this.dataSourceBuilder.create(this.transactions);
  }
}
