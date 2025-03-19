import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  public authenticated = false;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    this.http.get(`${this.baseUrl}/cours`, {headers: this.headers}).subscribe({
      next: (response) => {
        localStorage.setItem('authenticated', 'true'); // ✅ Enregistrer l'état de connexion
        this.router.navigate(['/adherent']);
      },
      error: (err) => {
        localStorage.removeItem('authenticated'); // ✅ Supprimer en cas d'erreur
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
    });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('authenticated'); // ✅ Supprimer l'authentification
    this.router.navigate(['/login']);
  }
}
/*@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  public authenticated = false;
  public headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    this.http.get(`${this.baseUrl}/cours`, {headers:this.headers}).subscribe({
      next: (response) => {
        this.authenticated = true;
        //Aller vers le profil ici
       this.router.navigate(['/adherent']);
      },
      error: (err) => {
        this.authenticated = false;
        this.headers=new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
    });
    return this.authenticated;
  }
  logout(){
    this.authenticated=false;
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.router.navigate(['/login']);
  }
}*/
