import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Cours} from '../model/cours.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8080/cours';

  constructor(private http: HttpClient,private auth: AuthService) {
  }

  getCourss(): Observable<Cours[]> {
    if (!this.auth.isAuthenticated()) {
      console.error('❌ Utilisateur non authentifié');
      return throwError(() => new Error('Utilisateur non authentifié'));
    }

    return this.http.get<Cours[]>(this.apiUrl, { headers: this.auth.headers }).pipe(
      catchError(this.handleError) // Gère les erreurs HTTP
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ Erreur lors de la récupération des cours :', error);
    return throwError(() => new Error('Erreur de chargement des cours.'));
  }
}
