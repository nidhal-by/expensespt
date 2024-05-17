import { createReducer, on } from '@ngrx/store';
import { addCategory, clearCategories, deleteCategory, setCategories } from './category.actions';
import { Categories } from './category.model';

export const initialState: Categories = {
  categories: [],
};

export const categoriesReducer = createReducer(
  initialState,
  on(setCategories, (state, { categories }) => ({
    ...state,
    categories: categories,
  })),
  on(addCategory, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category],
  })),
  on(deleteCategory, (state, { categoryId }) => {
    return {
      ...state,
      categories: [...state.categories.filter((category) => category.id !== categoryId)]
    }
  }),
  on(clearCategories, () => initialState)
);
