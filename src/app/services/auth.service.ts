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
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    this.http.get(`${this.baseUrl}/cours`, {headers: this.headers}).subscribe({
      next: (response) => {
        this.authenticated = true;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.authenticated = false;
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
    });
    return this.authenticated;
  }

  logout() {
    this.authenticated = false;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
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
