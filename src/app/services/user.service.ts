import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../model/user.model';
import {Adherent} from '../model/adherent.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,private auth: AuthService) {
  }

  getUser(): Observable<User[]> {
    console.log(this.auth.headers)
    let user = this.http.get<User[]>(this.apiUrl,{headers:this.auth.headers});
    return user;
  }

  getCurrentUser(): Observable<User> {
    const authData = localStorage.getItem('authData');
    if (!authData) {
      console.error("⚠ Aucun utilisateur authentifié !");
      return throwError(() => new Error("Utilisateur non authentifié"));
    }

    const { username, password } = JSON.parse(authData);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }




}
