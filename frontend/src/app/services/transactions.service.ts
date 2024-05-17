// my-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ROUTES } from './api.constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiRoute = API_ROUTES.transactions;
  constructor(private http: HttpClient) {}

  create(transaction: any) {
    return this.http.post<any>(this.apiRoute + '/create', transaction);
  }

  getAll() {
    return this.http.get<any>(this.apiRoute + '/all');
  }

  delete(id: string) {
    return this.http.delete<any>(this.apiRoute + '/' + id);
  }

  getTransactions(params: {
    sortBy?: string;
    startDate?: string;
    endDate?: string;
    category?: string;
  }) {
    // Construct query parameters
    let queryParams = new HttpParams();
    if (params.sortBy) {
      queryParams = queryParams.append('sortBy', params.sortBy);
    }
    if (params.startDate) {
      queryParams = queryParams.append(
        'startDate',
        params.startDate
      );
    }
    if (params.endDate) {
      queryParams = queryParams.append(
        'endDate',
        params.endDate
      );
    }
    if (params.category) {
      queryParams = queryParams.append('category', params.category);
    }

    return this.http.get<any>(this.apiRoute + '/all', { params: queryParams });
  }

  getTags() {
    return this.http.get<any>(this.apiRoute + '/tags');
  }
}
