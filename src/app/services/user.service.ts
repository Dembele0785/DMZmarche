import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../model/user.model';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  private supabase: SupabaseClient;

  constructor(private http: HttpClient,private auth: AuthService) {
    this.supabase = createClient(
      'https://nexpegskbrjolsvhrppo.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leHBlZ3NrYnJqb2xzdmhycHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTUyNDksImV4cCI6MjA0NDU3MTI0OX0.-tb5jEjEGoSIgccxVcAZ3j__Cv6mUe8AJvru-Ud9S9w');
  }

  updateUser(id: string, updatedData: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/${id}`, updatedData, { headers: this.auth.headers });
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`, { headers: this.auth.headers }).pipe(
      map(users => users.filter(user => user.role === 'ADHERENT'))
    );
  }





}
