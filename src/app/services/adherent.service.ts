import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adherent} from '../model/Adherent.model';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = 'http://localhost:8080/adherent';

  constructor(private http: HttpClient) {
  }

  getAdherents(): Observable<Adherent[]> {
    let adherents = this.http.get<Adherent[]>(this.apiUrl);
    return adherents;
  }
}
