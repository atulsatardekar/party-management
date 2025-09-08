import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from '../models/party.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'https://ap.greatfuturetechno.com/party/';

  constructor(private http: HttpClient) { }

  getParties(page: number = 1, pageSize: number = 10, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())

      if (search && search.trim() !== '') {
        params = params.set('search', search.trim());
      }

    return this.http.get<any>(this.apiUrl, { params });
  }

  getParty(id: number): Observable<Party> {
    return this.http.get<Party>(this.apiUrl, {
      params: new HttpParams().set('id', id.toString())
    });
  }

  createParty(party: Party): Observable<Party> {
    return this.http.post<Party>(this.apiUrl, party);
  }

  updateParty(id: number, party: Party): Observable<Party> {
    return this.http.put<Party>(`${this.apiUrl}?id=${id}`, party);
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}
