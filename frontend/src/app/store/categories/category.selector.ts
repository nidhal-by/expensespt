import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Categories } from './category.model';

const selectCategoriesState = createFeatureSelector<Categories>('categories');

export const selectCategories = createSelector(
  selectCategoriesState,
  state => state
);
