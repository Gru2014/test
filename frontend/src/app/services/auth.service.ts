import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient, private router: Router) { }
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken())
  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }
  isLoggedIn(): Observable<boolean> {
    console.log(this.loggedIn.asObservable())
    return this.loggedIn.asObservable()
  }

  login(userId: string, password: string) {
    const loginData = { userId, password };
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token,);  // Store token in localStorage
            this.isAuthenticated = true;
            this.loggedIn.next(true)
            this.router.navigate(['/chat-box']);
          } else {
            alert('Invalid credentials');
          }
        }),
        catchError(error => {
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


  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login'])
  }

}
