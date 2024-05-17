import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transactions } from './transaction.model';

const selectTransactionState = createFeatureSelector<Transactions>('transactions');

export const selectTransactions = createSelector(
  selectTransactionState,
  state => state
);
