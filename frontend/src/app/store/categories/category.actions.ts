import { createAction, props } from '@ngrx/store';
import { Category } from './category.model';

export const setCategories = createAction('[Category] Set Categories', props<{ categories: Category[] }>());
export const addCategory = createAction('[Category] Add Category', props<{ category: Category }>());
export const deleteCategory = createAction('[Category] Delete Category', props<{ categoryId: string }>());
export const clearCategories = createAction('[Category] Clear Categories');
