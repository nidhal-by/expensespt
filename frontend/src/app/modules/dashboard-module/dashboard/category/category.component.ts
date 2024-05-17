import { Component, TemplateRef, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  NbDialogService,
  NbSortDirection,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { CategoriesService } from '../../../../services/categories.service';
import { deleteCategory, setCategories } from '../../../../store/categories/category.actions';
import { selectCategories } from '../../../../store/categories/category.selector';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../../../../store/categories/category.model';

interface Category {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  allColumns = ['name', 'icon', 'color', 'default', 'action'];

  columnsInfos = [
    {
      name: 'name',
      label: 'Nom',
    },
    {
      name: 'icon',
      label: 'Icône',
    },
    {
      name: 'color',
      label: 'Couleur',
    },
    {
      name: 'default',
      label: 'Par défaut',
    },
    {
      name: 'action',
      label: 'Action',
    },
  ];

  private readonly store = inject(Store);

  categories = [];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  dataSource: NbTreeGridDataSource<Category>;

  currentCategories: Observable<Categories> = this.store.pipe(
    select(selectCategories)
  );
  categoriesSubscription: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Category>,
    private dialogService: NbDialogService
  ) {
    this.categoriesSubscription = this.currentCategories.subscribe(
      (categoriesState: any) => {
        if (categoriesState.categories.length > 0) {
          this.initCategories(categoriesState.categories);
        }
      }
    );
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.store.dispatch(setCategories({ categories }));
      this.initCategories(categories);
    });
  }

  initCategories(categories: any) {
    this.categories = categories.map((category: any) => {
      return {
        data: {
          id: category.id,
          name: category.name,
          color: category.color,
          icon: category.icon,
          default: category.default,
        },
      };
    });
    this.dataSource = this.dataSourceBuilder.create(this.categories);
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

  confirmDeletion(id: string, dialog:any) {
    this.categoriesService.delete(id).subscribe(() => {
      this.store.dispatch(deleteCategory({ categoryId: id }));
      dialog.close();
    });
  }
}
