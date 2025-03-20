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

  constructor(private http: HttpClient, private router: Router) {
    this.restoreSession(); // 🔄 Restaurer la session après rechargement
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  private restoreSession() {
    const authData = localStorage.getItem('authData'); // 🔄 Récupérer les données d'authentification
    if (authData) {
      const { username, password } = JSON.parse(authData);
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password) // 🔑 Restaurer les credentials
      });
    }
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    this.http.get(`${this.baseUrl}/cours`, {headers: this.headers}).subscribe({
      next: (response) => {
        localStorage.setItem('authenticated', 'true'); // ✅ Enregistrer l'état de connexion
        localStorage.setItem('authData', JSON.stringify({ username, password })); // ✅ Sauvegarde des credentials
        console.log("🔑 Utilisateur authentifié avec succès !");
        this.router.navigate(['/adherent']);
      },
      error: (err) => {
        localStorage.removeItem('authenticated'); // ✅ Supprimer en cas d'erreur
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json'});
        console.error("❌ Échec de l'authentification !");
        localStorage.removeItem('authData'); // ❌ Supprimer les credentials en cas d'échec

      }
    });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('authenticated'); // ✅ Supprimer l'authentification
    localStorage.removeItem('authData');
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
