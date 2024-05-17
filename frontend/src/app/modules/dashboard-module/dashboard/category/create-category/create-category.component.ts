import { Component, ViewChild, inject } from '@angular/core';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { Observable, map, of } from 'rxjs';
import { CategoriesService } from '../../../../../services/categories.service';
import { addCategory } from '../../../../../store/categories/category.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent {
  icons: any[] = [];
  defaultCategoryValues = {
    name: '',
    icon: '',
    color: '#32a852',
  };
  category =  { ...this.defaultCategoryValues };
  filteredIcons$: Observable<string[]>;
  @ViewChild('iconInput') iconInput: any;
  private readonly store = inject(Store);

  constructor(
    private iconLibraries: NbIconLibraries,
    private categoriesService: CategoriesService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get available icons
    this.icons = Array.from(this.iconLibraries.getPack('eva').icons)
      .filter((icon) => !icon[0].includes('outline'))
      .map((icon) => icon[0]);
    this.filteredIcons$ = of(this.icons);
  }
  // code get from documentation => https://akveo.github.io/nebular/docs/components/autocomplete/overview#nbautocompletedirective

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.icons.filter((optionValue: string) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onIconChange() {
    this.filteredIcons$ = this.getFilteredOptions(
      this.iconInput.nativeElement.value
    );
  }

  onSelectionChange($event: any) {
    this.filteredIcons$ = this.getFilteredOptions($event);
  }

  addCategory() {
    this.categoriesService.add(this.category).subscribe((category) => {
      if (category) {
        this.store.dispatch(addCategory({ category }));
        this.category =  { ...this.defaultCategoryValues };
        this.toastrService.success(
          `La catégorie ${category.name} a été ajouté avec succès.`,
          'Catégorie ajouté'
        );
        this.router.navigateByUrl('/dashboard/categories/list');
      }
    });
  }
}
