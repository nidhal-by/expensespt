import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './user.model';

const selectUserState = createFeatureSelector<User>('user');

export const selectUser = createSelector(
  selectUserState,
  state => state
);
