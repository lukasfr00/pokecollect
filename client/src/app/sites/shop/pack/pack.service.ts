import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pack } from '../shop.module';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  private apiUrl = 'http://localhost:5001/api/packs';

  constructor(private http: HttpClient) {}

  getPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(this.apiUrl);
  }

  generatePack(id: string): Observable<Pack> {
    return this.http.get<Pack>(`${this.apiUrl}/${id}/generate`);
  }
}
