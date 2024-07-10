import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient, private router: Router) { }

  login(userId: string, password: string) {
    const loginData = { userId, password };
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);  // Store token in localStorage
            console.log('token saved')
            this.isAuthenticated = true;
            this.router.navigate(['/create-message']);
          } else {
            alert('Invalid credentials');
          }
        }),
        catchError(error => {
          console.error('Login error', error);
          alert('Invalid credentials');
          return of(null);
        })
      ).subscribe();
  }

  register(userId: string, password: string) {
    const registerData = { userId, password };
    this.http.post(`${this.apiUrl}/register`, registerData)
      .pipe(
        map(() => {
          alert('User registered successfully');
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          console.error('Registration error', error);
          alert('Registration failed');
          return of(null);
        })
      ).subscribe();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        map(() => {
          localStorage.removeItem('token');
          this.isAuthenticated = false;
          alert('Logout successful');
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          console.error('Logout error', error);
          alert('Logout failed');
          return of(null);
        })
      ).subscribe();
  }

}
