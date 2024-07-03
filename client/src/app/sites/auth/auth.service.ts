import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  private setSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        this.setSession(res.accessToken, res.refreshToken);
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    return this.http
      .post(`${this.apiUrl}/register`, {
        username,
        email,
        password,
        firstname,
        lastname,
      })
      .pipe(
        tap((res: any) => {
          this.setSession(res.accessToken, res.refreshToken);
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      return this.http
        .post<any>(`${this.apiUrl}/token`, { token: refreshToken })
        .pipe(
          tap((res: any) => {
            //console.log('AuthService: New access token received', res);
            this.setSession(res.accessToken, refreshToken);
          }),
          catchError((err) => {
            console.log('AuthService: Refresh token failed, logging out', err);
            this.logout();
            return of(null);
          })
        );
    }
    return of(null);
  }

  checkAndRefreshToken(): Observable<any> {
    const token = this.getToken();
    if (token) {
      if (!this.isTokenExpired(token)) {
        return of(token);
      } else {
        return this.refreshToken().pipe(switchMap(() => of(this.getToken())));
      }
    }
    return of(null);
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap({
        next: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        },
        error: (err) => {
          console.error('Logout failed:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        },
      })
    );
  }

  getToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (token && !this.isTokenExpired(token)) {
      return token;
    }
    return null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Umwandeln in Millisekunden
      return Date.now() >= expirationDate;
    } catch (e) {
      console.error('Error decoding token', e);
      return true;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
