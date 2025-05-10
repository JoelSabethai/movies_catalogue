import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  IBaseResponse,
  IBaseSuccessResponse,
} from 'src/app/core/models/api.model';
import { ILogin, IRegister } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
  ) {}

  // Method to validate session
  async validateToken(): Promise<void> {
    const token = this.getToken();

    if (!token) return Promise.resolve();

    return await this.http
      .get<IBaseSuccessResponse>(`${this.apiUrl}/auth/validate-token`, { headers: this.headers })
      .toPromise()
      .then(() => {
        const currentUrl = this.location.path();

        // Redirect only if not is a protected route
        if (!currentUrl.startsWith('/movies')) {
          this.router.navigate(['/movies']);
        }
      })
      .catch(() => {
        this.logOut();
      });
  }

  // Method to log in
  logIn(email: string, password: string): Observable<IBaseResponse<ILogin>> {
    const body = {
      email,
      password,
    };

    return this.http.post<IBaseResponse<ILogin>>(`${this.apiUrl}/auth/login`, body, {
      headers: this.headers,
    });
  }

  // Method to register a new user
  register(
    email: string,
    password: string
  ): Observable<IBaseResponse<IRegister>> {
    const body = {
      email,
      password,
    };

    return this.http.post<IBaseResponse<IRegister>>(
      `${this.apiUrl}/auth/register`,
      body,
      { headers: this.headers }
    );
  }

  // Method to get token of current session
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Method to get token of current session
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  // Method to log out
  async logOut(): Promise<void> {
    const token = this.getToken();

    if (!token) {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      return Promise.resolve();
    }
    
    return await this.http.post<IBaseSuccessResponse>(`${this.apiUrl}/auth/logout`, {}, { headers: this.headers })
    .toPromise()
    .then(() => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    })
    .catch(() => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    })
  }
}
