import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  //private userId = '667c45e969824ee5008f437f'; // Setzen Sie hier die tatsächliche Benutzer-ID

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<Object> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/user`, { headers });
  }

  /*updateCollection(pulledPokemon: Pokemon[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.apiUrl}/users/pokemonCollection/update`,
      { pulledPokemon },
      { headers }
    );
  }*/
}
