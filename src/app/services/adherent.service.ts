import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adherent} from '../model/adherent.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = 'http://localhost:8080/adherent';

  constructor(private http: HttpClient,private auth: AuthService) {
  }

  getAdherents(): Observable<Adherent[]> {
    console.log(this.auth.headers)
    let adherents = this.http.get<Adherent[]>(this.apiUrl,{headers:this.auth.headers});
    return adherents;
  }

}
