import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../types/User';
import { APIResponse } from '../types/APIResponse';
import { HttpClient } from '@angular/common/http';
import { errorGuard } from '../guards/error-guard.pipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly administratorEmail = 'administrator@gmail.com';

  user$$ = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.user$$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  initializeUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get('/api/user').subscribe({
        next: (user: any) => {
          this.user$$.next(user);
          resolve();
        },
        error: () => {
          this.user$$.next(null);
          resolve();
        },
      });
    });
  }

  getUser() {
    return this.user$$.value;
  }

  isAdmin(): boolean {
    const user = this.getUser();

    return (
      !!user &&
      user.email?.toLowerCase() === this.administratorEmail
    );
  }

  register(userData: any) {
    return this.http
      .post<APIResponse>("/api/register", userData)
      .pipe(
        errorGuard(),
        tap(response => {
          this.user$$.next(response.user);
        })
      );
  }

  login(userData: any) {
    return this.http
      .post<APIResponse>("/api/login", userData)
      .pipe(
        errorGuard(),
        tap(response => {
          this.user$$.next(response.user);
        })
      );
  }

  logout() {
    return this.http
      .post<void>("/api/logout", {})
      .pipe(
        tap(() => {
          console.log("User logged out successfully.");

          this.user$$.next(null);
          this.router.navigate(["/"]);
        })
      );
  }
}