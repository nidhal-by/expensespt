// my-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from './api.constants';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiRoute = API_ROUTES.categories;
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<any>(this.apiRoute + '/all');
  }

  getDefaultCategories() {
    return this.http.get<any>(this.apiRoute + '/default');
  }

  getMyCategories() {
    return this.http.get<any>(this.apiRoute + '/mine');
  }

  add(category: any) {
    return this.http.post<any>(this.apiRoute + '/create', category);
  }

  delete(categoryId: string) {
    return this.http.delete<any>(this.apiRoute + '/' + categoryId);
  }
}
