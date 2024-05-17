import { createAction, props } from '@ngrx/store';
import { Transaction } from './transaction.model';

export const setTransactions = createAction('[Transaction] Load Transaction', props<{ transactions: Transaction[] }>());
export const createTransaction = createAction('[Transaction] Add Transaction', props<{ transaction: Transaction }>());
export const deleteTransaction = createAction('[Transaction] Delete Transactions', props<{ transactionId: string }>());
export const clearTransactions = createAction('[Transaction] Clear Transactions');
