import { Component, inject } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { Transaction } from '../../../../../store/transaction/transaction.model';
import { Store } from '@ngrx/store';
import { TransactionService } from '../../../../../services/transactions.service';
import { TRANSACTION_TYPES } from '../constants';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrl: './search-transaction.component.scss',
})
export class SearchTransactionComponent {
  startDate: Date;
  endDate: Date;
  loading: boolean = false;

  allColumns = ['date', 'amount', 'category', 'type', 'tags', 'description'];

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
  ];
  dataSource: NbTreeGridDataSource<Transaction>;
  private readonly store = inject(Store);

  transactions: Array<Transaction> = [];
  allTransactions: Array<Transaction> = [];

  constructor(
    private transactionsService: TransactionService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Transaction>
  ) {}

  searchTransactions() {
    let startDate, endDate;
    this.loading = true;
    if (this.startDate) {
      startDate = new Date(
        Date.UTC(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate()
        )
      )
        .toISOString()
        .substring(0, 10);
    }
    if (this.endDate) {
      endDate = new Date(
        Date.UTC(
          this.endDate.getFullYear(),
          this.endDate.getMonth(),
          this.endDate.getDate()
        )
      )
        .toISOString()
        .substring(0, 10);
    }

    this.transactionsService
      .getTransactions({
        sortBy: 'date',
        startDate: startDate,
        endDate: endDate,
      })
      .subscribe((transactions) => {
        this.allTransactions = transactions;
        this.initTransactions(transactions);
        this.loading = false;
      });
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
