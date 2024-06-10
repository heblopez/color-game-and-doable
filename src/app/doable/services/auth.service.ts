import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthResponse, Credentials } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  private tokenKey = environment.authKey;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  login(credentials: Credentials) {
    return this.makeAuthRequest(`${this.apiUrl}/login`, credentials);
  }

  signup(credentials: Credentials) {
    return this.makeAuthRequest(`${this.apiUrl}/signup`, credentials);;
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private makeAuthRequest(url: string, data: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url, data).pipe(
      map(response => {
        if ('token' in response) {
          this.saveToken(response.token);
          this.isAuthenticated.next(true);
          return response;
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.errors);
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private loadToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    this.isAuthenticated.next(!!token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

