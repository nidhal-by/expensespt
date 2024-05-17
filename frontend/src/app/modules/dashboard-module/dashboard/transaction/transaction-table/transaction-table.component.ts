import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NbDialogService, NbSortDirection, NbTreeGridDataSource } from '@nebular/theme';
import { Transaction } from '../../../../../store/transaction/transaction.model';
import { TRANSACTION_TYPES } from '../constants';
import { TransactionService } from '../../../../../services/transactions.service';
import { Store } from '@ngrx/store';
import { deleteTransaction } from '../../../../../store/transaction/transaction.actions';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent {
  @Input() dataSource: NbTreeGridDataSource<Transaction>;
  @Input() allColumns: string[];
  @Input() columnsInfos: any[];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  transactionsTypes = TRANSACTION_TYPES;
  private readonly store = inject(Store);


  constructor(
    private dialogService: NbDialogService,
    private transactionsService: TransactionService
  ) {
  }


  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  openDeleteConfirmation(dialog: TemplateRef<any>, id: string) {
    this.dialogService.open(dialog, {
      context: {
        message: 'êtes vous sur de vouloir supprimer cette transaction ?',
        id: id,
      },
    });
  }

  confirmDeletion(id: string, dialog: any) {
    this.transactionsService.delete(id).subscribe(() => {
      this.store.dispatch(deleteTransaction({ transactionId: id }));
      dialog.close();
    });
  }
}
