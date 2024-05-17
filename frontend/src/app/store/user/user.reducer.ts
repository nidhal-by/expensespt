import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
  _id: '',
  firstname: '',
  lastname: '',
  mail: '',
  budget: {},
  alerts: {},
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({ ...state, ...user })),
  on(clearUser, () => initialState)
);