import { createReducer, on } from '@ngrx/store';
import { createTransaction, clearTransactions, setTransactions, deleteTransaction } from './transaction.actions';
import { Transactions } from './transaction.model';

export const initialState: Transactions = {
  transactions: [],
};

export const transactionReducer = createReducer(
  initialState,
  on(setTransactions, (state, { transactions }) => ({
    ...state,
    transactions: transactions,
  })),
  on(createTransaction, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
  })),
  on(deleteTransaction, (state, { transactionId }) => {
    transactionId
    return {
      ...state,
      transactions: [...state.transactions.filter((transaction) => transaction._id !== transactionId)]
    }
  }),
  on(clearTransactions, () => initialState)
);
