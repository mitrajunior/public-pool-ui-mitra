import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token?: string }>(`${environment.API_URL}/api/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          if (res && res.token) {
            localStorage.setItem(this.TOKEN_KEY, res.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
