import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'auth_token';

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem('current_user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(this.handleError)
      );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(catchError(this.handleError));
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('current_user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconegut';
    if (error.error && error.error.error) {
      errorMessage = error.error.error;
    } else if (error.status === 0) {
      errorMessage = 'No es pot connectar amb el servidor';
    }
    return throwError(() => new Error(errorMessage));
  }
}
