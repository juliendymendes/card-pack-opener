import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISetResponse } from '../types/Set';
import { ICardsResponse } from '../types/Booster';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "https://api.magicthegathering.io/v1/"

  constructor(private http: HttpClient) { }

  getSets(name: string, block: string): Observable<ISetResponse>{
    return this.http.get<ISetResponse>(this.apiUrl + "sets", {
      params: { name, block},
      responseType: "json"
    })
  }

  getBooster(id: string): Observable<ICardsResponse>{
    return this.http.get<ICardsResponse>(this.apiUrl + `sets/${id}/booster`, {
      responseType: "json"
    })
  }

}
