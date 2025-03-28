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


  updateCours(id: number, cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/${id}`, cours, { headers: this.auth.headers }).pipe(
      catchError(this.handleError)
    );
  }

  supprimerCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.auth.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCoursById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`, { headers: this.auth.headers }).pipe(
      catchError(this.handleError)
    );
  }

  ajouterCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiUrl, cours, { headers: this.auth.headers }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('❌ Erreur lors de la récupération des cours :', error);
    return throwError(() => new Error('Erreur de chargement des cours.'));
  }
}
