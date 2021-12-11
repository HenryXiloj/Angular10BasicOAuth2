import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

  login(loginPayload: any) {
    const headers = {
      Authorization: 'Basic ' + btoa('CLIENT_ID:PASSWORD_CLIENT_ID'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http.post(environment.host + '/oauth/token', loginPayload, {
      headers,
    });
  }

  user(): string {
    const payload = this.getDataToken(this.token);
    return payload.user_name;
  }

  public get token(): string {
    if (sessionStorage.getItem('token') != null) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  saveToken(accessToken: string): void {
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getDataToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.clear();
  }
}
