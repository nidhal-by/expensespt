// my-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from './api.constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiRoute = API_ROUTES.users;
  constructor(private http: HttpClient) {}

  create(user: any) {
    return this.http.post<any>(this.apiRoute + '/create', user);
  }

  edit(user: any) {
    return this.http.put<any>(this.apiRoute + '/edit', user);
  }

  updatePassword(userId: string, oldPassword: string, newPassword: string) {
    return this.http.put<any>(this.apiRoute + '/updatePassword', {
      id: userId,
      oldPassword,
      newPassword
    });
  }

  getUser() {
    return this.http.get<any>(this.apiRoute + '/me');
  }

  setBudget(budget: Object) {
    return this.http.put<any>(this.apiRoute + '/budget', { budget: JSON.stringify(budget) });
  }

  setAlert(alert: Object) {
    return this.http.put<any>(this.apiRoute + '/alerts', { alert: JSON.stringify(alert) });
  }
}
