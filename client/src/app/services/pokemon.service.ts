import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokemon-struct/pokemon';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = environment.apiUrl + '/pokemon';

  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
