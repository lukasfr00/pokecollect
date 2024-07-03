import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../pokemon-struct/pokemon';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = environment.apiUrl;
  //private userId = '667c45e969824ee5008f437f'; // Setzen Sie hier die tatsächliche Benutzer-ID

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPokemon(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/pokemon/`, { headers });
  }

  getCollection(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/pokemonCollection`, { headers });
  }

  updateCollection(pulledPokemon: Pokemon[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.apiUrl}/users/pokemonCollection/update`,
      { pulledPokemon },
      { headers }
    );
  }
}
