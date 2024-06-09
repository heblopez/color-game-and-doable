import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://doable-api-production.up.railway.app';
  private tokenKey = 'doable-token';
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.makeAuthRequest(`${this.apiUrl}/login`, { email, password });
  }

  signup(email: string, password: string): Observable<boolean> {
    return this.makeAuthRequest(`${this.apiUrl}/signup`, { email, password });
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private makeAuthRequest(url: string, data: any): Observable<boolean> {
    return this.http.post<{ token: string }>(url, data).pipe(
      map(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.isAuthenticated.next(true);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
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

